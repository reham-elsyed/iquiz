import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Target } from "lucide-react";

type Props = {
  accuracy: number;
};

const AccuracyCard = ({ accuracy }: Props) => {
  console.log(accuracy);
  const numAccuracy = Math.round(accuracy * 100) / 100;
  return (
    <Card className="h-full app-card flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-medium leading-tight text-foreground">
            Average Accuracy
          </h2>
          <Target className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-center items-center">
        <div
          className="text-5xl md:text-6xl font-bold text-foreground tracking-tight"
          aria-label={`Average accuracy: ${numAccuracy} percent`}
        >
          {numAccuracy}%
        </div>
      </CardContent>
    </Card>
  );
};

export default AccuracyCard;
