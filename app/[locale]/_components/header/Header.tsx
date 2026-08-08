import Link from "next/link";
import Avatar from "@/src/components/avatar/Avatar";
import LocaleSwitcher from "../localeSwitcher/localeSwitcher";
import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";
import type { Locale } from "@/config/locale";

const Header = ({ locale }: { locale: Locale }) => {
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
          <Link href={`/${locale}/me`}>
            <Avatar size="sm" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
