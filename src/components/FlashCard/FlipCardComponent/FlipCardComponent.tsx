"use client";
import React, { useEffect, useReducer, useState } from "react";
import { Button } from "../../ui/button";
import { Game, Question } from "@prisma/client";
import useLocalStorage from "@/hooks/useLocalStorage";
import saveFeedbackFlashCard from "@/lib/saveFeedbackFlashCard";
import axios from "axios";
import { flashcardFeedbackinterface } from "@/types/feedbackFlashcardTypes";
import { getAuthSession } from "@/lib/nextAuth";
import { durationOfQuiz } from "@/lib/utils";
type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] };
};

const FlipCardComponent = ({ game }: Props) => {
  
  const [flip, setFlip] = useState(false);
  const [studySessionId, setStudySessionId] = useState<string | null>(null);
  const [storedValue, setStoredValue, removeValue] = useLocalStorage({
    key: "currentIndex",
    value: 0,
  });
  // time duration of the flashcard
     const [isOver, setIsOver,removeIsOver] = useLocalStorage({
    key: "isOver",
    value: false,});
  const [TimeStarted, setTimeStarted,removeTimeStarted] = useLocalStorage({
    key: "timeStarted",
    value: new Date(),});
  const [now, setNow] = useState<Date>(new Date());
    const duration = durationOfQuiz(now, TimeStarted as Date);
    useEffect(() => {
      if (!isOver) {
        const interval = setInterval(() => setNow(new Date()), 3000);
        return () => clearInterval(interval);
      }
    }, [isOver]);
  interface ReducerAction {
    type: "EASY" | "MEDIUM" | "HARD";
    payload?: Pick<Question, "id" | "question" | "answer"> | Pick<Question, "id" | "question" | "answer">[];
  }

  type ReducerState = Pick<Question, "id" | "question" | "answer">[];
  useEffect(() => {
    const createStudySession = async () => {
      const response = await axios.post('/api/studySessionCreation', {
        userId: game.userId, // or get user from server session
      });
    setStudySessionId(response.data.response.id);
      console.log("______________________response_____________________", response.data.response.id)
    };
 
    createStudySession();
  }, []);


async function saveFeedbackFlashCardEasy(payload:flashcardFeedbackinterface) {
  const respone = await axios.post('/api/flashCardFeedback', JSON.stringify(payload))
}
  const reducer = async(state: ReducerState, action: ReducerAction): ReducerState => {
      const index = storedValue
  console.log("studysession",studySessionId)
  const payload ={
    questionId: game.questions[index].id,
    feedback: action.type,
    timeSpent: Number(durationOfQuiz(now, TimeStarted as Date)),
    sessionId: studySessionId as string,
  }
    switch (action.type) {
      case "EASY":
      
 await saveFeedbackFlashCardEasy(payload)
       // console.log("done", newState);
        return state;
      case "MEDIUM":
  
 await saveFeedbackFlashCardEasy(payload)
        return [...state, action.payload as Pick<Question, "id" | "question" | "answer">];
      case "HARD":
         await saveFeedbackFlashCardEasy(payload)

        return [...state, action.payload as Pick<Question, "id" | "question" | "answer">];
     
      default:
        return state;
    }
  };
  const [questions, dispatch] = useReducer(reducer, game.questions);

  function flipCard() {
    setFlip((prev) => !prev);
  }
  function handleNext() {
     if( questions.length === 0 || storedValue >= questions.length - 1) {
        removeValue();
        
        removeTimeStarted();
        setIsOver(true);
        return
      } 
    setStoredValue((prevValue: number) => {
      if (prevValue < questions.length - 1) {
        return prevValue + 1;
      } else {
        return 0;
      }});
setTimeStarted(new Date());
     
    
    setFlip(false);
  }
  return (
    <div className="flex flex-col lg:flex-row justify-center  items-center mt-16 gap-8 lg:p-16 h-full">
      <div className=" card lg:w-1/2">
        {game && questions && questions.length > 0 ? (
          <>
            {" "}
            <div
              className={` duration-300 ${flip ? "flip" : "flip-back"} bg-accent  card-face`}
            >
              {" "}
              {questions[storedValue]?.question}
            </div>
            <div
              className={` card-face  backface ${flip ? "flip-back" : "flip"} `}
            >
              {questions[storedValue]?.answer}
            </div>
          </>
        ) : (
          <div className="card-face">you are done</div>
        )}
      </div>

      <div className="lg:w-1/2 flex flex-col gap-6 p-4">
        {/* Response Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button onClick={() => dispatch({ type: "EASY" })}>Easy</Button>
          <Button
            onClick={() =>
              dispatch({ type: "MEDIUM", payload: questions[storedValue] })
            }
          >
           Medium
          </Button>
          <Button
            onClick={() =>
              dispatch({ type: "HARD", payload: questions[storedValue] })
            }
          >
            Hard
          </Button>
         
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-8">
          <Button onClick={flipCard}>Flip</Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default FlipCardComponent;
