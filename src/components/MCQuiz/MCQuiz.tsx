"use client";

import { Game, Question } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { ChevronRight, LoaderCircle, Timer } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import ChoicesButton from "../ChoicesButton/ChoicesButton";
import Counter from "../Counter/Counter";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { checkAnswerSchema } from "@/app/schemas/formSchema/quizSchema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import EndOfQuizModal from "../EndOfQuizModal/EndOfQuizModal";
import { durationOfQuiz, formatTimeDelta, setEndOfQuizTime } from "@/lib/utils";
import useLocalStorage from "@/hooks/useLocalStorage";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "options" | "question">[] };
};

const MCQuiz = ({ game }: Props) => {
  const [correctAnswers, setCorrectAnswers, removeCorrectAnswer] = useLocalStorage({key:'correctAnswers', value:0})
  const [wrongAnswers, setWrongAnswers, RemoveWrongAnswer] = useLocalStorage({key:'wrongAnswers', value:0})
  const [selectedChoice, setSelectedChoice] = useState(0);
 // const [storedValue, setQuestuionIndex] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const [now, setNow] = useState<Date>(new Date());
  const { toast } = useToast();
  const[storedValue, setStoredValue, removeItem] = useLocalStorage({key:"MCQIndex",value:0});

 
 
 useEffect(() => {
  if (!isOver) {
    const interval = setInterval(() => setNow(new Date()), 3000);
    return () => clearInterval(interval);
  }
}, [isOver]);

  //return the current question
  const currentQuestion = useMemo(() => {
    return game.questions[storedValue];
  }, [storedValue, game.questions]);

  const { mutate: checkAnswer, isPending: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userAnswer: options[selectedChoice],
        keyWords: "",
      };
      localStorage.setItem("questionId", JSON.stringify(currentQuestion.id));

      const response = await axios.post("/api/checkAnswer", payload);

      return response.data;
    },
  });
  const handleNext = useCallback(() => {
    if (isChecking) return;
    checkAnswer(undefined, {
      onSuccess: async ({ isCorrect }) => {
        if (isCorrect) {
          toast({
            title: "correct!",
            variant: "success",
          });
          setCorrectAnswers((prev) => prev + 1);
         
        } else {
          toast({
            title: "Wrong",
            variant: "destructive",
          });
          setWrongAnswers((prev) => prev + 1);
         
        }
        if (storedValue === game.questions.length - 1) {
          setIsOver(true);
          await setEndOfQuizTime(game.id);
          //remove savedIndex(storedValue) from localstorage
          removeItem();
          removeCorrectAnswer();
          RemoveWrongAnswer();
          return;
        }
        setStoredValue((prev) => prev + 1);
       
      },
    });
  }, [checkAnswer, toast, isChecking, game.questions.length, storedValue]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key == "1") {
        setSelectedChoice(0);
      } else if (event.key == "2") {
        setSelectedChoice(1);
      } else if (event.key == "3") {
        setSelectedChoice(2);
      } else if (event.key == "4") {
        setSelectedChoice(3);
      } else if (event.key == "Enter") {
        handleNext();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]);
  //return [] parse the string of all options into array of strings
  const options = useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);
  //calculate the duration of test/ timer
  const duration = durationOfQuiz(now, game.timeStarted);
  return (
    <>
      {isOver ? (
        <>
          {" "}
          <div className="relative h-screen">
          <EndOfQuizModal gameId={game.id} duration={duration} />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen py-10">
          <div className=" mt-10  md:w-[80vm] max-w-4xl w-[90vm] ">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <p>
                <span className="text-slate-400 mr-2">Topic</span>
                <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
                  {game.topic}
                </span>
              </p>
              <div className="flex self-start mt-3 text-slate-400">
                <Timer className="mr-2" />
                <span>{duration}</span>
              </div>
            </div>
            <Counter
              correctAnswers={correctAnswers}
              wrongAnswers={wrongAnswers}
            />
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
            {options.map((option, index) => {
              return (
                <ChoicesButton
                  key={index}
                  index={index}
                  setSelectedChoice={setSelectedChoice}
                  selectedChoice={selectedChoice}
                  option={option}
                />
              );
            })}
            <Button className="mt-2" onClick={handleNext} disabled={isChecking}>
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

export default MCQuiz;
