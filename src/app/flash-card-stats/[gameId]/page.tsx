// app/chart/page.tsx (or wherever you want it)
import FlasCardStatsHeader from "@/components/FlashCardStats/FlasCardStatsHeader";
import FlashCardGeneralStats from "@/components/FlashCardStats/FlashCardGeneralStats";
import { PieChartComponent } from "@/components/PieChartComponent/PieChartComponent";
import { findStudySession, findStudySessionFeedback } from "@/lib/findStudySession";
import { getAuthSession } from "@/lib/nextAuth";
import { calculateDurationOfFlashCardStudy } from "@/lib/utils";
import { access } from "fs";
import React from "react";

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
  const fallbackTime = new Date()
  if (gameId || session?.user.id) {
    studySession = await findStudySession(gameId, session?.user.id as string);

    //     {
    //   id: 'cmeecwu6p0009w2bsq7grt6c4',
    //   createdAt: 2025-08-16T14:32:56.777Z,
    //   endedAt: 2025-08-16T14:42:39.588Z,
    //   status: 'FINISHED',
    //   userId: 'cmc57vsra0000w974g2inybzv',
    //   notes: null,
    //   gameId: 'cmeecwt7w0001w2bsrzgtn9j6'
    // }
  }
  if (!studySession) {
    return (<div>No Data To Display</div>)
  }
  const feedback = await findStudySessionFeedback(studySession.id);
  console.log("Feedback Data:", feedback);
  // Feedback Data: [
  //   {
  //     id: 'cmeed8w41000jw2bsv1ns0ic3',
  //     questionId: 'cmeecwtw20007w2bs53smd6h4',
  //     sessionId: 'cmeecwu6p0009w2bsq7grt6c4',
  //     feedback: 'HARD',
  //     timeSpent: 32,
  //     createdAt: 2025-08-16T14:42:19.153Z
  //   },
  //   {
  //     id: 'cmeed83s7000hw2bsfo6rgjo8',
  //     questionId: 'cmeecwtw20006w2bsg62xg3ra',
  //     sessionId: 'cmeecwu6p0009w2bsq7grt6c4',
  //     feedback: 'EASY',
  //     timeSpent: 13,
  //     createdAt: 2025-08-16T14:41:42.385Z
  //   },
  //   {
  //     id: 'cmeed6v8h000fw2bs5i4ud9vu',
  //     questionId: 'cmeecwtw20005w2bslquglitk',
  //     sessionId: 'cmeecwu6p0009w2bsq7grt6c4',
  //     feedback: 'EASY',
  //     timeSpent: 50,
  //     createdAt: 2025-08-16T14:40:44.636Z
  //   },
  //   {
  //     id: 'cmeed6v8g000dw2bs1b36od3n',
  //     questionId: 'cmeecwtw10003w2bsaqefohqh',
  //     sessionId: 'cmeecwu6p0009w2bsq7grt6c4',
  //     feedback: 'HARD',
  //     timeSpent: 2,
  //     createdAt: 2025-08-16T14:40:44.633Z
  //   },
  //   {
  //     id: 'cmeed6v8g000ew2bswck8lezb',
  //     questionId: 'cmeecwtw10004w2bstzjvv1g1',
  //     sessionId: 'cmeecwu6p0009w2bsq7grt6c4',
  //     feedback: 'MEDIUM',
  //     timeSpent: 2,
  //     createdAt: 2025-08-16T14:40:44.624Z
  //   }
  // ]
  //     createdAt: 2025-08-16T14:40:44.624Z
  //   }
  // ]
  if (feedback && feedback.length > 0) {
    let labels = ['easy', 'medium', 'hard'];
    let i = 0
    for (const label of labels) {
      const count = feedback.filter((item) => item.feedback.toLowerCase() === label).length;
      feedbackData.push({ id: feedback[i].id, difficulty: label, count: count, fill: `var(--chart-${i})` });
      i++
      if (i > 5) {
        i = 0
      }
    }


    console.log("Processed Feedback Data:", feedbackData);
    // Processed Feedback Data: [
    //   { label: 'easy', value: 2 },
    //   { label: 'medium', value: 1 },
    //   { label: 'hard', value: 2 }
    // ]
  }

  const generalStats = [
    { label: "Status", value: studySession?.status ?? "Unknown" },
    {
      label: "Duration", value: calculateDurationOfFlashCardStudy(
        studySession?.endedAt as Date || fallbackTime,
        studySession?.createdAt as Date
      )
    },
    { label: "Questions", value: feedbackData.length },
    {
      label: "AveTime", value: feedbackData.length
        ? feedback.reduce((acc, d) => acc + d.timeSpent, 0) / feedbackData.length
        : 0
    }
  ]

  return (
    <main className="flex flex-col h-screen">
      <FlasCardStatsHeader />
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FlashCardGeneralStats generalStats={generalStats} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PieChartComponent studySessionDiff={feedbackData} />
          </div>
        </div>
      </div>
    </main>
  );
}