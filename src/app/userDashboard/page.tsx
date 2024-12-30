import React from "react";
import QuizMeCard from "@/components/userDashboard/QuizMeCard";
import { getAuthSession } from "@/lib/nextAuth";
import { cardData, CardType } from "@/types/cardTypes";
import { redirect } from "next/navigation";
import TrendingTopics from "@/components/userDashboard/TrendingTopics";
import RecentActivities from "@/components/userDashboard/RecentActivities";

type Props = {};
export const metadata = {
  title: "Dashboard | IQUIZ",
};
const userDashboard = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <main className="p-8 mx-auto max-w-7xl ">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        {cardData.map((card: CardType) => (
          <QuizMeCard key={card.Title} card={card} />
        ))}

        {/* <HistoryCard/> */}
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <TrendingTopics />
        <RecentActivities />
      </div>
    </main>
  );
};

export default userDashboard;
