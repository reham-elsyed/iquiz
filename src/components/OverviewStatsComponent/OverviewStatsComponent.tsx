import { Card, CardHeader, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
    TrendingUp,
    Target,
    Clock,
    Trophy,
} from "lucide-react";
import { Game, Question } from "@prisma/client";
import { avgScore, calculateBestStreak, calculateStreak, totalMinutes } from "@/lib/generalStatsUtils";
import { GameWithQuestions } from "@/types/gameTypes";


interface StatsSummaryProps {
    gamesWithStats: GameWithQuestions[]
}

export default function OverviewStatsComponent({
    gamesWithStats,
}: StatsSummaryProps) {
    const totalQuizes = gamesWithStats.length
    const averageScore = avgScore(gamesWithStats)
    const totalTime = totalMinutes(gamesWithStats)
    const currectStreak = calculateStreak(gamesWithStats)
    const bestStreak = calculateBestStreak(gamesWithStats)
    const statItems = [
        {
            label: "Total Quizzes",
            value: totalQuizes.toString(),
            icon: Target,
            color: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-50 dark:bg-blue-950/20",
        },
        {
            label: "Average Score",
            value: `${averageScore}%`,
            icon: TrendingUp,
            color: "text-emerald-600 dark:text-emerald-400",
            bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
        },
        {
            label: "Study Time",
            value: totalTime,
            icon: Clock,
            color: "text-purple-600 dark:text-purple-400",
            bgColor: "bg-purple-50 dark:bg-purple-950/20",
        },
        {
            label: "Global Rank",
            value: `#first`,
            icon: Trophy,
            color: "text-orange-600 dark:text-orange-400",
            bgColor: "bg-orange-50 dark:bg-orange-950/20",
        },
    ];

    return (
        <Card className="h-full">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Your Stats</h3>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                            Current Streak:{currectStreak} days
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {statItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div key={index} className="space-y-2 bg-background/50 p-5">
                                <div
                                    className={`inline-flex p-2 rounded-lg ${item.bgColor}`}
                                >
                                    <IconComponent
                                        className={`h-5 w-5 ${item.color}`}
                                    />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">
                                        {item.value}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {item.label}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            Best Streak
                        </span>
                        <span className="font-semibold">
                            {bestStreak} days
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

