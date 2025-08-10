import GamesDurationGraph from "@/components/GamesDurationGraph/GamesDurationGraph";
import Hero from "@/components/Hero/Hero";
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
        <div className="flex flex-col md:flex-row gap-5 h-[500px]">
          <div className="flex-1 h-full">
            <GamesDurationGraph />
          </div>
          <div className="flex-1 h-full">
            {session?.user ? (
              <h2 className="text-2xl font-bold mb-4">Welcome back, {session.user.name}!</h2>
            ) : (
              <h2 className="text-2xl font-bold mb-4">Welcome to IQuiz!</h2>
            )}
          </div>
        </div>
        <QuizTypesComponent />
      </div>
    </div>
  );
}
