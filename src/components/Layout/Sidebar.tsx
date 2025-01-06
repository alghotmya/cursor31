import { useState } from 'react';
import { Assistant } from '@/types';
import AssistantCreator from '@/components/Assistant/AssistantCreator';
import AssistantSettings from '@/components/Assistant/AssistantSettings';

interface SidebarProps {
  activeAssistant: Assistant | null;
  onAssistantChange: (assistant: Assistant) => void;
}

export default function Sidebar({ activeAssistant, onAssistantChange }: SidebarProps) {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="p-4">
      <button
        onClick={() => setIsCreating(true)}
        className="w-full bg-blue-500 text-white rounded-md py-2 mb-4"
      >
        Create New Assistant
      </button>

      {isCreating && (
        <AssistantCreator
          onClose={() => setIsCreating(false)}
          onCreated={(assistant) => {
            onAssistantChange(assistant);
            setIsCreating(false);
          }}
        />
      )}

      {activeAssistant && (
        <AssistantSettings
          assistant={activeAssistant}
          onUpdate={onAssistantChange}
        />
      )}
    </div>
  );
} 