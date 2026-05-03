import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Marketplace 健康保险 | Integrity Insurance LLC",
  description: "为个人和家庭提供 ACA Marketplace 健康保险咨询。",
};

export default function ZhMarketplacePage() {
  const locale = "zh";
  const t = dictionary[locale];

  return (
    <PageShell locale={locale} path="/marketplace">
      <section className="page-hero marketplace">
        <p className="eyebrow">{t.marketplace.eyebrow}</p>
        <h1>{t.marketplace.headline}</h1>
        <p>{t.marketplace.text}</p>
        <a
          className="button primary"
          href={site.schedulingUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t.common.startReview}
        </a>
      </section>
      <section className="page-section two-column">
        <div>
          <h2>{t.marketplace.reviewTitle}</h2>
          <ul className="check-list">
            {t.marketplace.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="info-panel">
          <h3>{t.marketplace.panelTitle}</h3>
          <p>{t.marketplace.panelText}</p>
        </div>
      </section>
    </PageShell>
  );
}
