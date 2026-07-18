import { readFile } from "node:fs/promises";
import { ARTICLE_ROOT } from "@/src/constants";

export async function getArticle(locale: string, slug: string) {
  const filePath = `${ARTICLE_ROOT}/${locale}/${slug}/index.mdx`;
  const markdown = await readFile(filePath, "utf-8");

  const module = await import(`@/${ARTICLE_ROOT}/${locale}/${slug}/index.mdx`);

  return {
    Component: module.default,
    markdown,
  };
}
