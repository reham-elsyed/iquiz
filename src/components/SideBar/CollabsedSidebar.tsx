import React from "react";

//import Dashboardicon from '/si_dashboard-fill.svg?url'
//import DashboardiconWhite from '/si_dashboard-fill-white.svg?url'

//import QuizIcon from '/material-symbols_quiz.svg?url'
import Icon from "../SVGComponents/DashboardWhite";
import BookIcon from "../SVGComponents/Booksvg";
import { usePathname } from "next/navigation";
import Link from "next/link";
export const navItems = [
  {
    href: "/home",
    label: "Overview",
    icon: <Icon className="h-6 w-6 text-muted-foreground dark:text-muted-foreground" />,
    activeIcon: <Icon className="h-6 w-6 text-primary dark:text-primary" />,
    exact: true,
  },
  {
    href: "/userDashboard",
    label: "Dashboard",
    icon: <BookIcon className="h-6 w-6 text-muted-foreground dark:text-muted-foreground" />,
    activeIcon: <BookIcon className="h-6 w-6 text-primary dark:text-primary" />,
  },
];
const Collabsed = () => {
  const pathname = usePathname();

  return (
    <>
      <nav>
        <ul className=" flex gap-4 flex-col justify-center items-center">
          {navItems.map(({ href, label, icon, activeIcon, exact }) => {
            const isActive = exact
              ? pathname === href
              : pathname.startsWith(href);
            return (
              <li className="tab" key={label}>
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
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Collabsed;
