import Hero from "@/components/Hero/Hero";
import LoadingQuestions from "@/components/LoadingQuestions/LoadingQuestions";
import QuizTypesComponent from "@/components/QuizTypesComponent/QuizTypesComponent";
import { getAuthSession } from "@/lib/nextAuth";
export const metadata = {
  title: "Home| IQuiz",
};
export default async function HomePage() {
  const session = await getAuthSession();

  return (
    <div className="p-8 mx-auto max-w-7xl">
      <Hero />
      <QuizTypesComponent />
    </div>
  );
}
