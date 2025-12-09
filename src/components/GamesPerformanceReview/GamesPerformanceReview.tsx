
import React from 'react'
import { getAuthSession } from '@/lib/nextAuth';
import { singeUserWeekPerformanceQuestions } from '@/lib/singleUserGames';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeakQuestionType } from '@/types/weakQuestionsPerformanceTypes';
import { Button } from '../ui/button';
import Link from 'next/link';
import EmptySectionWrapper from '../NewUserComponents/EmptySectionWrapper/EmptySectionWrapper';
import { TextAtom } from '../TextAtom';

interface WeakPerformanceCardProps {
    question: Pick<WeakQuestionType, 'question' | 'answer' | 'questionType' | 'questionId'>;
}
export function WeakPerformanceCard({ question }: WeakPerformanceCardProps) {
    return (
        <Card className="app-card transition mb-3 h-full">
            <CardHeader>
                <CardTitle className="text-card-foreground font-bold">
                    ⚠ <TextAtom>dashboard:performance.weakPerformanceCard</TextAtom>
                </CardTitle>
            </CardHeader>
            <CardContent className='app-card-content '>
                <p className="text-foreground font-medium ">{question.question}</p>
                <div className="text-sm text-muted-foreground ">
                    <span className="font-semibold"><TextAtom>dashboard:performance.correctAnswer</TextAtom>:</span> {question.answer}
                </div>
                <div className="text-xs text-muted-foreground italic">
                    <TextAtom>dashboard:performance.type</TextAtom>: {question.questionType}
                </div>
            </CardContent>
        </Card>
    );
}

async function GamesPerformanceReview() {
    const session = await getAuthSession()
    const userId = session?.user.id;

    const gamesPerformance = await singeUserWeekPerformanceQuestions(userId as string, 50)
    const weakPerformanceQuestions = gamesPerformance.map(game => game.questions).flat().slice(0, 2);

    return (
        <div>
            <div className='mb-4 flex flex-col lg:flex-row justify-between '>

                <h2 className="text-lg md:text-2xl font-bold mb-4"><TextAtom>dashboard:performance.weakPerformance</TextAtom></h2>
                <Button variant={'outline'}>
                    <Link href="/games/performance-review" className="">
                        <TextAtom>dashboard:performance.viewFullReview</TextAtom>
                    </Link>
                </Button>
            </div>
            {weakPerformanceQuestions.length === 0 && (<EmptySectionWrapper><p><TextAtom>dashboard:performance.doingGreat</TextAtom></p></EmptySectionWrapper>)}

            {weakPerformanceQuestions.map(q => (
                <WeakPerformanceCard key={q.questionId} question={q} />
            ))}
        </div>
    )
}




export default GamesPerformanceReview