import { en } from './en';
import { hi } from './hi';
import type { Locale, SiteContent } from './types';

export type { Locale, SiteContent };

export function getContent(locale: Locale): SiteContent {
  return locale === 'hi' ? hi : en;
}
