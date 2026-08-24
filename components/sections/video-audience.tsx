import type { SiteContent } from '@/lib/content';
import { Section, SectionHeading } from '@/components/section';

export function IntroVideo({ content }: { content: SiteContent['video'] }) {
  return (
    <Section id="intro-video">
      <SectionHeading className="mx-auto text-center">{content.heading}</SectionHeading>
      <div className="mx-auto mt-8 flex aspect-video max-w-3xl items-center justify-center rounded-2xl bg-linear-to-br from-brand-900 via-brand-700 to-accent-500 text-center text-sm text-white/80">
        {content.placeholderNote}
      </div>
    </Section>
  );
}

export function WhoShouldAttend({ content }: { content: SiteContent['audience'] }) {
  return (
    <Section id="audience" tone="tint">
      <SectionHeading className="mx-auto text-center">{content.heading}</SectionHeading>
      <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((item) => (
          <div key={item.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-100">
            <h3 className="text-base font-medium text-ink-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-700">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <a
          href="#register"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-linear-to-b from-brand-600 to-brand-900 px-6 text-sm font-medium text-white transition-[background-image,transform] duration-200 ease-out hover:from-brand-700 hover:to-brand-950 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          {content.cta}
        </a>
      </div>
    </Section>
  );
}
