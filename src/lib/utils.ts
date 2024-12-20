import { clsx, type ClassValue } from "clsx"
import { differenceInSeconds } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

  return parts.join(' ');
}

export function durationOfQuiz(now:Date, timeStarted:Date):string{return formatTimeDelta(differenceInSeconds(now,timeStarted))} 