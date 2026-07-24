import { describe, expect, test } from "vitest";
import { extractHeading } from "../extractHeading";

describe("extractHeading", () => {
  test("見出しが存在しないMarkdownの場合、空配列を返すこと", () => {
    const markdown = "本文のみでheadingを含まないテキストです。";

    const result = extractHeading(markdown);

    expect(result).toEqual([]);
  });

  test("単一の見出しから、id・title・levelを正しく抽出できること", () => {
    const markdown = "# Hello World";

    const result = extractHeading(markdown);

    expect(result).toEqual([
      { id: "hello-world", title: "Hello World", level: 1 },
    ]);
  });

  test("複数階層 (h1〜h6) の見出しを、出現順・正しいlevelで抽出できること", () => {
    const markdown = [
      "# Heading1",
      "## Heading2",
      "### Heading3",
      "#### Heading4",
      "##### Heading5",
      "###### Heading6",
    ].join("\n\n");

    const result = extractHeading(markdown);

    expect(result).toEqual([
      { id: "heading1", title: "Heading1", level: 1 },
      { id: "heading2", title: "Heading2", level: 2 },
      { id: "heading3", title: "Heading3", level: 3 },
      { id: "heading4", title: "Heading4", level: 4 },
      { id: "heading5", title: "Heading5", level: 5 },
      { id: "heading6", title: "Heading6", level: 6 },
    ]);
  });

  test("同じ見出しタイトルが複数存在する場合、GithubSluggerによってidの重複が回避されること", () => {
    const markdown = ["# Introduction", "# Introduction"].join("\n\n");

    const result = extractHeading(markdown);

    expect(result).toEqual([
      { id: "introduction", title: "Introduction", level: 1 },
      { id: "introduction-1", title: "Introduction", level: 1 },
    ]);
  });

  test("見出し以外のノード (段落など) は結果に含まれないこと", () => {
    const markdown = [
      "# Heading",
      "",
      "これは段落です。見出しではありません。",
      "",
      "- リスト項目1",
      "- リスト項目2",
    ].join("\n");

    const result = extractHeading(markdown);

    expect(result).toEqual([{ id: "heading", title: "Heading", level: 1 }]);
  });

  test("フロントマターが存在する場合、フロントマターの内容は無視して見出しのみ抽出すること", () => {
    const markdown = [
      "---",
      "title: My Awesome Title",
      "description: This is description",
      "---",
      "",
      "## 概要",
    ].join("\n");

    const result = extractHeading(markdown);

    expect(result).toEqual([{ id: "概要", title: "概要", level: 2 }]);
  });
});
