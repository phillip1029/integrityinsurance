import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Marketplace Health Insurance | Integrity Insurance LLC",
  description:
    "ACA Marketplace health insurance guidance for individuals and families.",
};

export default function MarketplacePage() {
  const locale = "en";
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
