import { defineConfig } from "vitest/config";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          globals: true,
          include: ["**/__tests__/*.test.{ts,tsx}"],
          exclude: ["**/*.stories.{ts,tsx}", "**/node_modules/**"],
          setupFiles: ["./vitest.setup.ts"],
        },
      },
    ],
  },
});
