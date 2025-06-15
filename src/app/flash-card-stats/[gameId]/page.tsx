// app/chart/page.tsx (or wherever you want it)


import { PieChart } from "@/components/PieChartComponent/PieChartComponent";
import { findStudySession } from "@/lib/findStudySession";
import { getAuthSession } from "@/lib/nextAuth";
import React from "react";

const feedbackData = [
  { label: "Easy", value: 25 },
  { label: "Medium", value: 45 },
  { label: "Hard", value: 30 },
];
type Props = {
  params:Promise<{
    gameId: string;
  }>;
}
export default async function ChartPage({params}:Props) {
  const session= await getAuthSession()
   const awaitedParams = await params;
  const { gameId } = awaitedParams;
  console.log("Game ID:", gameId);
  let studySession;
  if(gameId|| session?.user.id){
   studySession = await findStudySession(gameId,session?.user.id as string); // Replace "userId" with actual user ID logic

  } 
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="p-4 bg-white rounded shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Study Session Feedback 
Statistics for Game ID: {studySession?.id}  
        </h2>
        <PieChart data={feedbackData} />
      </div>
    </main>
  );
}