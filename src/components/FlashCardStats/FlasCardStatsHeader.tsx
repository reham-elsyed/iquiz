import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

export const FlasCardStatsHeader = () => {
    return (
        <div className="border-border/50  bg-card/50 backdrop-blur-xs">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center gap-4">
                    {/* <Button
                        variant="ghost"
                        className="gap-2 text-card-forground  hover:bg-card/20"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button> */}
                    <div>
                        <h1 className="text-2xl font-medium text-card-forground">Session Statistics</h1>
                        <p className="text-sm dark:text-purple-300">Session completed • </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlasCardStatsHeader