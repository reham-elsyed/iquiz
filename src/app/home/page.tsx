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
      <PopularGames/>
      <GamesDurationGraph/>
      <QuizTypesComponent />
      </div>
    </div>
  );
}
