import { describe, expect, test } from "vitest";
import { getHeadingIndent } from "../getHeadingIndent";

describe("getHeadingIndent", () => {
  test.each([
    { level: 1, expected: "pl-0" },
    { level: 2, expected: "pl-4" },
    { level: 3, expected: "pl-8" },
    { level: 4, expected: "pl-12" },
    { level: 5, expected: "pl-16" },
    { level: 6, expected: "pl-20" },
  ] as const)(
    "level: $level のとき、$expected を返すこと",
    ({ level, expected }) => {
      expect(getHeadingIndent(level)).toBe(expected);
    },
  );
});
