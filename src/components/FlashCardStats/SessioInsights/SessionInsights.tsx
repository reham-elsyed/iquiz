import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatTimeDelta } from '@/lib/utils'
import { flashcardFeedbackinterface } from '@/types/feedbackFlashcardTypes'
import { Award } from 'lucide-react'
import React from 'react'

type SessioInsightsProps = {
    feedbackData: flashcardFeedbackinterface[]
}
const SessionInsights = ({ feedbackData }: SessioInsightsProps) => {

    const durationMs = feedbackData.reduce((sum, f) => sum + f.timeSpent, 0)
    const totalQuestions = feedbackData.length;
    const averageTime = durationMs / totalQuestions;
    const averageFormatted = formatTimeDelta(averageTime)
    const easyCount = feedbackData.filter(f => f.feedback === 'EASY').length;
    const hardCount = feedbackData.filter(f => f.feedback === 'HARD').length;

    const getDifficultyInsight = () => {
        if (easyCount === totalQuestions) return "Excellent! All questions felt easy to you.";
        if (hardCount === totalQuestions) return "This was challenging! Consider reviewing the material.";
        if (easyCount > hardCount) return "Great job! Most questions were manageable.";
        return "Good effort on a challenging set of questions.";
    };

    const getTimeInsight = () => {
        if (averageTime < 1.5) return "You answered quickly and confidently!";
        if (averageTime > 2.5) return "You took time to think through each question.";
        return "You maintained a steady pace throughout.";
    };
    return (
        <Card className="bg-card border-border/30 shadow-xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-card-foreground">
                    <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
                        <Award className="h-4 w-4 text-orange-400" />
                    </div>
                    Session Insights
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="p-4 bg-destructive/50 rounded-xl border border-border/20">
                            <h4 className="font-medium mb-2 text-card-foreground">Performance Analysis</h4>
                            <p className="text-foreground">{getDifficultyInsight()}</p>
                        </div>
                        <div className="p-4 bg-destructive/50 rounded-xl border border-border/20">
                            <h4 className="font-medium mb-2 text-card-foreground">Pace Analysis</h4>
                            <p className="text-foreground">{getTimeInsight()}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-medium text-card-foreground">Key Metrics</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-destructive/50 rounded-lg border border-border/20">
                                <span className="text-foreground">Average response time:</span>
                                <span className="font-medium text-card-foreground">{averageFormatted}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-destructive/50 rounded-lg border border-border/20">
                                <span className="text-foreground">Questions per minute:</span>
                                <span className="font-medium text-card-foreground">{(totalQuestions / (durationMs / 60000)).toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-destructive/50 rounded-md border border-border/20">
                                <span className="text-foreground">Session efficiency:</span>
                                <span className="font-medium text-card-foreground">{easyCount >= hardCount ? 'High' : 'Moderate'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SessionInsights