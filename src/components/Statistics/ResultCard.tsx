import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Award, Trophy } from "lucide-react";

type Props = {
  accuracy: number;
  questionsNum: number;
  topic: string;
};
const evaluator = [
  { accuracy: 100, eval: "Excellent", color: "#16A34A" },
  { accuracy: 75, eval: "Very Good", color: "#22C55E" },
  { accuracy: 50, eval: "Good Job!", color: "#EAB308" },
  { accuracy: 25, eval: "Nice Try!", color: "#F97316" },
  { accuracy: 0, eval: "Keep Trying!", color: "#DC2626" },
];
const ResultCard = ({ accuracy, questionsNum, topic }: Props) => {
  const value = evaluator.filter((item) => accuracy >= item.accuracy);
  console.log(value[0].eval);
  return (
    <Card className="app-card h-full flex flex-col justify-between">
      <div className=" grow w-full flex justify-center items-center">
        <Award
          style={{ color: `${value[0].color}` }}
          size={150} className="text-muted-foreground " />
      </div>


      <CardContent className="flex flex-col items-center justify-center grow">
        <div
          style={{ color: `${value[0].color}` }}
          className="flex flex-col text-2xl font-semibold text-center"
        >

          <span>{value[0].eval}</span>
          <CardTitle className="text-2xl font-medium leading-tight text-card-foreground">{topic}</CardTitle>
          <span className="text-sm text-muted-foreground">
            {value[0].accuracy}% accuracy across {questionsNum} questions
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
