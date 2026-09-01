import type { SiteContent } from '@/lib/content';
import { Section, SectionHeading } from '@/components/section';

export function WhatYouLearn({ content }: { content: SiteContent['learn'] }) {
  return (
    <Section id="learn" tone="tint">
      <SectionHeading className="mx-auto text-center">{content.heading}</SectionHeading>
      <ol className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
        {content.items.map((item, i) => (
          <li key={item.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-100">
            <span className="text-xs font-mono font-medium text-brand-600">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 text-lg font-medium text-ink-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-700">{item.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function SkillFramework({ content }: { content: SiteContent['framework'] }) {
  return (
    <Section>
      <SectionHeading className="mx-auto text-center">{content.heading}</SectionHeading>
      <ol className="mx-auto mt-10 flex max-w-4xl flex-col gap-4">
        {content.steps.map((step, i) => (
          <li
            key={step.title}
            className="flex items-start gap-4 rounded-2xl border border-brand-100 bg-white p-5"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-b from-brand-600 to-brand-900 text-sm font-semibold text-white">
              {i + 1}
            </span>
            <div>
              <h3 className="text-base font-medium text-ink-900">{step.title}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-700">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function PracticalExamples({ content }: { content: SiteContent['examples'] }) {
  return (
    <Section tone="tint">
      <SectionHeading className="mx-auto text-center">{content.heading}</SectionHeading>
      <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
        {content.items.map((item) => (
          <div key={item.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-100">
            <h3 className="text-base font-medium text-ink-900">{item.title}</h3>
            <p className="mt-2 text-sm font-mono leading-6 text-brand-700">{item.chain}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-ink-700/70">{content.disclaimer}</p>
    </Section>
  );
}
