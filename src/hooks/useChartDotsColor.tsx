import { ChartConfig } from '@/components/ui/chart';
import React, { useEffect, useState } from 'react'
type useChartLineDotsColorsProps = {
    gamesDuration: { topic: string; duration: number, fill: string, gameId: string }[];
}
const useChartDotsColor = ({ gamesDuration }: useChartLineDotsColorsProps) => {
    const [chartConfig, setChartConfig] = useState<ChartConfig>({});
    useEffect(() => {
        const myChartConfig = gamesDuration.reduce((acc, game, i) => {
            const configKey = game.topic.toLowerCase();
            acc[configKey] = {
                label: game.topic,
                color: `var(--chart-${i})`, // Assuming you have CSS variables for colors
            };
            return acc;
        }, {} as ChartConfig);
        setChartConfig(myChartConfig);
        console.log("Chart Config:", myChartConfig);
    }, [gamesDuration]);
    return { chartConfig }

}

export default useChartDotsColor