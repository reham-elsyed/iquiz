// components/PieChart.tsx
"use client";
import { Pie, PieChart } from "recharts"
import { Brain, TrendingUp } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import useChartDotsColor from "@/hooks/useChartDotsColor";
import ChartFooter from "../ChartFooter";
import React from "react";
import { cn } from "@/lib/utils";
export interface PieChartInterface {
  difficulty: string;
  count: number;
}
type PieChartComponentProps = {
  studySessionDiff: PieChartInterface[];
  className: string;
  title?: boolean;
}
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
              fill="#d946ef"
            />
          </PieChart>
        </ChartContainer>

      </CardContent>

      {/* <ChartFooter chartDescription={`Showing difficulty for the last study session`} className='' label={"difficulty analysis"} /> */}

    </div>
  )
};
