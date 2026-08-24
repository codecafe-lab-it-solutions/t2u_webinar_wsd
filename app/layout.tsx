import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { inter, notoDevanagari } from './fonts';
import { LocaleProvider } from '@/lib/locale-context';

export const metadata: Metadata = {
  title: 'Women Skill Development Webinar',
  description: 'Learn Skills. Build Confidence. Create Your Own Opportunities.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoDevanagari.variable}`}>
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
