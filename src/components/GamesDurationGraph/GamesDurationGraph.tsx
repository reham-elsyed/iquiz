"use client";

import React, { useEffect, useState } from "react";
import ChartComponent from "../ChartComponent/ChartComponent";
import axios from "axios";

interface GameDuration {
  duration: number;
  topic: string;
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
      <div className="h-56 bg-slate-300 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!gamesDuration.length) {
    return (
      <div className="h-[500px] bg-slate-400 w-full flex items-center justify-center">
        Start learning today
      </div>
    );
  }

  // Transform the data if needed
  const durationTopic = gamesDuration.map((game) => ({
    duration: game.duration,
    topic: game.topic,
  }));

  return <ChartComponent gamesDuration={durationTopic} />;
}
