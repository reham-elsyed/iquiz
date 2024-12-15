'use client'

import { useTheme } from 'next-themes';
import React from 'react';
import D3WordCloud from 'react-d3-cloud';
type Props = {}
const data = 
    [{text:"word",
        value:5,
    },
    {text:"word",
        value:2,
    },
    {text:"word",
        value:10,
    },
    {text:"word",
        value:7,
    },

]
const fontSizeMapp= (word: {value:number})=>{
    return Math.log2(word.value) * 5 +16
}
const CustomWordCloud = (props: Props) => {
    const theme = useTheme();
   
    
  return (
    <>
    <D3WordCloud
    height={400}
    font='Times'
    data={data}
    fontSize={fontSizeMapp}
    rotate={0}
    padding={10}
    fill={theme.theme == 'dark'? 'white': 'dark'}
    ></D3WordCloud>
    </>
  )
}

export default CustomWordCloud