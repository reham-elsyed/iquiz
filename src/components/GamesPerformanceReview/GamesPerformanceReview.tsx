import { getAuthSession } from '@/lib/nextAuth';
import { singeUserWeekPerformanceQuestions } from '@/lib/singleUserGames';
import React from 'react'
// mockData.ts
export const weakQuestions = [
    {
        questionId: "q1",
        question: "What is 2 + 2?",
        userAnswer: "5",
        correctAnswer: "4",
        questionType: "Math",
        percentageCorrect: 35,
        lastAttempt: "2025-08-05T14:30:00Z"
    },
    {
        questionId: "q2",
        question: "What is the capital of France?",
        userAnswer: "Lyon",
        correctAnswer: "Paris",
        questionType: "Geography",
        percentageCorrect: 40,
        lastAttempt: "2025-08-06T09:15:00Z"
    },
    {
        questionId: "q3",
        question: "Which planet is known as the Red Planet?",
        userAnswer: "Venus",
        correctAnswer: "Mars",
        questionType: "Science",
        percentageCorrect: 25,
        lastAttempt: "2025-08-07T18:45:00Z"
    }
];

const GamesPerformanceReview = async () => {
    // const session = await getAuthSession()
    // const userId = session?.user.id;

    // const gamesPerformance = await singeUserWeekPerformanceQuestions(userId as string, 50)
    // return (
    //     <div>{gamesPerformance?.map((game) => game.questions.map(question => question.question))}</div>
    // )
    return (
        <>
            {weakQuestions.map(q => (
                <WeakPerformanceCard key={q.questionId} question={q} />
            ))}
        </>
    )
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WeakPerformanceCard({ question }) {
    return (
        <Card className="border-red-300 bg-red-50 shadow-sm hover:shadow-md transition">
            <CardHeader>
                <CardTitle className="text-red-700 font-bold">
                    ⚠ Weak Performance Question
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-800 font-medium mb-2">{question.question}</p>
                <div className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Your Answer:</span> {question.answer}
                </div>
                <div className="text-xs text-gray-500 italic">
                    Type: {question.questionType}
                </div>
            </CardContent>
        </Card>
    );
}

export default GamesPerformanceReview