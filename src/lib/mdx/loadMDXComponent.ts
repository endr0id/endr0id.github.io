import type { ComponentType } from "react";
import { ARTICLE_PATH } from "./constants";

export async function loadMDXComponent(locale: string, slug: string) {
  const module = (await import(
    `@/${ARTICLE_PATH}/${locale}/${slug}/index.mdx`
  )) as { default: ComponentType<any> };

  return module.default;
}
