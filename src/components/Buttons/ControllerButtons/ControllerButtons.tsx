import { Button } from '@/components/ui/button';
import React, { memo } from 'react'
type Props={
    handleNext: () => void;
    handlePrevious: () => void;
  
}
function ControllerButtons({handleNext, handlePrevious}: Props) {
  return (
   <>
    <Button onClick={handleNext}>Next</Button>
            <Button onClick={handlePrevious}>Next</Button>
   </>
  )
}

export default memo(ControllerButtons)