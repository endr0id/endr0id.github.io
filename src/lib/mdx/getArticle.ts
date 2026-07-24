import type { ComponentType } from "react";
import { readFile } from "node:fs/promises";
import { ARTICLE_ROOT } from "@/src/constants";
import { loadMDXComponent } from "./loadMDXComponent";

interface ArticleMetadata {
  Component: ComponentType<any>;
  markdown: string;
}

export async function getArticle(
  locale: string,
  slug: string,
): Promise<ArticleMetadata> {
  const filePath = `${ARTICLE_ROOT}/${locale}/${slug}/index.mdx`;
  const markdown = await readFile(filePath, "utf-8");
  const Component = await loadMDXComponent(locale, slug);

  return {
    Component,
    markdown,
  };
}
