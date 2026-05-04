"use client";

import { useId, useState } from "react";

type PublishResult = {
  articlePath?: string;
  commitUrl?: string;
  message?: string;
};

const categories = [
  { value: "Medicare", label: "联邦医保" },
  { value: "Marketplace", label: "Marketplace 健康保险" },
  { value: "Planning", label: "保险规划" },
];

export function AdminArticleForm() {
  const fileId = useId();
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle",
  );
  const [result, setResult] = useState<PublishResult>({});

  async function publishArticle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setResult({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/admin/articles", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as PublishResult;

      if (!response.ok) {
        throw new Error(payload.message ?? "Unable to publish article.");
      }

      setStatus("success");
      setResult(payload);
      form.reset();
    } catch (error) {
      setStatus("error");
      setResult({
        message:
          error instanceof Error ? error.message : "Unable to publish article.",
      });
    }
  }

  return (
    <form className="admin-form" onSubmit={publishArticle}>
      <div className="form-grid">
        <label>
          管理员密码
          <input
            autoComplete="current-password"
            name="password"
            required
            type="password"
          />
        </label>
        <label>
          发布日期
          <input name="date" required type="date" />
        </label>
      </div>

      <label>
        中文标题
        <input name="title" placeholder="文章标题" required type="text" />
      </label>

      <div className="form-grid">
        <label>
          URL slug
          <input
            name="slug"
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            placeholder="medicare-weekly-update"
            required
            type="text"
          />
        </label>
        <label>
          分类
          <select defaultValue="Medicare" name="category" required>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        英文摘要标题
        <input
          name="enTitle"
          placeholder="English reference title for the English article list"
          required
          type="text"
        />
      </label>

      <label>
        报纸名称
        <input defaultValue="《新世界时报》" name="newspaper" type="text" />
      </label>

      <label htmlFor={fileId}>
        Markdown 文件
        <input
          accept=".md,text/markdown,text/plain"
          id={fileId}
          name="file"
          required
          type="file"
        />
      </label>

      <label className="checkbox-row">
        <input name="overwrite" type="checkbox" value="true" />
        如果同名文章已经存在，覆盖并创建新的提交
      </label>

      <button
        className="button primary"
        disabled={status === "saving"}
        type="submit"
      >
        {status === "saving" ? "发布中..." : "发布文章"}
      </button>

      {status === "success" ? (
        <div className="form-message success" role="status">
          <strong>文章已提交到 GitHub。</strong>
          <span>{result.articlePath}</span>
          {result.commitUrl ? (
            <a href={result.commitUrl} rel="noopener noreferrer" target="_blank">
              查看提交
            </a>
          ) : null}
        </div>
      ) : null}

      {status === "error" ? (
        <div className="form-message error" role="alert">
          {result.message}
        </div>
      ) : null}
    </form>
  );
}
