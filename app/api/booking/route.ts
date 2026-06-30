import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Where the consultation request lands, and who it's sent as.
// FROM must be on a domain verified in Resend (use onboarding@resend.dev for testing).
const TO_EMAIL = process.env.BOOKING_TO_EMAIL || 'support@shivnerisystems.com';
const FROM_EMAIL = process.env.BOOKING_FROM_EMAIL || 'Shivneri Website <onboarding@resend.dev>';

const EMAIL_RE = /\S+@\S+\.\S+/;

type BookingPayload = {
  name?: string;
  businessName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  projectDescription?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set — cannot send booking email.');
    return NextResponse.json(
      { error: 'Email service is not configured.' },
      { status: 500 },
    );
  }

  let body: BookingPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = body.name?.trim() ?? '';
  const businessName = body.businessName?.trim() ?? '';
  const jobTitle = body.jobTitle?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const phone = body.phone?.trim() ?? '';
  const projectDescription = body.projectDescription?.trim() ?? '';

  // Server-side validation — never trust the client.
  const missing: string[] = [];
  if (!name) missing.push('name');
  if (!businessName) missing.push('businessName');
  if (!jobTitle) missing.push('jobTitle');
  if (!email) missing.push('email');
  if (!phone) missing.push('phone');
  if (missing.length || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Please fill in all required fields with a valid email.' },
      { status: 422 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const rows: Array<[string, string]> = [
    ['Name', name],
    ['Business', businessName],
    ['Job title', jobTitle],
    ['Email', email],
    ['Phone', phone],
    ['Project', projectDescription || '—'],
  ];

  const html = `
    <div style="font-family:system-ui,Arial,sans-serif;color:#111;line-height:1.6">
      <h2 style="margin:0 0 12px">New consultation request</h2>
      <table style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:6px 16px 6px 0;color:#666;vertical-align:top;white-space:nowrap"><strong>${label}</strong></td>
            <td style="padding:6px 0">${escapeHtml(value).replace(/\n/g, '<br>')}</td>
          </tr>`,
          )
          .join('')}
      </table>
    </div>
  `;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New consultation request — ${name}${businessName ? ` (${businessName})` : ''}`,
      html,
      text,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send your request.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.error('Booking send failed:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
