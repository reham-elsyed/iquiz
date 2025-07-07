"use client"

import { Bar, BarChart, XAxis } from "recharts"

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
    <ChartContainer config={chartConfig} className="min-h-[200px] w-1/2 bg-slate-500">
      <BarChart accessibilityLayer data={gamesDuration}>
      {gamesDuration.map((game, i)=>(
        <>
          <XAxis
      dataKey="topic"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
                <Bar key={game.gameId} dataKey={game.topic} fill={`var(chart-${i +1})`} radius={4} />
</>))}
      </BarChart>
    </ChartContainer>
  )
}
