import React, { ReactNode } from "react";
import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";

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

        <main className="grow w-full mt-16 relative">

            <section className="flex justify-center items-center ">

                <div className="grow p-4">
                    {children}
                </div>
            </section>
        </main>
        <Footer />
    </>;
}
