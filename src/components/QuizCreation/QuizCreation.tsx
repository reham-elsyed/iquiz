'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useForm } from 'react-hook-form';
import { quizCreationSchema } from '@/app/schemas/formSchema/quizSchema';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { FormFieldsType } from '@/types/formTypes';
import { Button } from '../ui/button';
import { BookOpen, CopyCheck } from 'lucide-react';
import {useMutation} from '@tanstack/react-query'
import axios from 'axios';
import { useRouter } from 'next/navigation';
type Props = {}
type Input = z.infer<typeof quizCreationSchema>
const formFields: FormFieldsType= [{name:'amount',desc:"add number of questions min: 3 max: 10",type:"number"},{name:'topic',desc:"add your quiz topic ",type:"text"},{name:'type',desc:"add type of questions(currently 2 types available) ",type:"text"}];

const QuizCreation = (props: Props) => {
  const router = useRouter()
const {mutate:getQuestions, isPending}= useMutation({
  mutationFn: async({amount, topic, type}: Input)=>{
    const response = await axios.post('/api/game',
      {amount,
        topic,
        type,
      }
    );
    return response.data
  }
})
    const form = useForm<Input>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            amount:3,
            topic:'',
            type:"open_ended",
        }
    })
const onSubmit = (input:Input)=>{
getQuestions({
  amount: input.amount,
  topic:input.topic,
  type: input.type,
},{
  onSuccess:({gameId})=>{
    console.log(gameId, "gameId")
    if (form.getValues('type')=== "open_ended"){
      router.push(`/play/open_ended/${gameId}`)
    }
    else{
      router.push(`/play/mcq/${gameId}`)
    }

  }
})
}
form.watch()
  return (
    <div className=" ">

        <Card>
            <CardHeader>
                <CardTitle className='text-2xl font-bold'>Quiz</CardTitle>
                <CardDescription>choose a topic</CardDescription>
                <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}>
  {formFields.map((info, i)=>(
    info.name === 'type'?(
      <div key={i} className="flex justify-between order2">
      <Button
      type='button'
      onClick={()=>{
        form.setValue("type", 'mcq')}}
      variant={form.getValues('type')=== "mcq"?"default":"secondary"}
      className='w-1/2 rounded-none rounded-l-lg'
      >
        <CopyCheck className='w-4 h-4 mr-2'/> mcq
      </Button>
      <Button
      type='button'
      onClick={
        ()=>{form.setValue("type", 'open_ended')}}
      variant={form.getValues('type')=== "open_ended"?"default":"secondary"}
      className='w-1/2 rounded-none rounded-r-lg'
      >
      <BookOpen className='w-4 h-4 mr-2'/> open ended
      </Button>
    </div>
    ):
  <FormField
  key={i}
  control={form.control}
  name={info.name}
  render={({field}) => (
    <FormItem>
      <FormLabel >{info.name}</FormLabel>
      <FormControl>
       <Input placeholder={info.name} 
        {...field}
        type={info.type}
       min={info.name ==="amount"? 3:0}
       onChange={info.name ==="amount"?(e)=>{
        form.setValue("amount", parseInt(e.target.value))
       }: field.onChange}
       />
      </FormControl>
      <FormDescription >{info.desc}</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
  ))}
 
<Button type="submit">Submit</Button>
  </form>
</Form>

                </CardContent>
            </CardHeader>
        </Card>
    </div>
  )
}

export default QuizCreation