import type React from "react";
import { clsx } from "clsx";
import GithubSlugger from "github-slugger";
import type { MDXComponents } from "mdx/types";

type HeadingTag = keyof Pick<
  React.JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;

const createHeading = (
  slugger: GithubSlugger,
  Tag: HeadingTag,
  className: string,
) => {
  return ({ children }: { children: React.ReactNode }) => {
    const id = slugger.slug(String(children));

    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  };
};

export function useMDXComponents(): MDXComponents {
  const slugger = new GithubSlugger();
  return {
    // Heading
    h1: createHeading(
      slugger,
      "h1",
      clsx(
        "mt-12 mb-6",
        "text-article-h1 sm:text-3xl lg:text-4xl",
        "font-semibold tracking-tight",
      ),
    ),
    h2: createHeading(
      slugger,
      "h2",
      clsx(
        "mt-10 mb-5",
        "text-article-h2 sm:text-2xl lg:text-3xl",
        "font-semibold tracking-tight",
      ),
    ),
    h3: createHeading(
      slugger,
      "h3",
      clsx(
        "mt-8 mb-4",
        "text-article-h3 sm:text-xl lg:text-2xl",
        "font-semibold tracking-tight",
      ),
    ),
    h4: createHeading(
      slugger,
      "h4",
      clsx("mt-6 mb-3", "text-article-h4 sm:text-lg lg:text-xl", "font-bold"),
    ),
    h5: createHeading(
      slugger,
      "h5",
      clsx("mt-6 mb-2", "text-base", "font-semibold tracking-tight"),
    ),
    h6: createHeading(
      slugger,
      "h6",
      clsx("mt-4 mb-2", "text-sm", "font-semibold tracking-tight"),
    ),

    // Paragraph
    p: ({ children }) => (
      <p className={clsx("my-4", "text-article-body lg:text-[17px] leading-8")}>
        {children}
      </p>
    ),

    // List
    ul: ({ children }) => (
      <ul
        className={clsx(
          "my-4 pl-6 space-y-2",
          "list-disc",
          "text-article-body lg:text-[17px]",
        )}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        className={clsx(
          "my-4 pl-6 space-y-2",
          "list-decimal",
          "text-article-body lg:text-[17px]",
        )}
      >
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,

    // Inline Code
    code: ({ children }) => (
      <code
        className={clsx(
          "px-1.5 py-0.5",
          "rounded",
          "font-mono text-article-code sm:text-[15px] lg:text-base",
          "bg-neutral-300 dark:bg-neutral-800",
        )}
      >
        {children}
      </code>
    ),

    // Code Block
    pre: ({ children }) => (
      <pre
        className={clsx(
          "my-6 p-4",
          "overflow-x-auto border border-outline rounded-lg",
          "bg-neutral-300 dark:bg-neutral-800",
        )}
      >
        {children}
      </pre>
    ),

    // Link
    a: ({ children, ...props }) => (
      <a
        className={clsx(
          "font-medium",
          "text-sky-600 hover:text-sky-500 dark:text-sky-400",
        )}
        {...props}
      >
        {children}
      </a>
    ),

    // Quote
    blockquote: ({ children }) => (
      <blockquote
        className={clsx(
          "my-6 pl-4 border-l-4 border-outline",
          "italic text-article-body lg:text-[17px]",
        )}
      >
        {children}
      </blockquote>
    ),

    // Horizontal Rule
    hr: () => <hr className="my-10 border-outline" />,

    // Table
    table: ({ children }) => (
      <div
        className={clsx(
          "my-6 overflow-x-auto",
          "border border-outline rounded-lg",
        )}
      >
        <table
          className={clsx(
            "w-full border-collapse",
            "text-article-body text-sm lg:text-[15px]",
          )}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => <thead>{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-outline last:border-b-0">{children}</tr>
    ),
    th: ({ children }) => (
      <th
        scope="col"
        className={clsx(
          "px-4 py-2",
          "text-left font-semibold",
          "border-b border-outline",
        )}
      >
        {children}
      </th>
    ),
    td: ({ children }) => <td className="px-4 py-2">{children}</td>,

    // Bold
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,

    // Italic
    em: ({ children }) => <em className="italic">{children}</em>,

    // Strikethrough
    del: ({ children }) => (
      <del className="line-through opacity-70">{children}</del>
    ),
  };
}
