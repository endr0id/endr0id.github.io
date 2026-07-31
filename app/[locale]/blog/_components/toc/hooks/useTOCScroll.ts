import { useCallback, useEffect, useRef, useState } from "react";

export const useTOCScroll = () => {
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
    const element = scrollRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(updateFadeState);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [updateFadeState]);

  return { scrollRef, updateFadeState, canScrollUp, canScrollDown };
};
