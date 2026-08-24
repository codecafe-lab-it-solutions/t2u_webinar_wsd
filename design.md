# Design System — Women Skill Development Webinar

Design reference for the landing page defined in [CLAUDE.md](./CLAUDE.md).
This system replaces the source `hero-17` template's corporate teal/SaaS
styling with a warm, confident palette suited to a bilingual (EN/HI)
audience of Indian women exploring skills, confidence, and opportunity.

Tailwind v4 (CSS-first `@theme` config) is assumed, matching the syntax
already used in the source component (`bg-linear-to-b`, `var(--color-*)`).

---

## 1. Brand Rationale

- **Warm, not clinical.** The source template's teal/glass SaaS look reads
  as corporate software, not an emotional, human webinar about confidence
  and opportunity. Rose/plum reads warmer and more personal.
- **Gold accent for the "confidence" moment.** The headline's highlighted
  phrase is the emotional turn in the sentence ("...**Build Confidence**...").
  Pairing warm rose with a gold accent (rather than a monochrome tone-on-tone
  highlight) makes that phrase feel like a moment of encouragement, not just
  a stylistic bold.
- **Soft, approachable geometry.** Pills (`rounded-full`) on CTAs and badges
  instead of the source's sharp `rounded-sm`, to feel inviting rather than
  enterprise-software square.
- **Devanagari-safe typography.** Content is Hinglish (Hindi sentences with
  inline English words) — see §3. The type system must render both scripts
  cleanly in the same sentence without a jarring font swap.

---

## 2. Color Palette

Custom tokens, defined once in `globals.css` under `@theme` (Tailwind v4
CSS-first config — no `tailwind.config.js` color extension needed):

```css
@theme {
  /* Brand — warm rose/magenta, primary CTAs, links, gradients */
  --color-brand-50:  #fff1f5;
  --color-brand-100: #ffe1ea;
  --color-brand-200: #ffc2d6;
  --color-brand-300: #ff94b8;
  --color-brand-400: #fb5f95;
  --color-brand-500: #f22e72;
  --color-brand-600: #dc1660; /* primary — buttons, links, nav CTA */
  --color-brand-700: #b80f4e; /* hover state */
  --color-brand-800: #8f0f40;
  --color-brand-900: #6b1236; /* gradient end / deep plum */
  --color-brand-950: #3d0a1e;

  /* Accent — gold, headline highlight, badges, small emphasis moments */
  --color-accent-300: #ffd580;
  --color-accent-400: #ffb020;
  --color-accent-500: #f59e0b; /* headline highlight color */
  --color-accent-600: #d97706;

  /* Neutrals — warm-tinted instead of pure gray */
  --color-cream-50:  #fffaf5; /* page/section background */
  --color-cream-100: #fff3ea;
  --color-ink-700:   #4a3f4f; /* body text on light backgrounds */
  --color-ink-800:   #33283a;
  --color-ink-900:   #241b2f; /* headings, near-black warm text */
}
```

| Token | Usage |
|---|---|
| `brand-600` → `brand-900` gradient | Primary CTA fill, nav "Reserve Seat" button |
| `brand-700` | Hover state for primary/nav CTA |
| `accent-500` | Headline highlight word/phrase, focus rings on dark hero |
| `cream-50` | Page background outside the hero (sections 4–21) |
| `ink-900` | Headings on light backgrounds |
| `ink-700` | Body copy on light backgrounds |
| `white` / `white/30` (glass) | Text and badge fills over the hero's dark-image/gradient area |

**Contrast:** `brand-600` on white is ~4.9:1 (passes AA for normal text).
`ink-900` on `cream-50` is ~14:1. White text over the hero gradient must sit
over the gradient's darker (`brand-900`) end, not the lighter end — verify
per background image once real photography is added.

---

## 3. Typography

- **Latin (English words/sentences):** Inter — already the de facto
  Tailwind/shadcn default, excellent at small UI sizes.
- **Devanagari (Hindi):** Noto Sans Devanagari — broadest glyph coverage of
  any free Devanagari sans, and its x-height/weight pairs cleanly with
  Inter so mixed Hinglish sentences don't visually "jump" between scripts.
- **Stack:** load both via `next/font/google` and expose as one CSS
  variable so components don't need to branch by locale — the browser
  substitutes the correct script's glyphs automatically within one
  `font-family` stack.

```ts
// app/fonts.ts
import { Inter, Noto_Sans_Devanagari } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'], variable: '--font-latin' });
export const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
});
```

