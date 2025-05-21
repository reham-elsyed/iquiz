import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "./providers/NextAuthProvider";
import Navbar from "@/components/NavBar/Navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer/Footer";
import Sidebar from "@/components/SideBar/SideBar";

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
        <body className={cn("font-geist  antialiased flex  ")}>
          <Navbar />
          <Sidebar />
          <main className="flex flex-col w-full mt-16">
            {children}
            <Footer />
            <Toaster />
          </main>
        </body>
      </NextAuthProvider>
    </html>
  );
}
