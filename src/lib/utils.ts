import { toast } from "@/hooks/use-toast";
import { GameWithQuestions } from "@/types/gameTypes";
import { Game, GameType } from "@prisma/client";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { differenceInSeconds } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeDelta(seconds: number) {
  const hours = Math.floor(seconds / 3600); // Corrected: 3600 seconds in an hour
  const minutes = Math.floor((seconds % 3600) / 60); // Get remaining seconds for minutes
  const secs = Math.floor(seconds % 60); // Get remaining seconds after minutes
  const parts = [];

  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }
  if (secs > 0) {
    parts.push(`${secs}s`);
  }

  return parts.join(" ");
}

export function durationOfQuiz(now: Date, timeStarted: Date): string {
  return formatTimeDelta(differenceInSeconds(now, timeStarted));
}

export function calculateAccuracyOfMCQ(game: GameWithQuestions) {
  let totalCorrect = game.questions.reduce((acc, question) => {
    if (question.isCorrect) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return (totalCorrect / game.questions.length) * 100;
}

export function calculateAccuracyOfOpenended(game: GameWithQuestions) {
  let totalCorrect = game.questions.reduce((acc, question) => {
    if (question.percentageCorrect) {
      return (acc + question.percentageCorrect) as number;
    }
    return acc;
  }, 0);
  console.log(game.questions.length);
  return totalCorrect / game.questions.length;
}
export async function setEndOfQuizTime(gameId: string) {
  try {
    const res = await axios.post("/api/endTime", { gameId });
    if (res.status === 200) {
      console.log("success");
    }
  } catch (error) {
    console.log(error);
  }
}
