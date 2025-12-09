"use client";
import { AuroraText } from "./aurora-text"
import { useTranslation } from "react-i18next";

type Props = {
    text: string;
    className?: string;
    colors?: string[],
    speed?: number;
    isTranslated?: boolean;
}

export function TextAurora({ text, className, colors, speed, isTranslated = false }: Props) {
    const { t } = useTranslation();
    const displayText = isTranslated ? t(text) : text;

    return (
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
            <AuroraText className={className}
                colorsA={colors}
                speed={speed} >{displayText}</AuroraText>
        </h1>
    )
}
