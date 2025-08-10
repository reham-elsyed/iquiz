import React from 'react'
import trendingTopic from '@/lib/trendingTopics'
import Slider from '../Slider/Slider'
import { Card } from '../ui/card'

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
      <div className=' w-full'>
        {/* <Slider popularGames={popularGames}/> */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-bold'>Popular Games</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {popularGames.map((game) => (
              <Card key={game.text} className='bg-white p-4 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold'>{game.text}</h3>
                <p className='text-gray-600'>Count: {game.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}


export default PopularGames