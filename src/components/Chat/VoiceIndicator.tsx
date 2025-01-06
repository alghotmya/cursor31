export default function VoiceIndicator({ isPlaying }: { isPlaying: boolean }) {
  if (!isPlaying) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-1 h-3 bg-white animate-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <span className="text-sm">Speaking...</span>
    </div>
  );
} 