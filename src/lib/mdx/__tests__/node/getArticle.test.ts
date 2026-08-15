import { beforeEach, describe, expect, test, vi } from "vitest";
import { vol } from "memfs";
import { getArticle } from "../../getArticle";

// NOTE: node:fs/promisesは複数機能を提供のため、readFileのみモック指定する
vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs/promises")>();
  const memfs = await import("memfs");
  return {
    ...actual,
    readFile: memfs.fs.promises.readFile,
  };
});

describe("getArticle", () => {
  beforeEach(() => {
    vol.reset();
  });

  test("readFileが成功した場合、MDXの内容が返ってくること", async () => {
    vol.fromJSON({
      "articles/posts/react/ja/index.mdx": "# Reactの基礎",
    });

    const result = await getArticle("react", "ja");

    expect(result).toBe("# Reactの基礎");
  });

  test("readFileが失敗した場合、例外が投げられること", async () => {
    await expect(getArticle("react", "en")).rejects.toThrow();
  });
});
