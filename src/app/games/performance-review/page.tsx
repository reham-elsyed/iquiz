import { PerformanceReviewCard } from '@/components/PerformanceReviewCard/PerformanceReviewCard';
import { topicColorsFormatter } from '@/lib/multiColorCardFormatter';
import { getAuthSession } from '@/lib/nextAuth';
import { singeUserWeekPerformanceQuestions } from '@/lib/singleUserGames';

import React from 'react'



const PerformanceReview = async () => {

    const session = await getAuthSession()
    const userId = session?.user.id;

    const gamesPerformance = (await singeUserWeekPerformanceQuestions(userId as string, 50))
    const flattened = gamesPerformance.flatMap(game =>
        game.questions.map(q => ({
            gameId: game.gameId,
            gameDate: game.gameDate,
            gameTopic: game.topic,
            ...q,
            userAnswer: q.userAnswer ?? "", // Ensure userAnswer is always a string
        }))
    );
    const uniqueTopics = Array.from(new Set(flattened.map(game => game.gameTopic)));
    const topicColors = topicColorsFormatter(uniqueTopics);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Performance Review</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Review your previous quiz attempts and retake any games to improve your scores.
            </p>
            <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {flattened.map((game, idx) => {
                    const colorClass = topicColors[game.gameTopic] || topicColors.Default;
                    return (
                        <PerformanceReviewCard key={game.questionId} game={game} colorClass={colorClass} />
                    )
                }
                )}


            </div>
        </div>
    )
}

export default PerformanceReview