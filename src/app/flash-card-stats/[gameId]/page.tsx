// app/chart/page.tsx (or wherever you want it)
import { BarChartComponent } from "@/components/Charts/BarChartComponent/BarChartComponent";
import FlasCardStatsHeader from "@/components/FlashCardStats/FlasCardStatsHeader";
import FlashCardGeneralStats from "@/components/FlashCardStats/FlashCardGeneralStats";
import FlashCardsBreakDown from "@/components/FlashCardStats/FlashCardsBreakDown";
import SessionInsights from "@/components/FlashCardStats/SessioInsights/SessionInsights";
import { PieChartComponent } from "@/components/PieChartComponent/PieChartComponent";
import { findStudySession, findStudySessionFeedback } from "@/lib/findStudySession";
import { getAuthSession } from "@/lib/nextAuth";
import { calculateDurationOfFlashCardStudy, formatTimeDelta } from "@/lib/utils";
import React from "react";
export const revalidate = 3600;
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
  const barChartData = []
  const fallbackTime = new Date()
  if (gameId || session?.user.id) {
    //get study session data
    studySession = await findStudySession(gameId, session?.user.id as string);
  }
  if (!studySession) {
    return (<div>No Data To Display</div>)
  }

  const feedback = await findStudySessionFeedback(studySession.id);
  console.log("Feedback Data:", feedback);
  if (feedback && feedback.length > 0) {
    let labels = ['easy', 'medium', 'hard'];
    let i = 0
    for (const label of labels) {
      const count = feedback?.filter((item) => item.feedback.toLowerCase() === label).length;
      feedbackData.push({ id: feedback[i]?.id, difficulty: label, count: count, fill: `var(--chart-${i})` });
      i++
      if (i > 5) {
        i = 0
      }
    }
    console.log("Processed Feedback Data:", feedbackData);
    feedback.map((question, i) => {
      const barChaetD = {
        question: `question${i + 1}`,
        time: question.timeSpent
      }
      barChartData.push(barChaetD)
    })
  }
  const durationFormatted = () => {
    const time = feedback.reduce((sum, f) => sum + f.timeSpent, 0)
    const formatted = formatTimeDelta(time)
    return formatted
  }
  const averageTime = () => {
    const average = feedback.reduce((acc, d) => acc + d.timeSpent, 0) / feedback.length
    const formatted = formatTimeDelta(average)
    return formatted
  }
  const generalStats = [
    { label: "Status", value: studySession?.status ?? "Unknown" },
    {
      label: "Duration", value: durationFormatted()
    },
    { label: "Questions", value: feedback.length },
    {
      label: "AveTime", value: feedback.length
        ? averageTime()
        : 0
    }
  ]

  return (
    <main className="flex flex-col min-h-screen">
      <FlasCardStatsHeader />
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FlashCardGeneralStats generalStats={generalStats} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PieChartComponent studySessionDiff={feedbackData} />
            <BarChartComponent barChartData={barChartData} />
          </div>
          <FlashCardsBreakDown questionsBreakdown={feedback} />
          <SessionInsights feedbackData={feedback} />
        </div>
      </div>
    </main>
  );
}