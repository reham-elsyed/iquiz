import Hero from "@/components/Hero/Hero";
import LoadingQuestions from "@/components/LoadingQuestions/LoadingQuestions";
import { getAuthSession } from "@/lib/nextAuth";

export default async function HomePage() {
  const session = await getAuthSession();

  return (
    <div className="p-8 mx-auto max-w-7xl">
     <Hero/>
    </div>
  );
}
