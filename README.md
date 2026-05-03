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

## Deploy

Connect this repository to Vercel and use the default Next.js build settings.
Vercel will run `npm run build` and publish the generated application.
