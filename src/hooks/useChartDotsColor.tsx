import { ChartConfig } from '@/components/ui/chart';
import React, { useEffect, useState } from 'react'
type useChartLineDotsColorsProps<T> = {
    gamesDuration: T[];
    getKey: (item: T) => string;
    getValue: (item: T) => string | number;
}
const useChartDotsColor = ({ gamesDuration, getKey, getValue }: useChartLineDotsColorsProps) => {
    const [chartConfig, setChartConfig] = useState<ChartConfig>({});
    useEffect(() => {
        const myChartConfig = gamesDuration.reduce((acc, game, i) => {
            // const configKey = game.topic.toLowerCase();
            const configKey = getKey(game).toLowerCase()
            acc[configKey] = {
                //  label: game.topic,
                label: getKey(game),
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