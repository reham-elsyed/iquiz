export interface CardType {
  Title: string;
  content: string;
  icon: string;
  path: string;
}
export const cardData: CardType[] = [
  {
    Title: "Quiz Me",
    content: "challenge Yourself with a Quiz!",
    icon: "BrainCircuit",
    path: "/quiz",
  },
  {
    Title: "Flash Cards",
    content: "Learn with Flash Cards",
    icon: "",
    path: "/create-flashcard",
  },
];
