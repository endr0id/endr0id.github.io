import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useTheme } from "@teispace/next-themes";
import ThemeSwitcher from "../ThemeSwitcher";

vi.mock("next-themes", () => ({
  useTheme: vi.fn(),
}));

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("theme=lightのときSunMediumが表示され、クリックでdarkに切り替わる", () => {
    const setTheme = vi.fn();
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: "light",
      setTheme,
    });

    render(<ThemeSwitcher />);

    expect(screen.getByTestId("icon-sun")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-moon")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("theme-switch-toggle"));
    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  test("theme=darkのときMoonが表示され、クリックでlightに切り替わる", () => {
    const setTheme = vi.fn();
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: "dark",
      setTheme,
    });

    render(<ThemeSwitcher />);

    expect(screen.getByTestId("icon-moon")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-sun")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("theme-switch-toggle"));
    expect(setTheme).toHaveBeenCalledWith("light");
  });
});
