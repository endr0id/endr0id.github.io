"use client";

import clsx from "clsx";
import { Eye } from "lucide-react";
import { useActiveHeading } from "./hooks/useActiveHeading";
import type { HeadingInfo } from "@/src/lib/mdx/extractHeading";

const ICON_SIZE = 14; // px
const STROKE_WIDTH = 3; // px

const TOC = ({ headings }: { headings: HeadingInfo[] }) => {
  const activeId = useActiveHeading();

  return (
    <nav aria-label="Table of Contents">
      <ul className="relative list-none">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-px bg-outline"
        />
        {headings.map((heading) => {
          const isActive = activeId === heading.id;

          return (
            <li key={heading.id} className="relative py-2 pl-4">
              {isActive && (
                <Eye
                  size={ICON_SIZE}
                  strokeWidth={STROKE_WIDTH}
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
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
    </nav>
  );
};

export default TOC;
