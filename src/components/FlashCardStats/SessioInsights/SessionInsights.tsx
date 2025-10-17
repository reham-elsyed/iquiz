import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getFeedbackSummary } from '@/lib/getFlashardStatsSummary'
import { formatTimeDelta } from '@/lib/utils'
import { flashcardFeedbackinterface } from '@/types/feedbackFlashcardTypes'
import { Award, Clock, Clock1, TrendingUp, Zap } from 'lucide-react'
import React from 'react'

type SessioInsightsProps = {
    feedbackData: flashcardFeedbackinterface[]
}
const SessionInsights = ({ feedbackData }: SessioInsightsProps) => {

    // const durationMs = feedbackData.reduce((sum, f) => sum + f.timeSpent, 0)
    // const totalQuestions = feedbackData.length;
    // const averageTime = durationMs / totalQuestions;
    // const averageFormatted = formatTimeDelta(averageTime)
    // const easyCount = feedbackData.filter(f => f.feedback === 'EASY').length;
    // const hardCount = feedbackData.filter(f => f.feedback === 'HARD').length;

    // const getDifficultyInsight = () => {
    //     if (easyCount === totalQuestions) return "Excellent! All questions felt easy to you.";
    //     if (hardCount === totalQuestions) return "This was challenging! Consider reviewing the material.";
    //     if (easyCount > hardCount) return "Great job! Most questions were manageable.";
    //     return "Good effort on a challenging set of questions.";
    // };

    // const getTimeInsight = () => {
    //     if (averageTime < 1.5) return "You answered quickly and confidently!";
    //     if (averageTime > 2.5) return "You took time to think through each question.";
    //     return "You maintained a steady pace throughout.";
    // };
    // const questionsPerMinute = (totalQuestions / (durationMs / 60000)).toFixed(1);
    // const sessionEfficiency = easyCount >= hardCount ? 'High' : 'Moderate';
    const { durationMs,
        totalQuestions,
        averageTime,
        averageFormatted,
        easyCount,
        hardCount,
        questionsPerMinute,
        sessionEfficiency,
        difficultyInsight,
        timeInsight } = getFeedbackSummary(feedbackData);
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Award className="h-5 w-5 text-primary" />
                    </div>
                    Session Insights
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Performance & Pace Analysis */}
                    <div className="space-y-4">
                        <div className="p-5 bg-secondary rounded-lg border border-border">
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                <h4 className="font-medium">Performance Analysis</h4>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {difficultyInsight}
                            </p>
                        </div>

                        <div className="p-5 bg-secondary rounded-lg border border-border">
                            <div className="flex items-center gap-2 mb-3">
                                <Clock1 className="h-4 w-4 text-primary" />
                                <h4 className="font-medium">Pace Analysis</h4>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {timeInsight}
                            </p>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Zap className="h-4 w-4 text-primary" />
                            <h4 className="font-medium">Key Metrics</h4>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg border border-border">
                                <span className="text-sm text-muted-foreground">
                                    Average response time
                                </span>
                                <span className="font-semibold">
                                    {averageFormatted}
                                </span>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg border border-border">
                                <span className="text-sm text-muted-foreground">
                                    Questions per minute
                                </span>
                                <span className="font-semibold">
                                    {questionsPerMinute}
                                </span>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg border border-border">
                                <span className="text-sm text-muted-foreground">
                                    Session efficiency
                                </span>
                                <span className="font-semibold">
                                    {sessionEfficiency}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SessionInsights