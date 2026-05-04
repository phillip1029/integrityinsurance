import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

const maxFileBytes = 1024 * 1024;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const categories = new Set(["Medicare", "Marketplace", "Planning"]);

type GitHubContentResponse = {
  sha?: string;
};

type GitHubCommitResponse = {
  commit?: {
    html_url?: string;
  };
  content?: {
    path?: string;
  };
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const password = getField(formData, "password");

    if (!process.env.ADMIN_PUBLISH_PASSWORD) {
      return jsonError("ADMIN_PUBLISH_PASSWORD is not configured.", 500);
    }

    if (!passwordMatches(password, process.env.ADMIN_PUBLISH_PASSWORD)) {
      return jsonError("管理员密码不正确。", 401);
    }

    const file = formData.get("file");
    if (!(file instanceof File)) {
      return jsonError("请选择一个 Markdown 文件。", 400);
    }

    if (!file.name.endsWith(".md")) {
      return jsonError("只支持 .md 文件。", 400);
    }

    if (file.size > maxFileBytes) {
      return jsonError("文件太大，请上传小于 1MB 的 Markdown 文件。", 400);
    }

    const title = getField(formData, "title");
    const date = getField(formData, "date");
    const slug = getField(formData, "slug");
    const category = getField(formData, "category");
    const enTitle = getField(formData, "enTitle");
    const newspaper = getField(formData, "newspaper") || "《新世界时报》";
    const overwrite = formData.get("overwrite") === "true";

    const validationError = validateMetadata({
      title,
      date,
      slug,
      category,
      enTitle,
    });
    if (validationError) {
      return jsonError(validationError, 400);
    }

    const rawMarkdown = await file.text();
    const markdown = withFrontmatter(stripFrontmatter(rawMarkdown), {
      title,
      date,
      slug,
      category,
      enTitle,
      newspaper,
    });

    const articlePath = `articles/${date}-${slug}.md`;
    const commit = await publishToGitHub({
      articlePath,
      content: markdown,
      overwrite,
    });

    return NextResponse.json({
      articlePath: commit.content?.path ?? articlePath,
      commitUrl: commit.commit?.html_url,
      message: "Article published.",
    });
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : "Unable to publish article.",
      500,
    );
  }
}

function getField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validateMetadata({
  title,
  date,
  slug,
  category,
  enTitle,
}: {
  title: string;
  date: string;
  slug: string;
  category: string;
  enTitle: string;
}) {
  if (!title) {
    return "请填写中文标题。";
  }
  if (
    !datePattern.test(date) ||
    Number.isNaN(Date.parse(`${date}T12:00:00Z`))
  ) {
    return "请填写有效发布日期。";
  }
  if (!slugPattern.test(slug)) {
    return "URL slug 只能使用小写字母、数字和连字符。";
  }
  if (!categories.has(category)) {
    return "请选择有效分类。";
  }
  if (!enTitle) {
    return "请填写英文摘要标题。";
  }
  return "";
}

function stripFrontmatter(markdown: string) {
  const normalized = markdown.replace(/\r\n/g, "\n").trim();
  if (!normalized.startsWith("---\n")) {
    return normalized;
  }

  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) {
    return normalized;
  }

  return normalized.slice(end + 5).trim();
}

function withFrontmatter(
  markdown: string,
  metadata: {
    title: string;
    date: string;
    slug: string;
    category: string;
    enTitle: string;
    newspaper: string;
  },
) {
  const frontmatter = [
    "---",
    `title: ${quoteYaml(metadata.title)}`,
    `date: ${quoteYaml(metadata.date)}`,
    `category: ${quoteYaml(metadata.category)}`,
    `slug: ${quoteYaml(metadata.slug)}`,
    `enTitle: ${quoteYaml(metadata.enTitle)}`,
    `newspaper: ${quoteYaml(metadata.newspaper)}`,
    'language: "zh"',
    "---",
    "",
  ];

  return `${frontmatter.join("\n")}${markdown.trim()}\n`;
}

function quoteYaml(value: string) {
  return JSON.stringify(value);
}

async function publishToGitHub({
  articlePath,
  content,
  overwrite,
}: {
  articlePath: string;
  content: string;
  overwrite: boolean;
}) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER ?? process.env.VERCEL_GIT_REPO_OWNER;
  const repo = process.env.GITHUB_REPO ?? process.env.VERCEL_GIT_REPO_SLUG;
  const branch =
    process.env.GITHUB_BRANCH ?? process.env.VERCEL_GIT_COMMIT_REF ?? "main";

  if (!token || !owner || !repo) {
    throw new Error(
      "GitHub publishing is not configured. Set GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, and optionally GITHUB_BRANCH.",
    );
  }

  const encodedPath = articlePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}`;
  const existing = await getExistingContent(url, token, branch);

  if (existing?.sha && !overwrite) {
    throw new Error("同名文章已经存在。勾选覆盖后再提交，或更换发布日期/slug。");
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: githubHeaders(token),
    body: JSON.stringify({
      message: `Publish article: ${articlePath}`,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch,
      sha: existing?.sha,
    }),
  });

  if (!response.ok) {
    throw new Error(await githubErrorMessage(response));
  }

  return (await response.json()) as GitHubCommitResponse;
}

async function getExistingContent(url: string, token: string, branch: string) {
  const response = await fetch(`${url}?ref=${encodeURIComponent(branch)}`, {
    headers: githubHeaders(token),
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(await githubErrorMessage(response));
  }

  return (await response.json()) as GitHubContentResponse;
}

function githubHeaders(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function githubErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as { message?: string };
    return payload.message
      ? `GitHub API error: ${payload.message}`
      : `GitHub API error: ${response.status}`;
  } catch {
    return `GitHub API error: ${response.status}`;
  }
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

function passwordMatches(candidate: string, expected: string) {
  const candidateBuffer = Buffer.from(candidate);
  const expectedBuffer = Buffer.from(expected);

  return (
    candidateBuffer.length === expectedBuffer.length &&
    timingSafeEqual(candidateBuffer, expectedBuffer)
  );
}
