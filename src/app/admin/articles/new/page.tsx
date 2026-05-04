import type { Metadata } from "next";
import { AdminArticleForm } from "@/components/admin-article-form";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "发布文章 | Integrity Insurance LLC",
  description: "管理员上传 Markdown 文章并发布到网站。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewArticlePage() {
  return (
    <PageShell locale="zh" path="/admin/articles/new">
      <section className="page-hero compact">
        <p className="eyebrow">管理员</p>
        <h1>发布每周文章</h1>
        <p>
          上传已经发表的 Markdown 文件，填写发布日期和分类。提交后会写入
          GitHub 仓库的 articles 文件夹，并触发 Vercel 重新部署。
        </p>
      </section>
      <section className="admin-section">
        <div className="admin-panel">
          <AdminArticleForm />
        </div>
      </section>
    </PageShell>
  );
}
