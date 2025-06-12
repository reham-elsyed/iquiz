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
  { id: 2, name: "topic", desc: "add your Flash Card topic ", type: "text" , placeholder: "createflash cards about cats" },
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
       {isError && <div className="flex items-center justify-center text-red-500 ">Error creating flashcards. Please try again.</div>}

    {isPending || isSuccess ? (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-primary" />
      </div>
    ) : (
      <div className="h-full flex items-center justify-center ">
     
      <Card className="w-full md:w-1/2 rounded-none h-full flex flex-col justify-center  max-w-2xl mx-auto relative bg-background border-0 shadow-none"> 
       <div className=""><ProgressBar value={step+1} max={formFields.length} size='sm' className="rounded-none p-5" variant='destructive' /></div>

        <CardHeader className="text-center">
          <CardTitle>Create Flashcard</CardTitle>
          <CardDescription>Make your own flashcards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FlashCardFormFieldOne
                key={formFields[step].name}
                fieldData={formFields[step]}
                form={form}
              />
              <div className="flex justify-between">
                {step > 0 && <Button onClick={handleBack}>Back</Button>}
                {step < formFields.length - 1 ? (
                  <Button onClick={handleNext}>Next</Button>
                ) : (
                  <>
                    {isPending ? (
                      <Button ><Loader/></Button>
                    ) : (
                      <Button disabled={isPending} type="submit">
                        Submit
                      </Button>
                    )}
                  </>
                )}
              </div>{" "}
            </form>
          </FormProvider>
        </CardContent>
      </Card>
      <div className="bg-gray-500 hidden  w-1/2 h-full md:flex flex-col items-center justify-center gap-10 bg-secondary text-secondary-foreground rounded-none">
     {formFields[step].name === "amount" ? (
      <>
       <NumberSvg className="w-1/2 h-1/2 text-secondary-foreground " />
      <p className=" text-2xl font-bold">Pick Number Of Flash Cards</p>
      </>): formFields[step].name === "topic" ? (
        <>
         <BookAIcon className="w-1/2 h-1/2 text-secondary-foreground" />
      <p className=" text-2xl font-bold">Pick Topic Of Flash Cards</p>
        </>) : (
          <>
          <LightbulbIcon/>
          </>
        )}
      </div>
    </div>
    )
      }
 </>)
}
