import React, { ReactNode } from "react";
import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";
export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }
  return <div>{children}</div>;
}
