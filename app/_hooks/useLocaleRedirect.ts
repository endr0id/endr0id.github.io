import { useEffect } from "react";
import { defaultLocale, isLocale } from "@/config/locale";

export function useLocaleRedirect() {
  useEffect(() => {
    const preferred = navigator.language.slice(0, 2);
    const matched = isLocale(preferred) ? preferred : defaultLocale;

    // NOTE: next/navigationのuseRouterを使用するとSPA遷移となり
    // next-themeがSSR HTMLに埋め込む<script>タグが実行されないエラーになるため
    // 通常ページ遷移のwindow.location.replaceを使用する
    window.location.replace(`/${matched}`);
  }, []);
}
