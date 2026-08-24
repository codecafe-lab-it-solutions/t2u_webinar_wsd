'use client';

import { useState } from 'react';
import type { SiteContent } from '@/lib/content';
import { Section, SectionHeading } from '@/components/section';

export function Faq({ content }: { content: SiteContent['faq'] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq">
      <SectionHeading className="mx-auto text-center">{content.heading}</SectionHeading>
      <div className="mx-auto mt-8 max-w-3xl divide-y divide-ink-900/10 rounded-2xl border border-ink-900/10 bg-white">
        {content.items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:text-base"
              >
                {item.question}
                <span aria-hidden className={`shrink-0 text-brand-600 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {isOpen && <p className="px-5 pb-4 text-sm leading-6 text-ink-700">{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export function FinalCta({ content }: { content: SiteContent['finalCta'] }) {
  return (
    <Section tone="tint" className="text-center">
      <SectionHeading className="mx-auto">{content.heading}</SectionHeading>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink-700 sm:text-lg">{content.supporting}</p>
      <a
        href="#register"
        className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-linear-to-b from-brand-600 to-brand-900 px-8 text-base font-medium text-white transition-[background-image,transform] duration-200 ease-out hover:from-brand-700 hover:to-brand-950 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        🚀 {content.cta}
      </a>
    </Section>
  );
}

export function SiteFooter({ content }: { content: SiteContent['footer'] }) {
  return (
    <footer className="border-t border-ink-900/10 bg-ink-900 px-6 py-12 text-white sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-base font-medium">{content.companyPlaceholder}</p>
          <p className="mt-2 max-w-sm text-white/60">{content.aboutPlaceholder}</p>
          <p className="mt-2 text-white/60">{content.contactPlaceholder}</p>
        </div>
        <nav className="flex flex-col gap-2 text-white/70 sm:items-end">
          <a href="/privacy" className="hover:text-white">
            {content.privacyLabel}
          </a>
          <a href="/terms" className="hover:text-white">
            {content.termsLabel}
          </a>
          <a href="/disclaimer" className="hover:text-white">
            {content.disclaimerLabel}
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-white/40">{content.copyright}</p>
    </footer>
  );
}
