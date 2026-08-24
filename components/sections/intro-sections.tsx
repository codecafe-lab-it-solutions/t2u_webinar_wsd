import type { SiteContent } from '@/lib/content';
import { Section, SectionHeading } from '@/components/section';

export function WhyImportant({ content }: { content: SiteContent['whyImportant'] }) {
  return (
    <Section id="why">
      <SectionHeading className="mx-auto text-center">{content.heading}</SectionHeading>
      <div className="mx-auto mt-6 max-w-3xl space-y-4 text-center text-base leading-7 text-ink-700 sm:text-lg">
        {content.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </Section>
  );
}

export function ProblemSection({ content }: { content: SiteContent['problems'] }) {
  return (
    <Section tone="tint">
      <SectionHeading className="mx-auto text-center">{content.heading}</SectionHeading>
      <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
        {content.items.map((item, i) => (
          <li
            key={i}
            className="rounded-2xl bg-white p-5 text-sm leading-6 text-ink-800 shadow-sm ring-1 ring-brand-100"
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-medium text-ink-900">
        {content.closing}
      </p>
    </Section>
  );
}

export function LifeTransitions({ content }: { content: SiteContent['lifeTransitions'] }) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading className="mx-auto">{content.heading}</SectionHeading>
        <div className="mt-6 space-y-4 text-base leading-7 text-ink-700 sm:text-lg">
          {content.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
