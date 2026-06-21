"use client";

import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-between items-center px-6 h-14 border-b border-gray-500">
      <div>endr0id deVlog</div>
      <div>
        <button onClick={() => setTheme("light")}>Light Mode</button>
        <button onClick={() => setTheme("dark")}>Dark Mode</button>
      </div>
    </div>
  );
};

export default Header;
