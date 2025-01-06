import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Stream webhook received:', data);

    // Forward the stream data to OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/audio/realtime', {
      method: 'POST',
      headers: {
        'Authorization': request.headers.get('Authorization') || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return NextResponse.json(await openaiResponse.json());
  } catch (error) {
    console.error('Error in stream webhook:', error);
    return NextResponse.json({ error: 'Stream webhook failed' }, { status: 500 });
  }
} 