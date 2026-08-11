import { en } from "./en";
import { ja } from "./ja";
import type { Locale } from "@/config/locale";
import type { Profile } from "../_types/";

export const ProfileDictionary: Record<Locale, Profile> = { en, ja };
