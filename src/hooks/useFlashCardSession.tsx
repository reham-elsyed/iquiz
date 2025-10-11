import React, { useCallback, useEffect, useReducer, useState } from 'react'
import useLocalStorage from './useLocalStorage';
import { Game, Question } from '@prisma/client';
import axios from 'axios';
import { toast, useToast } from './use-toast';
import { flashcardFeedbackinterface, studySessionInterface } from '@/types/feedbackFlashcardTypes';
import { calculateDurationOfFlashCardStudy, durationOfQuiz, setEndOfQuizTime } from '@/lib/utils';
import { redirect } from 'next/navigation';

type useFlashCardSessionProps = {
    game: Game & { questions: Pick<Question, "id" | "question" | "answer" | 'questionType'>[] };
    studySession: studySessionInterface
}
const useFlashCardSession = ({ game, studySession }: useFlashCardSessionProps) => {
    const [isEasy, setIsEasy] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState(false)
    const [flip, setFlip] = useState(false);
    const [storedValue, setStoredValue, removeValue] = useLocalStorage({
        key: "currentIndex",
        value: 0,
    });
    // time duration of the flashcard
    const [isOver, setIsOver] = useState(false)
    const [timeStarted, setTimeStarted, removeTimeStarted] = useLocalStorage({
        key: "timeStarted",
        value: new Date(),
    });
    const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
        switch (action.type) {
            case "EASY":
                return state
            case "MEDIUM":
                return state;
            case "HARD":
                return state;
            default:
                return state;
        }
    };
    const [questions, dispatch] = useReducer(reducer, game.questions);
    async function saveFeedbackFlashCardEasy(payload: flashcardFeedbackinterface) {
        return await axios.post('/api/flashCardFeedback', JSON.stringify(payload));
    }


    async function handleDispatch(action: ReducerAction) {
        console.log('time started', timeStarted)
        const endTime = new Date();
        const time = (calculateDurationOfFlashCardStudy(endTime, timeStarted as Date))
        const index = storedValue;
        const payload = {
            questionId: game.questions[index].id,
            feedback: action.type,
            timeSpent: time,
            sessionId: studySession?.id as string,
        }
        const response = await saveFeedbackFlashCardEasy(payload)
        if (response.status === 200) {
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

    interface ReducerAction {
        type: "EASY" | "MEDIUM" | "HARD";
        payload?: Pick<Question, "id" | "question" | "answer"> | Pick<Question, "id" | "question" | "answer">[];
    }

    type ReducerState = Pick<Question, "id" | "question" | "answer">[];


    const handleNext = useCallback(() => {
        if (questions.length === 0 || storedValue >= questions.length - 1) {
            setIsDisabled(true)
            return finishStudy(studySession?.id as string, isOver)
        }
        setIsDisabled(false)
        setStoredValue((prevValue: number) => { return prevValue + 1; });
        setTimeStarted(new Date());
        setFlip(false);
    }, [questions.length, storedValue, isOver, , removeValue, removeTimeStarted, isDisabled]);

    const handlePrevious = useCallback(() => {
        if (questions.length === 0 || storedValue <= 0) {
            return toast({
                title: "No previuos card",
                variant: "destructive"
            })
        }
        setIsDisabled(false)
        setStoredValue((prevValue: number) => { return prevValue - 1; });
        setTimeStarted(new Date());
        setFlip(false);
    }, [questions.length, storedValue, removeValue, removeTimeStarted]);

    function flipCard() {
        setFlip((prev) => !prev);
    }
    useEffect(() => {
        if (isEasy && questions.length > 0) {
            setTimeStarted(new Date());
            setFlip(false);
        }
    }, [isOver, isEasy, storedValue]);
    const finishStudy = async (studySessionid: string, isOver: boolean) => {
        try {
            const finished = await axios.post(
                "/api/finishSession",
                { sessionId: studySessionid },
                {
                    headers: { "Content-Type": "application/json" },
                }
            )
            if (finished.data.success) {
                console.log(finished.data.success)
                setIsOver(true)
                const endTimeUpdate = await setEndOfQuizTime(game.id);

                if ((endTimeUpdate as { status?: number }).status === 200) {
                    removeValue();
                    removeTimeStarted();
                    toast({ title: "You can see study session analytics now! ", variant: "success" })
                    redirect(`/statistics/flash-card-stats/${game.id}`)
                }
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 422) {
                    const { message } = err.response.data;
                    setIsOver(false)
                    return toast({
                        title: message ?? "Please provide feedback to all questions",
                        variant: "destructive",
                    });
                }
            }
            return toast({ title: `something went wrong ${err}`, variant: "destructive" })
        }
    }
    return (
        { isDisabled, storedValue, handleDispatch, setIsEasy, isEasy, questions, setStoredValue, removeValue, isOver, setIsOver, timeStarted, setTimeStarted, removeTimeStarted, handleNext, handlePrevious, flip, setFlip, flipCard }
    )
}

export default useFlashCardSession