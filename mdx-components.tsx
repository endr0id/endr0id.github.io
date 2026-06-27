import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

const components: MDXComponents = {
  // Heading
  h1: ({ children }) => (
    <h1 className="mt-12 mb-6 text-5xl font-bold tracking-tight">{children}</h1>
  ),

  h2: ({ children }) => (
    <h2 className="mt-10 mb-5 text-4xl font-semibold tracking-tight">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="mt-8 mb-4 text-3xl font-semibold">{children}</h3>
  ),

  h4: ({ children }) => (
    <h4 className="mt-6 mb-3 text-2xl font-semibold">{children}</h4>
  ),

  h5: ({ children }) => (
    <h5 className="mt-6 mb-2 text-xl font-semibold">{children}</h5>
  ),

  h6: ({ children }) => (
    <h6 className="mt-4 mb-2 text-lg font-semibold">{children}</h6>
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
    <pre className="my-6 overflow-x-auto rounded-lg border border-outline p-4">
      {children}
    </pre>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
