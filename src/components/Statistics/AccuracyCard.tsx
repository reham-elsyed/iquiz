"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Target } from "lucide-react";
import { TextAtom } from "../TextAtom";
import { useTranslation } from "react-i18next";

type Props = {
  accuracy: number;
};

const AccuracyCard = ({ accuracy }: Props) => {
  const { t } = useTranslation();

  const numAccuracy = Math.round(accuracy * 100) / 100;
  return (
    <Card className="h-full app-card flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <TextAtom
            textVariantComponent="h2"
            className="text-xl md:text-2xl font-medium leading-tight text-foreground"
          >
            statistics.accuracyCard.title
          </TextAtom>
          <Target className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-center items-center">
        <div
          className="text-5xl md:text-6xl font-bold text-foreground tracking-tight"
          aria-label={t("statistics.accuracyCard.ariaLabel", {
            val: numAccuracy,
          })}
        >
          {numAccuracy}%
        </div>
      </CardContent>
    </Card>
  );
};

export default AccuracyCard;
