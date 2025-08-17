import React from 'react'
import { CardFooter } from '../ui/card'
import { TrendingUp } from 'lucide-react'
type ChartFooterProps = {
    chartDescription: string;
    className: string;
    label: string
}
const ChartFooter = ({ chartDescription,
    className,
    label }: ChartFooterProps) => {
    return (
        <>
            <CardFooter className={`flex-col items-start gap-2 text-sm ${className}`}>
                <div className="flex gap-2 leading-none font-medium">
                    Your Latest Game {label}<TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    {chartDescription}
                </div>
            </CardFooter>
        </>
    )
}

export default ChartFooter