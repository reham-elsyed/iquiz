import AccuracyCard from "@/components/Statistics/AccuracyCard";
import QuestionList from "@/components/Statistics/QuestionList";
import ResultCard from "@/components/Statistics/ResultCard";
import TimeTakenCard from "@/components/Statistics/TimeTakenCard";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/db";
import { getAuthSession } from "@/lib/nextAuth";
import {
  calculateAccuracyOfMCQ,
  calculateAccuracyOfOpenended,
} from "@/lib/utils";
import { GameWithQuestions } from "@/types/gameTypes";
import { Prisma } from "@prisma/client";
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
      <section className="p-8 mx-auto- max-w-7xl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Statistics</h2>
          <div className="flex items-center space-x-2">
            <Link href="/userDashboard" className={buttonVariants()}>
              <LucideLayoutDashboard className="mr-2" /> Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-7">
          <ResultCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          <TimeTakenCard
            timeEnded={game.timeEnded as Date}
            timeStarted={game.timeStarted}
          />
        </div>
        <QuestionList questions={game.questions} />
      </section>
    </>
  );
};

export default StatisticePage;
