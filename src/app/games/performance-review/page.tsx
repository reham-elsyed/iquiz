import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAuthSession } from '@/lib/nextAuth';
import { singeUserWeekPerformanceQuestions } from '@/lib/singleUserGames';
import Link from 'next/link';
import React from 'react'
const topicColors: Record<string, string> = {
    math: "bg-[#5B3E96] text-white",       // rich deep purple
    science: "bg-[#1C7C7D] text-white",    // teal with depth
    english: "bg-[#D97706] text-white",    // warm golden brown
    geography: "bg-[#B91C1C] text-white",  // deep crimson
    default: "bg-[#374151] text-white"     // cool dark gray

};
const PerformanceReview = async () => {

    const session = await getAuthSession()
    const userId = session?.user.id;

    const gamesPerformance = (await singeUserWeekPerformanceQuestions(userId as string, 50))
    const flattened = gamesPerformance.flatMap(game =>
        game.questions.map(q => ({
            gameId: game.gameId,
            gameDate: game.gameDate,
            gameTopic: game.topic,
            ...q
        }))
    );
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Performance Review</h1>
            <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {flattened.map((game, idx) => {
                    const colorClass = topicColors[game.gameTopic] || topicColors.Default;
                    return (<Card
                        key={game.gameId}
                        className={` transition border-0 rounded-2xl  text-card-foreground dark:text-gray-100 ${colorClass} hover:bg-opacity-90 dark:hover:bg-opacity-80`}
                    >
                        <CardHeader className="">
                            <CardTitle className="text-lg ">
                                Last taken at: {new Date(game.gameDate).toLocaleDateString()}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="flex flex-col items-start backdrop-blur-sm  bg-white/10 dark:bg-black/10">
                            <span
                                className={`px-3 py-1 mb-3 font-medium    `}
                            >
                                {game.gameTopic}
                            </span>

                            <p className="mb-2">
                                <span className="font-semibold">Question:</span> {game.question}
                            </p>
                            <p>
                                <span className="font-semibold">Answer:</span> {game.answer}
                            </p>
                        </CardContent>

                        <Button
                            asChild
                            variant="outline"
                            className="mt-4 border-white/50 text-white hover:bg-white/20 dark:hover:bg-black/20"
                        >
                            <Link href={`play/${game.gameId}`}>Retake quiz</Link>
                        </Button>
                    </Card>
                    )
                }
                )}


            </div>
        </div>
    )
}

export default PerformanceReview