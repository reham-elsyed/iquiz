'use client'
import React, { useEffect, useRef } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import ControllerButtons from '../Buttons/ControllerButtons/ControllerButtons'
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

const scrollRef= useRef<HTMLDivElement>(null)
const scroll= (direction:"left"| "right")=>{
   const container= scrollRef.current
   if (!container) return

   const scrollAmount =300
   container.scrollBy({
      left: direction === "left" ? -scrollAmount: scrollAmount,
      behavior:"smooth",
   })
}
//  useEffect(() => {
//     const interval = setInterval(() => {
//       scroll("right")
//     }, 1000) // scroll every 4 seconds

//     return () => clearInterval(interval) // clean up
//   }, [])

    const next=()=>{
scroll("right")
    }
        const previous=()=>{
scroll("left")
    }
  return (
   <>
    <div
      className=''>
    <Carousel>
      <CarouselContent>
     { popularGames.map((game,i)=>(
      <CarouselItem key={i}>
  <Card
     className="snap-start  min-w-[clamp(250px,30vw,350px)] bg-primary text-primary-foreground">
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
 <CarouselPrevious />
  <CarouselNext />
</CarouselContent>
</Carousel>
   </div >
 

   </>
  )
}

export default Slider