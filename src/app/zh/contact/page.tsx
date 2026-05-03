import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "联系 | Integrity Insurance LLC",
  description: "联系 Integrity Insurance LLC 预约 Medicare 或 Marketplace 健康保险咨询。",
};

export default function ZhContactPage() {
  const locale = "zh";
  const t = dictionary[locale];

  return (
    <PageShell locale={locale} path="/contact">
      <section className="page-hero compact">
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h1>{t.contact.headline}</h1>
        <p>{t.contact.text}</p>
      </section>
      <section className="contact-layout page-section">
        <div className="contact-card">
          <h2>{t.contact.officeTitle}</h2>
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={site.emailHref}>{site.email}</a>
          <a href={site.schedulingUrl} rel="noopener noreferrer" target="_blank">
            {t.common.scheduleMeeting}
          </a>
          <p>{site.location}</p>
        </div>
        <div className="info-panel">
          <h2>{t.contact.scheduleTitle}</h2>
          <p>{t.contact.scheduleText}</p>
          <a
            className="button primary contact-schedule"
            href={site.schedulingUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {t.common.scheduleMeeting}
          </a>
        </div>
        <div className="info-panel">
          <h2>{t.contact.consentTitle}</h2>
          <p>{t.contact.consentText}</p>
        </div>
      </section>
    </PageShell>
  );
}
