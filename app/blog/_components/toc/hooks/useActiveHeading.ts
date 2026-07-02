import { useEffect, useState } from "react";

export const useActiveHeading = () => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // NOTE: スクロールで画面内に表示されたHeadingを現在位置として保持
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    });

    // NOTE: 取得したHeadingを監視対象として登録
    document
      .querySelectorAll("h1, h2, h3, h4, h5, h6")
      .forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  return activeId;
};
