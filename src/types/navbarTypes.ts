import { Navbar01NavLink } from "@/components/ui/shadcn-io/navbar-01";
import { Label } from "recharts";

export interface LinkProps {
  name: string;
  href: string;
}

export type Links = LinkProps[];
// export const linksArray: Links = [
//   { name: "Home", href: "/home" },
//   { name: "Dashboard", href: "/userDashboard" },
//   { name: "flashCard", href: "/create-flashcard" },
// ];
export const LinksArray: Navbar01NavLink[] = [
  {
    href: "/home",
    label: "Overview",
    active: false
  }, {
    href: "/userDashboard",
    label: "Dashboard",
    active: false
  }
]