import { readdir } from "node:fs/promises";
import { ARTICLE_PATH } from "./constants";
import type { ArticleIdentifier } from "./types";

/**
 * MDX記事のディレクトリ構造から、一意の識別情報を提供する
 *
 * @returns 記事のslugとlocaleの組み合わせ
 */
export async function getArticleIdentifier(): Promise<ArticleIdentifier[]> {
  const dirEntries = await readdir(ARTICLE_PATH, { withFileTypes: true });

  const params = await Promise.all(
    dirEntries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const slug = entry.name;
        const locales = await readdir(`${ARTICLE_PATH}/${slug}`, {
          withFileTypes: true,
        });

        return locales
          .filter((entry) => entry.isDirectory())
          .map((entry) => ({ slug, locale: entry.name }));
      }),
  );

  return params.flat();
}
