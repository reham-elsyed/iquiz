"use client";
import React, { useEffect, useReducer, useState } from "react";
import { Button } from "../../ui/button";
import { Game, Question } from "@prisma/client";
import axios from "axios";
import { flashcardFeedbackinterface, studySessionInterface } from "@/types/feedbackFlashcardTypes";
import { calculateDurationOfFlashCardStudy, durationOfQuiz } from "@/lib/utils";
import EndOfQuizModal from "@/components/EndOfQuizModal/EndOfQuizModal";
import { StudySessionSidebar } from "../StudySessionSidebar/StudySessionSidebar";
import ControllerButtons from "@/components/Buttons/ControllerButtons/ControllerButtons";
import { Toast } from "@/components/ui/toast";
import useFlashCardSession from "@/hooks/useFlashCardSession";
type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer" | 'questionType'>[] };
  studySession: studySessionInterface
};

const FlipCardComponent = ({ game, studySession }: Props) => {

  const { storedValue, isOver, handleNext, handlePrevious, flip, flipCard, timeStarted, questions, handleDispatch } = useFlashCardSession({ game, studySession })

  const duration = durationOfQuiz(new Date(), studySession?.createdAt as Date);




  return (
    <div className="flex flex-col lg:flex-row justify-center  items-center  gap-8  h-full">

      {isOver ? <EndOfQuizModal duration={duration} timeStarted={studySession?.createdAt} gameId={game?.id as string} type={game.gameType} /> :
        <>
          <div className="lg:w-1/3 ">
            <StudySessionSidebar startOfStudySession={studySession?.createdAt as Date} numberOfCards={game.questions.length} progressValue={+storedValue + 1} />
          </div>
          <div className="card-container lg:w-1/2 flex flex-col justify-center items-center gap-5">
            <div className={`card ${flip ? "flip" : ''}`} >
              {game && questions && questions.length > 0 ? (
                <>
                  <div
                    className={` duration-300 bg-card card-front font-bold text-lg md:text-2xl  card-face hover:bg-accent/10 transition-colors text-card-foreground`}
                  >
                    {questions[storedValue]?.question}
                  </div>
                  <div
                    className={` card-face card-back font-bold text-lg md:text-2xl transition-colors duration-200 bg-card text-card-foreground hover:bg-secondary/10 `}
                  >
                    {questions[storedValue]?.answer}
                  </div>
                </>
              ) : (
                <div className="card-face">you are done</div>
              )}
            </div>
            <div className="lg:w-1/2 flex flex-col gap-6 p-4">

              <div className="flex justify-center gap-8">
                {/* Navigation Buttons */}
                <Button className="hover-effect" onClick={flipCard}>Flip</Button>
                <ControllerButtons
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                />
              </div>
              {/* Response Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  onClick={() => handleDispatch({ type: "EASY", payload: questions[storedValue] })}>
                  Easy
                </Button>
                <Button
                  onClick={() =>
                    handleDispatch({ type: "MEDIUM", payload: questions[storedValue] })
                  }
                >
                  Medium
                </Button>
                <Button
                  onClick={() =>
                    handleDispatch({ type: "HARD", payload: questions[storedValue] })
                  }
                >
                  Hard
                </Button>
              </div>
            </div>
          </div>
        </>}
    </div>
  );
};

export default FlipCardComponent;
