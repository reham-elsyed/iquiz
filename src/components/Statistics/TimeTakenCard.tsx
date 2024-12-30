import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";

type Props = {
  timeStarted: Date;
  timeEnded: Date;
};

const TimeTakenCard = ({ timeStarted, timeEnded }: Props) => {
  return (
    <Card className="md:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Time Taken</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">
          {formatTimeDelta(differenceInSeconds(timeEnded, timeStarted))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeTakenCard;
