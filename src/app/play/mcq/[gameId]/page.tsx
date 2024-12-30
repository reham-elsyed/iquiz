import MCQuiz from "@/components/MCQuiz/MCQuiz";
import prisma from "@/lib/db";
import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{
    gameId: string;
  }>;
};

const McqPage = async ({ params }: Props) => {
  const awaitedParams = await params;
  const { gameId } = awaitedParams;
  const session = await getAuthSession();
  if (!session) {
    return redirect("/");
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
        },
      },
    },
  });
  if (!game || game.gameType !== "mcq") {
    return redirect("/quiz");
  }
  return <MCQuiz game={game} />;
};

export default McqPage;
