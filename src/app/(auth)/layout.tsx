import AnimationRobot from "@/components/AnimationRobot/AnimationRobot";
import LoginComponent from "@/components/SVGComponents/LoginComponent";
import Rocket from "@/components/SVGComponents/Rocket";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>

      {/* <div className="flex items-center justify-center h-screen  ">
        <div className="container  mx-auto p-5 rounded-2xl  ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  relative">
            <div className="hidden md:block ">
              <LoginComponent /></div>
            <div className=" relative flex  flex-col  md:items-center md:justify-center ">
              {children}
            </div>
          </div>
        </div>
      </div> */}


      <div className="flex items-center justify-center h-screen overflow-hidden ">
        <div className="container  mx-auto p-5 rounded-2xl  ">
          <div className="grid grid-cols-1 lg:grid-cols-7  relative ">
            <div className="hidden lg:block  lg:col-span-4  ">
              <LoginComponent /></div>
            <div className=" relative flex  flex-col  md:items-center md:justify-center col-span-1 lg:col-span-3 ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
