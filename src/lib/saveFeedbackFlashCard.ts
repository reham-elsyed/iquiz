import prisma from "@/lib/db";
import { flashcardFeedbackinterface } from "@/types/feedbackFlashcardTypes";

export default async function saveFeedbackFlashCard({
  questionId,
  feedback,
  timeSpent,
  sessionId }: flashcardFeedbackinterface) {
  try {
    const newFeedback = await prisma.questionFeedback.upsert({
      where: {
        sessionId_questionId: {
          sessionId,
          questionId,
        },
      },
      update: {
        feedback,   // e.g., 'EASY', 'MEDIUM', 'HARD'
        timeSpent,  // new time spent
      },
      create: {
        sessionId,
        questionId,
        feedback,
        timeSpent,
      },
    });
    return newFeedback;

  } catch (e) { throw e }
}