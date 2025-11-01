import { Navbar01NavLink } from "@/components/ui/shadcn-io/navbar-01";

export const LinksArray: Navbar01NavLink[] = [
  {
    href: "/home",
    label: "Overview",
    active: false
  }, {
    href: "/userDashboard",
    label: "Dashboard",
    active: false
  },
  {
    href: "/create-flashcard",
    label: "Create flashcards",
    active: false
  }
]