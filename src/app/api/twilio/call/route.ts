import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER as string;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

if (!accountSid || !authToken || !phoneNumber || !baseUrl) {
  throw new Error('Missing required environment variables');
}

const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  try {
    const { phoneNumber: toNumber, sessionToken } = await request.json();

    if (!toNumber || !sessionToken) {
      throw new Error('Missing phone number or session token');
    }

    // Create TwiML for the call
    const twiml = new twilio.twiml.VoiceResponse();

    // Start with media settings
    twiml.start().stream({
      name: 'openai_stream',
      url: 'wss://api.openai.com/v1/audio/realtime',
      track: 'both_tracks'
    });
    
    // Add a welcome message
    twiml.say({
      voice: 'alice',
      language: 'en-US'
    }, 'Connected to AI assistant. You can start speaking now.');

    // Connect to OpenAI's realtime API
    twiml.connect().stream({
      url: `wss://api.openai.com/v1/audio/realtime?model=gpt-4o-realtime-preview-2024-12-17&auth_token=${encodeURIComponent(sessionToken)}`,
      track: 'both_tracks',
      name: 'openai_stream'
    });

    // Keep the connection alive
    twiml.pause({ length: 120 });

    try {
      // Make the call with standard options
      const call = await client.calls.create({
        to: toNumber,
        from: phoneNumber,
        twiml: twiml.toString(),
        statusCallback: `${baseUrl}/api/twilio/status`,
        statusCallbackEvent: ['completed', 'failed', 'answered', 'ringing', 'in-progress'],
        statusCallbackMethod: 'POST',
        record: true
      });

      console.log('Call initiated successfully:', call.sid);
      return NextResponse.json({ callSid: call.sid });
    } catch (twilioError: any) {
      console.error('Twilio error:', {
        code: twilioError.code,
        message: twilioError.message,
        moreInfo: twilioError.moreInfo,
        status: twilioError.status
      });
      throw new Error(`Twilio error: ${twilioError.message}`);
    }
  } catch (error: any) {
    console.error('Error in call route:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initiate call' },
      { status: 500 }
    );
  }
} 