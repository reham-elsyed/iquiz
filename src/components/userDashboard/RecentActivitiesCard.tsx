'use client'
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Activity, TrendingUp } from "lucide-react";

type Props = {
    gamesCount: number;
    children: React.ReactNode;
};

const RecentActivitiesCardWrapper = ({ gamesCount, children }: Props) => {
    return (
        <Card className="col-span-3">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            Recent Activities
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Your quiz history and performance
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground">Total</p>
                            <p className="font-semibold text-sm">
                                {gamesCount} {gamesCount === 1 ? "game" : "games"}
                            </p>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-3">
                <ScrollArea className="h-[580px] pr-3">
                    {children}
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default RecentActivitiesCardWrapper;