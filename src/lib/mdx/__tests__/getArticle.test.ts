// @vitest-environment node

import { beforeEach, describe, expect, test, vi } from "vitest";
import { vol } from "memfs";
import { getArticle } from "../getArticle";

// NOTE: node:fs/promisesは複数機能を提供するため、そのままモックするとエラーになるのでreadFileだけモックする
vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs/promises")>();
  const memfs = await import("memfs");
  return {
    ...actual,
    readFile: memfs.fs.promises.readFile,
  };
});

const MockComponent = () => null;
const loadMDXComponentMock = vi.fn();

// コンポーネント読み込みの結果だけ差し替え
vi.mock("../loadMDXComponent.ts", () => ({
  loadMDXComponent: (...args: unknown[]) => loadMDXComponentMock(...args),
}));

describe("getArticle", () => {
  beforeEach(() => {
    vol.reset();
    loadMDXComponentMock.mockReset();
    loadMDXComponentMock.mockResolvedValue(MockComponent);
  });

  test("readFileが成功した場合、{ Component, markdown }の情報が返ってくること", async () => {
    vol.fromJSON({
      "articles/posts/ja/react/index.mdx": "# Reactの基礎",
    });

    const result = await getArticle("ja", "react");

    expect(result).toEqual({
      Component: MockComponent,
      markdown: "# Reactの基礎",
    });
  });

  test("readFileが失敗した場合、例外が投げられること", async () => {
    vol.fromJSON({
      "articles/posts/ja/react/index.mdx": "# Reactの基礎",
    });

    await expect(getArticle("fr", "react")).rejects.toThrow();
  });
});
