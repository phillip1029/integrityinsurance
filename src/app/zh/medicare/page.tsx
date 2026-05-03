import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { dictionary, localePath } from "@/lib/i18n";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Medicare 保险咨询 | Integrity Insurance LLC",
  description: "Integrity Insurance LLC 提供 Medicare Advantage、Supplement 和 Part D 咨询。",
};

export default function ZhMedicarePage() {
  const locale = "zh";
  const t = dictionary[locale];

  return (
    <PageShell locale={locale} path="/medicare">
      <section className="page-hero">
        <p className="eyebrow">{t.medicare.eyebrow}</p>
        <h1>{t.medicare.headline}</h1>
        <p>{t.medicare.text}</p>
        <a className="button primary" href={site.phoneHref}>
          {t.common.call} {site.phone}
        </a>
      </section>
      <section className="page-section two-column">
        <div>
          <h2>{t.medicare.reviewTitle}</h2>
          <ul className="check-list">
            {t.medicare.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="info-panel">
          <h3>{t.medicare.panelTitle}</h3>
          <p>{t.medicare.panelText}</p>
          <Link className="text-link" href={localePath(locale, "/contact")}>
            {t.common.requestConsultation}
          </Link>
          <a
            className="text-link"
            href={site.schedulingUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {t.common.scheduleMeeting}
          </a>
        </div>
      </section>
    </PageShell>
  );
}
