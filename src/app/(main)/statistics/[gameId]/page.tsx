import AccuracyCard from "@/components/Statistics/AccuracyCard";
import QuestionList from "@/components/Statistics/QuestionList";
import ResultCard from "@/components/Statistics/ResultCard";
import StatsGrid from "@/components/Statistics/StatsGrid/StatsGrid";
import TimeTakenCard from "@/components/Statistics/TimeTakenCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";
import { TextAurora } from "@/components/ui/Text-Aurora";
import prisma from "@/lib/db";
import { getAuthSession } from "@/lib/nextAuth";
import {
  calculateAccuracyOfMCQ,
  calculateAccuracyOfOpenended,
} from "@/lib/utils";
import { GameWithQuestions } from "@/types/gameTypes";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{
    gameId: string;
  }>;
};

const StatisticePage = async ({ params }: Props) => {
  const awaitedParams = await params;
  const { gameId } = awaitedParams;

  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }
  const game: GameWithQuestions | null = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: true,
    },
  });
  if (!game) {
    return redirect("/quiz");
  }
  // console.log("statistics game:   ", game)
  let accuracy: number = 0;
  if (game.gameType === "mcq") {
    accuracy = calculateAccuracyOfMCQ(game);
  } else if (game.gameType === "open_ended") {
    accuracy = calculateAccuracyOfOpenended(game);
  }
  // console.log(game.timeEnded, game.timeStarted)
  return (
    <>
      <section className="p-8 mx-auto w-11/12">
        <div className="flex items-center justify-between space-y-2 relative">
          {/* <h2 className="text-3xl font-bold tracking-tight">Statistics</h2> */}
          <TextAurora text="Statistics" className="" />
          <div className="flex items-center space-x-2">
            <Button variant={"ghost"} className="app-button">
              <Link href="/userDashboard" className="flex items-center">
                <LucideLayoutDashboard className="mr-2" /> Back To Dashboard
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0">{accuracy > 50 && <Confetti />}</div>
        <StatsGrid accuracy={accuracy} timeEnded={game.timeEnded as Date} timeStarted={game.timeStarted} questions={game.questions} gameTopic={game.topic} />
        <QuestionList questions={game.questions} />
      </section >
    </>
  );
};

export default StatisticePage;
