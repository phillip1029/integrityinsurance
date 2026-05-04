import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/lib/i18n";

export type ArticleCategory = "Medicare" | "Marketplace" | "Planning";

export type LocalizedArticleContent = {
  title: string;
  dek: string;
  category: string;
  readTime: string;
  newspaper?: string;
  body: string[];
  markdown?: string;
};

export type Article = {
  slug: string;
  date: string;
  category: ArticleCategory;
  sourcePath: string;
  translations: Record<Locale, LocalizedArticleContent>;
};

type Frontmatter = Partial<{
  title: string;
  date: string;
  category: string;
  slug: string;
  enTitle: string;
  newspaper: string;
  language: Locale;
}>;

const articlesDirectory = path.join(process.cwd(), "articles");

const fileMetadata: Record<
  string,
  {
    slug: string;
    date: string;
    category: ArticleCategory;
    enTitle: string;
  }
> = {
  "联邦医保系列2025 - OEP.md": {
    slug: "medicare-advantage-oep",
    date: "2026-01-02",
    category: "Medicare",
    enTitle: "Understanding the Federal Medicare Advantage OEP",
  },
  "联邦医保系列2026 - IRMAA.md": {
    slug: "irmaa-reconsideration",
    date: "2026-01-09",
    category: "Medicare",
    enTitle:
      "IRMAA Went Up? How to Request a Reconsideration After Income Drops",
  },
  "联邦医保系列2026 - 新医保卡 新规则.md": {
    slug: "new-card-new-rules",
    date: "2026-01-16",
    category: "Medicare",
    enTitle: "New Federal Medicare Card, New Rules: What to Do When It Does Not Work",
  },
  "联邦医保系列2026 - new year new cost.md": {
    slug: "new-year-new-costs",
    date: "2026-01-23",
    category: "Medicare",
    enTitle: "New Year, New Costs: Budgeting for Deductible Resets",
  },
  "联邦医保系列2026 - SEP.md": {
    slug: "special-enrollment-periods",
    date: "2026-02-06",
    category: "Medicare",
    enTitle: "Using Special Enrollment Periods to Change Coverage in 2026",
  },
  "联邦医保系列2026 - T65.md": {
    slug: "turning-65-enrollment-guide",
    date: "2026-02-13",
    category: "Medicare",
    enTitle: "Turning 65: A Federal Medicare Enrollment Guide",
  },
  "联邦医保系列2026：社会安全局（SSA）身份验证指南（专栏版）.md": {
    slug: "ssa-identity-verification-guide",
    date: "2026-02-27",
    category: "Medicare",
    enTitle: "Social Security Administration Identity Verification Guide",
  },
  "联邦医保系列2026 - SSCBI.md": {
    slug: "ssbci-benefit-changes",
    date: "2026-03-06",
    category: "Medicare",
    enTitle: "2026 SSBCI Changes for Chronic Condition Benefits",
  },
  "联邦医保系列2026 - Part A Premiums.md": {
    slug: "part-a-premiums",
    date: "2026-03-13",
    category: "Medicare",
    enTitle: "2026 Federal Medicare Part A Costs: What You May Pay",
  },
  "联邦医保系列2026 - Part B premiums.md": {
    slug: "part-b-premiums",
    date: "2026-03-20",
    category: "Medicare",
    enTitle: "2026 Federal Medicare Part B Premium Increase: What It Means",
  },
  "联邦医保系列2026 - 税表.md": {
    slug: "marketplace-tax-documents",
    date: "2026-03-27",
    category: "Marketplace",
    enTitle: "Tax Season: Marketplace Documents Enrollees Should Prepare",
  },
  "联邦医保系列2026 - Extra Help LIS.md": {
    slug: "extra-help-lis",
    date: "2026-04-10",
    category: "Medicare",
    enTitle: "Extra Help LIS: A Federal Prescription Drug Subsidy Worth Reviewing",
  },
  "联邦医保系列2026 - SLMB.md": {
    slug: "slmb-part-b-premium-help",
    date: "2026-04-17",
    category: "Medicare",
    enTitle: "SLMB: Who May Get Help With Part B Premiums",
  },
  "联邦医保系列2026 - HMO和PPO.md": {
    slug: "hmo-vs-ppo",
    date: "2026-04-24",
    category: "Medicare",
    enTitle: "Understanding HMO and PPO Federal Medicare Advantage Plans",
  },
  "联邦医保系列2026 - 医疗保险费用对话.md": {
    slug: "health-insurance-cost-conversation",
    date: "2026-05-01",
    category: "Planning",
    enTitle: "Is Health Insurance Expensive? A Conversation About Medical Cost Risk",
  },
};

