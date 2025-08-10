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
        <body className={cn("font-geist  antialiased bg-forground flex flex-col")}>
          <Navbar />

          <main className="flex-grow w-full mt-16">
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
