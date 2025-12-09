import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import HeroImage from "../SVGComponents/HeroImage";
import { BookOpen, Play } from "lucide-react";
import { TextAtom } from "../TextAtom";
type Props = {};

const Hero = (props: Props) => {
  return (
    <section
      aria-labelledby="hero-title"
      className="h-fit relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-card/95 backdrop-blur-xs border border-white/20 shadow-xl"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true"></div>

      <Card className="flex flex-col md:flex-row justify-center items-center bg-transparent border-none shadow-none h-full w-full p-4 md:p-6 lg:p-8">
        <CardHeader className="md:w-2/3 h-full w-full p-0 space-y-6 md:pr-8 text-center md:text-left">
          <div className="space-y-4">
            <h1
              id="hero-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-foreground"
            >
              <TextAtom>hero.title</TextAtom>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto md:mx-0">
              <TextAtom>hero.description</TextAtom>
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="gap-2 text-lg h-12 px-8 app-button shadow-lg hover:shadow-primary/25 transition-all">
              <Link href="/quiz">
                <Play className="h-5 w-5" aria-hidden="true" />
                <TextAtom textVariantComponent="span" >hero.startQuiz</TextAtom>
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="gap-2 text-lg h-12 px-8 shadow-sm backdrop-blur-sm bg-background/50 hover:bg-background/80 transition-all">
              <Link href="/trending-topics">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                <TextAtom textVariantComponent="span">hero.browseTopics</TextAtom>
              </Link>
            </Button>
          </div>
        </CardHeader>

        <div className="hidden md:flex w-1/3 justify-center items-center mt-8 md:mt-0" aria-hidden="true">
          <div className="relative w-full max-w-[400px] aspect-square">
            <HeroImage className="w-full h-full drop-shadow-2xl animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-5" />
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Hero;
