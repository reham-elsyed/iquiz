import Rocket from "@/components/SVGComponents/RocketIcon";
import { Card } from "@/components/ui/card";
import trendingTopic from "@/lib/trendingTopics";

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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch">
            {trendingTopics.map((topic) => (
                <Card
                    key={topic.text}
                    className="h-full bg-card/95 backdrop-blur-sm border-white/20 shadow-lg rounded-xl flex justify-between items-center p-4 overflow-hidden"
                >
                    <div className="w-2/3">
                        <h2 className="text-xl font-semibold mb-2">{topic.text}</h2>
                        <p className="text-gray-600">Count: {topic.value}</p>
                    </div>

                    <div className="relative h-16 w-16 flex items-center justify-center ">
                        <div className="absolute -right-5 -top-5 h-16 w-16 bg-slate-500 rounded-2xl rotate-45 flex items-center justify-center">
                            <Rocket size={"20"} />
                        </div>
                    </div>
                </Card>
            ))}
        </div>

    )
}