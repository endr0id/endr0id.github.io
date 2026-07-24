import Link from "next/link";
import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 h-14 border-b border-outline">
      <Link href="/">
        <p className="text-1xl font-semibold">deVlog</p>
      </Link>
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
