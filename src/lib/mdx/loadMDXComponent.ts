import type { ComponentType } from "react";
import { ARTICLE_ROOT } from "@/src/constants";

export async function loadMDXComponent(locale: string, slug: string) {
  const module = (await import(
    `@/${ARTICLE_ROOT}/${locale}/${slug}/index.mdx`
  )) as { default: ComponentType<any> };

  return module.default;
}
