import { ThemeProvider } from "@teispace/next-themes";
import { locales } from "@/config/locale";
import Header from "./_components/header/Header";
import ViewportFade from "./_components/viewportFade/ViewportFade";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider enableSystem={false}>
      <ViewportFade />
      <Header />
      {children}
    </ThemeProvider>
  );
}
