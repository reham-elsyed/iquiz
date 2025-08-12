import React from 'react'
import { getAuthSession } from '@/lib/nextAuth';
import { singeUserWeekPerformanceQuestions } from '@/lib/singleUserGames';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeakQuestionType } from '@/types/weakQuestionsPerformanceTypes';
import { Button } from '../ui/button';
import Link from 'next/link';




interface WeakPerformanceCardProps {
    question: WeakQuestionType;
}
export function WeakPerformanceCard({ question }: WeakPerformanceCardProps) {
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
                    <span className="font-semibold">Correct Answer:</span> {question.answer}
                </div>
                <div className="text-xs text-gray-500 italic">
                    Type: {question.questionType}
                </div>
            </CardContent>
        </Card>
    );
}

const GamesPerformanceReview = async () => {
    const session = await getAuthSession()
    const userId = session?.user.id;

    const gamesPerformance = await singeUserWeekPerformanceQuestions(userId as string, 50)
    const weakPerformanceQuestions = gamesPerformance.map(game => game.questions).flat().slice(0, 2);

    return (
        <>
            <div className='mb-4 flex justify-between '>
                <Button>
                    <Link href="/games/performance-review" className="text-white">
                        View Full Performance Review
                    </Link>
                </Button>
                <h2 className="text-2xl font-bold mb-4">Weak Performance Questions</h2>
            </div>

            {weakPerformanceQuestions.map(q => (
                <WeakPerformanceCard key={q.questionId} question={q} />
            ))}
        </>
    )
}




export default GamesPerformanceReview