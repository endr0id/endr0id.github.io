import type { HeadingInfo } from "@/src/lib/mdx/extractHeading";

type Props = {
  headings: HeadingInfo[];
};

const TOC = ({ headings }: Props) => {
  return (
    <nav className="debug-box">
      <ul>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`}>{heading.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TOC;
