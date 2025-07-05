'use client'
import React, { useEffect, useState } from 'react'
import ChartComponent from "../ChartComponent/ChartComponent"
import axios from 'axios'
const GamesDurationGraph =() => {
  const [gamesDuration, setGamesDuration] = useState([])

  useEffect(() => {
    axios.get("/api/gameDuration?limit=5").then(res => {
      setGamesDuration(res.data.gamesDuration)
    })
  }, [])
      if (!gamesDuration){
        return (
            <div className='h-56 bg-slate-400 w-full'></div>
        )
    }
  return (
   <ChartComponent gamesDuration={gamesDuration}/>
  )
}

export default GamesDurationGraph