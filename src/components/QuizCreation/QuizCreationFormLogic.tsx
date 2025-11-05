// File: src/components/Quiz/QuizFormLogic.tsx

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizCreationSchema } from "@/app/schemas/formSchema/quizSchema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import UnifiedMultiStepFormUI from "../Forms/MultiStepFormUI"; // Import the unified UI component
import { FormFieldsDataType } from "@/types/formTypes"; // Ensure this type exists

type Props = {
    topicParam: string;
};
export type InputValue = z.infer<typeof quizCreationSchema>;

// 1. Define Form Fields for Quiz (Adding the 'type' selection as a step)
const formFields: FormFieldsDataType = [
    {
        id: 1,
        name: "amount",
        label: "Number of Questions",
        desc: "Choose between 3 and 10 quiz questions.",
        type: "number",
        placeholder: "5",
    },
    {
        id: 2,
        name: "topic",
        label: "Quiz Topic",
        desc: "Enter the subject for your quiz (e.g., 'The Roman Empire').",
        type: "text",
        placeholder: "e.g., Basic Calculus"
    },
    {
        id: 3,
        name: "type",
        label: "Question Type",
        desc: "Choose between Multiple Choice (MCQ) or Open Ended questions.",
        type: "radio_button_group", // A new custom type for your button group
        placeholder: "mcq",
    },
];

export default function QuizCreation({ topicParam }: Props) {
    const [step, setStep] = useState(0);
    const router = useRouter();

    const form = useForm<InputValue>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            amount: 5,
            topic: topicParam, // Initialized from prop

        },
    });

    // Navigation Handlers
    const handleNext = async () => {
        const isLastStep = step === formFields.length - 1;

        // Validate current field only
        const isValid = await form.trigger(formFields[step].name);

        if (!isValid) return; // stop if this field is invalid

        if (isLastStep) {
            // On last step, actually submit the form
            form.handleSubmit(onSubmit)();
        } else {
            // Otherwise, go to the next step
            setStep((prev) => prev + 1);
        }
    };
    const handleBack = () => {
        if (step > 0) setStep((prev) => prev - 1);
    };

    // API Mutation
    const {
        mutate: getQuestions,
        isPending,
        isError,
        isSuccess,
    } = useMutation({
        mutationFn: async (input: InputValue) => {
            const response = await axios.post("/api/game", input);
            return response.data;
        },
        onSuccess: ({ gameId }) => {
            const type = form.getValues("type");
            router.push(`/play/${type === "open_ended" ? "open_ended" : "mcq"}/${gameId}`);
        },
    });

    const onSubmit = (input: InputValue) => {
        getQuestions(input);
    };

    form.watch();

    return (
        <UnifiedMultiStepFormUI
            form={form}
            formFields={formFields}
            step={step}
            handleBack={handleBack}
            handleNext={handleNext}
            onSubmit={form.handleSubmit(onSubmit)}
            isPending={isPending}
            isError={isError}
            isSuccess={isSuccess}
            currentStepName={formFields[step].name}
            formTitle="New Quiz"
            formDescription="Generate custom questions in minutes for focused learning."
        />
    );
}