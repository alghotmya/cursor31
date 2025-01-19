let isSessionActive = false;
let pc;
let audioEl;
let stream;

// Get settings from the UI
function getSettings() {
    return {
        model: document.getElementById('model-select').value,
        voice: document.getElementById('voice-select').value,
        instructions: document.getElementById('system-instructions').value,
    };
}

async function startSession() {
    const button = document.getElementById('start-session');
    const settings = getSettings();
    console.log('Starting session with settings:', settings);
    
    try {
        button.disabled = true;
        button.textContent = 'Starting...';
        clearConversation();
        
        // Create session settings with turn detection
        const sessionSettings = {
            model: settings.model || 'gpt-4o-realtime-preview-2024-12-17',
            modalities: ["audio", "text"],
            voice: settings.voice || 'alloy',
            instructions: settings.instructions,
            turn_detection: {
                type: document.querySelector('input[name="turn-detection"]:checked').value === 'voice-activity' ? 'server_vad' : 'disabled',
                threshold: parseFloat(document.getElementById('threshold').value),
                prefix_padding_ms: parseInt(document.getElementById('prefix-padding').value),
                silence_duration_ms: parseInt(document.getElementById('silence-duration').value),
                create_response: true
            }
        };
        console.log('Session settings:', sessionSettings);

        const response = await fetch('/create-session', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(sessionSettings)
        });
        
        let sessionData;
        try {
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned non-JSON response');
            }
            
            sessionData = await response.json();
            if (!response.ok) {
                const errorMessage = sessionData.details?.error?.message || 
                                   sessionData.message || 
                                   'Failed to create session';
                console.error('Session creation failed:', sessionData);
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Response error:', error);
            if (response.status === 404) {
                throw new Error('API endpoint not found. Check server configuration.');
            }
            throw new Error('Failed to parse session response: ' + error.message);
        }

        console.log('Session created:', sessionData);

        // Create WebRTC peer connection
        pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        // Set up audio playback
        audioEl = document.createElement('audio');
        audioEl.autoplay = true;
        document.body.appendChild(audioEl);

        // Handle remote tracks
        pc.ontrack = e => {
            console.log('Received remote track', e.streams[0]);
            audioEl.srcObject = e.streams[0];
        };

        // Add local audio track
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    sampleRate: 16000,
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true
                }
            });
            stream.getTracks().forEach(track => pc.addTrack(track, stream));
        } catch (error) {
            throw new Error('Failed to access microphone: ' + error.message);
        }

        // Set up data channel
        const dc = pc.createDataChannel('events', { ordered: true });
        
        dc.onopen = () => {
            console.log('Data channel opened');
        };
        
        dc.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Received:', data);

                switch (data.type) {
                    case 'transcript.partial':
                        // Show partial transcription while speaking
                        updateTranscription(data.text, true);
                        break;
                    case 'transcript.final':
                        // Show final transcription
                        updateTranscription(data.text, false);
                        // Remove the partial transcript div after final
                        const partialDiv = document.querySelector('.partial-transcript');
                        if (partialDiv) {
                            partialDiv.remove();
                        }
                        break;
                    case 'response.text.start':
                        // Start a new AI response
                        updateConversation('Assistant', '');
                        break;
                    case 'response.text.delta':
                        // Append to the current AI response
                        appendToLastMessage(data.delta);
                        break;
                    case 'error':
                        console.error('OpenAI error:', data);
                        updateConversation('System', `Error: ${data.message}`);
                        break;
                }
            } catch (error) {
                console.error('Failed to parse message:', error);
            }
        };

        // Log connection state changes
        pc.onconnectionstatechange = () => {
            const state = pc.connectionState;
            console.log('Connection state:', state);
            
            switch (state) {
                case 'connected':
                    button.textContent = 'Stop session';
                    button.disabled = false;
                    isSessionActive = true;
                    updateConversation('System', 'Connected! Start speaking...');
                    break;
                case 'failed':
                case 'closed':
                    stopSession();
                    updateConversation('System', `Connection ${state}`);
                    break;
                default:
                    updateConversation('System', `Connection state: ${state}`);
                    console.log('Connection state changed to:', state);
            }
        };

        // Add error handlers
        pc.onerror = (error) => {
            console.error('PeerConnection error:', error);
            updateConversation('System', `Connection error: ${error.message}`);
        };

        pc.oniceconnectionstatechange = () => {
            console.log('ICE connection state:', pc.iceConnectionState);
            if (pc.iceConnectionState === 'failed') {
                updateConversation('System', 'ICE connection failed. Please check your network connection.');
            }
        };

        // Create and send offer
        console.log('Creating offer...');
        const offer = await pc.createOffer({
            offerToReceiveAudio: true
        });
        await pc.setLocalDescription(offer);

        // Wait for ICE gathering
        console.log('Waiting for ICE candidates...');
        await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => reject(new Error('ICE gathering timed out')), 10000);
            
            if (pc.iceGatheringState === 'complete') {
                clearTimeout(timeout);
                resolve();
            } else {
                pc.onicecandidate = e => {
                    console.log('ICE candidate:', e.candidate);
                    if (!e.candidate) {
                        clearTimeout(timeout);
                        resolve();
                    }
                };
            }
        });

        console.log('ICE gathering complete, sending offer to OpenAI...');
        try {
            const sdpResponse = await fetch(`https://api.openai.com/v1/realtime?model=${settings.model}`, {
                method: 'POST',
                body: pc.localDescription.sdp,
                headers: {
                    'Authorization': `Bearer ${sessionData.client_secret.value}`,
                    'Content-Type': 'application/sdp',
                    'OpenAI-Beta': 'realtime=v1'
                }
            });

            if (!sdpResponse.ok) {
                const errorText = await sdpResponse.text();
                console.error('OpenAI SDP response error:', errorText);
                throw new Error('Failed to connect to OpenAI: ' + await sdpResponse.text());
            }

            const answerSdp = await sdpResponse.text();
            console.log('Received answer from OpenAI, setting remote description...');

            await pc.setRemoteDescription({
                type: 'answer',
                sdp: answerSdp
            });

            console.log('Remote description set, connection setup complete');
        } catch (error) {
            console.error('Error during SDP exchange:', error);
            throw new Error('Failed to establish connection: ' + error.message);
        }

    } catch (error) {
        console.error('Session error:', error);
        button.textContent = 'Start session';
        button.disabled = false;
        updateConversation('System', `Error: ${error.message}`);
        
        // Clean up on error
        if (pc) pc.close();
        if (audioEl) audioEl.remove();
        if (stream) stream.getTracks().forEach(track => track.stop());
    }
}

