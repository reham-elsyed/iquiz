"use client"
import React from 'react'
import { InteractiveGridPattern } from '../ui/interactive-grid-pattern'
import { cn } from '@/lib/utils'

const AnimatedGrid = () => {
    return (
        <div className='absolute inset-0 h-full w-full'>
            <InteractiveGridPattern
                className={cn(
                    "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]"
                )}
                width={20}
                height={20}
                squares={[80, 80]}
                squaresClassName="hover:fill-blue-500"
            />
        </div>
    )
}

export default AnimatedGrid