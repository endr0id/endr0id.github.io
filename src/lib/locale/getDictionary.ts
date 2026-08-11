import { type Locale } from "@/config/locale";

export const getDictionary = <T>(locale: Locale, dict: Record<Locale, T>): T =>
  dict[locale];
