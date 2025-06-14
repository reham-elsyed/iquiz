"use client";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { BarChart } from "lucide-react";

type Props = {
  gameId: string;
  duration: string; 
  removeIsOver: () => void;
 type?:string
};

function EndOfQuizModal(props: Props) {
  return (
    <div className='relative h-screen'>
    <div className="modal-container flex flex-col">
      <div>
        You completed the test in
        <span>{props.duration}</span>
      </div>
      <Link
      onClick={() => props.removeIsOver()}
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
