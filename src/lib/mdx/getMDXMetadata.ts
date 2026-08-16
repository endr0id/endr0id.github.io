import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import { z } from "zod";
import { ARTICLE_PATH } from "./constants";
import { getArticleParams } from "./getArticleParams";
import type { ArticleIdentifier } from "./types";

const MDXFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  published: z.boolean(),
  updatedDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  heroImage: z.string().nullable().optional(),
});

type MDXMetadata = z.infer<typeof MDXFrontmatterSchema> & ArticleIdentifier;

function frontmatterValidationError(
  slug: ArticleIdentifier["slug"],
  locale: ArticleIdentifier["locale"],
  error: z.ZodError,
): string {
  const invalidFields = error.issues.map((issue) => issue.path.join("."));
  return `${slug}/${locale}: invalid field(s): ${invalidFields.join(", ")}`;
}

/**
 * 言語別記事メタデータを取得する
 *
 * @param locale 言語識別子
 *
 * @returns frontmatterのオブジェクト情報
 */
export async function getMDXMetadata(
  targetLocale?: string,
): Promise<MDXMetadata[]> {
  const params = await getArticleParams();
  const targetParams = targetLocale
    ? params.filter((param) => param.locale === targetLocale)
    : params;

  const mdxMeta = await Promise.all(
    targetParams.map(async ({ slug, locale }): Promise<MDXMetadata | null> => {
      const filePath = `${ARTICLE_PATH}/${slug}/${locale}/index.mdx`;
      const mdxContents = await readFile(filePath, "utf-8");
      const { data } = matter(mdxContents);

      if (data.published !== true) return null;

      const frontmatter = MDXFrontmatterSchema.safeParse(data);

      if (!frontmatter.success) {
        throw new Error(
          frontmatterValidationError(slug, locale, frontmatter.error),
        );
      }

      return {
        slug,
        locale,
        title: frontmatter.data.title,
        description: frontmatter.data.description,
        date: frontmatter.data.date,
        published: frontmatter.data.published,
        updatedDate: frontmatter.data.updatedDate ?? "",
        tags: frontmatter.data.tags ?? [],
        author: frontmatter.data.author ?? "",
        heroImage: frontmatter.data.heroImage ?? null,
      };
    }),
  );

  return mdxMeta.filter((meta): meta is MDXMetadata => Boolean(meta));
}