export function getArticle(slug: string) {
  return getArticles().find((article) => article.slug === slug);
}

export function getArticleContent(article: Article, locale: Locale) {
  return article.translations[locale];
}

export function getArticlesNewestFirst() {
  return [...getArticles()].sort((a, b) => b.date.localeCompare(a.date));
}

export function getFeaturedArticles(limit = 3) {
  return getArticlesNewestFirst().slice(0, limit);
}

export function getArticles() {
  return readArticleFiles();
}

function readArticleFiles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => readArticleFile(fileName))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function readArticleFile(fileName: string): Article {
  const sourcePath = path.join(articlesDirectory, fileName);
  const raw = fs.readFileSync(sourcePath, "utf8");
  const { frontmatter, content } = parseMarkdownFile(raw);
  const title = frontmatter.title ?? extractTitle(content);
  const metadata = fileMetadata[fileName] ?? fallbackMetadata(fileName, title);
  const markdown = removeTitle(content, title);
  const category = normalizeCategory(frontmatter.category) ?? metadata.category;
  const date = frontmatter.date ?? metadata.date;
  const slug = frontmatter.slug ?? metadata.slug;
  const enTitle = frontmatter.enTitle ?? metadata.enTitle;
  const zhDek = extractDescription(markdown);
  const zhReadTime = `约 ${estimateReadTime(markdown, "zh")} 分钟`;
  const enReadTime = `${estimateReadTime(markdown, "en")} min read`;
  const newspaper = frontmatter.newspaper ?? "《新世界时报》";

  return {
    slug,
    date,
    category,
    sourcePath,
    translations: {
      en: {
        title: enTitle,
        dek: `A New World Times column about ${enTitle.toLowerCase()}.`,
        category: getLocalizedCategory(category, "en"),
        readTime: enReadTime,
        newspaper: "New World Times",
        body: [
          "This column was originally published in Simplified Chinese in New World Times. Use the Simplified Chinese version of this article for the full original text.",
        ],
      },
      zh: {
        title,
        dek: zhDek,
        category: getLocalizedCategory(category, "zh"),
        readTime: zhReadTime,
        newspaper,
        body: markdownToPlainParagraphs(markdown),
        markdown,
      },
    },
  };
}

function parseMarkdownFile(raw: string) {
  const normalized = normalizeTerms(raw).replace(/\r\n/g, "\n");

  if (!normalized.startsWith("---\n")) {
    return {
      frontmatter: {},
      content: normalizeMarkdownFormatting(stripUnsupportedBlocks(normalized)),
    };
  }

  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) {
    return {
      frontmatter: {},
      content: normalizeMarkdownFormatting(stripUnsupportedBlocks(normalized)),
    };
  }

  return {
    frontmatter: parseFrontmatter(normalized.slice(4, end)),
    content: normalizeMarkdownFormatting(
      stripUnsupportedBlocks(normalized.slice(end + 5)),
    ),
  };
}

function parseFrontmatter(source: string): Frontmatter {
  return Object.fromEntries(
    source
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separator = line.indexOf(":");
        if (separator === -1) {
          return [line, ""];
        }
        const key = line.slice(0, separator).trim();
        const value = line
          .slice(separator + 1)
          .trim()
          .replace(/^["']|["']$/g, "");
        return [key, value];
      }),
  );
}

