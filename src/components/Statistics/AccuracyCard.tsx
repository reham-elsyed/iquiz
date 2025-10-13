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
    <Card className="app-card h-full relative overflow-hidden flex flex-col ">
      <div className="absolute inset-[5%] -right-1 -translate-y-14 rounded-2xl border-destructive border-2  "></div>

      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-medium leading-tight ps-1">Average Accuracy</CardTitle>
        <Target className="w-5 h-5 text-muted-foreground " />
      </CardHeader>
      <CardContent className=" space-y-6  grow flex flex-col justify-center items-center">
        <div className="text-xl md:text-2xl font-bold text-center text-foreground pt-5 ">
          {numAccuracy}%</div>
      </CardContent>
    </Card>

  );
};

export default AccuracyCard;
