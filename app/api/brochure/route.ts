import { NextResponse } from 'next/server';
import { getApiBaseUrl } from '@/lib/api';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, email, city, newsletter } = data;

    // Forward to backend API
    const backendData = {
      name,
      email,
      phone,
      inquiryType: 'Brochure Download',
      message: `City: ${city}\nNewsletter Opt-In: ${newsletter}`,
    };

    const backendResponse = await fetch(`${getApiBaseUrl()}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(backendData),
    });

    if (!backendResponse.ok) {
      throw new Error('Backend failed to process lead');
    }

    return NextResponse.json({ success: true, message: 'Lead captured successfully' });
  } catch (error) {
    console.error('Error processing brochure form:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
