import CollapsibleSimple from "@/components/CollapsibleComponent/CollapsibleComponent";
import GradientEffect from "@/components/GradientEffect/GradientEffect";
import Rocket from "@/components/SVGComponents/RocketIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import trendingTopic from "@/lib/trendingTopics";
import { DollarSignIcon } from "lucide-react";

export default async function TrendingTopicsPage() {

    const trendingTopics = await trendingTopic()
    if (!trendingTopics || trendingTopics.length === 0) {
        return (
            <div className='h-56 bg-slate-400 w-full flex items-center justify-center'>
                No trending topics found
            </div>
        )
    }
    return (
        <div className="app-container">
            <div className="grid grid-cols-1 gap-6 items-stretch">
                {trendingTopics.map((topic) => (
                    <Card key={topic.text}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{topic.text}</CardTitle>
                            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{topic.value}</div>
                            <CollapsibleSimple />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

    )
}