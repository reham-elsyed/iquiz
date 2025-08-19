import { Button } from '@/components/ui/button';
import { Arrow } from '@radix-ui/react-dropdown-menu';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { memo } from 'react'
type Props={
    handleNext: () => void;
    handlePrevious: () => void;
  
}
function ControllerButtons({handleNext, handlePrevious}: Props) {
  return (
   <>
    <Button 
    className='bg-transparent border-none text-muted-foreground hover:text-card-foreground hover:bg-card'
    onClick={handlePrevious}>
      <ArrowLeft className='text-primary' />
      Back</Button>
    <Button 
    className='bg-transparent border-none text-muted-foreground hover:text-card-foreground hover:bg-card'
    onClick={handleNext}>
      Next
       <ArrowRight className='text-primary' />
      </Button>
   
   </>
  )
}

export default memo(ControllerButtons)