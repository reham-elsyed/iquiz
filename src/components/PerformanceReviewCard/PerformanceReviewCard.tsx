'use client'
import { cn } from '@/lib/utils';
import { TopicStyle, WeakQuestionType } from '@/types/weakQuestionsPerformanceTypes';
import { CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type PerformanceReviewCardProps = {
    game: WeakQuestionType;
    colorClass: TopicStyle
}
export const PerformanceReviewCard = ({ game, colorClass }: PerformanceReviewCardProps) => {
    const router = useRouter()
    async function handleResetGameTime() {
        const data = await axios.post('/api/resetStartTime', { gameId: game.gameId })
        if (data.status === 200) {
            router.push(`/play/${game.questionType}/${game.gameId}`)
        }
    }
    // const { data, isError, isLoading } = useQuery({
    //     queryKey: ["reset start time", game.gameId],
    //     queryFn: handleResetGameTime
    // })


    return (
        <Card
            className={` transition border-0 rounded-2xl  text-card-foreground app-card`}
        >
            <CardHeader className="md:flex-row justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    Last taken at: {new Date(game.gameDate).toLocaleDateString()}
                </span>
                <Button
                    onClick={handleResetGameTime}
                    variant="outline"
                    className={cn(
                        "border-2 hover:scale-105 transition-transform ",
                        colorClass.text
                    )}
                >
                    Retake
                </Button>
            </CardHeader>

            <CardContent className="flex flex-col items-start backdrop-blur-xs rounded-2xl  dark:bg-black/10">
                <div className="flex flex-col md:flex-row items-center justify-between mt-2 w-full">
                    <Badge variant="outline" className="text-xs px-2 py-1 rounded-lg">
                        {game.questionType}
                    </Badge>
                    <span
                        className={cn(
                            "px-3 py-1.5 text-sm font-medium capitalize tracking-wide rounded-md",
                            colorClass.badge
                        )}
                    >
                        {game.gameTopic}
                    </span>
                </div>

                <h3 className={cn(
                    "text-lg font-semibold leading-relaxed mb-3 py-2",
                    colorClass.text
                )}>{game.question}</h3>
                <div className="bg-white/70 dark:bg-black/20 w-full h-max rounded-lg p-4 border border-white/50 dark:border-gray-700/50">
                    <div className="flex items-start gap-2">
                        <span className="text-sm font-semibold text-muted-foreground">Answer:</span>
                        <span className={cn(
                            "text-sm font-medium",
                            colorClass.text
                        )}>
                            {game.answer}
                        </span>
                    </div>
                </div>

            </CardContent>

        </Card>
    )
}