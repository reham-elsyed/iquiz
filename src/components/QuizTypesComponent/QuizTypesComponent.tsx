"use client";
import { CopyCheck, Edit } from "lucide-react";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TextAtom } from "../TextAtom";

export default function QuizTypesComponent() {
  const quizTypes = [
    { nameKey: "quizTypes.multipleChoice", icon: "📝", count: 245 },
    { nameKey: "quizTypes.trueFalse", icon: "✅", count: 132 },
    { nameKey: "quizTypes.fillInBlank", icon: "📋", count: 89 },
    { nameKey: "quizTypes.essay", icon: "📖", count: 34 }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <TextAtom textVariantComponent="h3" textClassName="text-xl font-semibold mb-6">quizTypes.title</TextAtom>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quizTypes.map((type, index) => (
            <div key={index} className="text-center p-4 rounded-lg border bg-card hover:shadow-md transition-all">
              <div className="text-3xl mb-2">{type.icon}</div>
              <TextAtom textVariantComponent="h4" textClassName="font-medium mb-1">{type.nameKey}</TextAtom>
              <p className="text-sm text-muted-foreground">{type.count} <TextAtom textVariantComponent="span" textClassName="text-sm text-muted-foreground">quizTypes.available</TextAtom></p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}