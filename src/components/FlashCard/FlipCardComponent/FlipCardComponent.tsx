"use client";
import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Button } from "../../ui/button";
import { Game, Question } from "@prisma/client";
import useLocalStorage from "@/hooks/useLocalStorage";
import axios from "axios";
import { flashcardFeedbackinterface, studySessionInterface } from "@/types/feedbackFlashcardTypes";
import { calculateDurationOfFlashCardStudy, durationOfQuiz } from "@/lib/utils";
import EndOfQuizModal from "@/components/EndOfQuizModal/EndOfQuizModal";
import { StudySessionSidebar } from "../StudySessionSidebar/StudySessionSidebar";
import ControllerButtons from "@/components/Buttons/ControllerButtons/ControllerButtons";
type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] };
};

const FlipCardComponent = ({ game }: Props) => {
  const [isEasy,setIsEasy]  = useState<boolean>(false);
  const [flip, setFlip] = useState(false);
  const [studySession, setStudySession, removeStudySession] = useLocalStorage<studySessionInterface | null>({key: "studySessionId", value: null});
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
    useEffect(() => {
      if (!isOver) {
        const interval = setInterval(() => setNow(new Date()), 3000);
        return () => clearInterval(interval);
      }
    }, [isOver]);
    const testTimer = durationOfQuiz(now, TimeStarted)
  interface ReducerAction {
    type: "EASY" | "MEDIUM" | "HARD";
    payload?: Pick<Question, "id" | "question" | "answer"> | Pick<Question, "id" | "question" | "answer">[];
  }

  type ReducerState = Pick<Question, "id" | "question" | "answer">[];
  useEffect(() => {
    if (studySession && typeof studySession === "object" && "id" in studySession || isOver) return; // Prevent multiple calls if already set
    const createStudySession = async () => {
      const response = await axios.post('/api/studySessionCreation', {
        userId: game.userId, // or get user from server session
      });
    setStudySession(response.data.response);
      console.log("______________________response_____________________", response.data.response.id)
    };
 
    createStudySession();
  }, [studySession, game.id,isOver]);

  //const studySessionData = useMemo(() => findStudySession(studySession?.id as string, game.userId as string), [studySessionId, game.userId])
     const duration = durationOfQuiz(new Date(),studySession?.createdAt as Date);


async function saveFeedbackFlashCardEasy(payload:flashcardFeedbackinterface) {
  return await axios.post('/api/flashCardFeedback', JSON.stringify(payload));
}
  const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
    switch (action.type) {
      case "EASY":
   if (action.payload && !Array.isArray(action.payload)) {
     const newState = state.filter((question, i) => question.id !== (action.payload as Pick<Question, "id" | "question" | "answer">)?.id);
     console.log("done", newState);   
     return newState;
   }
      case "MEDIUM":
          return [...state, action.payload as Pick<Question, "id" | "question" | "answer">];
      case "HARD":
        return [...state, action.payload as Pick<Question, "id" | "question" | "answer">];
      default:
        return state;
    }
  };

  const [questions, dispatch] = useReducer(reducer, game.questions);


async function handleDispatch(action: ReducerAction) {
  console.log('time started', TimeStarted)
  console.log('now', now)
  const endTime = new Date();
  console.log(calculateDurationOfFlashCardStudy(endTime, TimeStarted as Date))
  const time = (calculateDurationOfFlashCardStudy(endTime, TimeStarted as Date))
  const index = storedValue;
   const  payload={
    questionId: game.questions[index].id,
    feedback: action.type,
    timeSpent: time,
    sessionId:studySession?.id as string,
  }
 const response = await saveFeedbackFlashCardEasy(payload)
 if(response.status === 200) {
  console.log("response", response)
 dispatch(action);
  if (action.type === "EASY") {
    setIsEasy(true);
  } else {
    setIsEasy(false);
  }
  console.log("action", action);
 }

}

  function flipCard() {
    setFlip((prev) => !prev);
  }
  useEffect(() => {
    if (isEasy && questions.length > 0)
      {
      
        setTimeStarted(new Date());
        setFlip(false);
    }
    if (isOver) {
      removeValue();
      removeTimeStarted();
removeStudySession();
    }
  }, [isOver, isEasy]);

  const handleNext= useCallback(()=> {
     if( questions.length === 0 || storedValue >= questions.length - 1) {
        setIsOver(true);
        return
      } 
    setStoredValue((prevValue: number) => {return prevValue + 1;} );
setTimeStarted(new Date());  
    setFlip(false);
  }, [questions.length, storedValue, isOver, removeStudySession, removeValue, removeTimeStarted]);
 
  const handlePrevious= useCallback(()=>{
    if( questions.length === 0 || storedValue <= 0) {
        
        return
      } 
    setStoredValue((prevValue: number) => {return prevValue - 1;} );
    setTimeStarted(new Date());
    setFlip(false);
  },[questions.length, storedValue, removeStudySession, removeValue, removeTimeStarted]);
  return (
    <div className="flex flex-col lg:flex-row justify-center  items-center  gap-8  h-full">
     
    {isOver? <EndOfQuizModal removeIsOver={removeIsOver}  duration={duration} gameId={studySession?.id as string}/>:
    <>
    <div className="lg:w-1/3 ">
      <StudySessionSidebar  startOfStudySession={studySession?.createdAt as Date}/>
     </div>
       <div className="card-container lg:w-1/2 flex justify-center items-center"> 
         <div className={`card ${flip ? "flip":''}`} >
        {game && questions && questions.length > 0 ? (
          <>
            <div
              className={` duration-300 bg-accent card-front  card-face hover:bg-accent/10`}
            >
              {questions[storedValue]?.question}
            </div>
            <div
              className={` card-face card-back hover:bg-destructive/10 `}
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
          <Button 
          onClick={() => handleDispatch({ type: "EASY" , payload:questions[storedValue]})}>
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
        {/* Navigation Buttons */}
        <div className="flex justify-center gap-8">
          <Button className="hover-effect" onClick={flipCard}>Flip</Button>
         <ControllerButtons
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
