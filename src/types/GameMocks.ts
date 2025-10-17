import { Game, Question, Prisma } from "@prisma/client";

import { mockGame } from "@/components/Mockquiz/Mockquiz";

export const mockOpenEndedGame = {
    ...mockGame,
    id: "mock-game-003",
    gameType: "open_ended",
    topic: "Frontend Interview Questions",
    questions: [
        {
            id: "q1",
            question: "Explain the difference between == and === in JavaScript.",
            answer: [],
        },
        {
            id: "q2",
            question: "How does the virtual DOM improve performance in React?",
            answer: [],
        },
    ],
};
