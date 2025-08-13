import GamesDurationGraph from "@/components/GamesDurationGraph/GamesDurationGraph";
import GamesPerformanceReview from "@/components/GamesPerformanceReview/GamesPerformanceReview";
import Hero from "@/components/Hero/Hero";
import OverviewStatsComponent from "@/components/OverviewStatsComponent/OverviewStatsComponent";
import PopularGames from "@/components/PopularGames/PopularGames";
import QuizTypesComponent from "@/components/QuizTypesComponent/QuizTypesComponent";
import { getUserGames } from "@/lib/generalStatsUtils";
import { getAuthSession } from "@/lib/nextAuth";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Home| IQuiz",
};
export type GameWithQuestions = Prisma.GameGetPayload<{ include: { questions: true } }>;
export default async function HomePage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login")
  }
  //force type on return to always include questions for this return


  const gamesForStats = await getUserGames(session?.user.id as string, {
    includeQuestions: true,
  }) as GameWithQuestions[];
  console.log(gamesForStats, "game For Stats")
  return (
    <div className="container p-8 mx-auto ">
      <div className="flex flex-col gap-5">
        <Hero />
        <div className="w-full"> <PopularGames /></div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1 h-fit md:h-full">
            <GamesDurationGraph />
          </div>
          <div className="flex-1 h-fit md:h-full">
            <GamesPerformanceReview />
          </div>
        </div>
        <OverviewStatsComponent gamesWithStats={gamesForStats} />
        {/* <QuizTypesComponent /> */}
      </div>
    </div>
  );
}
