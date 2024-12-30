export interface LinkProps {
  name: string;
  href: string;
}

export type Links = LinkProps[];
export const linksArray: Links = [
  { name: "Home", href: "/home" },
  { name: "Dashboard", href: "/userDashboard" },
  { name: "Create Quiz", href: "/new-quiz-form" },
  { name: "My Quizes", href: "/quiz-archive" },
];
