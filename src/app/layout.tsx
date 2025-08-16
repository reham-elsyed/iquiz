import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "./providers/NextAuthProvider";
import Navbar from "@/components/NavBar/Navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer/Footer";
import Sidebar from "@/components/SideBar/SideBar";
import FilterEffect from "@/components/FilterEffect/FilterEffect";

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
        <body className={cn("bg-gradient-to-br from-[hsl(210,100%,97%)] via-[hsl(225,50%,95%)] to-[hsl(240,25%,92%)] dark:from-[hsl(250,35%,25%)] dark:via-[hsl(270,30%,28%)] dark:to-[hsl(290,25%,32%)]  font-geist antialiased flex flex-col")}>

          <Navbar />

          <main className="flex-grow w-full mt-16 relative">
            <FilterEffect />
            <section className="flex ">
              <Sidebar />
              <div className="flex-grow p-4">
                {children}
              </div>
            </section>
            <Footer />
            <Toaster />
          </main>
        </body>
      </NextAuthProvider>
    </html>
  );
}
