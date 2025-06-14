// app/chart/page.tsx (or wherever you want it)
"use client";

import { PieChart } from "@/components/PieChartComponent/PieChartComponent";
import React from "react";

const feedbackData = [
  { label: "Easy", value: 25 },
  { label: "Medium", value: 45 },
  { label: "Hard", value: 30 },
];
type Props={
  gameId: string
}
export default function ChartPage({gameId}:Props) {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="p-4 bg-white rounded shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Study Session Feedback</h2>
        <PieChart data={feedbackData} />
      </div>
    </main>
  );
}