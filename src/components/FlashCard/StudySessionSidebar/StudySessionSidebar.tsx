import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { durationOfQuiz } from '@/lib/utils';
import React from 'react'
type Props = {
    startOfStudySession?: Date;
    numberOfCards?: number;
    progressValue: number;

}
export const StudySessionSidebar = ({startOfStudySession, numberOfCards, progressValue}:Props) => {
     const duration = durationOfQuiz(new Date(),startOfStudySession as Date);

  return (
    <div className='h-full flex flex-col justify-between items-center p-4 bg-white shadow-md rounded-lg'>
{        startOfStudySession && <div>{duration}</div>}
<ProgressBar value={progressValue} max={numberOfCards} />
    </div>
  )
}
