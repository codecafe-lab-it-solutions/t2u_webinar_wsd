import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { buildConfirmationEmail } from '@/lib/email/confirmation-email';
import type { Locale } from '@/lib/content';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGISTRATION_ID_PATTERN = /^WSD-\d{8}-[A-Z0-9]{6}$/;

// Best-effort in-memory rate limit — resets on server restart, fine for a
// low-traffic landing page. Guards the real support inbox from being used
// as an open mail relay via repeated requests to this route.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const toEmail = typeof body?.toEmail === 'string' ? body.toEmail.trim() : '';
  const toName = typeof body?.toName === 'string' ? body.toName.trim() : '';
  const registrationId = typeof body?.registrationId === 'string' ? body.registrationId.trim() : '';
  const locale: Locale = body?.locale === 'hi' ? 'hi' : 'en';

  if (!EMAIL_PATTERN.test(toEmail) || !toName || !REGISTRATION_ID_PATTERN.test(registrationId)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { subject, html } = buildConfirmationEmail({ toName, registrationId, locale });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: toEmail,
      replyTo: process.env.SMTP_REPLY_TO,
      subject,
      html,
    });
  } catch (error) {
    console.error('send-confirmation: failed to send email', error);
    return NextResponse.json({ error: 'Failed to send confirmation email.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
