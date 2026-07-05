"use client";

import { useEffect, useState } from "react";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "radix-ui";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");
  const icon = theme === "dark" ? <Moon /> : <SunMedium />;

  // Preventing hydration mismatches between SSR and CSR
  // As the `theme` value is unavailable during SSR, rendering is deferred until the CSR is mounted
  if (!mounted) return null;

  return (
    <Toggle.Root
      onPressedChange={handleTheme}
      className="flex items-center justify-center p-1 border rounded border-outline"
      aria-label="Theme Switch"
    >
      {mounted && icon}
    </Toggle.Root>
  );
};

export default ThemeSwitcher;
