'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button';

type Props = {}

const FlipCardComponent =(props: Props) => {
//const {question, answer} = await axios.post('/api/flashCard')
    const [flip, setFlip] = useState(false);
    function flipCard(){
        setFlip(prev=> !prev)
    }
   return (
    <div className='modal-container bg-muted h-56 w-56 perspective'
    >
        <div className='h-2/3 relative trans'>
        <div className={`h-full duration-300 ${flip?'flip':'flip-back'} bg-accent`}> flashCard</div>
        <div className={`absolute duration-300 inset-0 h-full backface ${flip?'flip-back':'flip'} bg-background`}> answer</div>
        </div>
      

    <Button
    onClick={flipCard}
    >flip</Button>
    </div>
  )
}

export default FlipCardComponent