import { useCallback, useEffect, useRef, useState } from "react";

export const useTOCScroll = (activeId: string) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const updateFadeState = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;
    setCanScrollUp(element.scrollTop > 0);
    setCanScrollDown(
      element.scrollTop + element.clientHeight < element.scrollHeight - 1,
    );
  }, []);

  useEffect(() => {
    updateFadeState();

    // NOTE: このelementはovserveに渡すものでありupdateFadeState内のelementは
    // 「setStateのために一時的に使う」という別用途で役割が違う為、共通化しない
    const element = scrollRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(updateFadeState);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [updateFadeState]);

  // mdx側をスクロールした際に対象HeadingがTOCの表示領域外にある場合、
  // 対象をスクロール領域内へ表示させ追従させる
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !activeId) return;

    const target = container.querySelector<HTMLElement>(
      `[data-heading-id="${activeId}"]`,
    );
    if (!target) return;

    // 要素寸法とviewportに対しての相対位置情報
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // 対象の範囲外(上部または下部)を判定
    const isAbove = targetRect.top < containerRect.top;
    const isBelow = targetRect.bottom > containerRect.bottom;

    // 対象が見えてる場合は何もしない(不要なスクロールを防ぐ)
    if (!isAbove && !isBelow) return;

    // 対象を表示範囲の中央に配置
    const targetOffsetInContainer =
      targetRect.top - containerRect.top + container.scrollTop;
    const desiredScrollTop =
      targetOffsetInContainer -
      container.clientHeight / 2 +
      target.clientHeight / 2;

    container.scrollTo({
      top: desiredScrollTop,
      behavior: "smooth",
    });
  }, [activeId]);

  return { scrollRef, updateFadeState, canScrollUp, canScrollDown };
};
