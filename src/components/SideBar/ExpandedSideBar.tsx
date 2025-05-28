import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Icon from "../SVGComponents/DashboardWhite";
import BookIcon from "../SVGComponents/Booksvg";
const ExpandedSidebar = () => {
  const pathname = usePathname();
  const navItems = [
    {
      href: "/home",
      label: "Overview",
      icon: <Icon fill="black"  className="h-6 w-6  text-black" />,
      activeIcon: <Icon fill="white"  className="h-6 w-6  text-white" />,
      exact: true,
    },
    {
      href: "/userDashboard",
      label: "Dashboard",
      icon:<BookIcon fill="black" className="h-6 w-6 text-black" />,
      activeIcon: <BookIcon fill="white" className="h-6 w-6 text-white" />,
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
                  <div >
                    {isActive? activeIcon : icon}
                  </div>
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
