import { durationOfQuiz } from '@/lib/utils';
import React from 'react'
type Props = {
    startOfStudySession?: Date;

}
export const StudySessionSidebar = ({startOfStudySession}:Props) => {
     const duration = durationOfQuiz(new Date(),startOfStudySession as Date);

  return (
    <div className='h-full flex flex-col justify-between items-center p-4 bg-white shadow-md rounded-lg'>
{        startOfStudySession && <div>{duration}</div>}
    </div>
  )
}
