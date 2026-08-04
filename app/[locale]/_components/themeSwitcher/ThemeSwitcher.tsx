"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@teispace/next-themes";
import { Moon, SunMedium } from "lucide-react";
import { Toggle } from "radix-ui";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const icon =
    theme === "dark" ? (
      <Moon data-testid="icon-moon" />
    ) : (
      <SunMedium data-testid="icon-sun" />
    );

  const handleTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  useEffect(() => setMounted(true), []);

  // Preventing hydration mismatches between SSR and CSR
  // As the `theme` value is unavailable during SSR, rendering is deferred until the CSR is mounted
  if (!mounted) return null;

  return (
    <Toggle.Root
      onPressedChange={handleTheme}
      className="flex items-center justify-center p-1 border rounded border-outline"
      data-testid="theme-switch-toggle"
    >
      {mounted && icon}
    </Toggle.Root>
  );
};

export default ThemeSwitcher;
