import Link from "next/link";
import LocaleSwitcher from "../localeSwitcher/localeSwitcher";
import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center px-6 h-14">
        <Link
          href="/"
          className="text-xl font-semibold hover:opacity-80 transition-opacity"
        >
          deVlog
        </Link>
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
