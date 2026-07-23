import { useEffect, useState } from "react";

export const useActiveHeading = () => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      // NOTE: viewportの上部20%の領域のみ交差判定の対象にし、到達したHeadingを現在位置として保持
      { rootMargin: "0px 0px -80% 0px" },
    );

    // NOTE: 取得したHeadingを監視対象として登録
    document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, []);

  return activeId;
};
