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
        const  newState= state.slice(0,-1)
        handleNext()
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
    <div className='modal-container bg-muted h-2/3 w-1/3 perspective'
    >
        <div className='h-2/3 relative trans'>
        {game && game.questions && game.questions.length > 0 && (<>   <div className={`h-full duration-300 ${flip?'flip':'flip-back'} bg-accent`}> {questions[storedValue].question}</div>
        <div className={`absolute duration-300 inset-0 h-full backface ${flip?'flip-back':'flip'} bg-background`}>{questions[storedValue].answer}
            </div></>
)}
{questions.length ===0 && <div>you are done</div>}
        </div>
      
<div>
    <Button onClick={()=>dispatch({type:'done'})}>done</Button>
    <Button onClick={()=>dispatch({type:'notSure', payload:questions[storedValue]})}>not sure</Button>
        <Button onClick={()=>dispatch({type:'still',payload:questions[storedValue]})}>still</Button>
 <Button onClick={()=>dispatch({type:'retry',payload:game.questions})}>retry</Button>
</div>
        <div className='flex justify-evenly'>
            <Button
    onClick={flipCard}
    >flip</Button>
    <Button
    onClick={handleNext}
    >Next</Button>
    </div>
    </div>
  )
}

export default FlipCardComponent