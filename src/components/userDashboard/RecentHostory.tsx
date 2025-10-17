'use client'
import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Clock, Target, Eye, BookOpen, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";


type Game = {
    id: string;
    topic: string;
    gameType: "mcq" | "open_ended" | "flash_card";
    timeStarted: Date;
    accuracy?: number;
    questionsCount?: number;
};

type Props = {
    historyGamesData: Game[]
};

const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

    return date.toLocaleDateString();
};

const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return "text-green-600 dark:text-green-400";
    if (accuracy >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
};

const RecentHistoryComponent = ({ historyGamesData }: Props) => {

    if (historyGamesData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground">No games played yet</p>
                <p className="text-xs text-muted-foreground mt-1">Start a quiz to see your history</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {historyGamesData.map((game) => (
                <Card key={game.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{game.topic}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <Clock className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                        {formatTimeAgo(game.timeStarted)}
                                    </span>
                                </div>
                            </div>
                            <Badge
                                variant={game.gameType === "mcq" ? "default" : "secondary"}
                                className="shrink-0"
                            >
                                {game.gameType === "mcq" ? (
                                    <Brain className="w-3 h-3 mr-1" />
                                ) : (
                                    <BookOpen className="w-3 h-3 mr-1" />
                                )}
                                {game.gameType === "mcq" ? "MCQ" : "Open Ended"}
                            </Badge>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <Target className="w-4 h-4 text-muted-foreground" />
                                    <span className={cn("text-sm font-medium", getAccuracyColor(game.accuracy || 0))}>
                                        {game.accuracy}%
                                    </span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {game.questionsCount} questions
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8"
                                asChild
                            >
                                {game.gameType === "flash_card" ? <Link href={`/flash-card-stats/${game.id}`}>
                                    <Eye className="w-4 h-4 mr-1" />
                                    View</Link> : <Link href={`/statistics/${game.id}`}>
                                    <Eye className="w-4 h-4 mr-1" />
                                    View</Link>}
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default RecentHistoryComponent;
