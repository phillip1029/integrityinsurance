import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { dictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Privacy Policy | Integrity Insurance LLC",
  description: "Privacy policy for Integrity Insurance LLC.",
};

export default function PrivacyPage() {
  const locale = "en";
  const t = dictionary[locale];

  return (
    <PageShell locale={locale} path="/privacy">
      <section className="article-detail">
        <p className="eyebrow">{t.privacy.eyebrow}</p>
        <h1>{t.privacy.headline}</h1>
        <div className="article-body">
          {t.privacy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
