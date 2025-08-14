import { CopyCheck, Edit } from "lucide-react";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function QuizTypesComponent() {
  const quizTypes = [
    { name: "Multiple Choice", icon: "📝", count: 245 },
    { name: "True/False", icon: "✅", count: 132 },
    { name: "Fill in the Blank", icon: "📋", count: 89 },
    { name: "Essay", icon: "📖", count: 34 }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-6">Quiz Types Available</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quizTypes.map((type, index) => (
            <div key={index} className="text-center p-4 rounded-lg border bg-card hover:shadow-md transition-all">
              <div className="text-3xl mb-2">{type.icon}</div>
              <h4 className="font-medium mb-1">{type.name}</h4>
              <p className="text-sm text-muted-foreground">{type.count} available</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}