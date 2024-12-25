'use client'

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import D3WordCloud from 'react-d3-cloud';
type Props = {
    formattedTopics:{
        text: string;
        value:number;
    }[] 
}

const fontSizeMapp= (word:{value: number})=>{
    return Math.log2(word.value) * 5 +16
}
const CustomWordCloud = ({formattedTopics}: Props) => {
    const theme = useTheme();
   const router=useRouter()
    
  return (
    <>
    <D3WordCloud
    height={400}
    font='Times'
    data={formattedTopics}
    fontSize={fontSizeMapp}
    rotate={0}
    padding={10}
    onWordClick={(event, word)=>{
        router.push(`/quiz?topic=${word.text}`)

    }}
    fill={theme.theme == 'dark'? 'white': 'dark'}
    ></D3WordCloud>
    </>
  )
}

export default CustomWordCloud