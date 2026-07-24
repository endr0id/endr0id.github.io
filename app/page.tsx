import Link from "next/link";
import clsx from "clsx";
import { headline } from "@/src/constants";
import { getArticlesMetadata } from "@/src/lib/mdx/getArticlesMetadata";
import Card from "./_components/card/Card";

const asciiPreStyle = clsx([
  "whitespace-pre",
  "text-[12px] lg:text-[15px]",
  "leading-none",
  "tracking-[-0.05em]",
]);

export default async function Home() {
  const articles = await getArticlesMetadata("ja");
  return (
    <div className="px-10">
      <div className="my-16 text-center">
        <pre className={asciiPreStyle}>{headline}</pre>
      </div>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/${article.locale}/blog/${article.slug}`}
            >
              <Card title={article.title} description={article.description} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
