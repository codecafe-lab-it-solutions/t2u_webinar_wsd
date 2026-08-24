import type { ReactNode } from 'react';

export function Section({
  id,
  tone = 'light',
  className = '',
  children,
}: {
  id?: string;
  tone?: 'light' | 'tint';
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`px-6 py-16 sm:px-10 sm:py-24 lg:px-16 ${tone === 'tint' ? 'bg-brand-50' : 'bg-cream-50'} ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`max-w-3xl text-4xl leading-[1.1] font-medium tracking-tight text-balance text-ink-900 sm:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="mb-3 inline-block text-xs font-mono font-medium tracking-wide text-brand-600 uppercase">
      {children}
    </span>
  );
}
