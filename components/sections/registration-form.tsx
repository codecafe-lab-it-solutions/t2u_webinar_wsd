'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale, SiteContent } from '@/lib/content';
import { generateRegistrationId, saveRegistration } from '@/lib/registration';
import { submitLead, T2UApiError, T2U_COURSE_INTEREST, T2U_LEAD_SOURCE } from '@/lib/t2u';
import { Section, SectionHeading } from '@/components/section';

const MOBILE_PATTERN = /^[6-9]\d{9}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<
  Record<'fullName' | 'mobile' | 'whatsapp' | 'email' | 'city' | 'profession' | 'consent', string>
>;

export function RegistrationForm({
  content,
  locale,
}: {
  content: SiteContent['registration'];
  locale: Locale;
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [profession, setProfession] = useState('');
  const [goal, setGoal] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref');
    if (ref) setReferralCode(ref);
  }, []);

  const effectiveWhatsapp = sameAsMobile ? mobile : whatsapp;

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!fullName.trim()) next.fullName = content.errors.fullName;
    if (!MOBILE_PATTERN.test(mobile.trim())) next.mobile = content.errors.mobile;
    if (!MOBILE_PATTERN.test(effectiveWhatsapp.trim())) next.whatsapp = content.errors.whatsapp;
    if (!EMAIL_PATTERN.test(email.trim())) next.email = content.errors.email;
    if (!city.trim()) next.city = content.errors.city;
    if (!profession) next.profession = content.errors.profession;
    if (!consent) next.consent = content.errors.consent;
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);

    try {
      await submitLead({
        full_name: fullName.trim(),
        mobile: mobile.trim(),
        email: email.trim(),
        city: city.trim(),
        referred_by: referralCode,
        course_interest: T2U_COURSE_INTEREST,
        source: T2U_LEAD_SOURCE,
      });
    } catch (err) {
      setSubmitting(false);
      setSubmitError(
        err instanceof T2UApiError
          ? err.message
          : locale === 'hi'
            ? 'कुछ गलत हो गया। कृपया दोबारा कोशिश करें।'
            : 'Something went wrong. Please try again.',
      );
      return;
    }

    const registrationId = generateRegistrationId();

    // Best-effort — the lead is already secured in the CRM above, so a
    // flaky email send shouldn't block the participant from reaching the
    // thank-you page.
    fetch('/api/send-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toEmail: email.trim(), toName: fullName.trim(), registrationId, locale }),
    }).catch((err) => console.error('send-confirmation request failed', err));

    saveRegistration({
      registrationId,
      fullName: fullName.trim(),
      mobileNumber: mobile.trim(),
      whatsappNumber: effectiveWhatsapp.trim(),
      email: email.trim(),
      city: city.trim(),
      profession,
      learningGoal: goal,
      webinarName: 'Women Skill Development Webinar',
      registrationDate: new Date().toISOString(),
      consentTimestamp: new Date().toISOString(),
    });

    const params = new URLSearchParams({ id: registrationId, name: fullName.trim() });
    router.push(`/thank-you?${params.toString()}`);
  }

  const inputClass =
    'w-full rounded-lg border border-ink-900/15 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-700/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200';
  const labelClass = 'mb-1.5 block text-sm font-medium text-ink-900';
  const errorClass = 'mt-1 text-xs text-red-600';

  return (
    <Section id="register" tone="tint">
      <div className="mx-auto max-w-xl">
        <SectionHeading className="mx-auto text-center">{content.heading}</SectionHeading>
        <p className="mt-4 text-center text-sm leading-6 text-ink-700 sm:text-base">{content.supporting}</p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-100 sm:p-8">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              {content.labels.fullName}
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              className={inputClass}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              aria-invalid={Boolean(errors.fullName)}
            />
            {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="mobile" className={labelClass}>
              {content.labels.mobile}
            </label>
            <input
              id="mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              maxLength={10}
              className={inputClass}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
              aria-invalid={Boolean(errors.mobile)}
            />
            {errors.mobile && <p className={errorClass}>{errors.mobile}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="whatsapp" className={labelClass}>
                {content.labels.whatsapp}
              </label>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs text-ink-700">
                <input
                  type="checkbox"
                  checked={sameAsMobile}
                  onChange={(e) => setSameAsMobile(e.target.checked)}
                  className="rounded border-ink-900/20 text-brand-600 focus:ring-brand-400"
                />
                {locale === 'hi' ? 'Mobile जैसा ही' : 'Same as mobile'}
              </label>
            </div>
            <input
              id="whatsapp"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              disabled={sameAsMobile}
              className={`${inputClass} disabled:bg-cream-100 disabled:text-ink-700/50`}
              value={effectiveWhatsapp}
              onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ''))}
              aria-invalid={Boolean(errors.whatsapp)}
            />
            {errors.whatsapp && <p className={errorClass}>{errors.whatsapp}</p>}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              {content.labels.email}
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="city" className={labelClass}>
              {content.labels.city}
            </label>
            <input
              id="city"
              type="text"
              autoComplete="address-level2"
              className={inputClass}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-invalid={Boolean(errors.city)}
            />
            {errors.city && <p className={errorClass}>{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="profession" className={labelClass}>
              {content.labels.profession}
            </label>
            <select
              id="profession"
              className={inputClass}
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              aria-invalid={Boolean(errors.profession)}
            >
              <option value="" disabled>
                {locale === 'hi' ? 'चुनें' : 'Select'}
              </option>
              {content.professionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.profession && <p className={errorClass}>{errors.profession}</p>}
          </div>

          <div>
            <label htmlFor="goal" className={labelClass}>
              {content.labels.goal} <span className="font-normal text-ink-700/60">(optional)</span>
            </label>
            <select id="goal" className={inputClass} value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="">{locale === 'hi' ? 'चुनें' : 'Select'}</option>
              {content.goalOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-start gap-2.5 text-xs leading-5 text-ink-700">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded border-ink-900/20 text-brand-600 focus:ring-brand-400"
                aria-invalid={Boolean(errors.consent)}
              />
              <span>
                {content.consent}{' '}
                <a href="/privacy" className="underline hover:text-brand-700">
                  {content.privacyLabel}
                </a>{' '}
                ·{' '}
                <a href="/terms" className="underline hover:text-brand-700">
                  {content.termsLabel}
                </a>
              </span>
            </label>
            {errors.consent && <p className={errorClass}>{errors.consent}</p>}
          </div>

          {submitError && (
            <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700" role="alert">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex min-h-11 w-full items-center justify-center rounded-full bg-linear-to-b from-brand-600 to-brand-900 text-sm font-medium text-white transition-[background-image,transform] duration-200 ease-out hover:from-brand-700 hover:to-brand-950 active:scale-[0.98] disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {submitting ? content.submittingLabel : content.submitCta}
          </button>
        </form>
      </div>
    </Section>
  );
}
