'use client'
import React from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
//import D3WordCloud from 'react-d3-cloud';
import dynamic from 'next/dynamic';
type Props = {
    formattedTopics:{
        text: string;
        value:number;
    }[] 
}

const fontSizeMapp= (word:{value: number})=>{
    return Math.log2(word.value) * 5 +16
}

// Dynamically import react-d3-cloud, disabling SSR
const D3WordCloud = dynamic(() => import('react-d3-cloud'), { ssr: false });
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