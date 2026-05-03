import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { PageShell } from "@/components/page-shell";
import { getArticlesNewestFirst } from "@/content/articles";
import { dictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "文章 | Integrity Insurance LLC",
  description: "Integrity Insurance LLC 的 Medicare 与 Marketplace 健康保险文章。",
};

export default function ZhArticlesPage() {
  const locale = "zh";
  const t = dictionary[locale];
  const articleList = getArticlesNewestFirst();

  return (
    <PageShell locale={locale} path="/articles">
      <section className="page-hero compact">
        <p className="eyebrow">{t.articles.title}</p>
        <h1>{t.articles.headline}</h1>
        <p>{t.articles.text}</p>
      </section>
      <section className="article-grid page-section">
        {articleList.map((article) => (
          <ArticleCard article={article} locale={locale} key={article.slug} />
        ))}
      </section>
    </PageShell>
  );
}
