export interface Assistant {
  id: string;
  name: string;
  description?: string;
  instructions: string;
  model: string;
  tools: Tool[];
  temperature?: number;
  top_p?: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Tool {
  type: 'code_interpreter' | 'retrieval' | 'function';
  function?: {
    name: string;
    description: string;
    parameters: {
      type: string;
      properties: Record<string, unknown>;
      required?: string[];
    };
  };
} 