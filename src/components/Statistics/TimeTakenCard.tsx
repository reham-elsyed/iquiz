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
  const duration = differenceInSeconds(timeEnded, timeStarted)
  return (
    <Card className="h-full app-card flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-medium leading-tight text-foreground">
            Test Duration
          </h2>
          <Clock className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between space-y-6">
        <div
          className="flex-1 flex items-center justify-center"
          aria-label={`Total test duration: ${formatTimeDelta(duration)}`}
        >
          <div className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            {formatTimeDelta(duration)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 ">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide  ">
              Started
            </p>
            <p
              className="text-lg font-semibold text-foreground"
              aria-label={`Test started at ${timeStarted.toLocaleTimeString()}`}
            >
              {timeStarted.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide text-end">
              Ended
            </p>
            <p
              className="text-lg font-semibold text-foreground text-end"
              aria-label={`Test ended at ${timeEnded.toLocaleTimeString()}`}
            >
              {timeEnded.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

  );
};

export default TimeTakenCard;
