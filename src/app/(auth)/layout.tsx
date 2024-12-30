import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative flex h-screen flex-col bg-black md:items-center md:justify-center md:bg-slate-100">
        {children}
      </div>
    </>
  );
}
