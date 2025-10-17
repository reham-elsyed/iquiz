// components/PieChart.tsx
"use client";
import { Cell, Pie, PieChart } from "recharts"
import { Brain } from "lucide-react";
import { CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import useChartDotsColor from "@/hooks/useChartDotsColor";
import React from "react";
import { cn } from "@/lib/utils";
export interface PieChartInterface {
  difficulty: string;
  count: number;
  fill: string;
}
type PieChartComponentProps = {
  studySessionDiff: PieChartInterface[];
  className: string;
  title?: boolean;
}
const chartColors = [
  "#d946ef", // oklch(66.276% 0.27428 323.296) → vivid pink-purple
  "#f87171", // oklch(0.59 0.22 11.50) → warm red
  "#60a5fa", // oklch(0.77 0.13 223.19) → medium blue
  "#34d399"  // oklch(0.69 0.14 160.23) → green-teal
];
export const PieChartComponent = ({ studySessionDiff, className, title = true }: PieChartComponentProps) => {

  const getKey = React.useCallback((s: { difficulty: string }) => s?.difficulty?.toLowerCase(), []);

  const { chartConfig } = useChartDotsColor({ gamesDuration: studySessionDiff, getKey })

  return (
    <div className={cn(className)} >
      <CardHeader className="pb-4">
        {title && (<CardTitle className="flex items-center gap-3 ">
          <div className="w-8 h-8 bg-card-600/20 rounded-lg flex items-center justify-center">
            <Brain className="h-4 w-4 text-card-foreground-400" />
          </div>
          Difficulty Distribution
        </CardTitle>)}
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={studySessionDiff}
              dataKey="count"
              nameKey="difficulty"
              stroke="5"
            >
              {studySessionDiff.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index]} // assign color per slice
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>

      </CardContent>
    </div>
  )
};
