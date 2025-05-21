import { Session } from "inspector/promises";
import { z } from "zod";

export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(4, { message: "Topic must be at least 4 characters long" }),
  type: z.enum(["mcq", "open_ended", "flash_card"]),
  amount: z.number().min(1).max(10),
});

export const checkAnswerSchema = z.object({
  questionId: z.string(),
  userAnswer: z.string(),
  keyWords: z.string().optional().default(""),
});
export const questionReload = z.object({
  questionId: z.string(),
});
export const timeEnded = z.object({
  gameId: z.string(),
});

export const flashcardFeedbackSchema = z.object({
  questionId: z.string(),
  feedback: z.enum(["EASY", "MEDIUM", "HARD"]),
  timeSpent: z.number(),
  sessionId: z.string(),
});
