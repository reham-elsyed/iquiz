import TopicsCard from "@/components/TopicsCard/TopicsCard";
import trendingTopic from "@/lib/trendingTopics";

export default async function TrendingTopicsPage() {


    return (
        <div className="app-container">
            <div className="grid grid-cols-1 gap-6 items-stretch">

                <TopicsCard />

            </div>
        </div>

    )
}