import { ThemeProvider } from "next-themes";
import Header from "./Header";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

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
