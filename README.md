# Integrity Insurance LLC Website

Next.js website for Integrity Insurance LLC, designed for Vercel deployment.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Weekly articles

Chinese article source files live in `articles/` as Markdown. Add a new `.md`
file there when a weekly column is ready. The site reads these files at build
time through `src/content/articles.ts`; do not paste full article bodies into
TypeScript.

For known recurring files, `src/content/articles.ts` maps filename to slug,
Friday publication date, category, and English summary title. If a new filename
does not yet exist in that map, add one entry so the URL and date stay stable.

Recommended future format:

```md
---
title: "文章标题"
date: "2026-05-29"
category: "联邦医保"
slug: "stable-url-slug"
newspaper: "《新世界时报》"
language: "zh"
---

Markdown article body...
```

### Admin upload publishing

The site includes an unpublished admin URL at `/admin/articles/new`. The form
uploads a `.md` file, writes frontmatter metadata, and commits the article to
the GitHub repository under `articles/`. Vercel redeploys when the commit lands
on the production branch.

Configure these environment variables in Vercel:

```bash
ADMIN_PUBLISH_PASSWORD="choose-a-strong-password"
GITHUB_TOKEN="github-fine-grained-token-with-contents-write"
GITHUB_OWNER="phillip1029"
GITHUB_REPO="integrityinsurance"
GITHUB_BRANCH="main"
```

Use a GitHub fine-grained personal access token scoped only to this repository
with **Contents: Read and write** permission. Do not commit the token or admin
password to the repository.

## Deploy

Connect this repository to Vercel and use the default Next.js build settings.
Vercel will run `npm run build` and publish the generated application.
