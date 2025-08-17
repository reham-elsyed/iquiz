import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award } from 'lucide-react'
import React from 'react'

const SessionInsights = ({ feedbackData }) => {
    const totalQuestions = feedbackData.length;
    const averageTime = feedbackData.reduce((sum, f) => sum + f.timeSpent, 0) / totalQuestions;
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
        <Card className="bg-[#2a1641] border-purple-700/30 shadow-xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
                        <Award className="h-4 w-4 text-orange-400" />
                    </div>
                    Session Insights
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="p-4 bg-[#1a0b2e]/50 rounded-xl border border-purple-800/20">
                            <h4 className="font-medium mb-2 text-white">Performance Analysis</h4>
                            <p className="text-purple-200">{getDifficultyInsight()}</p>
                        </div>
                        <div className="p-4 bg-[#1a0b2e]/50 rounded-xl border border-purple-800/20">
                            <h4 className="font-medium mb-2 text-white">Pace Analysis</h4>
                            <p className="text-purple-200">{getTimeInsight()}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-medium text-white">Key Metrics</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-[#1a0b2e]/50 rounded-lg border border-purple-800/20">
                                <span className="text-purple-300">Average response time:</span>
                                <span className="font-medium text-white">{averageTime.toFixed(1)}s</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-[#1a0b2e]/50 rounded-lg border border-purple-800/20">
                                <span className="text-purple-300">Questions per minute:</span>
                                <span className="font-medium text-white">{(totalQuestions / (durationMs / 60000)).toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-[#1a0b2e]/50 rounded-lg border border-purple-800/20">
                                <span className="text-purple-300">Session efficiency:</span>
                                <span className="font-medium text-white">{easyCount >= hardCount ? 'High' : 'Moderate'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SessionInsights