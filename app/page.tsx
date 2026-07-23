import Link from "next/link";
import { getArticlesMetadata } from "@/src/lib/mdx/getArticlesMetadata";
import Card from "./_components/card/Card";

export default async function Home() {
  const articles = await getArticlesMetadata("ja");

  return (
    <div className="px-10">
      <p className="my-16 text-center sm:text-3xl md:text-5xl lg:text-7xl font-semibold">
        Hello, world
      </p>
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
