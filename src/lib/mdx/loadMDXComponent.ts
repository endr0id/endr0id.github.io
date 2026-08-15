import type { ComponentType } from "react";
import { ARTICLE_PATH } from "./constants";
import type { ArticleIdentifier } from "./types";

export async function loadMDXComponent(
  slug: ArticleIdentifier["slug"],
  locale: ArticleIdentifier["locale"],
) {
  const modulePath = `@/${ARTICLE_PATH}/${slug}/${locale}/index.mdx`;
  const module: { default: ComponentType } = await import(modulePath);
  return module.default;
}
