import FlipCardComponent from "@/components/FlashCard/FlipCardComponent/FlipCardComponent";
import prisma from "@/lib/db";
type Props = {
  params: Promise<{
    gameId: string;
  }>;
};
export default async function FlashCardPage({ params }: Props) {
  const awaitedParams = await params;
  if (!awaitedParams) {
    return <div>Loading...</div>;
  }
  // Destructure the awaited params to get gameId
  const { gameId } =  awaitedParams;

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
        },
      },
    },
  });
  return (
    <div className=" h-[calc(100vh-4rem)]">
      {gameData ? <FlipCardComponent game={gameData} /> : <div>Game not found</div>}
    </div>
  );
}
