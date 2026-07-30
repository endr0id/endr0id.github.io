import GithubSlugger from "github-slugger";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import { unified } from "unified";
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
  const markdownAST = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .parse(markdown);
  const slugger = new GithubSlugger();

  visit(markdownAST, "heading", (node: Heading) => {
    const title = extractText(node);

    headings.push({
      id: slugger.slug(title),
      title,
      level: node.depth,
    });
  });

  return headings.filter((h) => h.level === 2 || h.level === 3);
}
