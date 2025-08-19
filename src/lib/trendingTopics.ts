import prisma from "./db";

const trendingTopic=async()=>{
  const topic = await prisma.topic_count.findMany({});
  const formattedTopics = topic.map((topic) => {
    return {
      text: topic.topic,
      value: topic.count,
    };
  })
  return formattedTopics;
  }
  export default trendingTopic