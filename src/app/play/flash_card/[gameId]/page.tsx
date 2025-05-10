import FlipCardComponent from "@/components/FlipCardComponent/FlipCardComponent";
import prisma from "@/lib/db";
type Props = {
    params: Promise<{
      gameId: string;
    }>;
  };
export default async function FlashCardPage({params}: Props) {
   const awaitedParams = await params;
   const { gameId } = awaitedParams;

   const game = await prisma.game.findUnique({
    where:{
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

   })
return (
    <div className="flex h-screen">
        {game ? (
            <FlipCardComponent game={game} />
        ) : (
            <div>Game not found</div>
        )}
    </div>
);
}