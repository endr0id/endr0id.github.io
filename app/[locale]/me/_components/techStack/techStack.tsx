"use client";

import {
  Docker,
  Figma,
  Git,
  Go,
  Nextjs,
  Nodejs,
  Postgresql,
  TailwindIcon,
  Typescript,
  Vercel,
  _React,
} from "@dev.icons/react";
import clsx from "clsx";
import { Tabs } from "radix-ui";

const CATEGORIES = [
  {
    value: "frontend",
    label: "Frontend",
    items: [
      { name: "React", Icon: _React },
      { name: "Next.js", Icon: Nextjs },
      { name: "TypeScript", Icon: Typescript },
      { name: "Tailwind CSS", Icon: TailwindIcon },
    ],
  },
  {
    value: "backend",
    label: "Backend",
    items: [
      { name: "Node.js", Icon: Nodejs },
      { name: "Go", Icon: Go },
      { name: "PostgreSQL", Icon: Postgresql },
      { name: "Docker", Icon: Docker },
    ],
  },
  {
    value: "other",
    label: "Other",
    items: [
      { name: "Git", Icon: Git },
      { name: "Figma", Icon: Figma },
      { name: "Vercel", Icon: Vercel },
    ],
  },
];

export default function TechStack() {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-wide text-neutral-400">
        TECH STACK
      </h2>

      <Tabs.Root defaultValue="frontend" className="mt-4">
        <Tabs.List className="relative flex border-b border-neutral-700">
          {CATEGORIES.map((category) => (
            <Tabs.Trigger
              key={category.value}
              value={category.value}
              className={clsx([
                "px-4 py-2 text-sm text-neutral-400",
                "-mb-px border border-transparent",
                "focus:outline-none",
                "data-[state=active]:border-neutral-700",
                "data-[state=active]:border-b-neutral-950",
                "data-[state=active]:text-neutral-100",
                "data-[state=active]:bg-neutral-950",
              ])}
            >
              {category.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {CATEGORIES.map((category) => (
          <Tabs.Content
            key={category.value}
            value={category.value}
            className="pt-6"
          >
            <div className="grid grid-cols-4 gap-6 sm:grid-cols-6 lg:grid-cols-8">
              {category.items.map(({ name, Icon }) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <Icon size={32} />
                  <span className="text-xs text-neutral-400">{name}</span>
                </div>
              ))}
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}
