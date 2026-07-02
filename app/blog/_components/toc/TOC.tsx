"use client";

import type { HeadingInfo } from "@/src/lib/mdx/extractHeading";
import clsx from "clsx";
import { useActiveHeading } from "./hooks/useActiveHeading";
import { getHeadingIndent } from "./utils/getHeadingIndent";

const TOC = ({ headings }: { headings: HeadingInfo[] }) => {
  const activeId = useActiveHeading();

  return (
    <nav>
      <ul>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={clsx(
              "py-1",
              getHeadingIndent(heading.level),
              activeId === heading.id && "text-sky-500 font-semibold",
            )}
          >
            <a href={`#${heading.id}`}>{heading.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TOC;
