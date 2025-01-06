import { ReactNode } from 'react';

interface SplitScreenProps {
  sidebar: ReactNode;
  content: ReactNode;
}

export default function SplitScreen({ sidebar, content }: SplitScreenProps) {
  return (
    <div className="flex h-full">
      <div className="w-80 border-r">
        {sidebar}
      </div>
      <div className="flex-1">
        {content}
      </div>
    </div>
  );
} 