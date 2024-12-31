import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Image from 'next/image'

type Props = {}

const Hero = (props: Props) => {
  return (
   <div className=' min-h-screen'>
    <Card className='flex justify-center items-center' >
        <CardHeader className='w-1/2 ps-5'>
          <CardTitle> <h1><span>IQUIZ</span>your AI quiz generator to master your material </h1>
          </CardTitle>
          <CardDescription>
            <p>IQuiz offer veriety of question types to healp you reach you learning goal</p>

            <Button variant='outline' className='bg-accent text-muted  hover:bg-destructive hover:text-destructive-foreground'> Create Quiz</Button>
            </CardDescription>
        </CardHeader>
        <CardContent className=' rounded-md w-1/2 min-h-full flex justify-center items-center relative'>
          
    <div className='p-5 rounded-md h-80 w-80 relative aspect-square frame'> <Image 
        src='https://gokxczesysklzepbknzb.supabase.co/storage/v1/object/public/hero-image/hero.jpg' 
        alt="iquiz" fill
        className=' rounded-md'
        />
        </div>
       
        </CardContent>
        </Card>
   </div>
  )
}

export default Hero