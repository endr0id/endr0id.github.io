import Link from "next/link";
import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <div className="flex justify-between items-center px-6 h-14">
        <Link
          href="/"
          className="text-xl font-semibold hover:opacity-80 transition-opacity"
        >
          deVlog
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
