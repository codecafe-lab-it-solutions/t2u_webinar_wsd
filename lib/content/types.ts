export type Locale = 'en' | 'hi';

export interface ListItem {
  title: string;
  description: string;
}

export interface Step {
  title: string;
  description: string;
}

export interface ExampleChain {
  title: string;
  chain: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EventInfoItem {
  label: string;
  value: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  announcementBar: {
    message: string;
    visible: boolean;
  };
  eventInfo: {
    heading: string;
    items: EventInfoItem[];
    /** ISO datetime — only set once a real date/time is confirmed. Powers the calendar link. */
    startsAtIso?: string;
  };
  whyImportant: {
    heading: string;
    paragraphs: string[];
  };
  problems: {
    heading: string;
    items: string[];
    closing: string;
  };
  lifeTransitions: {
    heading: string;
    paragraphs: string[];
  };
  learn: {
    heading: string;
    items: ListItem[];
  };
  framework: {
    heading: string;
    steps: Step[];
  };
  examples: {
    heading: string;
    items: ExampleChain[];
    disclaimer: string;
  };
  video: {
    heading: string;
    placeholderNote: string;
  };
  audience: {
    heading: string;
    items: ListItem[];
    cta: string;
  };
  transformation: {
    heading: string;
    beforeLabel: string;
    afterLabel: string;
    before: string[];
    after: string[];
  };
  trainer: {
    heading: string;
    placeholderNote: string;
  };
  testimonials: {
    heading: string;
    emptyState: string;
  };
  bonuses: {
    heading: string;
    items: string[];
    note: string;
  };
  whatsappCommunity: {
    heading: string;
    supporting: string;
    cta: string;
  };
  registration: {
    heading: string;
    supporting: string;
    labels: {
      fullName: string;
      mobile: string;
      whatsapp: string;
      email: string;
      city: string;
      profession: string;
      goal: string;
    };
    professionOptions: string[];
    goalOptions: string[];
    consent: string;
    privacyLabel: string;
    termsLabel: string;
    submitCta: string;
    submittingLabel: string;
    errors: {
      fullName: string;
      mobile: string;
      whatsapp: string;
      email: string;
      city: string;
      profession: string;
      consent: string;
    };
  };
  faq: {
    heading: string;
    items: FaqItem[];
  };
  finalCta: {
    heading: string;
    supporting: string;
    cta: string;
  };
  footer: {
    companyPlaceholder: string;
    aboutPlaceholder: string;
    contactPlaceholder: string;
    privacyLabel: string;
    termsLabel: string;
    disclaimerLabel: string;
    copyright: string;
  };
  thankYou: {
    heading: string;
    labels: {
      name: string;
      registrationId: string;
      date: string;
      time: string;
      duration: string;
      mode: string;
    };
    calendarCta: string;
    calendarUnavailable: string;
    whatsappCta: string;
    instructions: string[];
    supportNote: string;
  };
}
