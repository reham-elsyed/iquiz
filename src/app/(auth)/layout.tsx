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
            <div className="hidden lg:block  lg:col-span-4 relative ">

              <div
                className="absolute -top-20 -left-30 h-[130%] rounded-2xl border-4 border-amber-500 w-[100%] aspect-video  mx-auto">
                <video
                  loop
                  autoPlay
                  muted
                  playsInline
                  src="https://gokxczesysklzepbknzb.supabase.co/storage/v1/object/sign/demo%20video/Untitled%20design%20(2).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMGRlYWQwYy1kNzY4LTQwMTEtYTkwNS0wNWM0M2JhZDY1MjIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZW1vIHZpZGVvL1VudGl0bGVkIGRlc2lnbiAoMikubXA0IiwiaWF0IjoxNzYwMDIzODY3LCJleHAiOjE5MTc3MDM4Njd9.qIDk9HqG5Le_Z1VutGTe28P-LEyK8vGBjMdSjge6rP0"
                  controls
                  className="w-full h-full object-fill rounded-xl shadow-lg" />
              </div>
            </div>
            <div className=" relative flex  flex-col  md:items-center md:justify-center col-span-1 lg:col-span-3 ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
