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

            {/* <div className="lg:block  lg:col-span-4 relative perspective-distant">
              <div>
                <p className="text-muted-foreground mb-2 text-sm">Want to ace your finals</p>
                <p className="text-muted-foreground mb-2 text-sm">Let me Automate the learning proces so you can focus on the important stuf</p>
                <p className="text-muted-foreground mb-2 text-sm">Just choose the topic and the number of questions and I Quiz will:</p>
              
              </div>
            </div> */}
            <div className=" relative flex  flex-col  md:items-center md:justify-center col-span-1 lg:col-span-3 lg:col-start-3 lg:col-end-6  ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
