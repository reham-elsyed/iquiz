'use client'
import React, { useEffect, useRef } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import Autoplay from "embla-carousel-autoplay"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
type Props={
popularGames:{text:string;
value:number}[]
}
const Slider = ({popularGames}:Props) => {

  return (
   <>
    <div
      className='relative flex justify-center items-center'>
    <Carousel 
    plugins={[
        Autoplay({
          delay: 1000,
        }),
      ]}
    className='w-1/2'>
      <CarouselContent>
     { popularGames.map((game,i)=>(
      <CarouselItem className="md:basis-1/2 lg:basis-1/3"
      key={i}>
  <Card
     className="relative bg-primary text-primary-foreground flex flex-col items-center justify-center">
       {game.value >= 5 &&   <Badge variant="destructive" className='absolute top-0 left-0'>TRENDING</Badge>}
<CardTitle className='text-xl md:text-2xl'>
 
   { game.text}
</CardTitle>
<CardContent className=''>
    Number of quizez:<span className='text-xl md:2xl'>{game.value}</span> 
</CardContent>

   </Card>
   </CarouselItem>
   )) 
}
 
</CarouselContent>
<CarouselPrevious />
  <CarouselNext />
</Carousel>
   </div >
 

   </>
  )
}

export default Slider