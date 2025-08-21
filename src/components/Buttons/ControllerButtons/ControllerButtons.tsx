import { Button } from '@/components/ui/button';
import { Arrow } from '@radix-ui/react-dropdown-menu';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { memo } from 'react'
type Props = {
  handleNext: () => void;
  handlePrevious: () => void;
  disableNext?: boolean;
  disableBack?: boolean;
  lastQuestionText?: string;

}
function ControllerButtons({ handleNext, handlePrevious, disableNext, disableBack, lastQuestionText }: Props) {
  return (
    <>
      <Button
        className='bg-transparent border-none text-muted-foreground hover:text-card-foreground hover:bg-card'
        disabled={disableBack}
        onClick={handlePrevious}>
        <ArrowLeft className='text-primary' />
        Back</Button>
      <Button
        className='bg-transparent border-none text-muted-foreground hover:text-card-foreground hover:bg-card'
        disabled={disableNext}
        onClick={handleNext}>
        {disableNext ? lastQuestionText : "Next"}
        <ArrowRight className='text-primary' />
      </Button>

    </>
  )
}

export default memo(ControllerButtons)