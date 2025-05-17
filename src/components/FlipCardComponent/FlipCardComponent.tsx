'use client'
import React, { useReducer, useState } from 'react'
import { Button } from '../ui/button';
import { Game, Question } from "@prisma/client";
import useLocalStorage from '@/hooks/useLocalStorage';
type Props = {
    game: Game & { questions: Pick<Question, "id" | "question" | "answer" >[] };
    
}


const FlipCardComponent =({game}: Props) => {
//const {question, answer} = await axios.post('/api/game')
    const [flip, setFlip] = useState(false);
   const [storedValue, setStoredValue]= useLocalStorage({key:'currentIndex', value:0});
   const reducer=(state, action)=>{
switch(action.type)
{
    case 'done':
        handleNext()
        const  newState= state.slice(0,-1)
        console.log('done', newState)
        return newState
    case 'notSure':
        return [...state, action.payload]
    case 'still':
        return [...state, action.payload]
        case 'retry':
            return [...state, action.payload]
    default:
        return state
}
}
const [questions, dispatch]=useReducer(reducer,game.questions)

    function flipCard(){
      setFlip(prev=>!prev)
        
    }
function handleNext(){
    setStoredValue((prevValue: number) => {
        if (prevValue < game.questions.length - 1) {
            return prevValue + 1;
        } else {
            return 0;
        }
    });
    setFlip(false);
}
   return (
    <div className='flex flex-col lg:flex-row justify-center  items-center mt-16 gap-8 lg:p-16 h-full'>
        <div className=' card lg:w-1/2'>
        {game && questions && questions.length > 0 ? (<>   <div className={` duration-300 ${flip?'flip':'flip-back'} bg-accent  card-face`}> {questions[storedValue]?.question}</div>
        <div className={` card-face  backface ${flip?'flip-back':'flip'} `}>{questions[storedValue]?.answer}
            </div></>):<div className='card-face'>you are done</div>
}

        </div>
      
<div className="lg:w-1/2 flex flex-col gap-6 p-4">
  {/* Response Buttons */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <Button onClick={() => dispatch({ type: 'done' })}>Done</Button>
    <Button onClick={() => dispatch({ type: 'notSure', payload: questions[storedValue] })}>
      Not Sure
    </Button>
    <Button onClick={() => dispatch({ type: 'still', payload: questions[storedValue] })}>
      Still
    </Button>
    <Button onClick={() => dispatch({ type: 'retry', payload: game.questions })}>Retry</Button>
  </div>

  {/* Navigation Buttons */}
  <div className="flex justify-center gap-8">
    <Button onClick={flipCard}>Flip</Button>
    <Button onClick={handleNext}>Next</Button>
  </div>
</div>

    </div>
  )
}

export default FlipCardComponent