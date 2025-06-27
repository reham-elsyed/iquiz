'use client'
import React, { useEffect, useRef } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import Autoplay from "embla-carousel-autoplay"

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
          delay: 2000,
        }),
      ]}
    className='w-1/2'>
      <CarouselContent>
     { popularGames.map((game,i)=>(
      <CarouselItem key={i}>
  <Card
     className=" bg-primary text-primary-foreground">
<CardTitle>
   { game.text}
</CardTitle>
<CardContent>
    {game.value}
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