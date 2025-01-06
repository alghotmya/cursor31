let mediaRecorder;
let websocket;
let audioContext;
let micStream;
let isSessionActive = false;
const DEBUG = true;

function debugLog(...args) {
    if (DEBUG) {
        console.log(new Date().toISOString(), ...args);
    }
}

function logWebSocketState(ws) {
    const states = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
    console.log('WebSocket state:', states[ws.readyState]);
}

function logAudioData(data, type) {
    console.log(`${type} size:`, data.length, 'bytes');
    console.log(`${type} first few bytes:`, new Uint8Array(data.slice(0, 10)));
}

async function connectToOpenAI(sessionData) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket('wss://realtime.openai.com/v1/audio');
        
        const setupTimeout = setTimeout(() => {
            ws.close();
            reject(new Error('Connection timeout'));
        }, 10000);

        ws.onopen = () => {
            clearTimeout(setupTimeout);
            console.log('WebSocket connected, authenticating...');
            
            // Send authentication immediately
            ws.send(JSON.stringify({
                type: 'authentication',
                token: sessionData.client_secret.value
            }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Setup message:', data.type);

            if (data.type === 'authentication.ok') {
                resolve(ws);
            } else if (data.type === 'error') {
                reject(new Error(data.message));
            }
        };

        ws.onerror = (error) => {
            clearTimeout(setupTimeout);
            reject(error);
        };
    });
}

async function initializeWebSocket(settings) {
    try {
        // Get microphone access first
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                sampleRate: 16000,
                channelCount: 1
            }
        });

        // Create session
        const sessionResponse = await fetch('/create-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
        });

        if (!sessionResponse.ok) {
            throw new Error('Failed to create session');
        }

        const sessionData = await sessionResponse.json();
        console.log('Session created:', sessionData);

        // Connect and authenticate WebSocket
        websocket = await connectToOpenAI(sessionData);
        console.log('WebSocket authenticated');

        // Configure session
        websocket.send(JSON.stringify({
            type: 'session.configure',
            data: {
                session_id: sessionData.id,
                input_audio_format: 'pcm16',
                output_audio_format: 'pcm16',
                voice: sessionData.voice,
                model: sessionData.model,
                turn_detection: sessionData.turn_detection
            }
        }));

        // Set up audio context
        audioContext = new AudioContext({ sampleRate: 16000 });
        micStream = audioContext.createMediaStreamSource(stream);

        // Start recording
        startRecording(stream);
        
        // Update UI
        document.getElementById('conversation-display').textContent = 'Connected! Start speaking...';
        isSessionActive = true;

        // Handle incoming messages
        websocket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Received:', data.type);

                switch (data.type) {
                    case 'audio.response':
                        const audioData = Buffer.from(data.audio, 'base64');
                        playAudioResponse(audioData);
                        break;
                    case 'text.response':
                        updateConversation('AI', data.text);
                        break;
                    case 'error':
                        console.error('OpenAI error:', data);
                        updateConversation('System', `Error: ${data.message}`);
                        break;
                }
            } catch (error) {
                console.error('Message handling error:', error);
            }
        };

    } catch (error) {
        console.error('Setup error:', error);
        updateConversation('System', `Error: ${error.message}`);
        updateUIState(false);
    }
}

function startRecording(stream) {
    const options = {
        mimeType: 'audio/webm',
        audioBitsPerSecond: 16000
    };
    
    mediaRecorder = new MediaRecorder(stream, options);
    console.log('MediaRecorder started with options:', options);

    mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0 && websocket?.readyState === WebSocket.OPEN) {
            try {
                const arrayBuffer = await event.data.arrayBuffer();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                const pcm16Data = convertToPCM16(audioBuffer);
                
                websocket.send(JSON.stringify({
                    type: 'audio.input',
                    audio: Buffer.from(pcm16Data.buffer).toString('base64'),
                    timestamp: Date.now()
                }));
            } catch (error) {
                console.error('Audio processing error:', error);
            }
        }
    };

    mediaRecorder.start(100); // Send audio every 100ms
}

function stopRecording() {
    if (mediaRecorder?.state === 'recording') {
        mediaRecorder.stop();
    }
    if (websocket?.readyState === WebSocket.OPEN) {
        websocket.close();
    }
    if (micStream) {
        micStream.mediaStream.getTracks().forEach(track => track.stop());
    }
}

function convertToPCM16(audioBuffer) {
    const samples = audioBuffer.getChannelData(0);
    const pcm16 = new Int16Array(samples.length);
    
    for (let i = 0; i < samples.length; i++) {
        const s = Math.max(-1, Math.min(1, samples[i]));
        pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    
    return pcm16;
}

async function playAudioResponse(audioData) {
    try {
        const audioBuffer = await audioContext.decodeAudioData(audioData.buffer);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start(0);
    } catch (error) {
        console.error('Error playing audio:', error);
    }
}

function updateConversation(speaker, text) {
    const display = document.getElementById('conversation-display');
    const message = document.createElement('div');
    message.className = `message ${speaker.toLowerCase()}`;
    message.innerHTML = `<strong>${speaker}:</strong> ${text}`;
    display.appendChild(message);
    display.scrollTop = display.scrollHeight;
}

function updateUIState(isActive) {
    const button = document.getElementById('start-session');
    button.textContent = isActive ? 'Stop session' : 'Start session';
    button.disabled = false;
}

// Export functions for use in HTML
window.initializeWebSocket = initializeWebSocket;
window.stopRecording = stopRecording; 