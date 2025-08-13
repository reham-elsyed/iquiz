import GamesDurationGraph from "@/components/GamesDurationGraph/GamesDurationGraph";
import GamesPerformanceReview from "@/components/GamesPerformanceReview/GamesPerformanceReview";
import Hero from "@/components/Hero/Hero";
import OverviewStatsComponent from "@/components/OverviewStatsComponent/OverviewStatsComponent";
import PopularGames from "@/components/PopularGames/PopularGames";
import QuizTypesComponent from "@/components/QuizTypesComponent/QuizTypesComponent";
import { getAuthSession } from "@/lib/nextAuth";
export const metadata = {
  title: "Home| IQuiz",
};
export default async function HomePage() {
  const session = await getAuthSession();

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
        <OverviewStatsComponent stats={{ totalQuizzes: 10, averageScore: 85, totalTime: "45", currentStreak: 7, rank: 6, bestStreak: 12 }} />
        {/* <QuizTypesComponent /> */}
      </div>
    </div>
  );
}
