import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const callStatus = data.get('CallStatus');
    const callSid = data.get('CallSid');

    console.log(`Call ${callSid} status: ${callStatus}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in status callback:', error);
    return NextResponse.json({ error: 'Status callback failed' }, { status: 500 });
  }
} 