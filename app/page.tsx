import Link from "next/link";
import clsx from "clsx";
import { hero } from "@/src/constants";
import { getArticlesMetadata } from "@/src/lib/mdx/getArticlesMetadata";
import Card from "./_components/card/Card";

export default async function Home() {
  const articles = await getArticlesMetadata("ja");
  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <section className="mt-16 mb-8 text-center">
        <h1>
          <pre
            className={clsx([
              "whitespace-pre",
              "text-[7px] sm:text-[12px] lg:text-[15px]",
              "leading-none",
              "tracking-[-0.05em]",
              "aria-hidden=true",
            ])}
          >
            {hero.title}
          </pre>
        </h1>
        <p className="mt-4 text-neutral-500 dark:text-neutral-400">
          Built. Broke. Experimented.
          <span className="block sm:inline"> Made things work. Learned.</span>
          <span className="block">
            Sharing experiences from web development and programming.
          </span>
        </p>
      </section>
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
