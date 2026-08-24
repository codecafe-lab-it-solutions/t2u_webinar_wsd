# Women Skill Development Webinar — Landing Page

## Project Overview

A high-converting, bilingual (English + Hindi) Next.js landing page for a free
live "Women Skill Development Webinar." The page guides visitors through an
emotional journey from confusion to a confident first step, captures
registrations, and sends confirmation/reminder communications.

**Core positioning**
- EN: *Learn Skills. Build Confidence. Create Your Own Opportunities.*
- HI: *Skills सीखिए। Confidence बढ़ाइए। अपने लिए नए Opportunities बनाइए।*

**Core message (repeat throughout the page)**
- EN: *You don't need to have everything figured out. You need the right
  skills, the right direction, and the confidence to take the next step.*
- HI: *आपको आज सब कुछ पता होना जरूरी नहीं है। आपको सही skills, सही direction
  और अगला कदम उठाने का confidence चाहिए।*

**Emotional journey to design every section around:**
Confused/uncertain ("मेरे पास potential है लेकिन direction नहीं मिल रही") →
understands useful skills → chooses direction based on own goals → turns
skill into practical opportunity → takes the first step.

**Target audience:** students, homemakers, career restarters, job seekers,
freelancers, entrepreneurs, work-from-home seekers, and beginners — not one
fixed career path for everyone.

---

## Tech Stack

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS
- **i18n:** Every section renders in both English and Hindi. Prefer a
  toggle/locale-route approach (e.g. `/en`, `/hi` via `next-intl` or a
  similar App Router i18n library) over duplicating pages by hand. Store all
  copy as translation dictionaries keyed by section — do not hardcode
  English strings in components with Hindi as an afterthought.
- **Forms:** Registration form with client + server-side validation (mobile
  number, email). Persist leads to a database (Postgres/Supabase or
  equivalent) rather than a static file once wired to a backend.
- **Comms:** WhatsApp + email confirmation/reminders (via a provider like
  Twilio/WhatsApp Business API + an email service) triggered off
  registration events. Treat these as integration points, not hardcoded.
- **Video:** Embedded 60–90s intro video (self-hosted or YouTube/Vimeo
  embed — do not assume a specific provider until the user picks one).

## Non-Negotiable Content Rules

These rules override any temptation to "fill in" placeholder marketing copy:

- **No fake urgency.** Only show "limited seats" / "closing soon" messaging
  in the announcement bar if it is actually true. Make the urgency message
  admin-configurable (dynamic, not hardcoded), especially since the webinar
  may switch between free and paid.
- **No fake testimonials.** Only render testimonials that are real
  (photo, full name, profession, city, genuine quote). Use a clearly
  empty/placeholder state in the UI if none exist yet — never invent
  people.
- **No invented trainer credentials.** Trainer name, designation, company,
  experience, achievements, and social links must come from real provided
  data. Do not fabricate student counts, certifications, or awards.
- **No guaranteed outcomes.** Never state or imply guaranteed income,
  guaranteed jobs, or guaranteed placement. Frame skill → opportunity
  connections as *possible*, not promised.
- **No fake bonuses/values.** Only list bonuses/resources that will
  actually be delivered (checklist, worksheet, recording, certificate,
  etc.), and never attach a fabricated monetary value to them.
- **Recording/certificate FAQ answers must be conditional** on whether
  those are actually offered for a given webinar instance — do not
  hardcode "yes."

## Bilingual Content Requirement

Hindi copy must read as natural Hinglish used conversationally by Indian
women — not a literal word-for-word translation. English technical/career
terms (skill, career, confidence, freelancing, work-from-home, direction,
opportunity, etc.) stay in English within Hindi sentences, matching how the
spec's example copy is written. When adding new copy, match this register
rather than switching to pure/formal Hindi (शुद्ध हिंदी).

## Page Structure (exact order)

