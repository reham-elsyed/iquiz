"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Dot, Line, LineChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import useChartDotsColor from "@/hooks/useChartDotsColor"

export const description = "A line chart with dots and colors"

const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
]


type ChartLineDotsColorsProps = {
    gamesDuration: { topic: string; duration: number, fill: string, gameId: string }[];
}
export function ChartLineDotsColors({ gamesDuration }: ChartLineDotsColorsProps) {
    const { chartConfig } = useChartDotsColor({ gamesDuration });
    if (!gamesDuration || gamesDuration.length === 0 || !chartConfig)
        return (
            <Card className="h-[500px] bg-primary w-full flex items-center justify-center">
                <h2 className="text-primary-foreground">No game durations available</h2>
            </Card>
        );
    return (
        <Card>
            <CardHeader>
                <CardTitle>Games Duration</CardTitle>
                <CardDescription>{new Date().toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={gamesDuration}
                        margin={{
                            top: 24,
                            left: 24,
                            right: 24,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    nameKey="topic"
                                    hideLabel
                                />
                            }
                        />
                        <Line
                            dataKey="duration"
                            type="natural"
                            stroke="var(--chart-0)"
                            strokeWidth={2}
                            dot={({ payload, ...props }) => {
                                return (
                                    <Dot
                                        key={payload.browser}
                                        r={5}
                                        cx={props.cx}
                                        cy={props.cy}
                                        fill={payload.fill}
                                        stroke={payload.fill}
                                    />
                                )
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Your Latest Game Durations <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing durations for the last 5 games played
                </div>
            </CardFooter>
        </Card>
    )
}
