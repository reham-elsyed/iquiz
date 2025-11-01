import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "./providers/NextAuthProvider";
import FilterEffect from "@/components/FilterEffect/FilterEffect";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import GradientEffect from "@/components/GradientEffect/GradientEffect";
import "react-loadly/styles.css";
import AnimatedGrid from "@/components/AnimatedGrid/AnimatedGrid";
export const metadata: Metadata = {
  title: "IQuiz",
  description: "AI quiz generation app",
  icons: {
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <NextAuthProvider>
        <GradientEffect />
        <body className={cn("font-geist antialiased flex flex-col min-h-screen relative")}>
          {children}
        </body>
        <Toaster />
      </NextAuthProvider>
    </html>
  );
}
