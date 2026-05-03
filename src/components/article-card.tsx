import Link from "next/link";
import { getArticleContent, type Article } from "@/content/articles";
import { dictionary, localePath, type Locale } from "@/lib/i18n";

export function ArticleCard({
  article,
  locale = "en",
}: {
  article: Article;
  locale?: Locale;
}) {
  const content = getArticleContent(article, locale);
  const t = dictionary[locale];

  return (
    <article className="article-card">
      <div className="eyebrow-row">
        <span>{content.category}</span>
        <time dateTime={article.date}>
          {new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(new Date(`${article.date}T12:00:00`))}
        </time>
      </div>
      <h3>
        <Link href={localePath(locale, `/articles/${article.slug}`)}>
          {content.title}
        </Link>
      </h3>
      <p>{content.dek}</p>
      <Link
        className="text-link"
        href={localePath(locale, `/articles/${article.slug}`)}
      >
        {t.common.readArticle}
      </Link>
    </article>
  );
}
