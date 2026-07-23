import { readdir } from "node:fs/promises";
import { ARTICLE_ROOT } from "@/src/constants";

export interface ArticleParam {
  locale: string;
  slug: string;
}

export async function getArticleParams(): Promise<ArticleParam[]> {
  const dirEntries = await readdir(ARTICLE_ROOT, { withFileTypes: true });

  const params = await Promise.all(
    dirEntries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const slug = entry.name;
        const locales = await readdir(`${ARTICLE_ROOT}/${slug}`, {
          withFileTypes: true,
        });

        return locales
          .filter((entry) => entry.isDirectory())
          .map((entry) => ({ slug, locale: entry.name }));
      }),
  );

  return params.flat();
}
