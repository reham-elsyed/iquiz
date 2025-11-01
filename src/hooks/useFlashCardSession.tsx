import React, { useCallback, useEffect, useReducer, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import { Game, Question } from '@prisma/client';
import axios from 'axios';
import { toast } from './use-toast';
import { flashcardFeedbackinterface, studySessionInterface } from '@/types/feedbackFlashcardTypes';
import { calculateDurationOfFlashCardStudy, setEndOfQuizTime } from '@/lib/utils';
import { useRouter } from 'next/navigation';

//Type Definitions 

type QuestionWithFeedback = Pick<Question, "id" | "question" | "answer" | "questionType"> & {
    feedback?: string | null;
    timeSpent?: number | null;
};

interface ReducerAction {
    type: "EASY" | "MEDIUM" | "HARD" | "INIT";
    payload?: QuestionWithFeedback | QuestionWithFeedback[];
}

type ReducerState = QuestionWithFeedback[];

type useFlashCardSessionProps = {
    game: Game & { questions: Pick<Question, "id" | "question" | "answer" | 'questionType'>[] };
    studySession: studySessionInterface
}

const useFlashCardSession = ({ game, studySession }: useFlashCardSessionProps) => {
    const router = useRouter();

    // --- State & Reducers ---
    const [isEasy, setIsEasy] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [flip, setFlip] = useState(false);
    const [isOver, setIsOver] = useState(false);

    // NEW: Separate state for fetched feedback data
    const [feedbackData, setFeedbackData] = useState<QuestionWithFeedback[]>([]);

    const [storedValue, setStoredValue, removeValue] = useLocalStorage({
        key: "currentIndex",
        value: 0,
    });

    const [timeStarted, setTimeStarted, removeTimeStarted] = useLocalStorage({
        key: "timeStarted",
        value: new Date(),
    });

    const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
        // Reducer is simplified since it's only used for questions array initialization
        switch (action.type) {
            case "INIT":
                // Using game.questions for initialization, which is passed from props
                return game.questions as ReducerState;
            case "EASY":
            case "MEDIUM":
            case "HARD":
                // As requested: do NOT modify state in feedback actions, only return current state.
                return state;
            default:
                return state;
        }
    };
    const [questions, dispatch] = useReducer(reducer, game.questions);

    // --- Core Feedback Logic ---

    // 1. Function to fetch and update feedback data
    const refreshFeedback = useCallback(async () => {
        if (!studySession?.id) return;

        try {
            const res = await axios.get(`/api/studySession/${studySession.id}/feedback`);
            const questionsWithFeedback = res.data;
            console.log("Fetched questions with feedback:", questionsWithFeedback);
            // ✅ Update the separate feedback state
            setFeedbackData(questionsWithFeedback);
        } catch (err) {
            console.error("Failed to load feedback:", err);
        }
    }, [studySession?.id]);

    // 2. useEffect to fetch initial feedback data on mount
    useEffect(() => {
        // Fetch feedback data when the session ID is available (on initial load)
        refreshFeedback();
    }, [refreshFeedback]); // Dependency on the memoized function

    // --- API Functions ---

    async function saveFeedbackFlashCard(payload: flashcardFeedbackinterface) {
        return await axios.post('/api/flashCardFeedback', JSON.stringify(payload));
    }

    // --- Handlers ---

    async function handleDispatch(action: ReducerAction) {
        // 1. Calculate time and prepare payload
        const endTime = new Date();
        const time = calculateDurationOfFlashCardStudy(endTime, timeStarted as Date);
        const index = storedValue;

        // Safety check
        if (index < 0 || index >= game.questions.length) {
            console.error("Invalid question index:", index);
            return;
        }

        const payload = {
            questionId: game.questions[index].id,
            feedback: action.type,
            timeSpent: time,
            sessionId: studySession?.id as string,
        };

        // 2. Save feedback
        const response = await saveFeedbackFlashCard(payload);

        // 3. If successful, update the state and refetch feedback
        if (response.status === 200) {
            // Dispatch to reducer (which only returns current state, as requested)
            dispatch(action);
            // ⭐️ Call function to refetch and update feedbackData state
            await refreshFeedback();
            // Move to the next card automatically after giving feedback
            handleNext();
        }
    }

    // ... (handleNext, handlePrevious, flipCard, finishStudy remain the same) ...
    // Note: I'm keeping the original handleNext/handlePrevious logic but slightly cleaned up for correctness.

    const handleNext = useCallback(() => {
        // The last question is at index questions.length - 1
        if (questions.length === 0 || storedValue >= questions.length - 1) {
            setIsDisabled(true);
            return finishStudy(studySession?.id as string); // Removed isOver as it's set inside finishStudy
        }
        setIsDisabled(false);
        setStoredValue((prevValue: number) => prevValue + 1);
        setTimeStarted(new Date());
        setFlip(false);
    }, [questions.length, storedValue, studySession?.id]); // Added studySession?.id as finishStudy dependency

    const handlePrevious = useCallback(() => {
        if (questions.length === 0 || storedValue <= 0) {
            return toast({
                title: "No previous card",
                variant: "destructive"
            });
        }
        setIsDisabled(false);
        setStoredValue((prevValue: number) => prevValue - 1);
        setTimeStarted(new Date());
        setFlip(false);
    }, [questions.length, storedValue]);

    function flipCard() {
        setFlip((prev) => !prev);
    }

    // Kept original useEffect but removed 'isEasy' dependency usage since 'isEasy' is not updated here
    useEffect(() => {
        if (questions.length > 0) {
            setTimeStarted(new Date());
            setFlip(false);
        }
    }, [storedValue]); // Rerun whenever card index changes

    // Simplified finishStudy signature
    const finishStudy = async (studySessionid: string) => {
        try {
            const finished = await axios.post(
                "/api/finishSession",
                { sessionId: studySessionid },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (finished.data.success) {
                setIsOver(true);
                // Call setEndOfQuizTime to mark the end time
                const endTimeUpdate = await setEndOfQuizTime(game.id);

                // Check for success and clean up
                if ((endTimeUpdate as { status?: number }).status === 200) {
                    removeValue();
                    removeTimeStarted();
                    toast({ title: "You can see study session analytics now! ", variant: "success" });
                    router.push(`/flash-card-stats/${game.id}`);
                }
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 422) {
                    const { message } = err.response.data;
                    setIsOver(false);
                    return toast({
                        title: message ?? "Please provide feedback to all questions",
                        variant: "destructive",
                    });
                }
            }
            return toast({ title: `Something went wrong: ${err}`, variant: "destructive" });
        }
    }

    return (
        {
            isDisabled,
            storedValue,
            handleDispatch,
            setIsEasy,
            isEasy,
            questions, // Initial questions list
            feedbackData, // ⭐️ NEW: Separate state for displaying feedback
            setStoredValue,
            removeValue,
            isOver,
            setIsOver,
            timeStarted,
            setTimeStarted,
            removeTimeStarted,
            handleNext,
            handlePrevious,
            flip,
            setFlip,
            flipCard
        }
    );
}

export default useFlashCardSession;