function extractTitle(markdown: string) {
  const firstContentLine =
    markdown
      .split("\n")
      .map((line) => line.trim())
      .find((line) => line && !line.startsWith("<style")) ?? "Article";

  return firstContentLine
    .replace(/^#{1,6}\s+/, "")
    .replace(/^《(.+)》$/, "$1")
    .trim();
}

function removeTitle(markdown: string, title: string) {
  const lines = markdown.split("\n");
  const index = lines.findIndex((line) => {
    const normalized = line
      .trim()
      .replace(/^#{1,6}\s+/, "")
      .replace(/^《(.+)》$/, "$1")
      .trim();
    return normalized === title;
  });

  if (index === -1) {
    return markdown.trim();
  }

  return [...lines.slice(0, index), ...lines.slice(index + 1)].join("\n").trim();
}

function extractDescription(markdown: string) {
  const skipPatterns = [
    /^【/,
    /^!\[/,
    /^联邦医保系列2026$/,
    /^健康保险代理人答谢/,
    /^扫码/,
    /^地点：/,
    /^时间：/,
    /^请有意者/,
  ];

  const paragraph =
    markdownToPlainParagraphs(markdown).find(
      (entry) =>
        entry.length > 24 &&
        !skipPatterns.some((pattern) => pattern.test(entry)) &&
        !entry.includes("诚邀加入联邦医保经纪团队") &&
        !entry.includes("Top 100 Producers"),
    ) ?? "";

  return paragraph.length > 180 ? `${paragraph.slice(0, 177)}...` : paragraph;
}

function markdownToPlainParagraphs(markdown: string) {
  return markdown
    .split(/\n{2,}/)
    .map((block) =>
      block
        .replace(/```[\s\S]*?```/g, "")
        .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
        .replace(/\[[^\]]+\]\(([^)]+)\)/g, "")
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/^\s*[-*+]\s+/gm, "")
        .replace(/^\s*•\s*/gm, "")
        .replace(/^\s*\d+[.)]\s*/gm, "")
        .replace(/[*_`>|-]/g, "")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);
}

function estimateReadTime(markdown: string, locale: Locale) {
  const plain = markdownToPlainParagraphs(markdown).join("");
  const divisor = locale === "zh" ? 650 : 220;
  return Math.max(3, Math.round(plain.length / divisor));
}

function normalizeTerms(markdown: string) {
  return markdown
    .replace(/Original Medicare/g, "原始联邦医保")
    .replace(/original Medicare/g, "原始联邦医保")
    .replace(/Medicare Advantage/g, "联邦医保优势计划")
    .replace(/Medicare Supplement/g, "联邦医保补充保险")
    .replace(/Medicare Part/g, "联邦医保 Part")
    .replace(/Medicare Savings Program/g, "联邦医保储蓄计划")
    .replace(/(?<![A-Za-z.-])Medicare(?!\.gov|[A-Za-z.-])/g, "联邦医保")
    .replace(/原始联邦医保（原始联邦医保[^）]*）/g, "原始联邦医保")
    .replace(/联邦医保优势计划（联邦医保优势计划[^）]*）/g, "联邦医保优势计划")
    .replace(/联邦医保补充保险（联邦医保补充保险[^）]*）/g, "联邦医保补充保险");
}

function stripUnsupportedBlocks(markdown: string) {
  return markdown.replace(/<style[\s\S]*?<\/style>/gi, "").trim();
}

function normalizeMarkdownFormatting(markdown: string) {
  return markdown
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (/^•\s+/.test(trimmed)) {
        return line.replace(/^(\s*)•\s+/, "$1- ");
      }
      if (/^【[^】]+】$/.test(trimmed)) {
        return `### ${trimmed}`;
      }
      if (/^[一二三四五六七八九十]+、\S/.test(trimmed) && trimmed.length < 80) {
        return `## ${trimmed}`;
      }
      return line;
    })
    .join("\n")
    .trim();
}

function normalizeCategory(category?: string): ArticleCategory | undefined {
  if (!category) {
    return undefined;
  }
  if (/marketplace|aca|税表/i.test(category)) {
    return "Marketplace";
  }
  if (/planning|费用|保险规划/i.test(category)) {
    return "Planning";
  }
  return "Medicare";
}

function getLocalizedCategory(category: ArticleCategory, locale: Locale) {
  const labels = {
    en: {
      Medicare: "Federal Medicare",
      Marketplace: "Marketplace",
      Planning: "Planning",
    },
    zh: {
      Medicare: "联邦医保",
      Marketplace: "Marketplace 健康保险",
      Planning: "保险规划",
    },
  };

  return labels[locale][category];
}

function fallbackMetadata(fileName: string, title: string) {
  const slug = fileName
    .replace(/\.md$/, "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-|-$/g, "");

  return {
    slug,
    date: "2026-12-31",
    category: "Medicare" as const,
    enTitle: title,
  };
}
