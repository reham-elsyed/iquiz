"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BrainCircuit, History } from "lucide-react";
import { CardType } from "@/types/cardTypes";
import { useRouter } from "next/navigation";
type Props = {
  card: CardType;
};

const QuizMeCard = ({ card }: Props) => {
  const router = useRouter();

  return (
    <Card
      className="hover:cursor-pointer app-card"
      onClick={() => router.push(card.path)}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold text-foreground">{card.Title} </CardTitle>
        {card.icon === "BrainCircuit" ? (
          <BrainCircuit size={28} strokeWidth={2.5} />
        ) : (
          <History size={28} strokeWidth={2.5} />
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{card.content} </p>
      </CardContent>
    </Card>
  );
};

export default QuizMeCard;
