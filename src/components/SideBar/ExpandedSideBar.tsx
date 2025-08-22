import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Icon from "../SVGComponents/DashboardWhite";
import BookIcon from "../SVGComponents/Booksvg";
import { navItems } from "./CollabsedSidebar";
const ExpandedSidebar = () => {
  const pathname = usePathname();

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
    flex justify-start items-center tab rounded-xl px-3 py-2 transition-colors
    ${isActive
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"}
  `}
                >
                  <div >
                    {isActive ? activeIcon : icon}
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
