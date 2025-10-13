import React from 'react'
import TimeTakenCard from '../TimeTakenCard'
import AccuracyCard from '../AccuracyCard'
import ResultCard from '../ResultCard'
import { PieChartComponent } from '@/components/Charts/PieChartComponent/PieChartComponent'
import { Question } from '@prisma/client'
import { Badge } from '@/components/ui/badge'

type StatsGridProps = {
    accuracy: number;
    timeStarted: Date;
    timeEnded: Date;
    questions: Question[];
}
const StatsGrid = ({ accuracy, timeEnded, timeStarted, questions }: StatsGridProps) => {

    // console.log(questionsChart, "questionsChart")
    // if (!questions || questions.length === 0) return null;

    // 🧠 Determine game type
    const gameType = questions[0]?.questionType;

    // ✅ Calculate correct and incorrect counts
    const correctCount =
        gameType === "mcq"
            ? questions.filter((q) => q.isCorrect).length
            : questions.filter((q) => (q.percentageCorrect ?? 0) >= 50).length;

    const incorrectCount = questions.length - correctCount;

    // ✅ Chart data
    const data = [
        { difficulty: "Correct", count: correctCount },
        { difficulty: "Incorrect", count: incorrectCount },
    ];

    return (
        <><div className='grid grid-cols-1 md:grid-cols-6 gap-7  p-y-6 mt-5'>
            <div className='col-span-2 h-96 '> <ResultCard accuracy={accuracy} /></div>
            <div className='col-span-4  h-96 '>
                <div className='grid grid-cols-1 md:grid-cols-6 gap-7 h-full  pt-5 app-card'>

                    <div className="flex flex-col  justify-around  text-sm col-span-3  px-6 py-4">
                        <div className="  text-center sm:text-left space-y-2">
                            <h2 className="text-xl sm:text-xl font-semibold text-foreground tracking-tight">
                                Answer Accuracy Overview
                            </h2>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-prose mx-auto sm:mx-0">
                                A detailed performance breakdown showing how many of your answers were correct versus incorrect.
                                Use this insight to identify areas for improvement and track your progress over time.
                            </p>
                        </div>
                        <Badge variant="secondary" className="flex justify-between items-center">
                            <p className="text-muted-foreground">Correct:</p>
                            <p className="text-xl">{correctCount}</p>
                        </Badge>
                        <Badge variant="secondary" className="flex justify-between items-center">
                            <p className="text-muted-foreground">Incorrect:</p>
                            <p className="text-xl">{incorrectCount}</p>
                        </Badge>
                        <Badge variant="secondary" className="flex justify-between items-center">
                            <p className="text-muted-foreground">Total:</p>
                            <p className="text-xl">{questions.length}</p>
                        </Badge>
                    </div>
                    <div className='col-span-3 relative overflow-hidden'>
                        <div className='absolute left-[5%] top-[5%] rounded-2xl border-destructive border-2 h-full w-full shadow-xl '></div>
                        <PieChartComponent studySessionDiff={data} className="w-full  h-full translate-y-9 translate-x-5 " title={false} />
                    </div>
                </div>
            </div>
            <div className='col-span-4 h-96'> <TimeTakenCard
                timeEnded={timeEnded}
                timeStarted={timeStarted}
            /></div>
            <div className='col-span-2 h-96'><AccuracyCard accuracy={accuracy} />
            </div>

        </div></>
    )

}

export default StatsGrid