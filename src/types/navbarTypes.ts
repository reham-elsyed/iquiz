export interface LinkProps {
  name: string;
  href: string;
}

export type Links = LinkProps[];
export const linksArray: Links = [
  { name: "Home", href: "/home" },
  { name: "Dashboard", href: "/userDashboard" },
 {name:"flashCard",href:"/create-flashcard"}
];
