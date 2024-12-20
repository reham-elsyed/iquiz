'use client'

import { Game, Question } from '@prisma/client'
import { ChevronRight, LoaderCircle, Timer } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import EndOfQuizModal from '../EndOfQuizModal/EndOfQuizModal'
import { durationOfQuiz} from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { checkAnswerSchema } from '@/app/schemas/formSchema/quizSchema'
import { z } from 'zod'
import axios from 'axios'

type Props = {
    game: Game & { questions: Pick<Question, 'id' | 'question' | 'answer'>[]}
}

const OpenEndedQuiz = ({game}: Props) => {
   const [correctAnswers, setCorrectAnswers] = useState(0);
      const[wrongAnswers, setWrongAnswers]= useState(0)
          const [questionIndex, setQuestuionIndex] = useState(0)
         const [selectedChoice, setSelectedChoice] = useState(0)
      
      const [isOver, setIsOver] = useState(false)
      const [now, setNow] = useState<Date>(new Date())
       const {toast} = useToast()
      // set current question on refresh or reload
       useEffect(()=>{
        if(localStorage.getItem('questionIndex')) {
          setQuestuionIndex( Number(JSON.parse(localStorage.getItem('questionIndex') as string))) }
       },[])
      //duration of quiz setting current date
      console.log(game.questions)
       useEffect(()=>{
              const interval= setInterval(() => {
                  if (!isOver){
                      setNow(new Date())
                  }
              }, 1000)
              return()=>{
                  clearInterval(interval)
              }
          },[isOver])
          //return the current question
          const currentQuestion = useMemo(()=>{
            console.log(game.questions[questionIndex])
              return game.questions[questionIndex]
      
          },[questionIndex, game.questions])
          const{mutate: checkAnswer, isPending:isChecking,}= useMutation({
            mutationFn: async()=>{
                const payload : z.infer<typeof checkAnswerSchema>= {
                    questionId: currentQuestion.id,
                    userAnswer:"" ,
                }
                const response = await axios.post('/api/checkAnswer', payload)
                return response.data
            }
        })
        //check correct answer and call toast in ui to give feedback
const handleNext =  useCallback(()=>{
            if (isChecking) return;
            checkAnswer(undefined, {
                onSuccess: ({percentageSimilar})=>{
                  toast({
                    title:`Your answer is ${percentageSimilar}% similar to the correct answer`,
                    description:" answers are matched based on similarity comparison"
                  })  
                    if (questionIndex === game.questions.length -1){
                        setIsOver(true)
                        localStorage.removeItem('questionIndex')
                       
                        return
                    }
                    setQuestuionIndex(prev=> prev + 1)
                    localStorage.setItem('questionIndex', JSON.stringify(questionIndex +1))
                }
            })
        },[checkAnswer, toast, isChecking, game.questions.length, questionIndex])
        
        useEffect(()=>{
            const handleKeyDown= (event: KeyboardEvent)=>{
               
                if (event.key == 'Enter'){
                   handleNext();
                }
            };
            document.addEventListener("keydown", handleKeyDown);
            
            return ()=>{
                document.removeEventListener("keydown",handleKeyDown);
            }
        },[handleNext]);
      const duration = durationOfQuiz(now, game.timeStarted)
  return (
    <>
    {isOver?  <> <EndOfQuizModal gameId={game.id} duration={duration} /></>:
    <div className='absolute mt-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vm] max-w-4xl w-[90vm] '>
        <div className='flex flex-row justify-between items-center'>
          <div className="flex flex-col">
          <p>
                <span className="text-slate-400 mr-2">
                    Topic
                </span>
                <span className='px-2 py-1 text-white rounded-lg bg-slate-800'>
                    {game.topic}
                </span>
            </p>
            <div className="flex self-start mt-3 text-slate-400">
                <Timer  className='mr-2'/>
                <span>{duration}
                    {/* {formatTimeDelta(differenceInSeconds(now,game.timeStarted))} */}
                    </span>
            </div>
          </div>
          
        </div>
        <Card className='w-full mt-4'>
            <CardHeader className='flex flex-row item-center'>
                <CardTitle className='mr-5 text-center divide-y divide-zinc-600/50'>
                     <div>{questionIndex + 1}</div>
                     <div className='text-base text-slate-400'>
                        {game.questions.length}
                     </div>
                </CardTitle>
                <CardDescription className='flex-grow text-lg'>
{currentQuestion.question}
                </CardDescription>
            </CardHeader>
        </Card>
        <div className='flex flex-col items-stretch justify-center w-full mt-4'>

<Button className='mt-2'
onClick={handleNext}
disabled={isChecking}
>
    {isChecking?<LoaderCircle className='w-4 h-4 me-2 animate-spin'/>:
   <> {questionIndex === game.questions.length -1? `finish`: `next`} <ChevronRight className='w-4 h-4 ml-2'/></>}
</Button>
        </div>
    </div>}
    </>
  )
}

export default OpenEndedQuiz