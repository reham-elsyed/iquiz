import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'

type Props = {}

const SectionComponent = (props: Props) => {
  return (
<Card className='flex flex-col md:flex-row '>
    <CardHeader className='w-full md:flex-1/2'>
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
    </CardHeader>
    <CardContent  className='w-full md:flex-1/2'>
    <Image src='' alt='quiz image'/>
    </CardContent>
</Card>
  )
}

export default SectionComponent