'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from '@/lib/locale-context';
import { getContent } from '@/lib/content';

function buildGoogleCalendarUrl(startsAtIso: string, title: string, details: string): string {
  const start = new Date(startsAtIso);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const format = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${format(start)}/${format(end)}`,
    details,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const { locale } = useLocale();
  const content = getContent(locale);
  const name = searchParams.get('name') ?? '';
  const registrationId = searchParams.get('id') ?? '';

  const calendarUrl = content.eventInfo.startsAtIso
    ? buildGoogleCalendarUrl(content.eventInfo.startsAtIso, content.meta.title, content.registration.supporting)
    : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream-50 px-6 py-16 sm:px-10">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-brand-100 sm:p-10">
        <span className="text-4xl" aria-hidden>
          🎉
        </span>
        <h1 className="mt-4 text-2xl font-medium text-ink-900 sm:text-3xl">{content.thankYou.heading}</h1>

        <dl className="mt-8 grid grid-cols-2 gap-4 rounded-2xl bg-cream-100 p-5 text-left text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-700/60">{content.thankYou.labels.name}</dt>
            <dd className="mt-1 font-medium text-ink-900">{name || '—'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-700/60">
              {content.thankYou.labels.registrationId}
            </dt>
            <dd className="mt-1 font-mono font-medium text-ink-900">{registrationId || '—'}</dd>
          </div>
          {content.eventInfo.items.slice(0, 4).map((item) => (
            <div key={item.label}>
              <dt className="text-xs uppercase tracking-wide text-ink-700/60">{item.label}</dt>
              <dd className="mt-1 font-medium text-ink-900">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {calendarUrl ? (
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full bg-linear-to-b from-brand-600 to-brand-900 px-4 py-2.5 text-sm font-medium text-white transition hover:from-brand-700 hover:to-brand-950"
            >
              {content.thankYou.calendarCta}
            </a>
          ) : (
            <span className="flex-1 cursor-not-allowed rounded-full bg-ink-900/5 px-4 py-2.5 text-sm font-medium text-ink-700/50" title={content.thankYou.calendarUnavailable}>
              {content.thankYou.calendarCta}
            </span>
          )}
        </div>
        {!calendarUrl && <p className="mt-2 text-xs text-ink-700/60">{content.thankYou.calendarUnavailable}</p>}

        <ul className="mt-8 space-y-1.5 text-left text-sm text-ink-700">
          {content.thankYou.instructions.map((line, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="text-brand-600">
                •
              </span>
              {line}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs text-ink-700/60">{content.thankYou.supportNote}</p>
      </div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  );
}
