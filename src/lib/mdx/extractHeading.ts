import GithubSlugger from "github-slugger";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { HEADING_LEVELS } from "./constants";
import { extractText } from "./extractText";
import type { Heading } from "mdast";
import type { MarkdownHeadingInfo } from "./types";

export function extractHeading(markdown: string): MarkdownHeadingInfo[] {
  const headings: MarkdownHeadingInfo[] = [];
  const markdownAST = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .parse(markdown);
  const slugger = new GithubSlugger();

  // markdownASTからHeading nodeのみにナローイングし検証
  visit(markdownAST, "heading", (node: Heading) => {
    if (
      !HEADING_LEVELS.includes(node.depth as (typeof HEADING_LEVELS)[number])
    ) {
      return;
    }

    const title = extractText(node);

    headings.push({
      id: slugger.slug(title),
      title,
      level: node.depth,
    });
  });

  return headings;
}
