import QuizCreation from "@/components/QuizCreation/QuizCreationFormLogic";
import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";
import React from "react";
type Props = {
  searchParams: {
    topic?: string;
  };
};
export const metadata = {
  title: "quiz | MENTORA",
};
const Quiz = async ({ searchParams }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div className="relative min-h-screen">
      <QuizCreation topicParam={searchParams.topic ?? ""} />
    </div>
  );
};

export default Quiz;
