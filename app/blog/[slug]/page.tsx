import { extractHeading } from "@/src/lib/mdx/extractHeading";
import { getArticle } from "@/src/lib/mdx/getArticle";
import { notFound } from "next/navigation";
import TOC from "../_components/toc/TOC";

export function generateStaticParams() {
  return [
    {
      slug: "react",
    },
  ];
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const { Component, markdown } = article;
  const headings = extractHeading(markdown);

  return (
    <div className="grid grid-cols-3 gap-4">
      <aside className="debug-box" />
      <div>
        <Component />
      </div>
      <TOC headings={headings} />
    </div>
  );
}
