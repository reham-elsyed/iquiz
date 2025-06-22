export interface flashcardFeedbackinterface  {
    questionId: string;
    feedback: "EASY" | "MEDIUM" | "HARD";
    timeSpent: number;
    sessionId: string;

}
export interface studySessionInterface {
  id: string;
  userId: string;
  createdAt: Date;
  notes: string|null;
}