import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useTOCScroll } from "../useTOCScroll";

// NOTE: 実装コード側が生成するResizeObserverインスタンスに直接アクセスできないため、
// モジュールスコープで保持し間接的に参照・検証する
let mockResizeCallback: (entries: ResizeObserverEntry[]) => void;
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

/**
 * `ResizeObserver` Mock Class
 * @see {@link https://developer.mozilla.org/ja/docs/Web/API/ResizeObserver}
 */
class MockResizeObserver {
  constructor(callback: (entries: ResizeObserverEntry[]) => void) {
    mockResizeCallback = callback;
  }
  observe(target: Element) {
    mockObserve(target);
  }
  disconnect() {
    mockDisconnect();
  }
  unobserve() {}
}

/**
 * `useTOCScroll` 検証用のテストハーネスコンポーネント
 *
 * @privateRemarks
 * `useTOCScroll`はJSX側で`scrollRef`をDOM要素に紐付けることを前提としているため、
 * `renderHook`単体ではrefがnullのままeffectが早期returnしてしまう。
 * そのため`render`で実際にマウントし、`scrollRef`を実DOM要素に接続する必要がある。
 * canScrollUp/canScrollDownはdata属性経由でテストコードから参照する。
 */
const TestComponent = () => {
  const { scrollRef, updateFadeState, canScrollUp, canScrollDown } =
    useTOCScroll();
  return (
    <div
      ref={scrollRef}
      onScroll={updateFadeState}
      data-testid="scroll-container"
      data-can-scroll-up={canScrollUp}
      data-can-scroll-down={canScrollDown}
    />
  );
};

/**
 * jsdomはレイアウト計算を行わずscrollTop等が常に0になるため、
 * テスト側で明示的にプロパティを上書きするためのヘルパー
 */
const setScrollMetrics = (
  element: Element,
  metrics: { scrollTop: number; clientHeight: number; scrollHeight: number },
) => {
  Object.defineProperty(element, "scrollTop", {
    value: metrics.scrollTop,
    configurable: true,
  });
  Object.defineProperty(element, "clientHeight", {
    value: metrics.clientHeight,
    configurable: true,
  });
  Object.defineProperty(element, "scrollHeight", {
    value: metrics.scrollHeight,
    configurable: true,
  });
};

describe("useTOCScroll", () => {
  beforeEach(() => {
    vi.stubGlobal("ResizeObserver", MockResizeObserver);
  });
  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  test("初期状態でcanScrollUp/canScrollDownはfalseであること", () => {
    render(<TestComponent />);
    const element = screen.getByTestId("scroll-container");
    expect(element.dataset.canScrollUp).toBe("false");
    expect(element.dataset.canScrollDown).toBe("false");
  });

  test("マウント時にResizeObserverが要素をobserveすること", () => {
    render(<TestComponent />);
    const element = screen.getByTestId("scroll-container");
    expect(mockObserve).toHaveBeenCalledWith(element);
  });

  test("上方向にスクロールされているとき、canScrollUpがtrueになること", async () => {
    render(<TestComponent />);
    const element = screen.getByTestId("scroll-container");
    setScrollMetrics(element, {
      scrollTop: 10,
      clientHeight: 100,
      scrollHeight: 300,
    });
    fireEvent.scroll(element);
    await waitFor(() => {
      expect(element.dataset.canScrollUp).toBe("true");
    });
  });

  test("下方向にまだスクロール余地があるとき、canScrollDownがtrueになること", async () => {
    render(<TestComponent />);
    const element = screen.getByTestId("scroll-container");
    setScrollMetrics(element, {
      scrollTop: 0,
      clientHeight: 100,
      scrollHeight: 300,
    });
    fireEvent.scroll(element);
    await waitFor(() => {
      expect(element.dataset.canScrollDown).toBe("true");
    });
  });

  test("最下部までスクロールしたとき、canScrollDownがfalseになること", async () => {
    render(<TestComponent />);
    const element = screen.getByTestId("scroll-container");
    setScrollMetrics(element, {
      scrollTop: 200,
      clientHeight: 100,
      scrollHeight: 300,
    });
    fireEvent.scroll(element);
    await waitFor(() => {
      expect(element.dataset.canScrollDown).toBe("false");
    });
  });

  test("ResizeObserver発火時にも状態が再計算されること", async () => {
    render(<TestComponent />);
    const element = screen.getByTestId("scroll-container");
    setScrollMetrics(element, {
      scrollTop: 5,
      clientHeight: 100,
      scrollHeight: 300,
    });
    // NOTE: mockResizeCallbackを直接呼び出して擬似的にリサイズイベントを発火
    mockResizeCallback([]);
    await waitFor(() => {
      expect(element.dataset.canScrollUp).toBe("true");
    });
  });

  test("アンマウント時にResizeObserverの監視が解除されること", () => {
    const { unmount } = render(<TestComponent />);
    // NOTE: StrictModeによる二重実行分の呼び出しをここでリセットし、
    // 「unmount操作によって呼ばれるdisconnect」だけを検証対象にする
    mockDisconnect.mockClear();
    unmount();
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });
});
