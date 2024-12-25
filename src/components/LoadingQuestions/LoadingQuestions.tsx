'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Progress } from '../ui/progress'

type Props = {}

const LoadingQuestions = (props: Props) => {
    const [progress, setProgress]= useState(0)
    useEffect(() => {
        let animationFrame: number;
      
        const updateProgress = () => {
          setProgress((prev) => {
            if (prev >= 100) return prev;
            return prev + .02;
          });
          animationFrame = requestAnimationFrame(updateProgress);
        };
      
        updateProgress();
      
        return () => cancelAnimationFrame(animationFrame);
      }, []);
      
  return (
    <div className='modal-container max-w-[60vw] lg:max-w[70vw]'>
        <Image
        src='/Notebook.gif'
        width={400}
        height={400}
        alt='loading animation'/>
<Progress value={progress} className='w-full mt-4'></Progress>
    </div>
  )
}

export default LoadingQuestions

