import type { Heading } from "mdast";

export interface ArticleIdentifier {
  locale: string;
  slug: string;
}

export interface MarkdownHeadingInfo {
  id: string;
  title: string;
  level: Heading["depth"];
}
