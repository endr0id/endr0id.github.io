import { readFile } from "node:fs/promises";
import { ARTICLE_PATH } from "./constants";
import type { ArticleIdentifier } from "./types";

export async function getMarkdownContent(
  slug: ArticleIdentifier["slug"],
  locale: ArticleIdentifier["locale"],
): Promise<string> {
  const filePath = `${ARTICLE_PATH}/${slug}/${locale}/index.mdx`;
  return await readFile(filePath, "utf-8");
}
