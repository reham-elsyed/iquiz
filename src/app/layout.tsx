import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "./providers/NextAuthProvider";
import FilterEffect from "@/components/FilterEffect/FilterEffect";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import GradientEffect from "@/components/GradientEffect/GradientEffect";
import "react-loadly/styles.css";
import AnimatedGrid from "@/components/AnimatedGrid/AnimatedGrid";
import initTranslations from "./i18n";
import TranslationsProvider from "../i18n/TranslationsProvider";
import { cookies } from "next/headers";
import i18nConfig from "@/i18n/i18nConfig";

export const metadata: Metadata = {
  title: "IQuiz",
  description: "AI quiz generation app",
  icons: {
  },
};

const i18nNamespaces = ['common', 'auth', 'quiz', 'dashboard', 'navigation'];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get(i18nConfig.localeCookie)?.value || i18nConfig.defaultLocale;
  const { resources, i18n } = await initTranslations(locale, i18nNamespaces);
  const dir = i18n.dir(locale);

  return (
    <html lang={locale} dir={dir}>
      <head>
      </head>
      <TranslationsProvider resources={resources} namespaces={i18nNamespaces}>

        <NextAuthProvider>
          <GradientEffect />
          <body className={cn("font-geist antialiased flex flex-col min-h-screen relative")}>
            {children}
          </body>
          <Toaster />
        </NextAuthProvider>
      </TranslationsProvider>
    </html>
  );
}