```css
/* globals.css */
body {
  font-family: var(--font-latin), var(--font-devanagari), ui-sans-serif, system-ui, sans-serif;
}
```

### Type Scale

| Role | Class | Size (fluid) | Weight | Used for |
|---|---|---|---|---|
| Display / Hero H1 | `text-[clamp(3.1rem,4.1vw,5.25rem)] leading-[1.03] tracking-tight` | 49.6px → 84px | 400 | Hero headline only |
| H2 | `text-4xl sm:text-5xl leading-[1.1] tracking-tight` | 36px → 48px | 500 | Section headings (4–21) |
| H3 | `text-2xl leading-snug` | 24px | 500 | Card/subsection titles |
| Body Large | `text-base sm:text-lg leading-7` | 16px → 18px | 400 | Section intros |
| Body | `text-sm leading-6` | 14px | 400 | Hero description, default copy |
| Caption / Badge | `text-xs font-mono leading-none` | 12px | 500 | Eyebrow badges, form helper text |

Hindi text at the same pixel size as English tends to read slightly denser
due to Devanagari's connected forms — no size override needed at this
scale, but avoid going below `text-xs` (12px) for Hindi body copy since
matra marks lose legibility.

---

## 4. Spacing & Layout

Kept consistent with the source component's already-solid responsive
rhythm:

- **Page container:** `max-w-7xl` for nav/full-width bars, `max-w-[74rem]`
  for hero content, `max-w-6xl` for standard content sections below the
  hero.
- **Section horizontal padding:** `px-6 sm:px-10 lg:px-16`.
- **Section vertical padding:** `py-16 sm:py-24` for standard sections
  (4–21); hero is intentionally full `min-h-screen`.
- **Stack spacing:** `gap-4`/`gap-5` for tightly related elements (badge →
  heading → description), `gap-7`+ before CTA groups, matching the
  source's `mt-5` / `mt-7` cadence.
- **Border radius:** `rounded-full` for buttons and badges (softer than
  source's `rounded-sm`), `rounded-lg` for cards/inputs/media in later
  sections, `rounded-2xl` for large media blocks (video embed, images).

---

## 5. Component States & Motion

- **Buttons:**
  - Primary: `bg-linear-to-b from-brand-600 to-brand-900`, hover
    `hover:from-brand-700 hover:to-brand-950` (source used a flat
    `hover:bg-*-800`; a gradient hover shift reads more premium), active
    `active:scale-[0.96]`.
  - Focus-visible (keyboard nav — not present in the source component):
    `focus-visible:outline-2 focus-visible:outline-offset-2
    focus-visible:outline-accent-400`.
  - Secondary (ghost/text): `hover:opacity-75 active:scale-[0.96]`, same
    as source.
- **Motion:** reuse the source's spring/stagger choreography
  (`sectionVariants` → `driftUp` → per-word stagger on the headline) — it's
  well-tuned and doesn't need reinventing. **Addition:** respect
  `prefers-reduced-motion` via Motion's `useReducedMotion()` hook, which
  the source component omitted; when true, skip translate/blur and only
  fade opacity.
- **Locale switch:** two small pill links (`EN` / `हिं`), active locale at
  full opacity + `text-white` (on hero) or `text-brand-700` (on light
  sections), inactive at `opacity-60 hover:opacity-100`.
- **Nav on scroll:** not in scope for the hero component itself, but for
  the full page, plan a solid `bg-cream-50/90 backdrop-blur` state once
  scrolled past the hero, since the hero nav relies on being over a dark
  image/gradient.

---

## 6. Hero-Specific Notes

- **Background:** source used a licensed stock photo from
  `assets.watermelon.sh`, which is not ours to reuse and isn't real
  photography of this program. Default is a `brand-900 → brand-600 →
  accent-500` diagonal gradient with two soft blurred color blobs (pure
  CSS, no external asset). The component still accepts a
  `backgroundImage` prop — swap in real event/participant photography once
  available, per CLAUDE.md's placeholder policy.
- **Eyebrow badge & highlighted headline word** are the two accent
  touchpoints — everything else stays in brand/neutral tones so those two
  moments carry the visual emphasis.

---

## 7. Accessibility Checklist

- All interactive elements have visible `focus-visible` states (missing in
  source).
- Hindi spans carry `lang="hi"` so screen readers switch pronunciation
  correctly mid-sentence.
- Motion respects `prefers-reduced-motion`.
- Color pairs verified at ≥4.5:1 for body text, ≥3:1 for large text
  (headline, on the darkest part of the gradient).
