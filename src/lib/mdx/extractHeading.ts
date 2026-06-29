import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

import { extractText } from "./extractText";

import type { Heading } from "mdast";

export interface HeadingInfo {
  id: string;
  title: string;
  level: Heading["depth"];
}

export function extractHeading(markdown: string): HeadingInfo[] {
  const headings: HeadingInfo[] = [];

  const tree = unified().use(remarkParse).parse(markdown);

  const slugger = new GithubSlugger();

  visit(tree, "heading", (node: Heading) => {
    const title = extractText(node);

    headings.push({
      id: slugger.slug(title),
      title,
      level: node.depth,
    });
  });

  return headings;
}
