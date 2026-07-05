import { ThemeProvider } from "next-themes";
import ThemeSwitcher from "./ThemeSwitcher";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/ThemeSwitcher",
  component: ThemeSwitcher,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "テーマ切り替え用ボタンコンポーネント",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light" enableSystem={false}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
