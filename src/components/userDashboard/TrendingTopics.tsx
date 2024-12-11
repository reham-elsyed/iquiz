import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
const TrendingTopics= () => {
  return (
    <Card className='col-span-4'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Trending Topics</CardTitle>
        <CardDescription>
          Click on a topic to start a quiz on it!
        </CardDescription>
        </CardHeader>
        <CardContent className='pl-2'>
          word cloud
        </CardContent>
    </Card>  )
}

export default TrendingTopics
