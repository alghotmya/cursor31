import { Message } from '@/types';

export default function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-4 rounded-lg ${
            message.role === 'user' ? 'bg-blue-100 ml-8' : 'bg-gray-100 mr-8'
          }`}
        >
          <div className="font-bold mb-1">
            {message.role === 'user' ? 'You' : 'Assistant'}
          </div>
          <div>{message.content}</div>
        </div>
      ))}
    </div>
  );
} 