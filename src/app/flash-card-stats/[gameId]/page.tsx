// app/chart/page.tsx (or wherever you want it)


import { PieChart } from "@/components/PieChartComponent/PieChartComponent";
import { findStudySession, findStudySessionFeedback } from "@/lib/findStudySession";
import { getAuthSession } from "@/lib/nextAuth";
import React from "react";

// const feedbackData = [
//   { label: "Easy", value: 25 },
//   { label: "Medium", value: 45 },
//   { label: "Hard", value: 30 },
// ];
type Props = {
  params: Promise<{
    gameId: string;
  }>;
}
export default async function ChartPage({ params }: Props) {
  const session = await getAuthSession()
  const awaitedParams = await params;
  const { gameId } = awaitedParams;
  console.log("Game ID:", gameId);
  let studySession;
  const feedbackData = []
  if (gameId || session?.user.id) {
    studySession = await findStudySession(gameId, session?.user.id as string);
    if (studySession) {
      const feedback = await findStudySessionFeedback(studySession.id);
      console.log("Feedback Data:", feedback);

      if (feedback && feedback.length > 0) {
        let labels = ['easy', 'medium', 'hard'];
        for (const label of labels) {
          const count = feedback.filter((item) => item.feedback.toLowerCase() === label).length;
          feedbackData.push({ label: label, value: count });

        }


      }
      console.log("Processed Feedback Data:", feedbackData);

    }
  } else {
    console.error("Game ID or User ID is missing.");
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