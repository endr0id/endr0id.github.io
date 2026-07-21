import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import { ARTICLE_ROOT } from "@/src/constants";
import { getArticleParams } from "./getArticleParams";

export interface ArticleMetadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  published: boolean;
  heroImages: string;
  locale: string;
  slug: string;
}

/**
 * 記事のメタデータ一覧を取得する（公開済みの記事のみ）
 * @param locale 指定した場合、その言語の記事のみに絞り込む
 */
export async function getArticlesMetadata(
  locale?: string,
): Promise<ArticleMetadata[]> {
  const params = await getArticleParams();

  const articlesMeta = await Promise.all(
    params.map(async ({ slug, locale }) => {
      const filePath = `${ARTICLE_ROOT}/${slug}/${locale}/index.mdx`;
      const fileContent = await readFile(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        ...data,
        locale,
        slug,
      } as ArticleMetadata;
    }),
  );

  return articlesMeta.filter((article) => {
    const isPublished = article.published === true;
    const matchesLocale = locale ? article.locale === locale : true;

    return isPublished && matchesLocale;
  });
}