1. Announcement Bar (dynamic urgency message, admin-editable)
2. Header
3. Hero Section (headline, supporting copy, primary CTA)
4. Why This Webinar Is Important
5. Does This Sound Like You? (problem agitation, 6 points)
6. Real-Life Life Transitions
7. What You Will Learn (7 outcomes)
8. Skill Direction Framework (5-step: Know Yourself → Understand
   Opportunities → Choose One Direction → Learn & Practice → Create an
   Opportunity)
9. Practical Skill-to-Opportunity Examples (Digital, Communication,
   Freelancing, Business — no income promises)
10. Introduction Video (60–90s)
11. Who Should Attend? (students, homemakers, career restarters, job
    seekers, WFH seekers, beginners)
12. Before → After Transformation (confusion vs. clarity lists)
13. Trainer Introduction (real data only)
14. Testimonials (real data only, 4–6 if available)
15. Bonuses / Resources (only real deliverables)
16. Registration Form
17. Registration Flow (validation → lead save → confirmation → thank-you →
    WhatsApp/email → calendar → reminders)
18. Thank-You Page (registration ID, event details, calendar button,
    WhatsApp community button, joining instructions)
19. FAQ
20. Final CTA
21. Footer (real company info only)

Full section-by-section copy (English + Hindi, all headings, body text,
CTAs, form field labels/options) is defined in the original product brief
supplied by the user — treat that brief as the canonical content source
when building each section's component. Do not paraphrase away from it
without checking with the user first; do extend/adapt only within the
"natural Hinglish" and "no fabricated claims" constraints above.

## Registration Form — Fields & Options

- Full Name / पूरा नाम
- Mobile Number / मोबाइल नंबर
- WhatsApp Number / WhatsApp नंबर
- Email Address / ईमेल
- City / शहर
- Profession / आपका Profession — Student, Homemaker, Job Seeker, Working
  Professional, Freelancer, Entrepreneur, Career Restarter, Other
- Optional: "Why do you want to attend?" — Career Restart, Job Preparation,
  Freelancing, Work From Home, Digital Skills, Entrepreneurship, Personal
  Growth, Confidence Building, Skill Development, Other
- Consent checkbox for WhatsApp/phone/email comms, with Privacy Policy and
  Terms & Conditions links

## Lead Data Model

Persist per registration:
`fullName, mobileNumber, whatsappNumber, email, city, profession,
learningGoal, webinarName, registrationDate, registrationId (unique),
utmSource, utmMedium, utmCampaign, referralCode, consentTimestamp,
attendanceStatus, followUpStatus`

## Reminder Sequence (event-driven, not hardcoded copy)

Immediately on registration → 24h before → 3h before → 30min before (with
join link) → 5min before → post-webinar thank-you/next-step → replay
message to absentees (**only** if a recording actually exists).

## Webinar Content Direction (for any content/script generation)

When generating webinar talking points or scripts, follow this arc:
1. Open with real, relatable problems (career break, lack of direction,
   skill confusion, WFH interest, low confidence, too many choices, tech
   hesitation) — make the audience feel understood first.
2. Explain the gap between *knowing opportunities exist* and *knowing how
   to prepare to access them*.
3. Teach the core framework: Understand Yourself → Identify Skills →
   Choose Direction → Learn → Practice → Create Opportunity.
4. Connect skills to possible (not guaranteed) outcomes: jobs, career
   growth, freelancing, WFH, entrepreneurship, personal growth, confidence.
5. Close with one concrete, immediately actionable next step.
6. If a paid course exists, introduce it naturally as the next step for
   those wanting structured/deeper support — keep the webinar educational
   first, not a hard sell.

## Placeholders Requiring Real Data Before Launch

Do not invent values for these — leave clearly marked placeholders until
the user supplies real data:
- Webinar date, time, mode details, certificate/bonus availability
- Trainer bio, credentials, photo, social links
- Testimonials
- Company name, contact info, social links, legal pages (Privacy Policy,
  Terms & Conditions, Disclaimer)
- Whether a recording/certificate is actually provided

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
