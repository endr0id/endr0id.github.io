import { ThemeProvider } from "@teispace/next-themes";
import { type Locale, locales } from "@/config/locale";
import Header from "./_components/header/Header";
import ViewportFade from "./_components/viewportFade/ViewportFade";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Layout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
  children: React.ReactNode;
}>) {
  const { locale } = await params;

  return (
    <ThemeProvider enableSystem={false}>
      <ViewportFade />
      <Header locale={locale} />
      {children}
    </ThemeProvider>
  );
}
