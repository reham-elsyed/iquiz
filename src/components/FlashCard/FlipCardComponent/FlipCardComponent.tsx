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
import { AlertCircle, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import FlashCardComponent from "./flashCardComponent";
type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer" | 'questionType'>[] };
  studySession: studySessionInterface
};

const FlipCardComponent = ({ game, studySession }: Props) => {

  const { storedValue,
    isDisabled,
    isOver,
    handleNext,
    handlePrevious,
    flip,
    flipCard,
    questions,
    handleDispatch }
    = useFlashCardSession({ game, studySession })

  const duration = durationOfQuiz(new Date(), studySession?.createdAt as Date);




  return (
    <div className="flex flex-col lg:flex-row justify-center  items-center  gap-8 min-h-screen">

      {isOver ? <EndOfQuizModal duration={duration} timeStarted={studySession?.createdAt} gameId={game?.id as string} type={game.gameType} /> :
        <>
          <div className="lg:w-1/3 ">
            <StudySessionSidebar startOfStudySession={studySession?.createdAt as Date} numberOfCards={game.questions.length} progressValue={+storedValue + 1} />
          </div>
          <div className="container  flex flex-col justify-center items-center gap-5">
            {game && questions && questions.length > 0 && <FlashCardComponent question={questions[storedValue]} isFliped={flip} handleFlip={flipCard} />}

            <div className="lg:w-1/2 flex flex-col gap-6 p-4">

              {/* Response Buttons */}
              <div className="h-full">
                <div className="text-center">
                  <h3 className="font-medium mb-2">How difficult was this card?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Rate the difficulty to help improve your learning experience
                  </p>
                </div>
                {flip && (
                  <div className="grid  md:grid-cols-3 gap-4 ">
                    <Button
                      className="gap-2 bg-green-100 hover:bg-green-200 text-green-800 border-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                      variant="outline"
                      onClick={() => handleDispatch({ type: "EASY", payload: questions[storedValue] })}>
                      <CheckCircle2 className="h-4 w-4" />
                      Easy
                    </Button>
                    <Button
                      className="gap-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800"
                      variant="outline"
                      onClick={() =>
                        handleDispatch({ type: "MEDIUM", payload: questions[storedValue] })
                      }
                    >
                      <AlertCircle className="h-4 w-4" />
                      Medium
                    </Button>
                    <Button
                      className="gap-2 bg-red-100 hover:bg-red-200 text-red-800 border-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                      variant="outline"
                      onClick={() =>
                        handleDispatch({ type: "HARD", payload: questions[storedValue] })
                      }
                    >
                      <XCircle className="h-4 w-4" />
                      Hard
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex justify-between gap-8">
                {/* Navigation Buttons */}
                <ControllerButtons
                  lastQuestionText="rate all questions first"
                  disableBack={(storedValue === 0)}
                  disableNext={(questions.length - 1 === storedValue)}
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                />
              </div>
            </div>
          </div>
        </>}
    </div>
  );
};

export default FlipCardComponent;
