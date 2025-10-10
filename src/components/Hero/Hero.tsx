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
type Props = {};

const Hero = (props: Props) => {
  return (
    <div className=" h-fit relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-card/95 backdrop-blur-xs border border-white/20 shadow-xl">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>


      <Card className="flex flex-col md:flex-row  justify-center items-center bg-inherit  h-full w-full ">
        <CardHeader className=" md:w-2/3 h-full w-full ">
          <CardTitle className="text-lg md:text-2xl pb-8">
            {" "}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug text-foreground">
              your AI quiz generator for any Topic
            </h1>
          </CardTitle>
          <CardDescription className="space-y-6">
            <p className=" text-base p-y-5  sm:text-lg md:text-xl leading-relaxed">
              Create, learn, and grow your knowledge effortlessly.
            </p>
            <div className="self-end  inline-flex pt-5">
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="gap-2 app-button">
                  <Link href="/quiz">
                    <Play className="h-5 w-5" />
                    Start Quick Quiz
                  </Link>
                </Button>

                <Button asChild variant={"outline"} size="lg" className="gap-2 shadow-sm -translate-y-[1px] app-button">

                  <Link href="/trending-topics">  <BookOpen className="h-5 w-5" /> Browse Topics</Link>
                </Button>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <div className="rounded-md hidden  w-2/3 md:w-1/3 md:flex justify-center items-center ">
          <div className="rounded-md h-96 w-96 aspect-square relative">
            <HeroImage className="z-10 rounded-md w-full h-full absolute -top-5 -left-5 right-0 bottom-0 "
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Hero;
