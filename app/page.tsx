"use client";

import { useLocaleRedirect } from "./_hooks/useLocaleRedirect";

export default function Page() {
  useLocaleRedirect();

  // TODO: loadingコンポーネント返す様にする
  return null;
}
