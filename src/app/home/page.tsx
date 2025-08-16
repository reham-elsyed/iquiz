import EmptyQuizHistory from "@/components/EmptyStatsForNewUsers/emptyStatsForNewUsers";
import GamesDurationGraph from "@/components/GamesDurationGraph/GamesDurationGraph";
import GamesPerformanceReview from "@/components/GamesPerformanceReview/GamesPerformanceReview";
import Hero from "@/components/Hero/Hero";
import NewUserGraphReplace from "@/components/NewUserComponents/NewUserGraphReplacer/NewUserGraphReplace";
import NewUserOnboarding from "@/components/NewUserComponents/NewUserOnboarding/NewUserOnboarding";
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
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="container p-8 mx-auto z-10 ">
        <div className="flex flex-col gap-5">
          <Hero />
          <div className="w-full"> <PopularGames /></div>
          {gamesForStats.length === 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <NewUserGraphReplace />
            <NewUserOnboarding />

          </div> :
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex-1 h-fit md:h-full">
                <GamesDurationGraph />
              </div>
              <div className="flex-1 h-fit md:h-full">
                <GamesPerformanceReview />
              </div>
            </div>}

          {gamesForStats.length === 0 ? <EmptyQuizHistory /> : <OverviewStatsComponent gamesWithStats={gamesForStats} />}
          <QuizTypesComponent />
        </div>
      </div>
    </div>
  );
}
