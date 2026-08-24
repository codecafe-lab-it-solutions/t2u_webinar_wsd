/**
 * Client-side placeholder persistence. Per CLAUDE.md's lead data model,
 * this must be replaced with a real database write (e.g. an API route
 * backed by Postgres/Supabase) before launch — localStorage is only here
 * so the registration → thank-you flow is demoable end to end.
 */

export interface RegistrationRecord {
  registrationId: string;
  fullName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  city: string;
  profession: string;
  learningGoal: string;
  webinarName: string;
  registrationDate: string;
  consentTimestamp: string;
}

const STORAGE_KEY = 'webinar-registrations';

export function generateRegistrationId(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `WSD-${datePart}-${randomPart}`;
}

export function saveRegistration(record: RegistrationRecord) {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const existing: RegistrationRecord[] = raw ? JSON.parse(raw) : [];
    existing.push(record);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // localStorage unavailable (private browsing, etc.) — non-fatal for this placeholder flow.
  }
}
