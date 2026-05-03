import type { MetadataRoute } from "next";
import { getArticles } from "@/content/articles";
import { localePath, locales } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles();
  const routes = [
    "",
    "/medicare",
    "/marketplace",
    "/life-insurance",
    "/articles",
    "/contact",
    "/privacy",
  ];

  return locales.flatMap((locale) => [
    ...routes.map((route) => ({
      url: `${site.url}${localePath(locale, route)}`,
      lastModified: new Date(),
    })),
    ...articles.map((article) => ({
      url: `${site.url}${localePath(locale, `/articles/${article.slug}`)}`,
      lastModified: new Date(`${article.date}T12:00:00`),
    })),
  ]);
}
