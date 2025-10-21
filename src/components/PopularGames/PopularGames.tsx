import React from 'react'
import trendingTopic from '@/lib/trendingTopics'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import { TextAurora } from '../ui/Text-Aurora'

const PopularGames = async () => {
  const popularGames = await trendingTopic()
  if (!popularGames || popularGames.length === 0) {
    return (
      <div className='h-56 bg-slate-400 w-full flex items-center justify-center'>
        No popular games found
      </div>
    )
  }
  if (popularGames.length > 4) {
    popularGames.length = 4; // Limit to 10 items
  }

  return (
    <>
      <div className=' w-full '>
        <div className='flex flex-col gap-4 p-3'>
          <div className='flex items-center justify-between mb-6'>
            {/* <h2 className='text-2xl font-bold'>Popular Games</h2> */}
            <TextAurora text="Popular Game" className='text-2xl' />
            <Button variant="outline" size="sm"
              className=''><Link href={"/trending-topics"}>View All</Link></Button>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {popularGames.map((game) => (
              <Card key={game.text} className=' app-card'>
                <div className='app-card-content '>
                  <h3 className='text-lg font-semibold'>{game.text}</h3>
                  <p className='text-card-foreground'>Count: {game.value}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}


export default PopularGames