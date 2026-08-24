import type { SiteContent } from '@/lib/content';
import { Section, SectionHeading } from '@/components/section';

export function Transformation({ content }: { content: SiteContent['transformation'] }) {
  return (
    <Section>
      <SectionHeading className="mx-auto text-center">{content.heading}</SectionHeading>
      <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
          <h3 className="text-xs font-mono font-medium uppercase tracking-wide text-ink-700/70">
            {content.beforeLabel}
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-700">
            {content.before.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-ink-700/40">
                  –
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
          <h3 className="text-xs font-mono font-medium uppercase tracking-wide text-brand-700">
            {content.afterLabel}
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-900">
            {content.after.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-brand-600">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function TrainerIntro({ content }: { content: SiteContent['trainer'] }) {
  return (
    <Section tone="tint">
      <SectionHeading className="mx-auto text-center">{content.heading}</SectionHeading>
      <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-dashed border-brand-300 bg-white p-8 text-center text-sm text-ink-700">
        {content.placeholderNote}
      </div>
    </Section>
  );
}

export function Testimonials({ content }: { content: SiteContent['testimonials'] }) {
  return (
    <Section>
      <SectionHeading className="mx-auto text-center">{content.heading}</SectionHeading>
      <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-dashed border-brand-300 bg-white p-8 text-center text-sm text-ink-700">
        {content.emptyState}
      </div>
    </Section>
  );
}

export function Bonuses({ content }: { content: SiteContent['bonuses'] }) {
  return (
    <Section tone="tint">
      <SectionHeading className="mx-auto text-center">{content.heading}</SectionHeading>
      <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
        {content.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 rounded-xl bg-white p-4 text-sm font-medium text-ink-900 shadow-sm ring-1 ring-brand-100"
          >
            <span aria-hidden className="text-brand-600">
              ★
            </span>
            {item}
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-ink-700/70">{content.note}</p>
    </Section>
  );
}
