import { CopyCheck, Edit } from "lucide-react";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { redirect } from "next/navigation";
import Link from "next/link";

type Props = {};
const appGamesNames = [
  {
    name: "MCQ",
    icon: <CopyCheck className=" object-fit h-[8em] w-[8em]" />,
    desc: [
      "Choose a Topic: Select a subject or topic for your quiz.",
      "AI Question Generation: Let QuizWhiz generate multiple-choice questions for you.",
      "Answer and Review: Answer the questions, receive instant AI feedback, and review explanations to strengthen your knowledge.",
    ],
  },
  {
    name: "Open Ended",
    icon: <Edit className="  object-fit h-[8em] w-[8em]" />,
    desc: [
      `Define Your Topic: Input your quiz topic or subject area.`,
      "Create Thought-Provoking Questions: Allow the AI to suggest open-ended questions or create your own.",
      "Get Feedback: Submit your answers and receive detailed AI-driven feedback, insights, and suggestions to improve.",
    ],
  },
];
const QuizTypesComponent = (props: Props) => {
  return (
    <div className="pt-20">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-3  card space-y-0 md:space-y-3">
        {appGamesNames.map((game) => (
          <Card
            key={game.name}
            className="hover:scale-110 duration-300 w-full mx-auto md:max-w-md lg:max-w-lg xl:max-w-xl "
          >
            <CardHeader className="relative  h-full w-full flex flex-col items-center justify-center  ">
              <div className="md: flex justify-center  items-center   rounded-full  left-5  h-[10em] w-[10em]  bg-background text-foreground">
                {game.icon}
              </div>

              <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                <Link href="/quiz">{game.name}</Link>
              </CardTitle>
              <CardDescription>
                <ul className="p-5">
                  {game.desc?.map((des, index) => (
                    <li key={index} className="text-base  ">
                      {" "}
                      {des}
                    </li>
                  ))}
                </ul>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizTypesComponent;
