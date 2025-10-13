import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Award, Trophy } from "lucide-react";

type Props = {
  accuracy: number;
};
const evaluator = [
  { accuracy: 100, eval: "Excellent", color: "#16A34A" },
  { accuracy: 75, eval: "Very Good", color: "#22C55E" },
  { accuracy: 50, eval: "Good Job!", color: "#EAB308" },
  { accuracy: 25, eval: "Nice Try!", color: "#F97316" },
  { accuracy: 0, eval: "Keep Trying!", color: "#DC2626" },
];
const ResultCard = ({ accuracy }: Props) => {
  const value = evaluator.filter((item) => accuracy >= item.accuracy);
  console.log(value[0].eval);
  return (
    <Card className="app-card h-full flex flex-col justify-between overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="text-2xl font-medium leading-tight">Results</CardTitle>

      </CardHeader>
      <CardContent className={`flex flex-col items-center justify-center grow`}>
        <div className=" grow w-full flex justify-center items-center relative ">
          <Award
            style={{ color: `${value[0].color}` }}

            size={150} className="text-muted-foreground " />
        </div>
        <div
          style={{ color: `${value[0].color}` }}
          className={`flex flex-col text-2xl font-semibold `}>

          <span>{value[0].eval}</span>
          <span className="text-sm text-center text-card-foreground capacity-50">
            {value[0].accuracy} accuracy
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
