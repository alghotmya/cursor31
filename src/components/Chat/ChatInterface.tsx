import React, { useState } from 'react';
import { Assistant } from '@/types';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export default function ChatInterface({ sessionToken }: { sessionToken: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState('gpt-4');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({
          model,
          messages: [...messages, newMessage]
        })
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl">Chat</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setMessages([])}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'assistant' ? 'bg-gray-50' : 'bg-white'
              } p-4 rounded-lg`}
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mr-4">
                {message.role === 'assistant' ? 'AI' : 'U'}
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-semibold capitalize">{message.role}</span>
                  {message.timestamp && (
                    <span className="text-gray-400 text-sm ml-2">
                      {message.timestamp}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-gray-700">{message.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Send a message..."
              className="flex-1 p-2 border rounded"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Settings Panel */}
      <div className="w-64 border-l p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
        </div>
      </div>
    </div>
  );
}