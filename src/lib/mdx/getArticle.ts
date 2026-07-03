import { readFile } from "node:fs/promises";

export async function getArticle(slug: string) {
  switch (slug) {
    case "react":
      const markdown = await readFile(
        "app/blog/_contents/article.mdx",
        "utf-8",
      );

      const module = await import("@/app/blog/_contents/article.mdx");

      return {
        Component: module.default,
        markdown,
      };

    default:
      return null;
  }
}
