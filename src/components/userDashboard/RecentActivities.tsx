import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

type Props = {}

const RecentActivities = (props: Props) => {
  return (
    <Card className='col-span-3'>
        <CardHeader>
        <CardTitle >  Recent Activities</CardTitle>
        <CardDescription>
            you played seven games
        </CardDescription>
        </CardHeader>
        <CardContent className='max-h-[580px] overflow-scroll'>
history component goes here
        </CardContent>

    </Card>
  )
}

export default RecentActivities