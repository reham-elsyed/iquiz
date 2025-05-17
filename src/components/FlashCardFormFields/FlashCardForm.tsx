"use client"

import React, { useState } from 'react'
import {Form, FormProvider, useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quizCreationSchema } from '../../app/schemas/formSchema/quizSchema';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { flashcardFormFieldProps } from '@/types/formTypes';
import FlashCardFormFieldOne from '@/components/FlashCardFormFields/FlashCardFormFieldOne';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const formFields: flashcardFormFieldProps= [
  {
    id:1,
    name: "amount",
    desc: "add number of questions min: 3 max: 10",
    type: "number",
  },
  { id:2,name: "topic", desc: "add your Flash Card topic ", type: "text" },
  
];
export type InputValue = z.infer<typeof quizCreationSchema>;


export default  function CreateFlashcardForm(){
console.log("create flashcard")             
const [step, setStep] = useState(0)
const[disabled, setDisabled]=useState(false)
const router = useRouter()
//next button
const handleNext = () =>{
  if (step <formFields.length - 1) setStep((prev)=> prev + 1);
}
//back button
const handleBack = ()=>{
  if (step > 0) setStep((prev)=> prev - 1);
}
    const form = useForm<InputValue>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            amount: 3,
            topic: "database",
            type: "flash_card",
        },
    })
    //api call to create flashcard end point to create flashcards and store in db and return game id
  const {mutate: createFlashCards,
     isPending,
      isSuccess
    }= useMutation({
    mutationFn: async ({ amount, topic, type }: InputValue)=>{
      const response = await axios.post("/api/game",{ amount, topic, type })
      console.log("response from create flashcard", response.data)
      if (response.status !== 200) {
        throw new Error("Error creating flashcards")
      }
      return response.data
    },
  })
 
    const   onSubmit = async (input: InputValue) => {
    console.log("input", input)
    setDisabled(true)
    try{
    createFlashCards({
      amount: input.amount,
      topic: input.topic,
      type: input.type,
    },
       {onSuccess:({gameId})=>{
        console.log("gameId", gameId)
router.push(`/play/flash_card/${gameId}`)
   
       }})}catch(error){
        console.log(error)
       }finally{
setDisabled(false)
       }
   
  }
 
  return (
    <div className="h-full flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-auto ">
            <CardHeader className="text-center">
                <CardTitle>Create Flashcard</CardTitle>
                <CardDescription>Make your own flashcards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <FlashCardFormFieldOne key={formFields[step].name} fieldData={formFields[step]} form={form} />
                 <div className="flex justify-between">
  {step > 0 && <Button onClick={handleBack}>Back</Button>}
  {step < formFields.length - 1 ? (
    <Button onClick={handleNext}>Next</Button>
  ) : (
    <>{disabled?<Button disabled={disabled}>...Loading</Button>:<Button disabled={disabled} type="submit">Submit</Button>}</>
  )}
</div>                </form>
                </FormProvider>
            </CardContent>
            </Card>
    </div>
  )
}

