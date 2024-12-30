import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Award, Trophy } from "lucide-react";

type Props = {
  accuracy: number;
};
const evaluator = [
  { accuracy: 75, eval: "excellent" },
  { accuracy: 50, eval: "Good Job!" },
  { accuracy: 25, eval: "Nice Try!" },
  { accuracy: 0, eval: "Keep Trying!" },
];
const ResultCard = ({ accuracy }: Props) => {
  const value = evaluator.filter((item) => accuracy >= item.accuracy);
  console.log(value[0].eval);
  return (
    <Card className="md:col-span-7 mt-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="text-2xl font-bold">Results</CardTitle>
        <Award />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-3/5">
        <Trophy className="mr-4" size={50} stroke="gold" />
        <div className="flex flex-col text-2xl font-semibold text-yellow-400">
          <span>{value[0].eval}</span>
          <span className="text-sm text-center text-black dark:text-secondary capacity-50">
            {value[0].accuracy} accuracy
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
