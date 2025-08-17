import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from 'lucide-react'
import { flashcardFeedbackinterface } from '@/types/feedbackFlashcardTypes'

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
                            className="flex items-center justify-between p-4 bg-destructive/50 rounded-xl border border-border/20"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-card/20 rounded-xl flex items-center justify-center">
                                    <span className="font-medium text-card-foreground">{index + 1}</span>
                                </div>
                                <div>
                                    <p className="font-medium caret-card-foreground">Question {index + 1}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge

                                            className={`text-xs border-0 ${question.feedback.toLowerCase() === 'easy' ? 'bg-emerald-600/20 text-emerald-300' :
                                                question.feedback.toLowerCase() === 'medium' ? 'bg-amber-600/20 text-amber-300' :
                                                    'bg-red-600/20 text-red-300'
                                                }`}
                                        >
                                            {question.feedback}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-card-foreground">{question.timeSpent}s</p>
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