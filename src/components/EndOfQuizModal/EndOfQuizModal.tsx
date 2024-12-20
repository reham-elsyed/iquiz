'use client'
import Link from 'next/link'
import React from 'react'

type Props = {
    gameId : string
    duration:string
}

function EndOfQuizModal(props: Props){
  return (
    <div className="modal-container flex flex-col">
        <div>
            You completed the test in 
             <span>{props.duration}</span>
        </div>
        <Link
        href={`/statistics/${props.gameId}`}></Link>
    </div>
  )
}

export default EndOfQuizModal