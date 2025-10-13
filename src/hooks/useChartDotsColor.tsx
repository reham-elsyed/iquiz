import { ChartConfig } from '@/components/ui/chart';
import React, { useEffect, useState } from 'react'
type useChartLineDotsColorsProps<T = any> = {
    gamesDuration: T[];
    getKey: (item: T) => T;

}
const chartColors = [
    "#d946ef", // oklch(66.276% 0.27428 323.296) → vivid pink-purple
    "#f87171", // oklch(0.59 0.22 11.50) → warm red
    "#60a5fa", // oklch(0.77 0.13 223.19) → medium blue
    "#34d399"  // oklch(0.69 0.14 160.23) → green-teal
];
const useChartDotsColor = ({ gamesDuration, getKey }: useChartLineDotsColorsProps) => {
    const [chartConfig, setChartConfig] = useState<ChartConfig>({});
    useEffect(() => {
        const myChartConfig = gamesDuration.reduce((acc, game, i: number) => {
            // const configKey = game.topic.toLowerCase();
            const configKey = getKey(game)
            acc[configKey] = {
                //  label: game.topic,
                label: getKey(game),
                color: chartColors[i],
            };
            return acc;
        }, {} as ChartConfig);
        setChartConfig(myChartConfig);
        console.log("Chart Config:", myChartConfig);
    }, [gamesDuration, getKey]);
    return { chartConfig }

}

export default useChartDotsColor