import React, { ReactNode } from "react";
import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";
import Navbar from "@/components/NavBar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer/Footer";
import Sidebar from "@/components/SideBar/SideBar";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }
  return <>
    <Navbar />

    <main className="flex-grow w-full mt-16 relative">

      <section className="flex ">
        <Sidebar />
        <div className="flex-grow p-4">
          {children}
        </div>
      </section>

      <Toaster />
    </main>
    <Footer />
  </>;
}
