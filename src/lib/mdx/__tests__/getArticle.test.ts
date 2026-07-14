import { beforeEach, describe, expect, test, vi } from "vitest";
import * as fsPromises from "node:fs/promises";
import { getArticle } from "../getArticle";

// NOTE: module.defaultとして返されることを検証するためのdummy Component
const MockArticleComponent = () => null;

// NOTE: ファイルI/Oを発生させない
vi.mock("node:fs/promises", async (importOriginal) => {
  // NOTE: node:fs/promisesはdefault exportも持つmoduleのため
  // 全体を置換せずに元のmoduleを維持しreadFileだけモックに差し替える
  const actual = await importOriginal<typeof import("node:fs/promises")>();
  return {
    ...actual,
    readFile: vi.fn(),
  };
});

// NOTE: getArticle内の `import(config.import)` はリテラルな文字列に解決されるため
// 同じパスでモックを登録しておく必要がある
vi.mock("@/app/blog/_contents/article.mdx", () => ({
  default: MockArticleComponent,
}));

describe.skip("getArticle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("存在しないslugを指定した場合、nullを返すこと", async () => {
    const readFileSpy = vi.spyOn(fsPromises, "readFile");
    const result = await getArticle("unknown-slug");

    expect(result).toBeNull();
    expect(readFileSpy).not.toHaveBeenCalled();
  });

  test("存在するslugを指定した場合、正しいファイルパスでreadFileが呼ばれること", async () => {
    const readFileSpy = vi
      .spyOn(fsPromises, "readFile")
      .mockResolvedValue("# Article Title");

    await getArticle("react");

    expect(readFileSpy).toHaveBeenCalledWith(
      "app/blog/_contents/article.mdx",
      "utf-8",
    );
  });

  test("存在するslugを指定した場合、Componentとmarkdownを含むオブジェクトを返すこと", async () => {
    vi.spyOn(fsPromises, "readFile").mockResolvedValue("# Article Title");

    const result = await getArticle("react");

    expect(result).toEqual({
      Component: MockArticleComponent,
      markdown: "# Article Title",
    });
  });
});
