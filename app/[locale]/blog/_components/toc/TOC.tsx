"use client";

import clsx from "clsx";
import { Eye } from "lucide-react";
import { useActiveHeading } from "./hooks/useActiveHeading";
import { useTOCScroll } from "./hooks/useTOCScroll";
import type { HeadingInfo } from "@/src/lib/mdx/extractHeading";

const ICON_SIZE = 14; // px
const STROKE_WIDTH = 3; // px
const LINE_CENTER_X = ICON_SIZE / 2; // 線とアイコンの共通の中心x座標(px)

const TOC = ({ headings }: { headings: HeadingInfo[] }) => {
  const activeId = useActiveHeading();
  const { scrollRef, updateFadeState, canScrollUp, canScrollDown } =
    useTOCScroll(activeId);

  return (
    <nav aria-label="Table of Contents" className="w-full max-w-[350px]">
      <div
        ref={scrollRef}
        onScroll={updateFadeState}
        style={
          {
            "--fade-top": canScrollUp ? "transparent" : "black",
            "--fade-bottom": canScrollDown ? "transparent" : "black",
          } as React.CSSProperties
        }
        className={clsx(
          "max-h-[60vh] overflow-y-auto",
          "[scrollbar-width:none]", // Firefox
          "[&::-webkit-scrollbar]:hidden", // Chrome, Safari, Edge
          "[mask-image:linear-gradient(to_bottom,var(--fade-top)_0,black_24px,black_calc(100%-24px),var(--fade-bottom)_100%)]",
          "[-webkit-mask-image:linear-gradient(to_bottom,var(--fade-top)_0,black_24px,black_calc(100%-24px),var(--fade-bottom)_100%)]",
        )}
      >
        <ul className="relative list-none">
          <span
            aria-hidden="true"
            className="absolute inset-y-0 w-px bg-outline"
            style={{ left: LINE_CENTER_X }}
          />
          {headings.map((heading) => {
            const isActive = activeId === heading.id;

            return (
              <li
                key={heading.id}
                data-heading-id={heading.id}
                className="relative py-2 pl-4"
              >
                {isActive && (
                  <Eye
                    size={ICON_SIZE}
                    strokeWidth={STROKE_WIDTH}
                    aria-hidden="true"
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: LINE_CENTER_X }}
                  />
                )}
                <a
                  href={`#${heading.id}`}
                  className={clsx(
                    "block transition-colors",
                    isActive ? "font-semibold" : "hover:text-neutral-500",
                  )}
                >
                  {heading.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default TOC;
