import QuizCreation from '@/components/QuizCreation/QuizCreation'
import { getAuthSession } from '@/lib/nextAuth'
import { redirect } from 'next/navigation'
import React from 'react'
type Props = {}
const metadata ={
    title: 'quiz | IQuiz'
}
const Quiz = async(props: Props) => {
    const session = await getAuthSession()
    if (!session?.user){
        redirect('./login')
    }
  return (
    <div className="relative min-h-screen">
         <QuizCreation/>
    </div>
  
  )
}

export default Quiz