import React, { useState } from 'react';
import { Device } from 'twilio-client';
import axios from 'axios';

const TwilioVoice = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('Idle');
  const [device, setDevice] = useState(null);

  // Initialize Twilio Device when component mounts
  useEffect(() => {
    initializeTwilioDevice();
  }, []);

  const initializeTwilioDevice = async () => {
    try {
      // Get Twilio token from your backend
      const response = await axios.get('/api/twilio-token');
      const token = response.data.token;
      
      const newDevice = new Device(token);
      setDevice(newDevice);
      
      // Handle incoming/outgoing connections
      newDevice.on('connect', handleConnect);
      newDevice.on('error', handleError);
    } catch (error) {
      console.error('Failed to initialize Twilio:', error);
      setStatus('Error initializing');
    }
  };

  const startCall = async () => {
    try {
      setStatus('Connecting...');
      
      // First, get OpenAI Realtime session
      const openAISession = await axios.post('/api/openai-session');
      
      // Make the call through Twilio
      const call = await device.connect({
        phoneNumber: phoneNumber,
        openAISessionId: openAISession.data.id
      });
      
      setStatus('Connected');
    } catch (error) {
      console.error('Failed to start call:', error);
      setStatus('Call failed');
    }
  };

  return (
    <div className="twilio-voice">
      <h2>Twilio Voice</h2>
      <div className="status">Status: {status}</div>
      
      <div className="input-group">
        <label>Phone Number</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+1234567890"
        />
      </div>

      <button 
        onClick={startCall}
        disabled={!device || status === 'Connected'}
      >
        Start Call
      </button>
    </div>
  );
};

export default TwilioVoice; 