import { GameWithQuestions } from "@/types/gameTypes";
import axios from "axios";
import { clsx, type ClassValue } from "clsx"
import { differenceInSeconds } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function durationOfQuiz(startTime, endTime) {
  // 1. Calculate the difference in milliseconds
  const diffMs = Math.abs(endTime.getTime() - startTime.getTime());

  // 2. Define time units in milliseconds
  const msInHour = 60 * 60 * 1000;
  const msInMinute = 60 * 1000;
  const msInSecond = 1000;

  // 3. Calculate hours, minutes, and seconds
  let remainingMs = diffMs;

  // Calculate Hours
  const hours = Math.floor(remainingMs / msInHour);
  remainingMs %= msInHour;

  // Calculate Minutes
  const minutes = Math.floor(remainingMs / msInMinute);
  remainingMs %= msInMinute;

  // Calculate Seconds (rounded to the nearest whole second)
  const seconds = Math.round(remainingMs / msInSecond);

  // 4. Build the result string
  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  }
  // Only include seconds if there are no hours or minutes, or if it's the only non-zero unit.
  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
  }

  // Join the parts for a clean output (e.g., "1 hour 5 minutes")
  return parts.join(' ');
}


export { durationOfQuiz };

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
function parseTimeStringToSeconds(input: string): number {
  const minutes = parseInt(input.match(/(\d+)m/)?.[1] || "0");
  const seconds = parseInt(input.match(/(\d+)s/)?.[1] || "0");
  return minutes * 60 + seconds;
}

export function calculateDurationOfFlashCardStudy(now: Date, timeStarted: Date): number {
  const duration = differenceInSeconds(now, timeStarted);
  console.log("Duration in seconds:", duration);
  return duration;
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
      return res
    }
  } catch (error) {
    return error
  }
}
