"use client";
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { Game, Question } from "@prisma/client";
import useLocalStorage from "@/hooks/useLocalStorage";
import axios from "axios";
import { flashcardFeedbackinterface, studySessionInterface } from "@/types/feedbackFlashcardTypes";
import { calculateDurationOfFlashCardStudy, durationOfQuiz } from "@/lib/utils";
import EndOfQuizModal from "@/components/EndOfQuizModal/EndOfQuizModal";
import { StudySessionSidebar } from "../StudySessionSidebar/StudySessionSidebar";
import ControllerButtons from "@/components/Buttons/ControllerButtons/ControllerButtons";
import useEventListener from "@/hooks/useEventListener";
import handleUnload from "@/lib/handleUnload";
import createStudySession from "@/lib/createStudySession";
import { findStudySession } from "@/lib/findStudySession";
type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer"| 'questionType'>[] };
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
  const [timeStarted, setTimeStarted,removeTimeStarted] = useLocalStorage({
    key: "timeStarted",
    value: new Date(),});
 useEffect(()=>{
    const studySessionData=async ()=>{
    const data=  await findStudySession(game.id, game.userId)
    setStudySession(data)
    }
 studySessionData()
 
  },[])

  interface ReducerAction {
    type: "EASY" | "MEDIUM" | "HARD";
    payload?: Pick<Question, "id" | "question" | "answer"> | Pick<Question, "id" | "question" | "answer">[];
  }

  type ReducerState = Pick<Question, "id" | "question" | "answer">[];


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
          return state;
      case "HARD":
        return state;
      default:
        return state;
    }
  };

  const [questions, dispatch] = useReducer(reducer, game.questions);


async function handleDispatch(action: ReducerAction) {
  console.log('time started', timeStarted)
  const endTime = new Date();
  const time = (calculateDurationOfFlashCardStudy(endTime, timeStarted as Date))
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
  const finishStudy = async(studySessionid:string, isOver:boolean)=>{
     await handleUnload(studySessionid as string, isOver)
  }
  useEffect(() => {
    if (isEasy && questions.length > 0)
      {
      
        setTimeStarted(new Date());
        setFlip(false);
    }
    if (isOver) {
     finishStudy(studySession?.id as string, isOver)
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
     
    {isOver? <EndOfQuizModal removeIsOver={removeIsOver}  duration={duration} timeStarted={studySession?.createdAt} gameId={game?.id as string} type={game.gameType}/>:
    <>
    <div className="lg:w-1/3 ">
      <StudySessionSidebar  startOfStudySession={studySession?.createdAt as Date} numberOfCards={game.questions.length} progressValue={+storedValue+1}/>
     </div>
       <div className="card-container lg:w-1/2 flex flex-col justify-center items-center gap-5"> 
         <div className={`card ${flip ? "flip":''}`} >
        {game && questions && questions.length > 0 ? (
          <>
            <div
              className={` duration-300 bg-card card-front  card-face hover:bg-accent/10 transition-colors text-card-foreground`}
            >
              {questions[storedValue]?.question}
            </div>
            <div
              className={` card-face card-back transition-colors duration-200 bg-card text-card-foreground hover:bg-secondary/10 `}
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
      </div>
       </div>
    </>}
    </div>
  );
};

export default FlipCardComponent;
