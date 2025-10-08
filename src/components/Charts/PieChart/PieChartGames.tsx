import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Question } from "./QuestionList";

type Props = {
    questions: Question[];
};

const AccuracyBreakdownChart = ({ questions }: Props) => {
    const gameType = questions[0]?.questionType;

    let correctCount = 0;
    let incorrectCount = 0;

    if (gameType === "mcq") {
        correctCount = questions.filter(q => q.isCorrect).length;
        incorrectCount = questions.length - correctCount;
    } else {
        correctCount = questions.filter(q => (q.percentageCorrect || 0) >= 50).length;
        incorrectCount = questions.length - correctCount;
    }

    const data = [
        { name: "Correct", value: correctCount, color: "hsl(var(--chart-2))" },
        { name: "Incorrect", value: incorrectCount, color: "hsl(var(--chart-1))" },
    ];

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Accuracy Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                            }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-around mt-4 text-sm">
                    <div className="text-center">
                        <p className="text-muted-foreground">Correct</p>
                        <p className="text-xl">{correctCount}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-muted-foreground">Incorrect</p>
                        <p className="text-xl">{incorrectCount}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-muted-foreground">Total</p>
                        <p className="text-xl">{questions.length}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AccuracyBreakdownChart;