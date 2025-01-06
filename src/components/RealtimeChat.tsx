import React, { useEffect, useRef, useState } from 'react';

interface RealtimeChatProps {
  sessionToken: string;
}

export const RealtimeChat: React.FC<RealtimeChatProps> = ({ sessionToken }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startSession = async () => {
    try {
      const pc = new RTCPeerConnection();
      peerConnection.current = pc;
      
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      pc.ontrack = e => audioEl.srcObject = e.streams[0];
      audioRef.current = audioEl;

      await navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          pc.addTrack(stream.getTracks()[0]);
        });

      await setupWebRTC(pc, sessionToken);
      setIsSessionActive(true);
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const endSession = () => {
    peerConnection.current?.close();
    if (audioRef.current) {
      audioRef.current.srcObject = null;
    }
    setIsSessionActive(false);
    setMessages(prev => [...prev, { role: 'system', content: 'SESSION ENDED' }]);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl">Realtime</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setMessages([])}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
          >
            Clear
          </button>
          {!isSessionActive ? (
            <button
              onClick={startSession}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Start session
            </button>
          ) : (
            <button
              onClick={endSession}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              End session
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Type your message..."
              disabled={!isSessionActive}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Settings Panel */}
        <div className="w-64 border-l p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Voice
            </label>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="alloy">Alloy</option>
              <option value="echo">Echo</option>
              <option value="fable">Fable</option>
              <option value="onyx">Onyx</option>
              <option value="nova">Nova</option>
              <option value="shimmer">Shimmer</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

async function setupWebRTC(pc: RTCPeerConnection, sessionToken: string) {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  const response = await fetch(`https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17`, {
    method: "POST",
    body: offer.sdp,
    headers: {
      Authorization: `Bearer ${sessionToken}`,
      "Content-Type": "application/sdp"
    },
  });

  const answer = {
    type: 'answer' as const,
    sdp: await response.text()
  };
  
  await pc.setRemoteDescription(answer);
} 