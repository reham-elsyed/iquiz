"use client";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { BarChart } from "lucide-react";

type Props = {
  gameId: string;
  duration: string;
};

function EndOfQuizModal(props: Props) {
  return (
    <div className="modal-container flex flex-col">
      <div>
        You completed the test in
        <span>{props.duration}</span>
      </div>
      <Link
        href={`/statistics/${props.gameId}`}
        className={cn(buttonVariants(), "mt-2")}
      >
        View Statistics
        <BarChart className="w-4 h-4 ml-2" />
      </Link>
    </div>
  );
}

export default EndOfQuizModal;
