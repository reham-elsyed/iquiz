

export type WeakQuestionType = {
    questionId: string;
    question: string;
    answer: string;
    questionType: string;
    gameId: string;
    userAnswer: string;
    gameDate: Date;
    gameTopic: string;
};

export interface TopicStyle {
    background: string;
    badge: string;
    text: string;
    accent: string;
}
