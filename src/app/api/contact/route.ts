import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 5000;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

const hits = new Map<string, number[]>();

function rateLimit(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return false;
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Try again in a minute.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>;

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return NextResponse.json({ error: 'Missing fields.' }, { status: 400 });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (!cleanName || cleanName.length > MAX_NAME) {
    return NextResponse.json({ error: 'Invalid name.' }, { status: 400 });
  }
  if (!cleanEmail || cleanEmail.length > MAX_EMAIL || !EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
  }
  if (!cleanMessage || cleanMessage.length > MAX_MESSAGE) {
    return NextResponse.json({ error: 'Invalid message.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;

  if (!apiKey || !from || !to) {
    console.error('Contact form: missing RESEND_API_KEY, CONTACT_FROM, or CONTACT_TO env vars.');
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const escape = (s: string) =>
    s.replace(/[&<>"']/g, (c) =>
      c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '"' ? '&quot;' : '&#39;'
    );

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: cleanEmail,
    subject: `Portfolio contact from ${cleanName}`,
    text: `From: ${cleanName} <${cleanEmail}>\n\n${cleanMessage}`,
    html: `<p><strong>From:</strong> ${escape(cleanName)} &lt;${escape(cleanEmail)}&gt;</p><p style="white-space:pre-wrap">${escape(cleanMessage)}</p>`,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
