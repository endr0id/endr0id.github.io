import { ThemeProvider } from "next-themes";
import ThemeSwitcher from "./ThemeSwitcher";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/ThemeSwitcher",
  component: ThemeSwitcher,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider enableSystem={false}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
