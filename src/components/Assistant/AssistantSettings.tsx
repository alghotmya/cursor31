import { useState } from 'react';
import { Assistant } from '@/types';
import { updateAssistant } from '@/services/openai';
import OpenAI from 'openai';

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API Key');
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you should use API routes
});

export default function AssistantSettings({
  assistant,
  onUpdate
}: {
  assistant: Assistant;
  onUpdate: (assistant: Assistant) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(assistant);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await updateAssistant(assistant.id, formData);
      onUpdate(updated as Assistant);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating assistant:', error);
    }
  };

  if (!isEditing) {
    return (
      <div className="p-4 border rounded">
        <h3 className="font-bold mb-2">{assistant.name}</h3>
        <p className="text-sm mb-4">{assistant.instructions}</p>
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-500"
        >
          Edit Settings
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Instructions</label>
        <textarea
          value={formData.instructions}
          onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
          className="w-full border rounded p-2"
          rows={4}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Temperature</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={formData.temperature || 0.7}
          onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
          className="w-full"
        />
        <span>{formData.temperature}</span>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
} 