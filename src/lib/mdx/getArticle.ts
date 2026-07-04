import { readFile } from "node:fs/promises";

const ARTICLE_PATHS: Record<string, { file: string; import: string }> = {
  react: {
    file: "app/blog/_contents/article.mdx",
    import: "@/app/blog/_contents/article.mdx",
  },
};

export async function getArticle(slug: string) {
  const config = ARTICLE_PATHS[slug];

  if (!config) return null;

  const markdown = await readFile(config.file, "utf-8");
  const module = await import(config.import);

  return {
    Component: module.default,
    markdown,
  };
}
