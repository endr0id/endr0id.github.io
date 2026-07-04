import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "./_components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "deVlog | endr0id ",
  description:
    "A personal developer blog by endr0id. Documenting daily learnings, tech notes, and things I build.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <meta name="viewport" content="width=device-width initial-scale=1.0" />
      <body className="min-h-full flex flex-col">
        <ThemeProvider enableSystem={false}>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
