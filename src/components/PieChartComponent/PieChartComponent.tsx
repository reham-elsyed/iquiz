// components/PieChart.tsx
"use client";
import { Pie, PieChart } from "recharts"
import { Brain, TrendingUp } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import useChartDotsColor from "@/hooks/useChartDotsColor";
interface PieChartInterface {
  id: string;
  difficulty: string;
  count: number;
  fill: string;
}
type PieChartComponentProps = {
  studySessionDiff: PieChartInterface[]
}
export const PieChartComponent = ({ studySessionDiff }: PieChartComponentProps) => {
  const getKey = (s:
    PieChartInterface
  ) => s.difficulty

  const { chartConfig } = useChartDotsColor({ gamesDuration: studySessionDiff, getKey })

  return (
    <Card className="bg-card border-purple-700/30 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 ">
          <div className="w-8 h-8 bg-card-600/20 rounded-lg flex items-center justify-center">
            <Brain className="h-4 w-4 text-card-foreground-400" />
          </div>
          Difficulty Distribution
        </CardTitle>
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
            />
          </PieChart>
        </ChartContainer>

      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Your Latest Game { }<TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing durations for the last 5 games played
        </div>
      </CardFooter>

    </Card>
  )
};
