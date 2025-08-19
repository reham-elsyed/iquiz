"use client";

import React, { useEffect, useState } from "react";
import ChartComponent from "../ChartComponent/ChartComponent";
import axios from "axios";
import { Card } from "../ui/card";
import { ChartLineDotsColors } from "../ChartLineDotsColors/ChartLineDotsColors";

export interface GameDuration {
  duration: number;
  topic: string;
  fill: string;
  gameId: string
}

export default function GamesDurationGraph() {
  const [gamesDuration, setGamesDuration] = useState<GameDuration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDurations = async () => {
      try {
        const res = await axios.get("/api/gameDuration?limit=5");
        setGamesDuration(res.data.gamesDuration || []);
      } catch (error) {
        console.error("Failed to fetch game durations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDurations();
  }, []);

  if (loading) {
    return (
      <div className="h-56 bg-slate-300 flex items-center justify-center animate-pulse">
        Loading...
      </div>
    );
  }

  if (!gamesDuration.length) {
    return (
      <Card className="h-[500px] bg-primary w-full flex items-center justify-center">
        <h2 className="text-primary-foreground">Start learning today</h2>
      </Card>
    );
  }

  // Transform the data if needed
  // const durationTopic = gamesDuration.map((game, i) => ({
  //   duration: game.duration,
  //   topic: game.topic,
  //   fill: `var(--chart-${i})`, // Assuming topic names are valid CSS variable names
  // }));

  return <ChartLineDotsColors gamesDuration={gamesDuration} />;
  // return <ChartComponent gamesDuration={durationTopic} />;
}
