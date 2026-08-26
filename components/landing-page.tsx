'use client';

import { useLocale } from '@/lib/locale-context';
import { getContent } from '@/lib/content';
import Hero17 from '@/components/ui/hero-17';
import { AnnouncementBar, EventInfo } from '@/components/sections/announcement-event';
import { WhyImportant, ProblemSection, LifeTransitions } from '@/components/sections/intro-sections';
import { WhatYouLearn, SkillFramework, PracticalExamples } from '@/components/sections/learning-sections';
import { IntroVideo, WhoShouldAttend } from '@/components/sections/video-audience';
import { Transformation, TrainerIntro, Testimonials, Bonuses } from '@/components/sections/transformation-trainer';
import { WhatsappCommunity } from '@/components/sections/whatsapp-community';
import { RegistrationForm } from '@/components/sections/registration-form';
import { Faq, FinalCta, SiteFooter } from '@/components/sections/faq-final-footer';

export function LandingPage() {
  const { locale, setLocale } = useLocale();
  const content = getContent(locale);

  return (
    <main>
      <AnnouncementBar content={content.announcementBar} />
      <Hero17
        locale={locale}
        onLocaleChange={setLocale}
        backgroundImage="https://assets.watermelon.sh/hero-17-bg.avif"
      />
      <EventInfo content={content.eventInfo} />
      <WhyImportant content={content.whyImportant} />
      <ProblemSection content={content.problems} />
      <LifeTransitions content={content.lifeTransitions} />
      <WhatYouLearn content={content.learn} />
      <SkillFramework content={content.framework} />
      <PracticalExamples content={content.examples} />
      <IntroVideo content={content.video} />
      <WhoShouldAttend content={content.audience} />
      <Transformation content={content.transformation} />
      <TrainerIntro content={content.trainer} />
      <Testimonials content={content.testimonials} />
      <Bonuses content={content.bonuses} />
      <WhatsappCommunity content={content.whatsappCommunity} />
      <RegistrationForm content={content.registration} locale={locale} />
      <Faq content={content.faq} />
      <FinalCta content={content.finalCta} />
      <SiteFooter content={content.footer} />
    </main>
  );
}
