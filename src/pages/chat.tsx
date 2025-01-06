import { useEffect, useState } from 'react';
import { RealtimeChat } from '@/components/RealtimeChat';
import ChatInterface from '@/components/Chat/ChatInterface';
import { TwilioInterface } from '@/components/TwilioInterface';

export default function ChatPage() {
  const [sessionToken, setSessionToken] = useState<string>('');
  const [activePanel, setActivePanel] = useState<'chat' | 'realtime' | 'twilio'>('realtime');

  useEffect(() => {
    fetch('/api/realtime-session')
      .then(res => res.json())
      .then(data => {
        setSessionToken(data.client_secret.value);
      });
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-semibold">PLAYGROUND</span>
          </div>
          
          <nav className="space-y-1">
            <button
              className={`w-full text-left px-4 py-2 rounded flex items-center space-x-3 ${
                activePanel === 'chat' ? 'bg-gray-700' : 'hover:bg-gray-800'
              }`}
              onClick={() => setActivePanel('chat')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
              </svg>
              <span>Chat</span>
            </button>
            
            <button
              className={`w-full text-left px-4 py-2 rounded flex items-center space-x-3 ${
                activePanel === 'realtime' ? 'bg-gray-700' : 'hover:bg-gray-800'
              }`}
              onClick={() => setActivePanel('realtime')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-11V3"/>
              </svg>
              <span>Realtime</span>
            </button>
            
            <button
              className={`w-full text-left px-4 py-2 rounded flex items-center space-x-3 ${
                activePanel === 'twilio' ? 'bg-gray-700' : 'hover:bg-gray-800'
              }`}
              onClick={() => setActivePanel('twilio')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>Twilio</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {activePanel === 'realtime' && (
          sessionToken ? (
            <RealtimeChat sessionToken={sessionToken} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>Loading realtime chat...</p>
            </div>
          )
        )}
        {activePanel === 'chat' && <ChatInterface sessionToken={sessionToken} />}
        {activePanel === 'twilio' && <TwilioInterface sessionToken={sessionToken} />}
      </div>
    </div>
  );
} 