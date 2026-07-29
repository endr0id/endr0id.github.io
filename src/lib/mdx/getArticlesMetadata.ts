import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import { ARTICLE_ROOT } from "@/src/constants";
import { getArticleParams } from "./getArticleParams";

export interface ArticleMetadata {
  title: string;
  description: string;
  date: string;
  updatedDate: string;
  tags: string[];
  author: string;
  published: boolean;
  heroImage: string | null;
  locale: string;
  slug: string;
}

/**
 * 記事のメタデータ一覧を取得する（公開済みの記事のみ）
 * @param locale 指定した場合、その言語の記事のみに絞り込む
 */
export async function getArticlesMetadata(
  targetLocale?: string,
): Promise<ArticleMetadata[]> {
  const params = await getArticleParams();
  const targetParams = targetLocale
    ? params.filter((param) => param.locale === targetLocale)
    : params;

  const articlesMeta = await Promise.all(
    targetParams.map(async ({ slug, locale }): Promise<ArticleMetadata> => {
      const filePath = `${ARTICLE_ROOT}/${slug}/${locale}/index.mdx`;
      const fileContent = await readFile(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        title: data.title ?? "",
        description: data.description ?? "",
        date: data.date ?? "",
        updatedDate: data.updatedDate ?? "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        author: data.author ?? "",
        published: Boolean(data.published),
        heroImage: data.heroImage ?? null,
        slug,
        locale,
      };
    }),
  );

  return articlesMeta.filter((article) => article.published === true);
}
