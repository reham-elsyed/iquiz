import Loading from "@/app/loading";
import FlipCardComponent from "@/components/FlashCard/FlipCardComponent/FlipCardComponent";
import prisma from "@/lib/db";
import { findStudySession } from "@/lib/findStudySession";
import { studySessionInterface } from "@/types/feedbackFlashcardTypes";
import { redirect } from "next/navigation";
type Props = {
  params: Promise<{
    gameId: string;
  }>;
};
export default async function FlashCardPage({ params }: Props) {
  const awaitedParams = await params;
  if (!awaitedParams) {
    return <div><Loading /></div>;
  }
  // Destructure the awaited params to get gameId
  const { gameId } = awaitedParams;

  const gameData = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          answer: true,
          questionType: true,
        },
      },
    },
  });
  const studySession = await findStudySession(gameData?.id as string, gameData?.userId as string)
  if (studySession?.status === "FINISHED") {
    redirect("/home")
  }
  return (
    <div className="">
      {gameData ? <FlipCardComponent game={gameData} studySession={studySession as studySessionInterface} /> : <div>Game not found</div>}
    </div>
  );
}
