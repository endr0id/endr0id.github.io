import type { RootContent } from "mdast";

export function extractText(node: RootContent): string {
  if ("value" in node && typeof node.value === "string") {
    return node.value;
  }

  if ("children" in node) {
    return node.children.map(extractText).join("");
  }

  return "";
}
