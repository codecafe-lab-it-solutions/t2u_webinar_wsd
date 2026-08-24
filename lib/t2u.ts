/**
 * Client for T2U's public Courses & Lead Submission API.
 * Both endpoints are unauthenticated and CORS-open — called directly from
 * the browser, no server-side proxy needed.
 */

const T2U_API_BASE = process.env.NEXT_PUBLIC_T2U_API_BASE ?? 'https://t2upgrade.com/api';

/** course_interest is free text (not validated against the course catalog) — identifies leads from this webinar. */
export const T2U_COURSE_INTEREST = 'Women Skill Development';

/** Distinct from "landing_page" (T2U's own landing page) so these leads are identifiable in the CRM. */
export const T2U_LEAD_SOURCE = 'women_skill_webinar';

export interface T2ULeadPayload {
  full_name: string;
  mobile: string;
  email?: string;
  city?: string;
  referred_by?: string;
  course_interest?: string;
  source?: string;
}

export interface T2ULeadResponse {
  id: string;
  full_name: string;
  mobile: string;
  email: string | null;
  city: string | null;
  referred_by: string | null;
  course_interest: string | null;
  status: string;
  notes: string | null;
  source: string | null;
  created_at: string;
  updated_at: string;
}

export class T2UApiError extends Error {}

export async function submitLead(payload: T2ULeadPayload): Promise<T2ULeadResponse> {
  const res = await fetch(`${T2U_API_BASE}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new T2UApiError(body?.error ?? `Lead submission failed (${res.status}).`);
  }

  return res.json();
}
