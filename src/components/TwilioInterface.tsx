import React, { useState, useEffect } from 'react';

interface TwilioInterfaceProps {
  sessionToken: string;
}

export const TwilioInterface: React.FC<TwilioInterfaceProps> = ({ sessionToken }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [callSid, setCallSid] = useState<string | null>(null);

  const handleCall = async () => {
    if (!phoneNumber.trim()) return;
    
    setCallStatus('calling');
    try {
      const response = await fetch('/api/twilio/call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phoneNumber,
          sessionToken
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate call');
      }

      setCallSid(data.callSid);
      setCallStatus('connected');
    } catch (error: any) {
      console.error('Error:', error);
      alert(`Call failed: ${error.message}`);
      setCallStatus('idle');
    }
  };

  const handleEndCall = async () => {
    if (!callSid) return;

    try {
      await fetch('/api/twilio/end-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ callSid }),
      });
      setCallStatus('ended');
      setCallSid(null);
    } catch (error) {
      console.error('Error ending call:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl">Twilio Voice</h1>
        <div className="text-sm text-gray-500">
          Status: {callStatus.charAt(0).toUpperCase() + callStatus.slice(1)}
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
              className="w-full p-2 border rounded"
              disabled={callStatus !== 'idle'}
            />
          </div>

          {callStatus === 'idle' ? (
            <button
              onClick={handleCall}
              disabled={!phoneNumber.trim()}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              Start Call
            </button>
          ) : (
            <button
              onClick={handleEndCall}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              End Call
            </button>
          )}

          {callStatus !== 'idle' && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>
                  {callStatus === 'calling' ? 'Calling...' : 
                   callStatus === 'connected' ? 'Connected' : 'Call Ended'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 