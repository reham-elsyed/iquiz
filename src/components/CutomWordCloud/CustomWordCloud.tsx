"use client";
import React, { useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import seedrandom from "seedrandom";
//import D3WordCloud from 'react-d3-cloud';
import dynamic from "next/dynamic";
type Props = {
  formattedTopics: {
    text: string;
    value: number;
  }[];
};

const fontSizeMapp = (word: { value: number }) => {
  return Math.log2(word.value) * 5 + 16;
};

// Dynamically import react-d3-cloud, disabling SSR
const D3WordCloud = dynamic(() => import("react-d3-cloud"), { ssr: false });
const CustomWordCloud = ({ formattedTopics }: Props) => {
  const memoizedData = useMemo(() => formattedTopics, [formattedTopics]);

  const theme = useTheme();
  const router = useRouter();
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const random = seedrandom("fixed-seed");
  return (
    <>
      <D3WordCloud
        height={400}
        font="Times"
        data={memoizedData}
        fontSize={fontSizeMapp}
        rotate={0}
        padding={10}
        random={random}
        fill={(word) =>
          word.text === activeWord ? "#ef4444" : theme.theme === "dark" ? "#fff" : "#000"
        }
        onWordMouseOver={(event, word) => {
          event.preventDefault()

          setActiveWord(word.text);

        }}
        onWordClick={(event, word) => {

          router.push(`/quiz?topic=${word.text}`);
        }}

      ></D3WordCloud>
    </>
  );
};

export default CustomWordCloud;
