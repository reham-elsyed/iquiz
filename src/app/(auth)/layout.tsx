import AnimationRobot from "@/components/AnimationRobot/AnimationRobot";
import Rocket from "@/components/SVGComponents/Rocket";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex items-center justify-center  ">
        <div className="container  mx-auto p-5 rounded-2xl  ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  rounded-2xl shadow-lg relative">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-background/40 backdrop-blur-xs border border-white/25 shadow-lg"></div>
            <div className="hidden md:block ">
              <AnimationRobot /></div>
            <div className=" relative flex  flex-col  md:items-center md:justify-center ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
