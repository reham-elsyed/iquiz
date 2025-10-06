import TopicsCard from "@/components/TopicsCard/TopicsCard";
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
        <div className="app-container">
            <div className="grid grid-cols-1 gap-6 items-stretch">
                {trendingTopics.map((topic) => (
                    <TopicsCard topic={topic.text} value={topic.value} key={topic.text} />
                ))}
            </div>
        </div>

    )
}