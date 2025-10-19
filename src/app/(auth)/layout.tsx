import AnimatedGrid from "@/components/AnimatedGrid/AnimatedGrid";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { AnimateSharedLayout } from "framer-motion";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex items-center justify-center h-screen overflow-hidden relative">
        <AnimatedGrid />
        <div className="container  mx-auto px-5  ">
          <div className="grid grid-cols-1 lg:grid-cols-7  relative ">
            <div className=" relative flex  flex-col  md:items-center md:justify-center col-span-1 lg:col-span-3 lg:col-start-3 lg:col-end-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
