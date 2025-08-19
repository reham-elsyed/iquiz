import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import CustomWordCloud from "../CutomWordCloud/CustomWordCloud";
import prisma from "@/lib/db";
import trendingTopic from "@/lib/trendingTopics";
const TrendingTopics = async () => {
  const formattedTopics = await trendingTopic()
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Trending Topics</CardTitle>
        <CardDescription>
          Click on a topic to start a quiz on it!
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <CustomWordCloud formattedTopics={formattedTopics} />
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;
