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
    <Card className="mt-5 app-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-medium leading-tight">Average Accuracy</CardTitle>
        <Target className="w-5 h-5 text-muted-foreground " />
      </CardHeader>
      <CardContent className=" space-y-6 ">
        <div className="text-xl font-bold text-center text-foreground pt-5 ">
          {numAccuracy}%</div>
      </CardContent>
    </Card>
  );
};

export default AccuracyCard;
