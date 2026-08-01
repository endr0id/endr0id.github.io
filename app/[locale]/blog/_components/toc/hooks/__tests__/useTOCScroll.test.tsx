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

const HEADING_IDS = ["heading-1", "heading-2", "heading-3"];

/**
 * `useTOCScroll` 検証用のテストハーネスコンポーネント
 *
 * @privateRemarks
 * `useTOCScroll`はJSX側で`scrollRef`をDOM要素に紐付けることを前提としているため、
 * `renderHook`単体ではrefがnullのままeffectが早期returnしてしまう。
 * そのため`render`で実際にマウントし、`scrollRef`を実DOM要素に接続する必要がある。
 * canScrollUp/canScrollDownはdata属性経由でテストコードから参照する。
 */
const TestComponent = ({ activeId }: { activeId: string }) => {
  const { scrollRef, updateFadeState, canScrollUp, canScrollDown } =
    useTOCScroll(activeId);
  return (
    <div
      ref={scrollRef}
      onScroll={updateFadeState}
      data-testid="scroll-container"
      data-can-scroll-up={canScrollUp}
      data-can-scroll-down={canScrollDown}
    >
      {HEADING_IDS.map((id) => (
        <div key={id} data-heading-id={id} data-testid={id}>
          {id}
        </div>
      ))}
    </div>
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

/**
 * jsdomは`getBoundingClientRect`が常に0を返すため、
 * テスト側で任意の座標・高さを再現するためのヘルパー
 */
const setBoundingClientRect = (
  element: Element,
  rect: { top: number; bottom: number; height: number },
) => {
  vi.spyOn(element, "getBoundingClientRect").mockReturnValue({
    top: rect.top,
    bottom: rect.bottom,
    height: rect.height,
    left: 0,
    right: 0,
    width: 0,
    x: 0,
    y: rect.top,
    toJSON: () => {},
  });
};

/**
 * jsdomは`clientHeight`が常に0を返すため、
 * テスト側で明示的に上書きするためのヘルパー
 */
const setClientHeight = (element: Element, height: number) => {
  Object.defineProperty(element, "clientHeight", {
    value: height,
    configurable: true,
  });
};

describe("useTOCScroll", () => {
  beforeEach(() => {
    vi.stubGlobal("ResizeObserver", MockResizeObserver);

    // jsdomはElement.prototype.scrollToが存在しないため明示的にモックする
    Element.prototype.scrollTo = vi.fn();
  });
  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  describe("フェード状態(canScrollUp / canScrollDown)", () => {
    test("初期状態でcanScrollUp/canScrollDownはfalseであること", () => {
      render(<TestComponent activeId="" />);
      const element = screen.getByTestId("scroll-container");
      expect(element.dataset.canScrollUp).toBe("false");
      expect(element.dataset.canScrollDown).toBe("false");
    });

    test("マウント時にResizeObserverが要素をobserveすること", () => {
      render(<TestComponent activeId="" />);
      const element = screen.getByTestId("scroll-container");
      expect(mockObserve).toHaveBeenCalledWith(element);
    });

    test("上方向にスクロールされているとき、canScrollUpがtrueになること", async () => {
      render(<TestComponent activeId="" />);
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
      render(<TestComponent activeId="" />);
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
      render(<TestComponent activeId="" />);
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
      render(<TestComponent activeId="" />);
      const element = screen.getByTestId("scroll-container");
      setScrollMetrics(element, {
        scrollTop: 5,
        clientHeight: 100,
        scrollHeight: 300,
      });

      // 擬似的にリサイズイベント発火
      mockResizeCallback([]);

      await waitFor(() => {
        expect(element.dataset.canScrollUp).toBe("true");
      });
    });

    test("アンマウント時にResizeObserverの監視が解除されること", () => {
      const { unmount } = render(<TestComponent activeId="" />);
      // NOTE: StrictModeによる二重実行分の呼び出しをここでリセットし、
      // 「unmount操作によって呼ばれるdisconnect」だけを検証対象にする
      mockDisconnect.mockClear();
      unmount();
      expect(mockDisconnect).toHaveBeenCalledTimes(1);
    });
  });

  describe("activeIdの変化に伴うスクロール追従", () => {
    test("対象要素がコンテナの可視範囲内にある場合、scrollToは呼ばれないこと", () => {
      const { rerender } = render(<TestComponent activeId="" />);
      const container = screen.getByTestId("scroll-container");
      const target = screen.getByTestId("heading-2");

      setScrollMetrics(container, {
        scrollTop: 0,
        clientHeight: 100,
        scrollHeight: 300,
      });

      setBoundingClientRect(container, { top: 0, bottom: 100, height: 100 });
      setBoundingClientRect(target, { top: 20, bottom: 40, height: 20 });

      rerender(<TestComponent activeId="heading-2" />);
      expect(container.scrollTo).not.toHaveBeenCalled();
    });

    test("対象要素がコンテナ上端より上にはみ出している場合、中央に来る位置でscrollToが呼ばれること", () => {
      const { rerender } = render(<TestComponent activeId="" />);
      const container = screen.getByTestId("scroll-container");
      const target = screen.getByTestId("heading-1");

      setScrollMetrics(container, {
        scrollTop: 100,
        clientHeight: 100,
        scrollHeight: 300,
      });

      // containerの表示範囲(画面上のy座標: 200〜300)
      setBoundingClientRect(container, {
        top: 200,
        bottom: 300,
        height: 100,
      });

      // targetがcontainerの上端(200)より上(180)にはみ出している
      setBoundingClientRect(target, { top: 180, bottom: 200, height: 20 });
      setClientHeight(target, 20);

      rerender(<TestComponent activeId="heading-1" />);

      // targetOffsetInContainer = 180 - 200 + 100 = 80
      // desiredScrollTop = 80 - 100/2 + 20/2 = 80 - 50 + 10 = 40
      expect(container.scrollTo).toHaveBeenCalledWith({
        top: 40,
        behavior: "smooth",
      });
    });

    test("対象要素がコンテナ下端より下にはみ出している場合、中央に来る位置でscrollToが呼ばれること", () => {
      const { rerender } = render(<TestComponent activeId="" />);
      const container = screen.getByTestId("scroll-container");
      const target = screen.getByTestId("heading-3");

      setScrollMetrics(container, {
        scrollTop: 0,
        clientHeight: 100,
        scrollHeight: 300,
      });
      setBoundingClientRect(container, { top: 0, bottom: 100, height: 100 });

      // targetがcontainerの下端(100)より下(120)にはみ出している
      setBoundingClientRect(target, { top: 110, bottom: 130, height: 20 });
      setClientHeight(target, 20);

      rerender(<TestComponent activeId="heading-3" />);

      // targetOffsetInContainer = 110 - 0 + 0 = 110
      // desiredScrollTop = 110 - 100/2 + 20/2 = 110 - 50 + 10 = 70
      expect(container.scrollTo).toHaveBeenCalledWith({
        top: 70,
        behavior: "smooth",
      });
    });

    test("activeIdに対応する要素が存在しない場合、scrollToが呼ばれないこと", () => {
      const { rerender } = render(<TestComponent activeId="" />);
      const container = screen.getByTestId("scroll-container");

      rerender(<TestComponent activeId="non-existent-heading" />);

      expect(container.scrollTo).not.toHaveBeenCalled();
    });

    test("activeIdが空文字の場合、scrollToが呼ばれないこと", () => {
      const containerResult = render(<TestComponent activeId="" />);
      const container = containerResult.getByTestId("scroll-container");

      expect(container.scrollTo).not.toHaveBeenCalled();
    });
  });
});
