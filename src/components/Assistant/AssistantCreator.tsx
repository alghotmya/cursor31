import { useState } from 'react';
import { Assistant } from '@/types';
import { createAssistant } from '@/services/openai';

export default function AssistantCreator({
  onClose,
  onCreated
}: {
  onClose: () => void;
  onCreated: (assistant: Assistant) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    instructions: '',
    model: 'gpt-4',
    temperature: 0.7,
    tools: [{ type: 'code_interpreter' } as const]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const assistant = await createAssistant(formData);
      onCreated(assistant as Assistant);
    } catch (error) {
      console.error('Error creating assistant:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Assistant</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Instructions</label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="w-full border rounded p-2"
              rows={4}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Temperature</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={formData.temperature}
              onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
              className="w-full"
            />
            <span>{formData.temperature}</span>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 