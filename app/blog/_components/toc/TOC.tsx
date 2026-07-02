import type { HeadingInfo } from "@/src/lib/mdx/extractHeading";
import clsx from "clsx";

type Props = {
  headings: HeadingInfo[];
};

const TOC = ({ headings }: Props) => {
  return (
    <nav>
      <ul>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={clsx("py-1", {
              "pl-0": heading.level === 1,
              "pl-4": heading.level === 2,
              "pl-8": heading.level === 3,
              "pl-12": heading.level === 4,
              "pl-16": heading.level === 5,
              "pl-20": heading.level === 6,
            })}
          >
            <a href={`#${heading.id}`}>{heading.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TOC;
