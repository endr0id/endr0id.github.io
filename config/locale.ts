export const locales = ["ja", "en"] as const;
export type Locale = (typeof locales)[number];

// TODO: 言語判別処理用意後は削除する
export const defaultLocale: Locale = "ja";
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);
