import GithubSlugger from "github-slugger";
import type { MDXComponents } from "mdx/types";
import React, { JSX } from "react";

type HeadingTag = keyof Pick<
  JSX.IntrinsicElements,
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
      "mt-12 mb-6 text-5xl font-semibold tracking-tight",
    ),

    h2: createHeading(
      slugger,
      "h2",
      "mt-10 mb-5 text-4xl font-semibold tracking-tight",
    ),

    h3: createHeading(
      slugger,
      "h3",
      "mt-8 mb-4 text-3xl font-semibold tracking-tight",
    ),

    h4: createHeading(
      slugger,
      "h4",
      "mt-6 mb-3 text-2xl font-semibold tracking-tight",
    ),

    h5: createHeading(
      slugger,
      "h5",
      "mt-6 mb-2 text-xl font-semibold tracking-tight",
    ),

    h6: createHeading(
      slugger,
      "h6",
      "mt-4 mb-2 text-lg font-semibold tracking-tight",
    ),

    // Paragraph
    p: ({ children }) => <p className="my-4 leading-8">{children}</p>,

    // Link
    a: ({ children, ...props }) => (
      <a
        className="font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
        {...props}
      >
        {children}
      </a>
    ),

    // List
    ul: ({ children }) => (
      <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>
    ),

    ol: ({ children }) => (
      <ol className="my-4 list-decimal space-y-2 pl-6">{children}</ol>
    ),

    li: ({ children }) => <li className="leading-7">{children}</li>,

    // Quote
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-outline pl-4 italic">
        {children}
      </blockquote>
    ),

    // Horizontal Rule
    hr: () => <hr className="my-10 border-outline" />,

    // Fenced Code Block
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded font-mono text-sm bg-neutral-300  dark:bg-neutral-800">
        {children}
      </code>
    ),

    // Code Block
    pre: ({ children }) => (
      <pre className="my-6 p-4 overflow-x-auto border border-outline rounded-lg bg-neutral-300 dark:bg-neutral-800">
        {children}
      </pre>
    ),
  };
}
