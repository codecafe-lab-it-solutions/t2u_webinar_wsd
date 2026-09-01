import type { SiteContent } from '@/lib/content';

export function AnnouncementBar({ content }: { content: SiteContent['announcementBar'] }) {
  if (!content.visible) return null;

  return (
    <div className="bg-ink-900 px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
      <span aria-hidden className="mr-2 inline-block h-2 w-2 rounded-full bg-brand-500" />
      {content.message}
    </div>
  );
}

export function EventInfo({ content }: { content: SiteContent['eventInfo'] }) {
  return (
    <div className="border-y border-brand-100 bg-white px-6 py-8 sm:px-10 lg:px-16">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
        {content.items.map((item) => (
          <div key={item.label}>
            <dt className="text-xs font-mono uppercase tracking-wide text-ink-700/70">{item.label}</dt>
            <dd className="mt-1 text-sm font-medium text-ink-900">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
