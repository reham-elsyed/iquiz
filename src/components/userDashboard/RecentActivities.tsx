import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getAuthSession } from "@/lib/nextAuth";
import prisma from "@/lib/db";
import RecentActivitiesCardWrapper from "./RecentActivitiesCard";
import RecentHistoryComponent from "./RecentHostory";
import getRecentActivityGameData from "@/lib/getUserGamesHistory";

type Props = {};

const RecentActivities = async (props: Props) => {
  const session = await getAuthSession();
  const gamesCount = await prisma.game.count({
    where: {
      userId: session?.user.id,
    },
  });
  const historyData = await getRecentActivityGameData(session?.user.id as string)
  return (
    <RecentActivitiesCardWrapper gamesCount={gamesCount}>
      <RecentHistoryComponent historyGamesData={historyData} />
    </RecentActivitiesCardWrapper>
  );
};

export default RecentActivities;
