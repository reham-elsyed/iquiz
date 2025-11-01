// File: src/components/FlashCard/FlashcardFormLogic.tsx

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizCreationSchema } from "@/app/schemas/formSchema/quizSchema"; // Corrected path assumption
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import UnifiedMultiStepFormUI from "../Forms/MultiStepFormUI"; // Import the unified UI component
import { FormFieldsDataType } from "@/types/formTypes"; // Ensure this type exists

// 1. Define Form Fields for Flashcard
const formFields: FormFieldsDataType = [
    {
        id: 1,
        name: "amount",
        label: "Number of Cards",
        desc: "Choose between 3 and 10 flashcards.",
        type: "number",
        placeholder: "3",
    },
    {
        id: 2,
        name: "topic",
        label: "Flash Card Topic",
        desc: "Enter the topic you want flashcards about (e.g., 'Historical Rulers').",
        type: "text",
        placeholder: "e.g., Greek Mythology"
    },
];
export type InputValue = z.infer<typeof quizCreationSchema>;

export default function CreateFlashcardForm() {
    const [step, setStep] = useState(0);
    const router = useRouter();

    const form = useForm<InputValue>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            amount: 3,
            topic: "",
            type: "flash_card", // Specific to this form
        },
    });

    // Navigation Handlers
    const handleNext = () => {
        // Optional: Add form validation check here before advancing
        if (step < formFields.length - 1) setStep((prev) => prev + 1);
    };
    const handleBack = () => {
        if (step > 0) setStep((prev) => prev - 1);
    };

    // API Mutation
    const {
        mutate: createFlashCards,
        isPending,
        isError,
        isSuccess,
    } = useMutation({
        mutationFn: async (input: InputValue) => {
            const response = await axios.post("/api/game", input);
            if (response.status !== 200) {
                throw new Error(response.data.error || "Failed to create flashcards");
            }
            return response.data;
        },
        onSuccess: ({ gameId }) => {
            router.push(`/play/flash_card/${gameId}`);
        },
    });

    const onSubmit = (input: InputValue) => {
        createFlashCards(input);
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
            formTitle="Flashcard Deck"
            formDescription="Fill in the details to generate your custom study set."
        />
    );
}