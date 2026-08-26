import { MessageCircle } from 'lucide-react';
import type { SiteContent } from '@/lib/content';
import { Section } from '@/components/section';

const WHATSAPP_COMMUNITY_URL = 'https://chat.whatsapp.com/HUwL4GnIpyZ7WkP0KCcDxo';

export function WhatsappCommunity({ content }: { content: SiteContent['whatsappCommunity'] }) {
  return (
    <Section>
      <div className="overflow-hidden rounded-3xl bg-linear-to-br from-brand-900 via-brand-700 to-accent-500 px-6 py-14 text-center sm:px-10 sm:py-16">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
          <MessageCircle className="size-7 text-white" />
        </div>
        <h2 className="mt-6 text-3xl font-medium tracking-tight text-white sm:text-4xl">{content.heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/85 sm:text-base">{content.supporting}</p>
        <a
          href={WHATSAPP_COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-brand-700 transition-transform duration-200 ease-out hover:bg-cream-50 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <MessageCircle className="size-4" />
          {content.cta}
        </a>
      </div>
    </Section>
  );
}
