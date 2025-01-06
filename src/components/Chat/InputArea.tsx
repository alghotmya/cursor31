import { useState } from 'react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
  disabled: boolean;
}

export default function InputArea({ onSendMessage, isProcessing, disabled }: InputAreaProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isProcessing || disabled}
        placeholder={disabled ? 'Select an assistant to start chatting' : 'Type a message...'}
        className="flex-1 p-2 border rounded"
      />
      <button
        type="submit"
        disabled={!input.trim() || isProcessing || disabled}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Send
      </button>
    </form>
  );
} 