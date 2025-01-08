let isSessionActive = false;
let pc;
let audioEl;
let stream;

// Get settings from the UI
function getSettings() {
    return {
        model: document.getElementById('model-select').value,
        voice: document.getElementById('voice-select').value,
        systemInstructions: document.getElementById('system-instructions').value,
        turnDetection: {
            type: document.querySelector('input[name="turn-detection"]:checked').value,
            threshold: parseFloat(document.getElementById('threshold').value),
            prefixPadding: parseInt(document.getElementById('prefix-padding').value),
            silenceDuration: parseInt(document.getElementById('silence-duration').value)
        }
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
        
        // Create session with OpenAI
        console.log('Creating OpenAI session...');
        const response = await fetch('/create-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
        });
        
        let sessionData;
        try {
            sessionData = await response.json();
            if (!response.ok) {
                throw new Error(sessionData.details?.error?.message || 'Failed to create session');
            }
        } catch (error) {
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
            dc.send(JSON.stringify({
                type: 'session.update',
                session: settings
            }));
        };
        
        dc.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Received:', data);

                switch (data.type) {
                    case 'response.text.delta':
                        updateConversation('AI', data.delta);
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
                    document.getElementById('conversation-display').textContent = 'Connected! Start speaking...';
                    break;
                case 'failed':
                case 'closed':
                    stopSession();
                    updateConversation('System', `Connection ${state}`);
                    break;
                default:
                    console.log('Connection state changed to:', state);
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
            const timeout = setTimeout(() => reject(new Error('ICE gathering timed out')), 5000);
            
            if (pc.iceGatheringState === 'complete') {
                clearTimeout(timeout);
                resolve();
            } else {
                pc.onicecandidate = e => {
                    if (!e.candidate) {
                        clearTimeout(timeout);
                        resolve();
                    }
                };
            }
        });

        console.log('ICE gathering complete, sending offer to OpenAI...');
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
    if (!text || text.trim() === '') return;
    
    const message = document.createElement('div');
    message.className = `message ${speaker.toLowerCase()}`;
    
    // Format based on speaker
    if (speaker === 'System') {
        message.textContent = text;
    } else {
        message.innerHTML = `<strong>${speaker}:</strong> ${text}`;
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

// Export only the functions we need
window.startSession = startSession;
window.stopSession = stopSession;
window.getSettings = getSettings;
window.clearConversation = clearConversation; 