// @vitest-environment node

// NOTE: デフォルト環境(vitest.config.ts参照)は"jsdom"だがjsdom(ブラウザシュミレート)では
// Nodeの組み込みモジュール(node:fs/promises等)がvitestのmock機構を経由せず外部化されvi.mockが無効化されるので
// ファイル単位でjsdom -> node環境に切り替え用のマジックコメントを追加(ファイル先頭)

import { beforeEach, describe, expect, test, vi } from "vitest";
import { vol } from "memfs";
import { ARTICLE_PATH } from "../constants";
import { getArticleParams } from "../getArticleParams";

vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs/promises")>();
  const memfs = await import("memfs");
  return {
    ...actual,
    readdir: memfs.fs.promises.readdir,
  };
});

describe("getArticleParams", () => {
  beforeEach(() => {
    vol.reset();
  });

  test("記事が1件も存在しない場合、空配列を返すこと", async () => {
    vol.fromJSON({
      [`${ARTICLE_PATH}/.gitkeep`]: "",
    });

    const result = await getArticleParams();

    expect(result).toEqual([]);
  });

  test("単一slug・単一localeの場合、その組み合わせを1件返すこと", async () => {
    vol.fromJSON({
      [`${ARTICLE_PATH}/react/ja/index.mdx`]: "# Reactの基礎",
    });

    const result = await getArticleParams();

    expect(result).toEqual([{ slug: "react", locale: "ja" }]);
  });

  test("単一slugに複数localeが存在する場合、slug×localeの組み合わせを全て返すこと", async () => {
    vol.fromJSON({
      [`${ARTICLE_PATH}/react/ja/index.mdx`]: "# Reactの基礎",
      [`${ARTICLE_PATH}/react/en/index.mdx`]: "# React Basics",
    });

    const result = await getArticleParams();

    expect(result).toEqual(
      expect.arrayContaining([
        { slug: "react", locale: "ja" },
        { slug: "react", locale: "en" },
      ]),
    );
    expect(result).toHaveLength(2);
  });

  test("複数slugが存在する場合、それぞれのslug×localeの組み合わせを全て返すこと", async () => {
    vol.fromJSON({
      [`${ARTICLE_PATH}/react/ja/index.mdx`]: "# Reactの基礎",
      [`${ARTICLE_PATH}/react/en/index.mdx`]: "# React Basics",
      [`${ARTICLE_PATH}/typescript/ja/index.mdx`]: "# TypeScriptの基礎",
    });

    const result = await getArticleParams();

    expect(result).toEqual(
      expect.arrayContaining([
        { slug: "react", locale: "ja" },
        { slug: "react", locale: "en" },
        { slug: "typescript", locale: "ja" },
      ]),
    );
    expect(result).toHaveLength(3);
  });

  test("slugディレクトリ直下にファイル (ディレクトリ以外) が混在していても、無視されること", async () => {
    // NOTE: 例えば.DS_Store等、locale以外のファイルが紛れ込んだ場合を想定
    vol.fromJSON({
      [`${ARTICLE_PATH}/react/ja/index.mdx`]: "# Reactの基礎",
      [`${ARTICLE_PATH}/react/.DS_Store`]: "",
    });

    const result = await getArticleParams();

    expect(result).toEqual([{ slug: "react", locale: "ja" }]);
  });
});
