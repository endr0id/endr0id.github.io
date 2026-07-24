import type { HeadingInfo } from "@/src/lib/mdx/extractHeading";

export const getHeadingIndent = (level: HeadingInfo["level"]) => {
  switch (level) {
    case 1:
      return "pl-0";

    case 2:
      return "pl-4";

    case 3:
      return "pl-8";

    case 4:
      return "pl-12";

    case 5:
      return "pl-16";

    case 6:
      return "pl-20";
  }
};
