import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Target } from 'lucide-react'

type Props = {
    accuracy: number
}

const AccuracyCard = ({accuracy}: Props) => {
    console.log(accuracy)
    const numAccuracy = Math.round(accuracy * 100 )/ 100
  return (
   <Card className='md:col-span-3'>
    <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
    <CardTitle className=''>
Average Accuracy
</CardTitle>
<Target/>
    </CardHeader>
   <CardContent>
    <div>
{numAccuracy}%
    </div>
   </CardContent>
   </Card>
  )
}

export default AccuracyCard