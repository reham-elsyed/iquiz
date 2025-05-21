import React from "react";
//import Dashboardicon from 'public/si_dashboard-fill.svg'
// Make sure the SVG exists in the public or src/assets directory and update the path accordingly
// Update the path below to the correct location of your SVG file
//import QuizIcon from 'public/material-symbols_quiz.svg'
//import DashboardiconWhite from 'public/si_dashboard-fill-white.svg'
import { usePathname } from "next/navigation";
import Link from "next/link";

const ExpandedSidebar = () => {
  const pathname = usePathname();
  const navItems = [
    {
      href: "/home",
      label: "Overview",
      icon: "/si_dashboard-fill.svg",
      activeIcon: "/si_dashboard-fill-white.svg",
      exact: true,
    },
    {
      href: "/userDashboard",
      label: "Dashboard",
      icon: "/material-symbols_quiz.svg",
    },
  ];
  return (
    <>
      <nav className="w-full">
        <ul>
          {navItems.map(({ href, label, icon, activeIcon, exact }) => {
            const isActive = exact
              ? pathname === href
              : pathname.startsWith(href);
            return (
              <li className="tab">
                <Link
                  href={href}
                  className={`
                       ${isActive ? "bg-[#121212] text-white" : "bg-[#F4ECE5] text-black"} 
                       flex justify-start items-center tab `}
                >
                  <img
                    src={isActive ? icon : activeIcon}
                    alt="Dashboard Icon"
                    className="h-6 w-6"
                  />
                  <p className={`ps-3 `}>{label}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default ExpandedSidebar;
