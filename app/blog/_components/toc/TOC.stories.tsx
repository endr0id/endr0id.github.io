import TOC from "./TOC";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/Blog/TOC",
  component: TOC,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Markdownの見出し表示コンポーネント",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TOC>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    headings: [
      {
        id: "見出し1",
        level: 1,
        title: "見出し1",
      },
      {
        id: "見出し2",
        level: 2,
        title: "見出し2",
      },
      {
        id: "見出し3",
        level: 3,
        title: "見出し3",
      },
    ],
  },
};
