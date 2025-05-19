import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const Hero = (props: Props) => {
  return (
   <div className=' h-[332px] '>
    <p>Your progress</p>
    <Card className='flex flex-col md:flex-row  justify-center items-center   bg-[#25BFAD]' >
        <CardHeader className=' md:w-2/3 h-full w-[100%] '>
          <CardTitle className='text-lg md:text-2xl pb-8'> <h1 className='text-lg sm:text-xl md:text-xl font-semibold leading-tight text-primary-foreground'>
           
            your AI quiz generator for any Topic</h1>
          </CardTitle>
          <CardDescription className='space-y-6'>
            <p className='text-basic p-y-5  sm:text-md md:text-lg leading-tigh'>Create, share, and grow your knowledge effortlessly.</p>
<div className='self-end  inline-flex pt-5'>
<Button variant='outline' size='lg' className='bg-accent text-muted  hover:bg-destructive hover:text-destructive-foreground focus:shadow-ring focus:shadow-md'>
              <Link href="/quiz" >
               Create Quiz
               </Link>
               </Button>
</div>
           
            </CardDescription>
        </CardHeader>
             <div className='rounded-md hidden  w-2/3 md:w-1/3 md:flex justify-center items-center '>
          
    <div className='rounded-md h-96 w-96 aspect-square relative'> 
      <Image 
        src='https://gokxczesysklzepbknzb.supabase.co/storage/v1/object/public/new-hero//OBJECTS.svg' 
        alt="iquiz" 
        className='z-10 rounded-md w-full h-full absolute -top-2 -left-5 right-0 bottom-0 scale-110 '
        objectFit=''
        width={400}
        height={400}
        
        loading='lazy'
       
        />
      
        </div>
       
        </div>
        </Card>
   
        
   </div>
  )
}

export default Hero