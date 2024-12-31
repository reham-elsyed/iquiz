import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative flex h-screen flex-col  md:items-center md:justify-center ">
        {children}
      </div>
    </>
  );
}
