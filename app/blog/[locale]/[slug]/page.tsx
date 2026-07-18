import { notFound } from "next/navigation";
import { extractHeading } from "@/src/lib/mdx/extractHeading";
import { getArticle } from "@/src/lib/mdx/getArticle";
import {
  type ArticleParam,
  getArticleParams,
} from "@/src/lib/mdx/getArticleParams";
import TOC from "../../_components/toc/TOC";

export function generateStaticParams() {
  return getArticleParams();
}

export default async function BlogPage({
  params,
}: {
  params: Promise<ArticleParam>;
}) {
  const { slug, locale } = await params;

  // NOTE: URL直打ち等はgetArticleのreadFileで例外になる為、notFoundにする
  const article = await getArticle(slug, locale).catch(() => null);

  if (!article) {
    notFound();
  }

  const { Component, markdown } = article;
  const headings = extractHeading(markdown);

  return (
    <div className="grid grid-cols-3 gap-4">
      <aside />
      <div>
        <Component />
      </div>
      <aside className="self-start sticky top-20">
        <TOC headings={headings} />
      </aside>
    </div>
  );
}
