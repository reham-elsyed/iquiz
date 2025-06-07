"use client";
import React, { useState } from "react";
import ExpandedSidebar from "./ExpandedSideBar";
import Collabsed from "./CollabsedSidebar";
const Sidebar = () => {
  const [isToggled, setIsToggled] = useState(false);
  function handleToggle() {
    setIsToggled((prev) => !prev);
    console.log(isToggled);
  }
  return (
    <header className="bg-card rounded-md  w-fit  top-0 left-0 bottom-0 z-10 shadow-lg">
      <h1
        className="cursor-pointer text-2xl   text-center p-2"
        onClick={handleToggle}
      >
        IQ
      </h1>
      {isToggled ? (
        <div
          className={` flex flex-col items-start  ${isToggled && "animate-growWidth"} `}
        >
          {/* <ExpandedSidebar/> */}

          <ExpandedSidebar />
        </div>
      ) : (
        <Collabsed />
      )}
    </header>
  );
};

export default Sidebar;
