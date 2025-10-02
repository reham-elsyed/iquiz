import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "./providers/NextAuthProvider";
import FilterEffect from "@/components/FilterEffect/FilterEffect";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "IQuiz",
  description: "AI quiz generation app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={cn("bg-gradient-to-br from-[hsl(210,100%,97%)] via-[hsl(315,43%,91%)] to-[hsl(240,25%,92%)] dark:from-[hsl(250,35%,25%)] dark:via-[hsl(270,30%,28%)] dark:to-[hsl(290,25%,32%)]  font-geist antialiased flex flex-col min-h-screen")}>
          <FilterEffect />
          {children}
        </body>
        <Toaster />
      </NextAuthProvider>
    </html>
  );
}
