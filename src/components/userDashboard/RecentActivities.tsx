import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import HistoryComponent from '../HistoryComponent/HistoryComponent'
import { getAuthSession } from '@/lib/nextAuth'
import prisma from '@/lib/db'

type Props = {}

const RecentActivities =async (props: Props) => {
  const session= await getAuthSession();
     const gamesCount = await prisma.game.count({
      where: {
        userId: session?.user.id
      }
     })
  return (
    <Card className='col-span-3'>
        <CardHeader>
        <CardTitle >  Recent Activities</CardTitle>
        <CardDescription>
            you played {gamesCount} {gamesCount > 1 ?'games':'game'}
        </CardDescription>
        </CardHeader>
        <CardContent className='max-h-[580px] overflow-scroll'>
<HistoryComponent limit={50} userId={session?.user.id as string}/>
        </CardContent>

    </Card>
  )
}

export default RecentActivities