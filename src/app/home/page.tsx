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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/2 rounded-full blur-3xl"></div>
      </div>
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
