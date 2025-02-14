require('dotenv').config();

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const twilio = require('twilio');
const axios = require('axios');
const VoiceResponse = twilio.twiml.VoiceResponse;
const g711 = require('g711');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ 
  server,
  path: '/stream'
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/js', express.static('public/js'));

const AMPLIFY_DOMAIN = 'main.d1iok5v17eqbqv.amplifyapp.com';

console.log('OpenAI Key loaded:', !!process.env.OPENAI_API_KEY);
console.log('OpenAI Key starts with:', process.env.OPENAI_API_KEY?.substring(0, 10) + '...');

// Add environment check
if (!process.env.OPENAI_API_KEY) {
    console.error('ERROR: OPENAI_API_KEY is not set in environment variables');
}

// Handle incoming voice calls
app.post('/voice', (req, res) => {
  console.log('Twilio Voice Request:', req.body);
  const twiml = new VoiceResponse();
  
  try {
    // Get WebSocket URL using Amplify domain
    const wsUrl = `wss://${AMPLIFY_DOMAIN}/stream`;
    
    console.log('WebSocket URL:', wsUrl);
    
    // Add longer pause and clearer message
    twiml.say({ voice: 'alice' }, 'Please wait while we connect you.');
    twiml.pause({ length: 3 }); // Longer pause to ensure connection
    
    // Start stream before connecting
    twiml.start().stream({
      name: 'ai_stream',
      url: wsUrl,
      track: 'inbound_track',
      mediaFormat: {
        type: 'audio/x-mulaw',
        rate: '8000'
      }
    });
    
    // Then connect to stream
    twiml.connect().stream({
      name: 'ai_stream',
      url: wsUrl,
      track: 'inbound_track',
      mediaFormat: {
        type: 'audio/x-mulaw',
        rate: '8000'
      }
    });

    console.log('Generated TwiML:', twiml.toString());
    res.type('text/xml');
    res.send(twiml.toString());
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error generating TwiML');
  }
});

// Handle WebSocket connections
wss.on('connection', async (ws, req) => {
  console.log('New WebSocket connection');
  
  let openAIWs = null;
  let sessionActive = false;
  let reconnectAttempts = 0;
  const MAX_RECONNECTS = 3;

  // Add ping/pong to keep connection alive
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });
  
  const pingInterval = setInterval(() => {
    if (ws.isAlive === false) {
      console.log('Connection dead, terminating');
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  }, 5000);

  const connectToOpenAI = async () => {
    try {
      // Create OpenAI session
      const openAISession = await getRealtimeSession();
      console.log('OpenAI session created');
      
      // Connect to OpenAI WebSocket
      openAIWs = new WebSocket('wss://realtime.openai.com/v1/audio', {
        headers: {
          'Authorization': `Bearer ${openAISession.client_secret.value}`
        }
      });

      openAIWs.on('open', () => {
        console.log('Connected to OpenAI');
        sessionActive = true;
        
        // Send initial configuration
        openAIWs.send(JSON.stringify({
          type: 'session.update',
          session: {
            input_audio_format: 'pcm16',
            output_audio_format: 'pcm16',
            turn_detection: {
              type: 'server_vad',
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 500,
              create_response: true
            }
          }
        }));
      });

      openAIWs.on('error', async (error) => {
        console.error('OpenAI WebSocket error:', error);
        sessionActive = false;
        
        if (reconnectAttempts < MAX_RECONNECTS) {
          reconnectAttempts++;
          console.log(`Attempting to reconnect (${reconnectAttempts}/${MAX_RECONNECTS})`);
          await connectToOpenAI();
        }
      });

      return openAIWs;
    } catch (error) {
      console.error('Error connecting to OpenAI:', error);
      throw error;
    }
  };

  try {
    await connectToOpenAI();

    // Handle incoming audio with buffering
    let audioBuffer = Buffer.alloc(0);
    
    ws.on('message', async (data) => {
      if (!sessionActive) {
        console.log('Buffering audio while waiting for OpenAI connection...');
        audioBuffer = Buffer.concat([audioBuffer, data]);
        return;
      }

      try {
        // Send buffered audio first
        if (audioBuffer.length > 0) {
          const bufferedPcm = g711.ulaw.decode(audioBuffer);
          openAIWs.send(JSON.stringify({
            type: 'input_audio_buffer.append',
            audio: Buffer.from(bufferedPcm).toString('base64')
          }));
          audioBuffer = Buffer.alloc(0);
        }

        // Send current audio
        const pcm16Audio = g711.ulaw.decode(data);
        if (openAIWs.readyState === WebSocket.OPEN) {
          openAIWs.send(JSON.stringify({
            type: 'input_audio_buffer.append',
            audio: Buffer.from(pcm16Audio).toString('base64')
          }));
        }
      } catch (error) {
        console.error('Error processing audio:', error);
      }
    });

    // Handle OpenAI responses
    openAIWs.on('message', (data) => {
      try {
        const response = JSON.parse(data);
        console.log('OpenAI response type:', response.type);
        
        if (response.type === 'response.audio.delta') {
          const audioData = Buffer.from(response.delta, 'base64');
          const mulawAudio = g711.ulaw.encode(audioData);
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(mulawAudio);
          }
        }
      } catch (error) {
        console.error('Error handling OpenAI response:', error);
      }
    });

    // Clean up on close
    ws.on('close', () => {
      console.log('Twilio WebSocket closed');
      clearInterval(pingInterval);
      if (openAIWs) {
        openAIWs.close();
      }
    });

  } catch (error) {
    console.error('Error in setup:', error);
    ws.close();
  }
});

