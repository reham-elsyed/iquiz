import React from 'react'
import { Card } from '../ui/card'
import { CheckCircle2, XCircle } from 'lucide-react'

type Props = {
    correctAnswers: number;
    wrongAnswers:number;

}

const Counter = ({correctAnswers, wrongAnswers}: Props) => {
  return (
   <Card className='flex flex-row items-center justify-center'>
    <CheckCircle2 color='green' size={30}/>
    <span className='mx-2 text-2xl text-[green] '>3</span>
    {/* <Separator orientation='vertical'/> */}
    <span className='mx-2 text-2xl text-[red] '>3</span>
    <XCircle color="red" size={30}/>
   </Card>
  )
}

export default Counter