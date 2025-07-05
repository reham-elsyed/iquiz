"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { buttonVariants } from "../ui/button";
import { cn, durationOfQuiz } from "@/lib/utils";
import { BarChart } from "lucide-react";
import axios from "axios";

type Props = {
  gameId: string;
  duration: string; 
  timeStarted?: Date;
  removeIsOver: () => void;
 type?:string
};

function EndOfQuizModal(props: Props) {
       const durationNew = durationOfQuiz(new Date, props.timeStarted as Date);
    const endofQuizTime = async()=>{
    return   await axios.post("/api/endTime", {gameId:props.gameId})
    }  
  useEffect(()=>{
props.removeIsOver()
endofQuizTime()
  },[])
  return (
    <div className='relative h-screen'>
    <div className="modal-container flex flex-col">
      <div>
        You completed the test in
        <span>{durationNew}</span>
      </div>
      <Link
      
        href={props.type === 'flash_card' ? `/flash-card-stats/${props.gameId}` : `/statistics/${props.gameId}`}
        className={cn(buttonVariants(), "mt-2")}
      >
        {props.type}
        View Statistics
        <BarChart className="w-4 h-4 ml-2" />
      </Link>
    </div>
    </div>
  );
}

export default EndOfQuizModal;
