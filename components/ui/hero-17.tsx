'use client';

import { ArrowDown, ArrowRight, Play } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

/**
 * Customized from the shadcn/watermelon registry item "hero-17"
 * (https://registry.watermelon.sh/r/hero-17.json), installed via
 * `npx shadcn@latest add https://registry.watermelon.sh/r/hero-17.json`.
 * Re-themed per design.md; copy sourced from CLAUDE.md / project brief.
 */

type Locale = 'en' | 'hi';

interface NavLink {
  label: string;
  href: string;
}

interface Hero17Props {
  locale?: Locale;
  brandName?: string;
  navLinks?: NavLink[];
  eyebrow?: string;
  headingLine1Prefix?: string;
  headingHighlight?: string;
  headingLine2?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  navCtaLabel?: string;
  navCtaHref?: string;
  scrollLabel?: string;
  /** Real event/participant photography. Falls back to a brand gradient — see design.md §6. */
  backgroundImage?: string;
  onLocaleChange?: (locale: Locale) => void;
}

const content: Record<
  Locale,
  Required<Omit<Hero17Props, 'locale' | 'backgroundImage' | 'onLocaleChange'>>
> = {
  en: {
    brandName: 'Women Skill Development', // TODO: replace with real brand/company name before launch
    navLinks: [
      { label: 'Why It Matters', href: '#why' },
      { label: "What You'll Learn", href: '#learn' },
      { label: "Who It's For", href: '#audience' },
      { label: 'Bonuses', href: '#bonuses' },
      { label: 'FAQ', href: '#faq' },
    ],
    eyebrow: 'Free Registration | Beginner Friendly | Practical Live Webinar',
    headingLine1Prefix: 'Learn Skills.',
    headingHighlight: 'Build Confidence.',
    headingLine2: 'Create Your Own Opportunities.',
    description:
      "The world of work is changing quickly, and women today have more ways than ever to learn, work, earn, build careers, start businesses, and create independent opportunities. But knowing that opportunities exist is different from knowing how to reach them.",
    primaryCtaLabel: 'Reserve My Free Seat',
    primaryCtaHref: '#register',
    secondaryCtaLabel: 'Watch Intro Video',
    secondaryCtaHref: '#intro-video',
    navCtaLabel: 'Reserve Seat',
    navCtaHref: '#register',
    scrollLabel: 'Scroll to Explore',
  },
  hi: {
    brandName: 'Women Skill Development', // TODO: replace with real brand/company name before launch
    navLinks: [
      { label: 'क्यों Important है', href: '#why' },
      { label: 'क्या सीखेंगी', href: '#learn' },
      { label: 'किनके लिए है', href: '#audience' },
      { label: 'Bonuses', href: '#bonuses' },
      { label: 'FAQ', href: '#faq' },
    ],
    eyebrow: 'Free Registration | Beginner Friendly | Practical Live Webinar',
    headingLine1Prefix: 'Skills सीखिए।',
    headingHighlight: 'Confidence बढ़ाइए।',
    headingLine2: 'अपने लिए नए Opportunities बनाइए।',
    description:
      'आज की दुनिया में महिलाओं के लिए सीखने, काम करने, कमाने, career बनाने, business शुरू करने और अपने लिए independent opportunities create करने के पहले से कहीं ज्यादा रास्ते हैं। लेकिन opportunities के बारे में जानना और यह समझना कि उन तक कैसे पहुँचना है—दो अलग बातें हैं।',
    primaryCtaLabel: 'अपनी Free Seat Reserve करें',
    primaryCtaHref: '#register',
    secondaryCtaLabel: 'Intro Video देखें',
    secondaryCtaHref: '#intro-video',
    navCtaLabel: 'Seat Reserve करें',
    navCtaHref: '#register',
    scrollLabel: 'नीचे Scroll करें',
  },
};

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const driftUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 10, stiffness: 45 },
  },
};

const navDrop: Variants = {
  hidden: { opacity: 0, y: -10, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 12, stiffness: 50 },
  },
};

