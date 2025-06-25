import React from 'react'
import trendingTopic from '@/lib/trendingTopics'
import Slider from '../Slider/Slider'

const PopularGames =async() => {
    const popularGames = await trendingTopic()
  return (
   <>
 <div className=' w-full'>
     <Slider popularGames={popularGames}/>
 </div>
   </>
  )
}


export default PopularGames