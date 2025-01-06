import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // For testing only - replace with actual OpenAI realtime session creation
    const mockToken = process.env.OPENAI_API_KEY;

    return NextResponse.json({
      client_secret: {
        value: mockToken
      }
    });
  } catch (error: any) {
    console.error('Error getting session token:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get session token' },
      { status: 500 }
    );
  }
} 