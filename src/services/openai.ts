import OpenAI from 'openai';
import { Assistant, Message } from '@/types';

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API Key');
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function createAssistant(config: Partial<Assistant>) {
  try {
    const assistant = await openai.beta.assistants.create({
      name: config.name,
      instructions: config.instructions,
      tools: (config.tools || []) as any,
      model: config.model || "gpt-4o",
      temperature: config.temperature,
      top_p: config.top_p
    });
    return assistant;
  } catch (error) {
    console.error('Error creating assistant:', error);
    throw error;
  }
}

export async function updateAssistant(assistantId: string, config: Partial<Assistant>) {
  try {
    const assistant = await openai.beta.assistants.update(
      assistantId,
      {
        name: config.name,
        instructions: config.instructions,
        tools: (config.tools || []) as any,
        model: config.model,
        temperature: config.temperature,
        top_p: config.top_p
      }
    );
    return assistant;
  } catch (error) {
    console.error('Error updating assistant:', error);
    throw error;
  }
}

export async function processMessage(assistantId: string, content: string) {
  try {
    const thread = await openai.beta.threads.create();
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: content
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId
    });

    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    
    while (runStatus.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

      if (runStatus.status === 'failed') {
        throw new Error('Run failed');
      }
    }

    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data
      .filter(msg => msg.role === 'assistant')
      .pop();

    if (!lastMessage?.content[0]) return 'No response';
    
    const content_block = lastMessage.content[0];
    if (content_block.type === 'text') {
      return content_block.text.value;
    }
    
    return 'Unsupported response type';
  } catch (error) {
    console.error('Error processing message:', error);
    throw error;
  }
}

// Add text-to-speech function
export async function generateSpeech(text: string) {
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    const blob = new Blob([await mp3.arrayBuffer()], { type: 'audio/mpeg' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error generating speech:', error);
    throw error;
  }
}

type OpenAIVoice = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';

export class VoiceService {
  private static instance: VoiceService;
  private openai: OpenAI;
  private audioContext: AudioContext | null = null;
  private audioQueue: string[] = [];
  private isPlaying: boolean = false;

  private constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
    
    if (typeof window !== 'undefined') {
      this.audioContext = new AudioContext();
    }
  }

  static getInstance(): VoiceService {
    if (!VoiceService.instance) {
      VoiceService.instance = new VoiceService();
    }
    return VoiceService.instance;
  }

  async textToSpeech(text: string, voice: OpenAIVoice = 'alloy'): Promise<void> {
    try {
      const response = await this.openai.audio.speech.create({
        model: "tts-1",
        voice,
        input: text,
      });

      const arrayBuffer = await response.arrayBuffer();
      if (this.audioContext) {
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        source.start(0);
      }
    } catch (error) {
      console.error('Error in text-to-speech:', error);
      throw error;
    }
  }
} 