import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, email, city, newsletter } = data;

    // TODO: In the future, integrate Nodemailer here to send an email to the sales team.
    // TODO: In the future, integrate Database (Prisma/Mongoose) to store this lead.

    // Simulate backend processing time
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Log the data for now
    console.log('--- NEW BROCHURE LEAD ---');
    console.log(`Name: ${name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Email: ${email}`);
    console.log(`City: ${city}`);
    console.log(`Newsletter Opt-In: ${newsletter}`);
    console.log('-------------------------');

    return NextResponse.json({ success: true, message: 'Lead captured successfully' });
  } catch (error) {
    console.error('Error processing brochure form:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
