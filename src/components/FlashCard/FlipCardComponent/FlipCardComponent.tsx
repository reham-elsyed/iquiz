"use client";
import { Button } from "../../ui/button";
import { Game, Question } from "@prisma/client";
import { studySessionInterface } from "@/types/feedbackFlashcardTypes";
import {
  durationOfQuiz

} from "@/lib/utils";
import { StudySessionSidebar } from "../StudySessionSidebar/StudySessionSidebar";
import ControllerButtons from "@/components/Buttons/ControllerButtons/ControllerButtons";
import useFlashCardSession from "@/hooks/useFlashCardSession";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import FlashCardComponent from "./FlashCardComponent";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer" | 'questionType'>[] };
  studySession: studySessionInterface
};

const FlipCardComponent = ({ game, studySession }: Props) => {

  const { storedValue,
    isDisabled,
    handleNext,
    handlePrevious,
    feedbackData,
    flip,
    flipCard,
    questions,
    setStoredValue,
    handleDispatch }
    = useFlashCardSession({ game, studySession })

  const duration = durationOfQuiz(new Date(), studySession?.createdAt as Date);




  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
      <div className="col-span-1 md:col-span-2">
        <StudySessionSidebar
          setStoredValue={setStoredValue}
          startOfStudySession={studySession?.createdAt as Date}
          numberOfCards={game?.questions.length}
          studysessionId={studySession?.id}
          questionsWithFeedback={feedbackData} />
      </div>
      <div className="container relative  flex flex-col justify-center items-center gap-5 col-span-1 md:col-span-5">
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
              <div className="grid  md:grid-cols-3 gap-4 mb-6 ">
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
            <div className="flex justify-between gap-8">
              {/* Navigation Buttons */}
              <ControllerButtons
                lastQuestionText="finish session"
                disableBack={(storedValue === 0)}
                disableNext={isDisabled}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
              />
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default FlipCardComponent;
