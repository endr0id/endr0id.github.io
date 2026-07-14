import { describe, expect, test } from "vitest";
import { extractText } from "../extractText";
import type { RootContent } from "mdast";

describe("extractText", () => {
  test("valueプロパティを持つノード (テキストノード) の場合、その文字列をそのまま返すこと", () => {
    const node: RootContent = { type: "text", value: "Hello World" };

    expect(extractText(node)).toBe("Hello World");
  });

  test("childrenを持つノードの場合、子ノードのテキストを再帰的に連結して返すこと", () => {
    // NOTE: 強調 (**bold**) のような、valueを持たずchildrenを持つノードを想定
    const node: RootContent = {
      type: "strong",
      children: [{ type: "text", value: "bold text" }],
    };

    expect(extractText(node)).toBe("bold text");
  });

  test("複数の子ノードを持つ場合、それぞれのテキストを結合して返すこと", () => {
    // NOTE: "Hello **World**!" のような、テキストと強調が混在する見出しを想定
    const node: RootContent = {
      type: "paragraph",
      children: [
        { type: "text", value: "Hello " },
        {
          type: "strong",
          children: [{ type: "text", value: "World" }],
        },
        { type: "text", value: "!" },
      ],
    };

    expect(extractText(node)).toBe("Hello World!");
  });

  test("ネストしたインライン要素 (リンク内の強調など) からもテキストを再帰的に抽出できること", () => {
    // NOTE: "[**Click here**](https://example.com)" のような入れ子構造を想定
    const node: RootContent = {
      type: "link",
      url: "https://example.com",
      children: [
        {
          type: "strong",
          children: [{ type: "text", value: "Click here" }],
        },
      ],
    };

    expect(extractText(node)).toBe("Click here");
  });

  test("valueもchildrenも持たないノードの場合、空文字を返すこと", () => {
    // NOTE: thematicBreak (水平線 "---") のような、テキストを持たないノードを想定
    const node: RootContent = { type: "thematicBreak" };

    expect(extractText(node)).toBe("");
  });

  test("childrenが空配列のノードの場合、空文字を返すこと", () => {
    const node: RootContent = {
      type: "paragraph",
      children: [],
    };

    expect(extractText(node)).toBe("");
  });
});
