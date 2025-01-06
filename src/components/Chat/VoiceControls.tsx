import { useEffect, useState } from 'react';

export default function VoiceControls({
  isRecording,
  onRecordingChange,
  onTranscript
}: {
  isRecording: boolean;
  onRecordingChange: (isRecording: boolean) => void;
  onTranscript: (transcript: string) => void;
}) {
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');

        if (event.results[0].isFinal) {
          onTranscript(transcript);
          onRecordingChange(false);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error !== 'aborted') {
          console.error('Speech recognition error:', event.error);
          onRecordingChange(false);
        }
      };

      setRecognition(recognition);
    }
  }, [onRecordingChange, onTranscript]);

  const toggleRecording = () => {
    if (recognition) {
      if (isRecording) {
        recognition.stop();
      } else {
        recognition.start();
      }
      onRecordingChange(!isRecording);
    }
  };

  if (!recognition) {
    return null;
  }

  return (
    <button
      onClick={toggleRecording}
      className={`mb-2 px-4 py-2 rounded-lg ${
        isRecording ? 'bg-red-500' : 'bg-gray-500'
      } text-white`}
    >
      {isRecording ? 'Stop Recording' : 'Start Recording'}
    </button>
  );
} 