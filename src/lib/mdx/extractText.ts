import type { RootContent } from "mdast";

/**
 * ASTからテキストを再帰的に抽出する。
 *
 * @privateRemarks
 *
 * 引数に渡されるNode構造は以下の様になる。
 *
 * ```typescript
 * {
 *   type: "heading",
 *   depth: 2,
 *   children: [
 *     {
 *       type: "text",
 *       value: "マークダウンとは？",
 *     },
 *   ],
 * }
 * ```
 *
 * Node自身が`value`を持つ場合はその文字列を返し、
 * `children`を持つ場合は子Nodeを再帰的に辿ってテキストを結合する。
 *
 * これにより、`strong`などの装飾Nodeが見出し内に含まれていても、
 * Node階層を辿ってプレーンテキストとして抽出できる。
 *
 * @param node - テキストを抽出するmdastのNode
 * @returns Nodeおよび子Nodeに含まれるテキスト
 */
export function extractText(node: RootContent): string {
  if ("value" in node && typeof node.value === "string") {
    return node.value;
  }

  if ("children" in node) {
    return node.children.map(extractText).join("");
  }

  return "";
}
