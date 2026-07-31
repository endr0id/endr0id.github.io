import { notFound } from "next/navigation";
import { extractHeading } from "@/src/lib/mdx/extractHeading";
import { getArticle } from "@/src/lib/mdx/getArticle";
import {
  type ArticleParam,
  getArticleParams,
} from "@/src/lib/mdx/getArticleParams";
import TOC from "../_components/toc/TOC";

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
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_min(880px,100%)_1fr] gap-8 lg:gap-10 px-4 lg:px-8">
      <aside className="hidden lg:block" aria-hidden="true" />
      <main className="min-w-0 w-full mx-auto">
        <article>
          <Component />
        </article>
      </main>
      <aside className="hidden lg:block self-start sticky top-[30vh]">
        <TOC headings={headings} />
      </aside>
    </div>
  );
}
