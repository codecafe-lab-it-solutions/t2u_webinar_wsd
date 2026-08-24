import { getContent, type Locale } from '@/lib/content';

export function buildConfirmationEmail({
  toName,
  registrationId,
  locale,
}: {
  toName: string;
  registrationId: string;
  locale: Locale;
}): { subject: string; html: string } {
  const content = getContent(locale);
  const isHi = locale === 'hi';

  const subject = isHi
    ? 'आपका Registration Confirm हो गया है — Women Skill Development Webinar'
    : 'Your Registration is Confirmed — Women Skill Development Webinar';

  const eventRows = content.eventInfo.items
    .map(
      (item) => `
        <tr>
          <td style="padding:6px 12px 6px 0;color:#4a3f4f;font-size:13px;">${item.label}</td>
          <td style="padding:6px 0;color:#241b2f;font-size:13px;font-weight:600;">${item.value}</td>
        </tr>`,
    )
    .join('');

  const instructions = content.thankYou.instructions
    .map((line) => `<li style="margin-bottom:6px;">${line}</li>`)
    .join('');

  const html = `
  <div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;background:#fffaf5;padding:32px 16px;" lang="${locale}">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #ffe1ea;">
      <p style="font-size:28px;margin:0 0 8px;">🎉</p>
      <h1 style="font-size:20px;color:#241b2f;margin:0 0 16px;">${content.thankYou.heading}</h1>
      <p style="font-size:14px;color:#4a3f4f;margin:0 0 20px;">${isHi ? 'नमस्ते' : 'Hi'} ${toName},</p>
      <table style="width:100%;border-collapse:collapse;background:#fff3ea;border-radius:12px;padding:16px;margin-bottom:20px;">
        <tr>
          <td style="padding:6px 12px 6px 0;color:#4a3f4f;font-size:13px;">${content.thankYou.labels.registrationId}</td>
          <td style="padding:6px 0;color:#241b2f;font-size:13px;font-weight:600;font-family:monospace;">${registrationId}</td>
        </tr>
        ${eventRows}
      </table>
      <ul style="font-size:13px;color:#4a3f4f;padding-left:18px;margin:0 0 20px;">
        ${instructions}
      </ul>
      <p style="font-size:12px;color:#4a3f4f99;margin:0;">${content.thankYou.supportNote}</p>
    </div>
  </div>`;

  return { subject, html };
}
