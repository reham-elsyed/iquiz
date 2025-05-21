export interface flashcardFeedbackinterface  {
    questionId: string;
    feedback: "EASY" | "MEDIUM" | "HARD";
    timeSpent: number;
    sessionId: string;

}