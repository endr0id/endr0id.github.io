import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { defaultLocale, isLocale } from "@/config/locale";

export function useLocaleRedirect() {
  const router = useRouter();

  useEffect(() => {
    const preferred = navigator.language.slice(0, 2);
    const matched = isLocale(preferred) ? preferred : defaultLocale;
    router.replace(`/${matched}`);
  }, [router]);
}
