import { cn } from '@/lib/utils';
import { TopicStyle, WeakQuestionType } from '@/types/weakQuestionsPerformanceTypes';
import { CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type PerformanceReviewCardProps = {
    game: WeakQuestionType;
    colorClass: TopicStyle
}
//<div class="bg-[var(--topic-math-background)] text-[var(--topic-math-text)] border-[var(--topic-math-accent)]"></div>
export const PerformanceReviewCard = ({ game, colorClass }: PerformanceReviewCardProps) => {
    return (
        <Card
            key={game.gameId}
            className={` transition border-0 rounded-2xl  text-card-foreground dark:text-gray-100 ${colorClass.background} hover:bg-opacity-90 dark:hover:bg-opacity-80`}
        >
            <CardHeader className="md:flex-row justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    Last taken at: {new Date(game.gameDate).toLocaleDateString()}
                </span>
                <Button
                    asChild
                    variant="outline"
                    className={cn(
                        "border-2 hover:scale-105 transition-transform ",
                        colorClass.text
                    )}
                >
                    {game.questionType === "mcq" ? <Link href={`/play/mcq/${game.gameId}`}>Retake</Link> :
                        <Link href={`/play/open_ended/${game.gameId}`}>Retake</Link>}
                </Button>
            </CardHeader>

            <CardContent className="flex flex-col items-start backdrop-blur-sm rounded-2xl  dark:bg-black/10">
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
                    "text-lg font-semibold leading-relaxed mb-3",
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