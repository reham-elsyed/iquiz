import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { flashcardFeedbackinterface } from '@/types/feedbackFlashcardTypes'
import { formatTimeDelta } from '@/lib/utils'

type FlashCardsBreakDownProps = {
    questionsBreakdown: flashcardFeedbackinterface[]
}
const FlashCardsBreakDown = ({ questionsBreakdown }: FlashCardsBreakDownProps) => {
    return (
        <Card className="bg-card border-border/30 shadow-xl">
            <CardHeader>
                <CardTitle className="text-card-foreground">Question Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {questionsBreakdown.map((question, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-secodary rounded-xl border border-border/20"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-card/20 rounded-xl flex items-center justify-center">
                                    <span className="font-medium text-card-foreground">{index + 1}</span>
                                </div>
                                <div>
                                    <p className="font-medium card-foreground">Question {index + 1}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge

                                            className={`text-xs border-0${question.feedback.toLowerCase() === "easy"
                                                ? "bg-white text-emerald-700  dark:text-emerald-100"
                                                : question.feedback.toLowerCase() === "medium"
                                                    ? "bg-card text-amber-700  dark:text-amber-100"
                                                    : "bg-card text-red-700  dark:text-red-100"}`}
                                        >
                                            {question.feedback}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-card-foreground">{formatTimeDelta(question.timeSpent)}</p>
                                <p className="text-xs text-foreground">response time</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default FlashCardsBreakDown