const staggerWords: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.15, filter: 'blur(15px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 25, stiffness: 30 },
  },
};

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export default function Hero17({
  locale = 'en',
  backgroundImage,
  ...overrides
}: Hero17Props) {
  const t = content[locale];
  const {
    brandName = t.brandName,
    navLinks = t.navLinks,
    eyebrow = t.eyebrow,
    headingLine1Prefix = t.headingLine1Prefix,
    headingHighlight = t.headingHighlight,
    headingLine2 = t.headingLine2,
    description = t.description,
    primaryCtaLabel = t.primaryCtaLabel,
    primaryCtaHref = t.primaryCtaHref,
    secondaryCtaLabel = t.secondaryCtaLabel,
    secondaryCtaHref = t.secondaryCtaHref,
    navCtaLabel = t.navCtaLabel,
    navCtaHref = t.navCtaHref,
    scrollLabel = t.scrollLabel,
    onLocaleChange,
  } = overrides;

  const shouldReduceMotion = useReducedMotion();
  const v = (full: Variants) => (shouldReduceMotion ? reducedVariants : full);
  const isHi = locale === 'hi';

  return (
    <section
      lang={locale}
      className="relative isolate min-h-screen overflow-hidden font-sans text-white antialiased"
    >
      <motion.div
        className="relative flex h-full min-h-screen w-full flex-col overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.38 }}
        variants={v(sectionVariants)}
      >
        {backgroundImage ? (
          <motion.img
            variants={v(imageVariants)}
            src={backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <motion.div
            variants={v(imageVariants)}
            className="absolute inset-0 bg-linear-to-br from-brand-900 via-brand-700 to-accent-500"
          >
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent-400/30 blur-3xl" />
            <div className="absolute -bottom-32 -right-16 h-[28rem] w-[28rem] rounded-full bg-brand-500/40 blur-3xl" />
          </motion.div>
        )}

        {/* Scrim for text legibility over either the image or the gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-black/35 via-black/10 to-black/40" />

        <motion.nav
          variants={v(navDrop)}
          className="relative z-10 mx-auto flex min-h-14 w-full max-w-7xl items-center justify-between px-6 py-3 sm:px-10 lg:px-16"
        >
          <a
            href="#"
            className="inline-flex min-h-10 items-center text-xl font-medium tracking-[-0.03em] text-white transition-[opacity,transform] duration-200 ease-out hover:opacity-75 active:scale-[0.96]"
          >
            {brandName}
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex min-h-10 items-center text-sm font-medium text-white/85 transition-[color,transform] duration-200 ease-out hover:text-white active:scale-[0.96]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <div
              className="hidden items-center gap-2 text-sm font-medium sm:flex"
              role="group"
              aria-label="Language / भाषा"
            >
              <button
                type="button"
                onClick={() => onLocaleChange?.('en')}
                aria-current={locale === 'en' ? 'true' : undefined}
                className={`rounded-full px-2 py-1 transition-opacity duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 ${
                  locale === 'en' ? 'text-white opacity-100' : 'text-white/70 opacity-70 hover:opacity-100'
                }`}
              >
                EN
              </button>
              <span className="text-white/40">|</span>
              <button
                type="button"
                onClick={() => onLocaleChange?.('hi')}
                aria-current={locale === 'hi' ? 'true' : undefined}
                className={`rounded-full px-2 py-1 transition-opacity duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 ${
                  locale === 'hi' ? 'text-white opacity-100' : 'text-white/70 opacity-70 hover:opacity-100'
                }`}
              >
                हिं
              </button>
            </div>
            <a
              href={navCtaHref}
              className="group/nav-cta inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-linear-to-b from-brand-600 to-brand-900 px-4 text-sm font-medium text-white outline-2 -outline-offset-2 outline-white/20 transition-[background-image,transform] duration-200 ease-out hover:from-brand-700 hover:to-brand-950 active:scale-[0.96] focus-visible:outline-accent-400"
            >
              {navCtaLabel}
            </a>
          </div>
        </motion.nav>

        <div className="relative z-10 mx-auto flex w-full max-w-[74rem] flex-1 flex-col items-center px-6 pt-20 pb-10 text-center sm:px-10 sm:pt-12 lg:px-16">
          <motion.div
            variants={v(driftUp)}
            className="inline-flex min-h-7 items-center justify-center gap-2 rounded-full bg-white/20 px-4 text-xs leading-none font-medium font-mono text-white shadow-[0_1px_1px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md"
          >
            {eyebrow}
          </motion.div>

          <motion.h1
            variants={v(staggerWords)}
            className="mt-5 max-w-5xl text-[clamp(3.1rem,4.1vw,5.25rem)] leading-[1.03] font-normal tracking-tight text-balance text-white"
          >
            <span className="block">
              {headingLine1Prefix.split(' ').map((word, i) => (
                <motion.span key={i} variants={v(driftUp)} className="inline-block mr-[0.22em]">
                  {word}
                </motion.span>
              ))}
              {headingHighlight.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  variants={v(driftUp)}
                  className="inline-block mr-[0.22em] font-medium text-accent-400"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block mt-1">
              {headingLine2.split(' ').map((word, i) => (
                <motion.span key={i} variants={v(driftUp)} className="inline-block mr-[0.22em]">
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            variants={v(driftUp)}
            className="mt-5 max-w-2xl text-sm sm:text-base leading-6 sm:leading-7 font-normal text-pretty text-white/90"
          >
            {description}
          </motion.p>

          <motion.div
            variants={v(driftUp)}
            className="mt-7 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={primaryCtaHref}
              className="group/primary inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-linear-to-b from-brand-600 to-brand-900 px-6 text-sm font-medium text-white shadow-[0_6px_20px_var(--color-brand-900)] outline-2 -outline-offset-2 outline-white/20 transition-[background-image,transform,box-shadow] duration-200 ease-out hover:from-brand-700 hover:to-brand-950 active:scale-[0.96] focus-visible:outline-accent-400"
            >
              {primaryCtaLabel}
              <ArrowRight className="size-3.5 transition-transform duration-200 ease-out group-hover/primary:translate-x-0.5" />
            </a>
            <a
              href={secondaryCtaHref}
              className="group/process inline-flex min-h-11 items-center justify-center gap-2 px-2 text-sm font-normal text-white transition-[opacity,transform] duration-200 ease-out hover:opacity-75 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
            >
              {secondaryCtaLabel}
              <Play className="size-3 fill-current transition-transform duration-200 ease-out group-hover/process:scale-110" />
            </a>
          </motion.div>

          <motion.div
            variants={v(driftUp)}
            className="mt-auto flex flex-col items-center gap-3 pb-1 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
          >
            <ArrowDown className="size-5" />
            <span className="text-base font-semibold" lang={isHi ? 'hi' : undefined}>
              {scrollLabel}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
