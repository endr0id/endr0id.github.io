export const locales = ["ja", "en"] as const;
export type Locale = (typeof locales)[number];
const supportedLocales: ReadonlySet<string> = new Set(locales);

// NOTE: ネゴシエーション失敗時のfallback
export const defaultLocale: Locale = locales[1];

export const isLocale = (value: string): value is Locale => {
  return supportedLocales.has(value);
};
