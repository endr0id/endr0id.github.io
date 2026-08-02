import { ThemeProvider } from "next-themes";
import { locales } from "@/config/locale";
import Header from "./_components/header/Header";
import ViewportBlur from "./_components/viewportBlur/ViewportBlur";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider enableSystem={false}>
      <ViewportBlur />
      <Header />
      {children}
    </ThemeProvider>
  );
}
