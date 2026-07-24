import { beforeEach, describe, expect, it, vi } from "vitest";
import { readFile } from "node:fs/promises";
import { getArticleParams } from "../getArticleParams";
import { getArticlesMetadata } from "../getArticlesMetadata";

vi.mock("../getArticleParams", () => ({
  getArticleParams: vi.fn(),
}));

vi.mock("node:fs/promises", () => {
  const readFileMock = vi.fn();
  return {
    default: { readFile: readFileMock },
    readFile: readFileMock,
  };
});

describe("getArticlesMetadata", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("公開済み (published: true) の記事のみを取得できること", async () => {
    vi.mocked(getArticleParams).mockResolvedValue([
      { slug: "published", locale: "ja" },
      { slug: "draft", locale: "ja" },
    ]);

    vi.mocked(readFile).mockImplementation(async (filePath) => {
      if (String(filePath).includes("published")) {
        return dedent`
          ---
          title: "公開記事"
          published: true
          ---
        `;
      }
      return dedent`
        ---
        title: "下書き記事"
        published: false
        ---
      `;
    });

    const result = await getArticlesMetadata();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      title: "公開記事",
      slug: "published",
      locale: "ja",
      published: true,
    });
  });

  it("locale を指定した場合、該当言語の記事のみに絞り込めること", async () => {
    vi.mocked(getArticleParams).mockResolvedValue([
      { slug: "published", locale: "ja" },
      { slug: "published", locale: "en" },
    ]);

    vi.mocked(readFile).mockImplementation(async (filePath) => {
      const isJa = String(filePath).includes("/ja/");
      return dedent`
        ---
        title: "${isJa ? "こんにちは" : "Hello"}"
        published: true
        ---
      `;
    });

    const result = await getArticlesMetadata("ja");

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      title: "こんにちは",
      locale: "ja",
    });
  });

  it("条件に合う記事が存在しない場合、空配列 [] が返ること", async () => {
    vi.mocked(getArticleParams).mockResolvedValue([
      { slug: "draft", locale: "ja" },
    ]);

    vi.mocked(readFile).mockResolvedValue(
      dedent`
        ---
        published: false
        ---
      `,
    );

    const result = await getArticlesMetadata();

    expect(result).toEqual([]);
  });
});

// helper method (Template literal formatting)
function dedent(strings: TemplateStringsArray, ...values: unknown[]): string {
  const raw = strings.reduce(
    (acc, str, i) => acc + str + (values[i] ?? ""),
    "",
  );
  return raw.replace(/^[ \t]+/gm, "").trim();
}
