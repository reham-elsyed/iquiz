import { $Enums } from "@prisma/client";

export interface flashcardFeedbackinterface {
  id: string;
  questionId: string;
  sessionId: string;
  feedback: $Enums.FeedbackType;
  timeSpent: number;
  createdAt: Date;
}
export interface studySessionInterface {
  id: string;
  userId: string;
  createdAt: Date;
  notes: string | null;
  endedAt?: Date | null;
  status?: string | null;
}