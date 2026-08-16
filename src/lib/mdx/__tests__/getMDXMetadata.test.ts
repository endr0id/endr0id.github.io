import { beforeEach, describe, expect, it, vi } from "vitest";
import { readFile } from "node:fs/promises";
import { getArticleParams } from "../getArticleParams";
import { getMDXMetadata } from "../getMDXMetadata";

// helper method (Template literal formatting)
function dedent(strings: TemplateStringsArray, ...values: unknown[]): string {
  const raw = strings.reduce(
    (acc, str, i) => acc + str + (values[i] ?? ""),
    "",
  );
  return raw.replace(/^[ \t]+/gm, "").trim();
}

vi.mock("node:fs/promises", () => {
  const readFileMock = vi.fn();
  return {
    default: { readFile: readFileMock },
    readFile: readFileMock,
  };
});

vi.mock("../getArticleParams", () => ({
  getArticleParams: vi.fn(),
}));

describe("getMDXMetadata", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("公開済み (published: true) の記事のみを取得できること", async () => {
    vi.mocked(getArticleParams).mockResolvedValue([
      { slug: "article_ja", locale: "ja" },
      { slug: "article_en", locale: "en" },
    ]);
    vi.mocked(readFile).mockImplementation(async (filePath) => {
      if (String(filePath).includes("article_ja")) {
        return dedent`
          ---
          title: "タイトル"
          description: "説明"
          date: "2026-07-17"
          published: true
          ---
        `;
      }
      return dedent`
        ---
        title: "title text"
        description: "description text"
        date: "2026-07-17"
        published: false
        ---
      `;
    });

    const result = await getMDXMetadata();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      title: "タイトル",
      slug: "article_ja",
      locale: "ja",
      published: true,
    });
  });

  it("locale を指定した場合、該当言語の記事のみに絞り込めること", async () => {
    vi.mocked(getArticleParams).mockResolvedValue([
      { slug: "article_ja", locale: "ja" },
      { slug: "article_en", locale: "en" },
    ]);
    vi.mocked(readFile).mockImplementation(async (filePath) => {
      const isJa = String(filePath).includes("/ja/");
      return dedent`
        ---
        title: "${isJa ? "こんにちは" : "Hello"}"
        description: "説明"
        date: "2026-07-17"
        published: true
        ---
      `;
    });

    const result = await getMDXMetadata("ja");

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      title: "こんにちは",
      locale: "ja",
    });
  });

  it("公開済みの記事が1件もない場合、空配列が返ること", async () => {
    vi.mocked(getArticleParams).mockResolvedValue([
      { slug: "unknown", locale: "en" },
    ]);
    vi.mocked(readFile).mockResolvedValue(
      dedent`
        ---
        title: "Unknown"
        description: "Unknown"
        date: "2026-07-17"
        published: false
        ---
      `,
    );

    const result = await getMDXMetadata();

    expect(result).toEqual([]);
  });

  it("任意項目 (tags, author, heroImage, updatedDate) が省略されている場合、デフォルト値で補われること", async () => {
    vi.mocked(getArticleParams).mockResolvedValue([
      { slug: "article_ja", locale: "ja" },
    ]);
    vi.mocked(readFile).mockResolvedValue(
      dedent`
        ---
        title: "タイトル"
        description: "説明"
        date: "2026-07-17"
        published: true
        ---
      `,
    );

    const result = await getMDXMetadata();

    expect(result[0]).toMatchObject({
      tags: [],
      author: "",
      heroImage: null,
      updatedDate: "",
    });
  });

  it("必須項目 (title) が欠損している場合、記事を特定できるメッセージで例外が投げられること", async () => {
    vi.mocked(getArticleParams).mockResolvedValue([
      { slug: "article_ja", locale: "ja" },
    ]);
    vi.mocked(readFile).mockResolvedValue(
      dedent`
        ---
        description: "説明のみ"
        date: "2026-07-17"
        published: true
        ---
      `,
    );

    await expect(getMDXMetadata()).rejects.toThrow(
      "article_ja/ja: invalid field(s): title",
    );
  });

  it("複数の必須項目 (title, date) が同時に欠損している場合、全て列挙されたメッセージで例外が投げられること", async () => {
    vi.mocked(getArticleParams).mockResolvedValue([
      { slug: "article_en", locale: "en" },
    ]);
    vi.mocked(readFile).mockResolvedValue(
      dedent`
        ---
        description: "description"
        published: true
        ---
      `,
    );

    await expect(getMDXMetadata()).rejects.toThrow(
      "article_en/en: invalid field(s): title, date",
    );
  });

  it("非公開 (published: false) の記事は、必須項目が欠損していても例外にならないこと", async () => {
    vi.mocked(getArticleParams).mockResolvedValue([
      { slug: "article_ja", locale: "ja" },
    ]);
    vi.mocked(readFile).mockResolvedValue(
      dedent`
        ---
        published: false
        ---
      `,
    );

    await expect(getMDXMetadata()).resolves.toEqual([]);
  });
});