function stopSession() {
    if (pc) {
        pc.close();
    }
    if (audioEl) {
        audioEl.remove();
    }
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    
    isSessionActive = false;
    const button = document.getElementById('start-session');
    button.textContent = 'Start session';
    button.disabled = false;
    clearConversation();
    updateConversation('System', 'Session ended');
}

function updateConversation(speaker, text) {
    const display = document.getElementById('conversation-display');
    
    // Don't add empty messages
    if (!text && speaker !== 'Assistant') return;
    
    const message = document.createElement('div');
    message.className = `message ${speaker === 'Assistant' ? 'ai' : speaker.toLowerCase()}`;
    
    // Format based on speaker
    if (speaker === 'System') {
        message.textContent = text;
    } else {
        message.innerHTML = `
            <strong>${speaker}:</strong>
            <span class="message-content">${text}</span>
        `;
    }
    
    display.appendChild(message);
    
    // Smooth scroll to bottom
    display.scrollTo({
        top: display.scrollHeight,
        behavior: 'smooth'
    });
}

// Clear conversation display
function clearConversation() {
    const display = document.getElementById('conversation-display');
    display.innerHTML = '';
}

// Add these functions for chat handling
async function sendChatMessage() {
    const input = document.getElementById('system-instructions');
    const message = input.value.trim();
    
    if (!message) return;
    
    try {
        console.log('Sending message:', message);
        // Add user message to chat
        addChatMessage('You', message);
        input.value = '';

        // Send message to chat endpoint
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                message: message
            })
        });

        console.log('Response status:', response.status);
        let responseText;
        try {
            responseText = await response.text();
            console.log('Raw response:', responseText);
        } catch (e) {
            console.error('Error reading response:', e);
            throw new Error('Failed to read response');
        }

        if (!response.ok) {
            console.error('Error response:', responseText);
            throw new Error(`Server error: ${response.status}`);
        }

        // Parse JSON response
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            throw new Error('Invalid JSON response');
        }

        console.log('AI response:', data);
        if (data.message) {
            addChatMessage('AI', data.message);
        } else {
            console.error('No message in response:', data);
            throw new Error('No message in response');
        }

        // Auto-scroll to bottom
        const chatContainer = document.getElementById('chat-messages');
        chatContainer.scrollTop = chatContainer.scrollHeight;

    } catch (error) {
        console.error('Error sending message:', error);
        addChatMessage('System', `Error: ${error.message}`);
    }
}

function addChatMessage(sender, text) {
    const chatContainer = document.getElementById('conversation-display');
    console.log('Adding message from:', sender, text);
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + sender.toLowerCase();
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatContainer.appendChild(messageDiv);
    
    // Auto-scroll
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Add event listener for Enter key in chat input
document.getElementById('system-instructions')?.addEventListener('keypress', async function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const button = document.querySelector('.send-button');
        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = 'Sending...';
        
        try {
            await sendChatMessage();
        } finally {
            button.disabled = false;
            button.textContent = originalText;
        }
    }
});

// Export chat functions
window.sendChatMessage = sendChatMessage;

// Export only the functions we need
window.startSession = startSession;
window.stopSession = stopSession;
window.getSettings = getSettings;
window.clearConversation = clearConversation;

// Add function to handle transcriptions
function updateTranscription(text, isPartial = false) {
    const display = document.getElementById('conversation-display');
    let transcriptDiv = display.querySelector('.partial-transcript');
    
    if (!transcriptDiv) {
        transcriptDiv = document.createElement('div');
        transcriptDiv.className = 'message you partial-transcript';
        display.appendChild(transcriptDiv);
    }
    
    if (isPartial) {
        transcriptDiv.innerHTML = `<strong>You:</strong> <i>${text}</i>`;
    } else {
        transcriptDiv.innerHTML = `<strong>You:</strong> ${text}`;
        transcriptDiv.classList.remove('partial-transcript');
    }
    
    display.scrollTo({
        top: display.scrollHeight,
        behavior: 'smooth'
    });
}

// Function to append text to the last message
function appendToLastMessage(text) {
    const display = document.getElementById('conversation-display');
    const lastMessage = display.lastElementChild;
    if (lastMessage && lastMessage.classList.contains('ai')) {
        const content = lastMessage.querySelector('.message-content');
        if (content) {
            content.textContent += text;
        }
    }
} 