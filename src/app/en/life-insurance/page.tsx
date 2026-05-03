import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Life Insurance | Integrity Insurance LLC",
  description:
    "Term life, whole life, and final expense insurance guidance from Integrity Insurance LLC.",
};

export default function LifeInsurancePage() {
  const locale = "en";
  const t = dictionary[locale];

  return (
    <PageShell locale={locale} path="/life-insurance">
      <section className="page-hero compact">
        <p className="eyebrow">{t.life.eyebrow}</p>
        <h1>{t.life.headline}</h1>
        <p>{t.life.text}</p>
      </section>
      <section className="service-grid page-section">
        {t.life.products.map((item) => (
          <div className="service-card muted" key={item}>
            <span>{item}</span>
            <p>{t.life.productText}</p>
          </div>
        ))}
      </section>
      <section className="cta-band">
        <h2>{t.life.cta}</h2>
        <a
          className="button primary"
          href={site.schedulingUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t.life.ctaButton}
        </a>
      </section>
    </PageShell>
  );
}
