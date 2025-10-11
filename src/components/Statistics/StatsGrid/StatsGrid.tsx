import React from 'react'
import TimeTakenCard from '../TimeTakenCard'
import AccuracyCard from '../AccuracyCard'
import ResultCard from '../ResultCard'
type StatsGridProps = {
    accuracy: number;
    timeStarted: Date;
    timeEnded: Date;
}
const StatsGrid = ({ accuracy, timeEnded, timeStarted }: StatsGridProps) => {
    return (
        <><div className='grid grid-cols-1 md:grid-cols-7 gap-5 '>
            <div className='col-span-3  '> <ResultCard accuracy={accuracy} /></div>
            <div className='col-span-4 '><AccuracyCard accuracy={accuracy} />
            </div>
            <div className='col-span-4 '> <TimeTakenCard
                timeEnded={timeEnded}
                timeStarted={timeStarted}
            /></div>
            <div className='col-span-3 bg-gray-600'></div>
        </div></>
    )
}

export default StatsGrid