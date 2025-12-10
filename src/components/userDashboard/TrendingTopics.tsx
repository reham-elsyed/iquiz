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
import { TextAtom } from "../TextAtom";
const TrendingTopics = async () => {
  const formattedTopics = await trendingTopic()
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold"><TextAtom>trendingTopics.title</TextAtom></CardTitle>
        <CardDescription>
          <TextAtom>trendingTopics.description</TextAtom>
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <CustomWordCloud formattedTopics={formattedTopics} />
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;
