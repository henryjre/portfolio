import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 5000;
const MINUTE_WINDOW_MS = 60_000;
const HOUR_WINDOW_MS = 60 * 60_000;
const MAX_PER_MINUTE = 3;
const MAX_PER_HOUR = 10;

const hits = new Map<string, number[]>();

function checkRateLimit(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < HOUR_WINDOW_MS);
  const lastMinute = recent.filter((t) => now - t < MINUTE_WINDOW_MS);

  if (lastMinute.length >= MAX_PER_MINUTE) {
    const retryAfter = Math.ceil((MINUTE_WINDOW_MS - (now - lastMinute[0])) / 1000);
    hits.set(ip, recent);
    return {
      allowed: false,
      retryAfter,
      message: 'Too many messages. Try again in a minute.',
    };
  }

  if (recent.length >= MAX_PER_HOUR) {
    const retryAfter = Math.ceil((HOUR_WINDOW_MS - (now - recent[0])) / 1000);
    hits.set(ip, recent);
    return {
      allowed: false,
      retryAfter,
      message: 'Message limit reached. Try again later.',
    };
  }

  recent.push(now);
  hits.set(ip, recent);
  return { allowed: true };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '"' ? '&quot;' : '&#39;'
  );
}

function renderContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const submittedAt = new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(new Date());
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    `Re: Portfolio contact from ${name}`
  )}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Portfolio Contact</title>
  </head>
  <body style="margin:0;background:#0a0a0a;color:#ededed;font-family:Inter,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;border:1px solid #1f1f1f;background:#0a0a0a;">
            <tr>
              <td style="padding:18px 22px;border-bottom:1px solid #1f1f1f;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-family:'JetBrains Mono','Courier New',monospace;font-size:12px;letter-spacing:.08em;font-weight:700;color:#ededed;">
                      HENRY.PINEDA<span style="color:#ff4a1c;">/</span>JR
                    </td>
                    <td align="right" style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;letter-spacing:.18em;color:#7a7a7a;text-transform:uppercase;">
                      / CONTACT
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 22px 8px;">
                <div style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;letter-spacing:.18em;color:#7a7a7a;text-transform:uppercase;margin-bottom:10px;">
                  / TRANSMISSION RECEIVED
                </div>
                <h1 style="margin:0;font-family:'JetBrains Mono','Courier New',monospace;font-size:34px;line-height:.95;letter-spacing:-.02em;text-transform:uppercase;color:#ededed;">
                  NEW MESSAGE<span style="color:#ff4a1c;">.</span>
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:22px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #1f1f1f;">
                  <tr>
                    <td width="112" style="padding:12px 0;border-bottom:1px solid #1f1f1f;font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;letter-spacing:.18em;color:#7a7a7a;text-transform:uppercase;">Name</td>
                    <td style="padding:12px 0;border-bottom:1px solid #1f1f1f;font-family:'JetBrains Mono','Courier New',monospace;font-size:13px;color:#ededed;text-transform:uppercase;">${safeName}</td>
                  </tr>
                  <tr>
                    <td width="112" style="padding:12px 0;border-bottom:1px solid #1f1f1f;font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;letter-spacing:.18em;color:#7a7a7a;text-transform:uppercase;">Email</td>
                    <td style="padding:12px 0;border-bottom:1px solid #1f1f1f;font-family:'JetBrains Mono','Courier New',monospace;font-size:13px;color:#ededed;"><a href="mailto:${safeEmail}" style="color:#ff4a1c;text-decoration:none;">${safeEmail}</a></td>
                  </tr>
                  <tr>
                    <td width="112" style="padding:12px 0;border-bottom:1px solid #1f1f1f;font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;letter-spacing:.18em;color:#7a7a7a;text-transform:uppercase;">PHT</td>
                    <td style="padding:12px 0;border-bottom:1px solid #1f1f1f;font-family:'JetBrains Mono','Courier New',monospace;font-size:13px;color:#ededed;">${submittedAt}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 22px 28px;">
                <div style="border-left:2px solid #ff4a1c;padding-left:16px;">
                  <div style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;letter-spacing:.18em;color:#7a7a7a;text-transform:uppercase;margin-bottom:10px;">
                    / MESSAGE
                  </div>
                  <div style="white-space:pre-wrap;font-size:15px;line-height:1.65;color:#ededed;">${safeMessage}</div>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:0 22px 28px;">
                <a href="${replyHref}" style="display:inline-block;border:1px solid #ff4a1c;color:#ff4a1c;text-decoration:none;font-family:'JetBrains Mono','Courier New',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;padding:13px 18px;">
                  Reply →
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding:14px 22px;border-top:1px solid #1f1f1f;font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;letter-spacing:.18em;color:#7a7a7a;text-transform:uppercase;">
                Routed through /api/contact
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: rateLimit.message },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfter) },
      }
    );
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

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: cleanEmail,
    subject: `Portfolio contact from ${cleanName}`,
    text: `From: ${cleanName} <${cleanEmail}>\n\n${cleanMessage}`,
    html: renderContactEmail({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    }),
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
