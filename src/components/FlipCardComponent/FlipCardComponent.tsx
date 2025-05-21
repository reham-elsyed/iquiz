"use client";
import React, { useEffect, useReducer, useState } from "react";
import { Button } from "../ui/button";
import { Game, Question } from "@prisma/client";
import useLocalStorage from "@/hooks/useLocalStorage";
import saveFeedbackFlashCard from "@/lib/saveFeedbackFlashCard";
import axios from "axios";
import { flashcardFeedbackinterface } from "@/types/feedbackFlashcardTypes";
import { getAuthSession } from "@/lib/nextAuth";
type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] };
};

const FlipCardComponent = ({ game }: Props) => {
   // const session = await getAuthSession(); // should work if it uses cookies
  
  //const {question, answer} = await axios.post('/api/game')
  const [flip, setFlip] = useState(false);
  const [studySessionId, setStudySessionId] = useState<string | null>(null);
  const [storedValue, setStoredValue] = useLocalStorage({
    key: "currentIndex",
    value: 0,
  });
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
    switch (action.type) {
      case "EASY":
        const index = storedValue
       // handleNext();
  //       const newState = [
  //   ...state.slice(0, index),
  //   ...state.slice(index + 1)
  // ];
  console.log("studysession",studySessionId)
  const payload ={
    questionId: game.questions[index].id,
    feedback: action.type,
    timeSpent: 0,
    sessionId: studySessionId as string,
  }
 await saveFeedbackFlashCardEasy(payload)
       // console.log("done", newState);
        return state;
      case "MEDIUM":
        return [...state, action.payload as Pick<Question, "id" | "question" | "answer">];
      case "HARD":
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
    setStoredValue((prevValue: number) => {
      if (prevValue < game.questions.length - 1) {
        return prevValue + 1;
      } else {
        return 0;
      }
    });
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
          <Button onClick={() => dispatch({ type: "EASY" })}>EASY</Button>
          <Button
            onClick={() =>
              dispatch({ type: "MEDIUM", payload: questions[storedValue] })
            }
          >
            Not Sure
          </Button>
          <Button
            onClick={() =>
              dispatch({ type: "HARD", payload: questions[storedValue] })
            }
          >
            Still
          </Button>
          <Button
           
          >
            Retry
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
