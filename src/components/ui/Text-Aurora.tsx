import { AuroraText } from "./aurora-text"
type Props = {
    text: string;
    className?: string;
    colors?: string[],
    speed?: number;

}
export function TextAurora({ text, className, colors, speed }: Props) {
    return (
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
            <AuroraText className={className}
                colorsA={colors}
                speed={speed} >{text}</AuroraText>
        </h1>
    )
}
