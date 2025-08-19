"use client";

import { Game, Question } from "@prisma/client";
import { ChevronRight, LoaderCircle, Timer } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import EndOfQuizModal from "../EndOfQuizModal/EndOfQuizModal";
import { durationOfQuiz, setEndOfQuizTime } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { checkAnswerSchema } from "@/app/schemas/formSchema/quizSchema";
import { z } from "zod";
import axios from "axios";
import BlankAnswerComponent from "../BlankAnswersComponent/BlankAnswerComponent";
import useLocalStorage from "@/hooks/useLocalStorage";
import TitleCard from "../TitleCard/TitleCard";
import useEventListener from "@/hooks/useEventListener";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] };
};

const OpenEndedQuiz = ({ game }: Props) => {
  const [isOver, setIsOver] = useState(false)
  const [now, setNow] = useState<Date>(new Date());
  const [keywords, setKeywords] = useState<string[]>([]);
  const { toast } = useToast();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  // set current question on refresh or reload
  const [storedValue, setStoredValue] = useLocalStorage({
    key: "storedValue",
    value: 0,
  });
  //duration of quiz setting current date
  //console.log(game.questions);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOver) {
        setNow(new Date());
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isOver]);
  //return the current question
  const currentQuestion = useMemo(() => {
    console.log(game.questions[storedValue]);
    return game.questions[storedValue];
  }, [storedValue, game.questions]);

  const { mutate: checkAnswer, isPending: isChecking } = useMutation({
    mutationFn: async () => {
      const userAnswers = inputRefs.current.map((element) => {
        return element.value;
      });
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userAnswer: userAnswers.toLocaleString(),
        keyWords: keywords.toLocaleString(),
      };
      const response = await axios.post("/api/checkAnswer", payload);

      return response.data;
    },
  });
  //check correct answer and call toast in ui to give feedback
  const handleNext = useCallback(() => {
    if (isChecking) return;
    checkAnswer(undefined, {
      onSuccess: async ({ percentageSimilar }) => {
        toast({
          title: `Your answer is ${percentageSimilar}% similar to the correct answer`,
          description: " answers are matched based on similarity comparison",
        });

        if (storedValue === game.questions.length - 1) {
          setIsOver(true);
          await setEndOfQuizTime(game.id);
          localStorage.removeItem("storedValue");
          inputRefs.current = [];
          return;
        }

        inputRefs.current.forEach((input) => {
          input.value = "";
          input?.focus();
        });
        setStoredValue((prev: number) => (prev += 1));
      },
    });
  }, [checkAnswer, toast, isChecking, game.questions.length, storedValue]);

  const handleKeyDown = useCallback((event?: KeyboardEvent | Event) => {
    const keyboardEvent = event as KeyboardEvent | undefined;
    if (keyboardEvent?.key == "Enter") {
      handleNext();
    }
  },
    [handleNext]);
  useEventListener({ action: "keydown", handler: handleKeyDown });

  const duration = durationOfQuiz(now, game.timeStarted);
  return (
    <>
      {isOver ? (
        <>
          {" "}
          <EndOfQuizModal gameId={game.id} duration={duration} />
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen py-10">
          <div className=" mt-10 p-x-2 md:w-[80vm] max-w-4xl w-[90vm] ">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col">
                <TitleCard topic={game.topic} />

                <div className="flex self-start mt-3 text-slate-400">
                  <Timer className="mr-2" />
                  <span>
                    {duration}
                    {/* {formatTimeDelta(differenceInSeconds(now,game.timeStarted))} */}
                  </span>
                </div>
              </div>
            </div>
            <Card className="w-full mt-4">
              <CardHeader className="flex flex-row item-center">
                <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
                  <div>{storedValue + 1}</div>
                  <div className="text-base text-slate-400">
                    {game.questions.length}
                  </div>
                </CardTitle>
                <CardDescription className="flex-grow text-lg">
                  {currentQuestion.question}
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="flex flex-col items-stretch justify-center w-full mt-4">
              <BlankAnswerComponent
                answer={currentQuestion.answer}
                input={inputRefs}
                pkeyWords={setKeywords}
              />
              <Button
                className="mt-2"
                onClick={handleNext}
                disabled={isChecking}
              >
                {isChecking ? (
                  <LoaderCircle className="w-4 h-4 me-2 animate-spin" />
                ) : (
                  <>
                    {" "}
                    {storedValue === game.questions.length - 1
                      ? `finish`
                      : `next`}{" "}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OpenEndedQuiz;
