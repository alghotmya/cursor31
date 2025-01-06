import { useState, useEffect } from 'react';
import OpenAI from 'openai';

export default function OpenAIConnectionTest() {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const openai = new OpenAI({
          apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
          dangerouslyAllowBrowser: true
        });

        await openai.models.list();
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="fixed top-4 right-4 p-2 rounded-lg text-sm">
      {status === 'testing' && (
        <span className="text-yellow-500">Testing OpenAI connection...</span>
      )}
      {status === 'success' && (
        <span className="text-green-500">OpenAI connection successful!</span>
      )}
      {status === 'error' && (
        <span className="text-red-500">
          OpenAI connection failed: {error}
        </span>
      )}
    </div>
  );
} 