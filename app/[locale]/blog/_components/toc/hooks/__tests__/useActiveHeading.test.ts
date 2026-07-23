import { describe, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useActiveHeading } from "../useActiveHeading";

// NOTE: 実装コード側が生成するIntersectionObserverインスタンスに直接アクセスできないため、
// モジュールスコープで保持し間接的に参照・検証する
let mockCallback: (entries: IntersectionObserverEntry[]) => void;
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

/**
 * `IntersectionObserver` Mock Class
 * @see {@link https://developer.mozilla.org/ja/docs/Web/API/IntersectionObserver}
 */
class MockIntersectionObserver {
  /**
   * @param callback - 交差状態の変化を通知するためのコールバック関数
   * @return IntersectionObserverEntry[]
   */
  constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
    mockCallback = callback;
  }

  /**
   * @param target - 監査対象として登録されるDOM要素
   */
  observe(target: Element) {
    mockObserve(target);
  }

  disconnect() {
    mockDisconnect();
  }
}

/**
 * `IntersectionObserverEntry` を生成するヘルパー関数
 *
 * @see {@link https://developer.mozilla.org/ja/docs/Web/API/IntersectionObserverEntry}
 *
 * @privateRemarks
 * このヘルパーを `mockCallback` に渡すことで「特定の見出し要素が画面内に交差した（または交差しなくなった）」という
 * 状況をテストコード側から任意に再現する
 *
 * @param target - 交差状態の変化対象となるDOM要素(heading)
 * @param isIntersecting - 対象要素が現在画面内に交差しているかどうか
 * @returns `IntersectionObserverEntry` オブジェクト
 */
const createEntry = (
  target: Element,
  isIntersecting: boolean,
): IntersectionObserverEntry =>
  ({
    target,
    isIntersecting,
  }) as IntersectionObserverEntry;

describe("useActiveHeading", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    document.body.innerHTML = "";
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  test("初期状態でactiveIdは空文字('')であること", () => {
    const { result } = renderHook(useActiveHeading);
    expect(result.current).toBe("");
  });

  test("見出し (Heading) が画面内に交差 (表示) したとき、その要素のidを返すこと", async () => {
    // NOTE: Heading要素はrenderHook前にDOMへ追加する必要がある
    // (useEffect内のquerySelectorAllが実行されるタイミングで存在している必要があるため)
    const h2 = document.createElement("h2");
    h2.id = "Heading2";
    document.body.appendChild(h2);

    const { result } = renderHook(useActiveHeading);

    // NOTE: observe対象として登録されていることを確認
    expect(mockObserve).toHaveBeenCalledWith(h2);

    // NOTE: mockCallbackを直接呼び出して擬似的に交差イベントを発火
    mockCallback([createEntry(h2, true)]);

    await waitFor(() => {
      expect(result.current).toBe("Heading2");
    });
  });

  test("Hooksがアンマウントされたとき、IntersectionObserverの監視が解除されること", () => {
    const { unmount } = renderHook(useActiveHeading);

    // NOTE: StrictModeによる二重実行分の呼び出しをここでリセットし、
    // 「unmount操作によって呼ばれるdisconnect」だけを検証対象にする
    mockDisconnect.mockClear();

    unmount();

    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });
});
