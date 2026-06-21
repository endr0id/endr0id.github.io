import { useTheme } from "next-themes";
import ThemeToggleButton from "./ThemeToggleButton";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 h-14 border-b border-gray-500">
      <div>endr0id deVlog</div>
      <ThemeToggleButton />
    </div>
  );
};

export default Header;
