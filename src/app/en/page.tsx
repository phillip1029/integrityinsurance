import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { PageShell } from "@/components/page-shell";
import { getFeaturedArticles } from "@/content/articles";
import { dictionary, localePath } from "@/lib/i18n";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Integrity Insurance LLC | Medicare and Marketplace Guidance",
  description:
    "Integrity Insurance LLC helps clients compare Medicare, Marketplace health insurance, and life insurance options.",
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      "zh-CN": "/",
    },
  },
};

export default function Home() {
  const locale = "en";
  const t = dictionary[locale];
  const featuredArticles = getFeaturedArticles();

  return (
    <PageShell locale={locale} path="/">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{t.home.eyebrow}</p>
          <h1>{t.home.headline}</h1>
          <p className="hero-lede">{t.home.lede}</p>
          <div className="hero-actions">
            <a className="button primary" href={site.phoneHref}>
              {t.common.call} {site.phone}
            </a>
            <a
              className="button secondary"
              href={site.schedulingUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t.common.requestConsultation}
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Consultation highlights">
          <Image
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
            alt={t.home.heroAlt}
            fill
            priority
            sizes="(max-width: 980px) 100vw, 46vw"
          />
          <div className="hero-stat">
            <strong>{t.home.statTitle}</strong>
            <span>{t.home.statText}</span>
          </div>
        </div>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">{t.home.whatWeDo}</p>
          <h2>{t.home.whatWeDoHeadline}</h2>
        </div>
        <p className="section-lede">{t.home.whatWeDoText}</p>
      </section>

      <section className="service-grid" aria-label="Insurance services">
        {t.home.services.map((service) => (
          <Link
            className="service-card"
            href={localePath(locale, service.href)}
            key={service.title}
          >
            <span>{service.title}</span>
            <p>{service.text}</p>
          </Link>
        ))}
      </section>

      <section className="section process-band">
        <div>
          <p className="eyebrow">{t.home.processEyebrow}</p>
          <h2>{t.home.processHeadline}</h2>
        </div>
        <ol className="process-list">
          {t.home.process.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="section articles-preview">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.home.articlesEyebrow}</p>
            <h2>{t.home.articlesHeadline}</h2>
          </div>
          <Link className="text-link" href={localePath(locale, "/articles")}>
            {t.common.viewAllArticles}
          </Link>
        </div>
        <div className="article-grid">
          {featuredArticles.map((article) => (
            <ArticleCard article={article} locale={locale} key={article.slug} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
