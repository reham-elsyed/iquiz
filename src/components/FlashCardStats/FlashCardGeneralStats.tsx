import React from 'react'
import { Card, CardContent } from '../ui/card'
import { CheckCircle, Clock, Target, TrendingUp } from 'lucide-react'
type FlashCardGeneralStatsProps = {
    generalStats: {
        label: string;
        value: string | number;
    }[]
}
const FlashCardGeneralStats = ({ generalStats }: FlashCardGeneralStatsProps) => {
    return (
        <>
            {generalStats.map(stat => (
                <Card key={stat.label} className="bg-card border-purple-700/30 shadow-xl">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-card/20 rounded-xl flex items-center justify-center">
                                {stat.label === "Duration" && <Clock className="h-6 w-6 text-purple-400" />}
                                {stat.label === "Questions" && <Target className="h-6 w-6 text-blue-400" />}
                                {stat.label === "Status" && <CheckCircle className="h-6 w-6 text-green-400" />}
                                {stat.label === "AveTime" && <TrendingUp className="h-6 w-6 text-emerald-400" />}


                            </div>
                            <div>
                                <p className="text-sm text-card-foreground">{stat.label}</p>
                                <p className="text-2xl font-medium text-foreground">{stat.value}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))
            }
        </>
    )
}

export default FlashCardGeneralStats