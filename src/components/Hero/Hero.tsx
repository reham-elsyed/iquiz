import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const Hero = (props: Props) => {
  return (
   <div className='flex flex-col md:flex-row  justify-center gap-5 items-center min-h-screen p-y-16'>
    <Card className='p-1 h-80 w-[100%]  md:w-3/5' >
        <CardHeader className=''>
          <CardTitle className='text-lg md:text-2xl pb-8'> <h1 className='text-lg sm:text-xl md:text-2xl font-bold leading-tight'>
            <span className='hover:-translate-x-2 translate-y-2 duration-75 '>
            IQUIZ </span>
            your AI quiz generator for any Topic</h1>
          </CardTitle>
          <CardDescription className='space-y-6'>
            <p className='text-basic p-y-5  sm:text-md md:text-lg leading-tigh'>Transform Learning with IQUIZ – AI-powered quiz creation and feedback tailored just for you!
              <br/> Create, share, and grow your knowledge effortlessly.</p>
<div className='self-end  inline-flex pt-5'>
<Button variant='outline' size='lg' className='bg-accent text-muted  hover:bg-destructive hover:text-destructive-foreground focus:shadow-ring focus:shadow-md'>
              <Link href="/quiz" >
               Create Quiz
               </Link>
               </Button>
</div>
           
            </CardDescription>
        </CardHeader>
        </Card>
        <div className='rounded-md -order-1 md:order-2  h-80 w-2/3 md:w-2/5  flex justify-center items-center '>
          
    <div className='relative rounded-md h-full w-full aspect-square frame'> <Image 
        src='https://gokxczesysklzepbknzb.supabase.co/storage/v1/object/public/hero-image/hero.jpg' 
        alt="iquiz" fill
        className='z-10 rounded-md'
        />
        <div className='relative inset-0  '></div>
        </div>
       
        </div>
        
   </div>
  )
}

export default Hero