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
  const feedBack = []
  const studySession = await findStudySession(gameData?.id as string, gameData?.userId as string)
  console.log("Study Session Data from page:", studySession);
  if (studySession?.status === "FINISHED") {
    redirect("/home")
  }
  const studySessionFeedback = await prisma.studySession.findUnique({
    where: { id: gameData?.id as string },
    include: {
      feedbacks: true, // ✅ now we get QuestionFeedback[]
    },
  });


  const questionsWithFeedback = gameData?.questions.map(q => {
    const feedback = studySessionFeedback?.feedbacks.find(fb => fb.questionId === q.id);

    return {
      ...q,
      feedback: feedback?.feedback ?? null,
      timeSpent: feedback?.timeSpent ?? null,
    };
  });
  console.log("Questions with Feedback:", questionsWithFeedback);
  return (
    <div className="flex flex-col lg:flex-row justify-center  items-center  gap-8 py-5 min-h-full">
      {gameData ? <FlipCardComponent game={gameData} studySession={studySession as studySessionInterface} /> : <div>Game not found</div>}

    </div>
  );
}
