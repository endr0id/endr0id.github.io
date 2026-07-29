import Link from "next/link";
import clsx from "clsx";
import { heroTitle } from "@/src/constants";
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
            {heroTitle}
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
      <section className="max-w-[1280px] mx-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4">
          {articles.map((article) => (
            <li
              key={article.slug}
              className={clsx(
                "relative list-none sm:px-8 first:sm:pl-0 last:sm:pr-0",
                "sm:[&:nth-child(2n)>[aria-hidden]]:hidden",
                "lg:[&:nth-child(2n)>[aria-hidden]]:block",
                "lg:[&:nth-child(3n)>[aria-hidden]]:hidden",
              )}
            >
              <Card
                path={`/${article.locale}/blog/${article.slug}`}
                imagePath={`articles/posts/${article.slug}/${article.heroImage}`}
                title={article.title}
                description={article.description}
              />
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 hidden h-full w-px bg-neutral-200 dark:bg-neutral-900 sm:block"
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
