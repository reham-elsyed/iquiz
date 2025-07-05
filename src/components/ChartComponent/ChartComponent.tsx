"use client"

import { Bar, BarChart } from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "#2563eb",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "#60a5fa",
//   },
// } satisfies ChartConfig
type Props={
   gamesDuration:{ duration: number;
    gameId: string;
    topic: string;
}[]}
export default function ChartComponent({gamesDuration}:Props) {
   const chartConfig = {
  duration: {
    label: "Duration (min)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={gamesDuration}>
      {gamesDuration.map((game)=>(
                <Bar dataKey={game.topic} fill="var(--color-mobile)" radius={4} />

      ))}
      </BarChart>
    </ChartContainer>
  )
}
