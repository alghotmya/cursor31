'use client';

import { useEffect, useState } from 'react';
import { RealtimeChat } from '@/components/RealtimeChat';
import ChatInterface from '@/components/Chat/ChatInterface';
import { TwilioInterface } from '@/components/TwilioInterface';

export default function Home() {
  const [sessionToken, setSessionToken] = useState<string>('');
  const [activePanel, setActivePanel] = useState<'chat' | 'realtime' | 'twilio'>('realtime');

  useEffect(() => {
    fetch('/api/realtime-session')
      .then(res => res.json())
      .then(data => {
        setSessionToken(data.client_secret.value);
      });
  }, []);

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'realtime':
        return sessionToken ? (
          <RealtimeChat sessionToken={sessionToken} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Loading realtime chat...</p>
          </div>
        );
      case 'chat':
        return <ChatInterface sessionToken={sessionToken} />;
      case 'twilio':
        return <TwilioInterface sessionToken={sessionToken} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8">
            <span className="text-xl font-semibold">PLAYGROUND</span>
          </div>
          
          <nav className="space-y-1">
            {['chat', 'realtime', 'twilio'].map((panel) => (
              <button
                key={panel}
                className={`w-full text-left px-4 py-2 rounded ${
                  activePanel === panel ? 'bg-gray-700' : 'hover:bg-gray-800'
                }`}
                onClick={() => setActivePanel(panel as any)}
              >
                {panel.charAt(0).toUpperCase() + panel.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {renderActivePanel()}
      </div>
    </div>
  );
}
