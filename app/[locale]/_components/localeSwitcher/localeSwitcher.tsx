"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Separator } from "radix-ui";
import { type Locale, defaultLocale, isLocale, locales } from "@/config/locale";

const LocaleSwitcher = () => {
  const pathname = usePathname();
  const segments = pathname.split("/"); // URL全体を構成する配列
  const [, localSegment] = segments; // "en" or "ja"のみ利用
  const currentLocale = isLocale(localSegment) ? localSegment : defaultLocale;

  const getHref = (locale: Locale) => {
    const nextSegments = [...segments];
    nextSegments[1] = locale;

    return nextSegments.join("/");
  };
  return (
    <nav aria-label="Language switcher">
      <ul className="flex item-center">
        {locales.map((locale, index) => {
          const isActive = locale === currentLocale;

          return (
            <li key={locale} className="flex item-center">
              {index > 0 && (
                <Separator.Root
                  orientation="vertical"
                  className="mx-2 w-[1px] bg-neutral-300 dark:bg-neutral-700"
                />
              )}
              <Link
                href={getHref(locale)}
                hrefLang={locale}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  "transition-colors",
                  isActive
                    ? "font-semibold"
                    : "text-neutral-500 hover:text-neutral-400",
                )}
              >
                {locale.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default LocaleSwitcher;
