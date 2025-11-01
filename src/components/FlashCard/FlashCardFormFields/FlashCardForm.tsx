"use client";

import React, { useState } from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizCreationSchema } from "../../../app/schemas/formSchema/quizSchema";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { flashcardFormFieldProps } from "@/types/formTypes";
import FlashCardFormFieldOne from "@/components/FlashCard/FlashCardFormFields/FlashCardFormFieldOne";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BookAIcon, Hash, LightbulbIcon, List, ListCheckIcon, ListOrdered, ListXIcon, Loader } from "lucide-react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import SVGGeneric from "@/components/SVGComponents/SVGComponent";
import { FaSortNumericDown } from "react-icons/fa";
import NumberSvg from "@/components/SVGComponents/NumberSvg";

const formFields: flashcardFormFieldProps = [
  {
    id: 1,
    name: "amount",
    desc: "add number of questions min: 3 max: 10",
    type: "number",
    placeholder: "3",
  },
  { id: 2, name: "topic", desc: "add your Flash Card topic ", type: "text", placeholder: "createflash cards about cats" },
];
export type InputValue = z.infer<typeof quizCreationSchema>;

export default function CreateFlashcardForm() {
  console.log("create flashcard");
  const [step, setStep] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  //next button
  const handleNext = () => {
    if (step < formFields.length - 1) setStep((prev) => prev + 1);
  };
  //back button
  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };
  const form = useForm<InputValue>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      amount: 3,
      topic: "",
      type: "flash_card",
    },
  });
  //api call to create flashcard end point to create flashcards and store in db and return game id
  const {
    mutate: createFlashCards,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ amount, topic, type }: InputValue) => {
      const response = await axios.post("/api/game", { amount, topic, type });
      console.log("response from create flashcard", response.data);
      if (response.status !== 200) {
        console.error("Error creating flashcards:", response);
        throw new Error(response.data.error || "");
      }
      return response.data;
    },
  });

  const onSubmit = (input: InputValue) => {
    try {
      createFlashCards(
        {
          amount: input.amount,
          topic: input.topic,
          type: input.type,
        },
        {
          onSuccess: ({ gameId }) => {
            console.log("gameId", gameId);
            router.push(`/play/flash_card/${gameId}`);
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  form.watch();
  return (
    <>
      {/* 1. Error Message - High contrast and immediately visible */}
      {isError && (
        <div className="absolute top-0 left-0 right-0 p-3 bg-red-600/10 text-red-500 font-medium z-50 text-center border-b border-red-500/30">
          <p>⚠️ Error creating flashcards. Please try again.</p>
        </div>
      )}

      {/* 2. Loading State - Full screen, accessible, and clear */}
      {isPending || isSuccess ? (
        <div className="flex items-center justify-center min-h-screen bg-background/80">
          <div className="flex flex-col items-center gap-4">
            <Loader className="animate-spin h-10 w-10 text-primary" aria-label="Loading" />
            <p className="text-lg text-muted-foreground">Generating your flashcards...</p>
          </div>
        </div>
      ) : (
        /* 3. Main Content Wrapper - Centered and accessible */
        <div className="min-h-screen flex items-center justify-center p-8 bg-background/95">

          {/* Card: Uses a moderate width (max-w-xl) and soft background */}
          <Card className="
          w-full 
          max-w-xl 
          mx-auto 
          shadow-2xl 
          border-border/50 
          bg-card 
          backdrop-blur-sm 
          overflow-hidden 
          rounded-2xl
        ">

            {/* Progress Bar: Spacing = 34px (p-8) - Clear visual hierarchy */}
            <div className="pt-8 px-8 pb-3">
              <ProgressBar
                value={step + 1}
                max={formFields.length}
                size='md' // Increased size for better visual presence
                className="rounded-full"
                variant='destructive'
                aria-label={`Step ${step + 1} of ${formFields.length}`}
              />
            </div>

            {/* Card Header: Spacing = 21px (p-5) - Title and subtitle alignment */}
            <CardHeader className="text-center pb-5 pt-0 px-8">
              <CardTitle className="text-3xl font-extrabold text-foreground">Create Flashcard Deck</CardTitle>
              <CardDescription className="text-base text-muted-foreground mt-2">
                Fill in the details to generate your custom study set.
              </CardDescription>
            </CardHeader>

            {/* Card Content: Spacing = 34px (p-8) for content and 21px (space-y-5) inside form */}
            <CardContent className="px-8 pb-8">
              <FormProvider {...form}>
                {/* Form: Spacing between elements is 21px (space-y-5) */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                  {/* 4. Current Field Display */}
                  <div className="py-5 border-y border-border/70">
                    <FlashCardFormFieldOne
                      key={formFields[step].name}
                      fieldData={formFields[step]}
                      form={form}
                    />
                  </div>

                  {/* 5. Navigation/CTA Area: Spacing = 13px (gap-3) */}
                  <div className="flex justify-between items-center pt-3 gap-3">

                    {/* Back Button: Always left-aligned */}
                    {step > 0 && (
                      <Button
                        onClick={handleBack}
                        type="button"
                        variant="outline"
                        className="min-w-[100px] border-border/80"
                      >
                        ← Back
                      </Button>
                    )}
                    {/* Spacer for alignment */}
                    {step === 0 && <div className="min-w-[100px] invisible">Back</div>}

                    {/* Next/Submit Buttons: Always right-aligned */}
                    {step < formFields.length - 1 ? (
                      <Button
                        onClick={handleNext}
                        type="button"
                        className="min-w-[150px] bg-primary hover:bg-primary/90 transition-colors"
                      >
                        Next Step →
                      </Button>
                    ) : (
                      /* Final Step: Submit Button */
                      <Button
                        disabled={isPending}
                        type="submit"
                        className="min-w-[150px] bg-green-600 hover:bg-green-700 transition-colors"
                      >
                        {isPending ? (
                          <Loader className="animate-spin h-5 w-5 mr-2" />
                        ) : (
                          "Generate Flashcards"
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
