import { readdir } from "node:fs/promises";
import { ARTICLE_PATH } from "./constants";
import type { ArticleIdentifier } from "./types";

/**
 * MDX記事のディレクトリ構造から、静的ルート生成情報を提供する
 *
 * @remarks
 * `generateStaticParams` からのみ利用され、ビルド時の静的ページ生成に使用する
 *
 * @returns 記事のslugとlocaleの組み合わせ
 */
export async function getArticleParams(): Promise<ArticleIdentifier[]> {
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
