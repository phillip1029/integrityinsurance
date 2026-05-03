import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { PageShell } from "@/components/page-shell";
import {
  getArticle,
  getArticleContent,
  getArticles,
} from "@/content/articles";
import { dictionary, localePath } from "@/lib/i18n";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {};
  }

  const content = getArticleContent(article, "en");

  return {
    title: `${content.title} | Integrity Insurance LLC`,
    description: content.dek,
  };
}

export default async function ArticlePage({ params }: Props) {
  const locale = "en";
  const t = dictionary[locale];
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const content = getArticleContent(article, locale);
  const path = `/articles/${article.slug}`;

  return (
    <PageShell locale={locale} path={path}>
      <article className="article-detail">
        <Link className="text-link" href={localePath(locale, "/articles")}>
          {t.common.backToArticles}
        </Link>
        <div className="eyebrow-row">
          <span>{content.category}</span>
          <time dateTime={article.date}>
            {new Intl.DateTimeFormat("en", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).format(new Date(`${article.date}T12:00:00`))}
          </time>
          <span>{content.readTime}</span>
        </div>
        <h1>{content.title}</h1>
        <p className="article-dek">{content.dek}</p>
        {content.newspaper ? (
          <p className="source-note">
            {t.common.originallyPreparedFor} {content.newspaper}
          </p>
        ) : null}
        {content.markdown ? (
          <MarkdownContent markdown={content.markdown} />
        ) : (
          <div className="article-body">
            {content.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
      </article>
    </PageShell>
  );
}
