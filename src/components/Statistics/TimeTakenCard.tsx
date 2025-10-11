import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";
import { Clock } from "lucide-react";
import { Badge } from "../ui/badge";

type Props = {
  timeStarted: Date;
  timeEnded: Date;
};

const TimeTakenCard = ({ timeStarted, timeEnded }: Props) => {
  return (
    <Card className=" app-card">
      <CardHeader className="flex flex-row items-center justify-between  pb-4">
        <CardTitle className="text-2xl font-medium leading-tight">
          Test Duration
        </CardTitle>
        <Clock aria-hidden="true" className="w-5 h-5 text-muted-foreground " />

      </CardHeader>

      <CardContent className=" space-y-6 ">
        <div className="text-xl font-bold text-center text-foreground " aria-label="Total test duration ">
          {formatTimeDelta(differenceInSeconds(timeEnded, timeStarted))}
        </div>

        <div className="space-y-2 text-sm text-muted-foreground flex justify-between">
          <Badge
            className="h-8"
            variant={"secondary"}>
            <p aria-label={`Test started at ${timeStarted.toLocaleTimeString()}`}>
              <span className="font-semibold ">Started:</span> {timeStarted.toLocaleTimeString()}
            </p>
          </Badge>
          <Badge
            className="h-8"
            variant={"secondary"}>
            <p aria-label={`Test ended at ${timeEnded.toLocaleTimeString()}`}>
              <span className="font-semibold ">Ended:</span> {timeEnded.toLocaleTimeString()}
            </p>
          </Badge>
        </div>
      </CardContent>
    </Card>

  );
};

export default TimeTakenCard;
