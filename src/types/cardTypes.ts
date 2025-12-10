export interface CardType {
  Title: string;
  content: string;
  icon: string;
  path: string;
}
export const cardData: CardType[] = [
  {
    Title: "dashboardCards.quizMe.title",
    content: "dashboardCards.quizMe.content",
    icon: "BrainCircuit",
    path: "/quiz",
  },
  {
    Title: "dashboardCards.flashCards.title",
    content: "dashboardCards.flashCards.content",
    icon: "",
    path: "/create-flashcard",
  },
];
