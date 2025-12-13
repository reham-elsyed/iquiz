import React from 'react'
import trendingTopic from '@/lib/trendingTopics'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import { TextAurora } from '../ui/Text-Aurora'
import { TextAtom } from '../TextAtom'
import AutoDirectionText from '../TextDirection/TextDirextion'

const PopularGames = async () => {
  const popularGames = await trendingTopic()
  if (!popularGames || popularGames.length === 0) {
    return (
      <div className='h-56 bg-slate-400 w-full flex items-center justify-center'>
        <TextAtom>popularGames.noGamesFound</TextAtom>
      </div>
    )
  }
  if (popularGames.length > 4) {
    popularGames.length = 4; // Limit to 4 items
  }

  return (
    <>
      <div className=' w-full ' dir="auto">
        <div className='flex flex-col gap-4 p-3'>
          <div className='flex items-center justify-between mb-6'>
            <TextAurora text="popularGames.title" className='' isTranslated={true} />
            <Button variant="outline" size="sm" asChild
              className=''><Link href={"/trending-topics"}><TextAtom>buttons.viewAll</TextAtom></Link></Button>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {popularGames.map((game) => (
              <Card key={game.text} className=' app-card'>
                <div className='app-card-content flex flex-col gap-2 items-start '>
                  <AutoDirectionText as="div" forceDirection='auto' className='text-lg font-semibold text-start flex justify-start w-full items-start' text={game.text} />
                  <TextAtom textClassName='text-card-foreground'>popularGames.count</TextAtom>: {game.value}
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