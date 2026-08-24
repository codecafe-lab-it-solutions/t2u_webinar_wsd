import { Inter, Noto_Sans_Devanagari } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'], variable: '--font-latin' });

export const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
});