// Get OpenAI session
async function getRealtimeSession() {
  try {
    const response = await axios.post('https://api.openai.com/v1/realtime/sessions', {
      model: "gpt-4o-realtime-preview-2024-12-17",
      modalities: ["audio", "text"],
      voice: "alloy",
      instructions: "You are a helpful assistant.",
      input_audio_format: "pcm16",
      output_audio_format: "pcm16"
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Add this after your other routes
app.post('/callback', async (req, res) => {
  const { phoneNumber } = req.body;
  console.log('Callback request for:', phoneNumber);
  
  try {
    const twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    
    const call = await twilioClient.calls.create({
      url: `${process.env.BASE_URL}/voice`,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
      statusCallback: `${process.env.BASE_URL}/call-status`,
      statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
      statusCallbackMethod: 'POST'
    });
    
    console.log('Call initiated:', call.sid);
    res.json({ success: true, callSid: call.sid });
  } catch (error) {
    console.error('Error making call:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add status callback endpoint
app.post('/call-status', (req, res) => {
  console.log('Call status update:', req.body);
  res.sendStatus(200);
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Internal Server Error');
});

// Add this route to server.js
app.post('/create-session', async (req, res) => {
    try {
        // Set JSON content type
        res.setHeader('Content-Type', 'application/json');
        
        const settings = req.body;
        console.log('Creating session with settings:', settings);

        const response = await axios.post('https://api.openai.com/v1/realtime/sessions', {
            model: settings.model || 'gpt-4o-realtime-preview-2024-12-17',
            modalities: ["audio", "text"],
            voice: settings.voice || 'alloy',
            instructions: settings.instructions || "You are a helpful assistant.",
            turn_detection: {
                type: 'server_vad',
                threshold: 0.5,
                prefix_padding_ms: 300,
                silence_duration_ms: 500,
                create_response: true
            },
            input_audio_format: "pcm16",
            output_audio_format: "pcm16"
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
                'OpenAI-Beta': 'realtime=v1'
            }
        });

        res.json(response.data);
    } catch (error) {
        // Ensure error response is also JSON
        res.status(500).json({ 
            error: true,
            message: error.message,
            details: error.response?.data || error.message
        });
    }
});

// Add this route
app.get('/test', (req, res) => {
    res.json({ status: 'ok' });
});

// Add this temporary debug route
app.get('/debug', (req, res) => {
    const fs = require('fs');
    const path = require('path');
    
    const files = {
        'public/js/client.js': fs.existsSync(path.join(__dirname, 'public/js/client.js')),
        'public/index.html': fs.existsSync(path.join(__dirname, 'public/index.html'))
    };
    
    res.json({
        currentDir: __dirname,
        files,
        staticPaths: app._router.stack
            .filter(r => r.name === 'serveStatic')
            .map(r => r.regexp.toString())
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: true,
        message: 'Internal server error',
        details: err.message
    });
});

// Chat endpoint
app.post('/chat', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        
        const { message } = req.body;
        console.log('Chat endpoint hit. Message:', message);
        console.log('OpenAI Key available:', !!process.env.OPENAI_API_KEY);

        if (!message) {
            throw new Error('No message provided');
        }

        console.log('Sending request to OpenAI...');
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4-turbo-preview',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('OpenAI response received:', {
            status: response.status,
            message: response.data.choices[0].message.content.substring(0, 50) + '...'
        });

        res.json({
            message: response.data.choices[0].message.content
        });
    } catch (error) {
        console.error('Chat error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        res.status(500).json({
            error: true,
            message: 'Failed to get response',
            details: error.response?.data || error.message
        });
    }
});

// Handle 404s
app.use((req, res) => {
    res.status(404).json({
        error: true,
        message: 'Not found',
        details: 'The requested endpoint was not found'
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 