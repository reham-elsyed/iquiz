import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Play, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import EmptySectionWrapper from "../NewUserComponents/EmptySectionWrapper/EmptySectionWrapper";

export default function EmptyQuizHistory() {
    const benefits = [
        {
            icon: Star,
            title: "Track Progress",
            description: "See your improvement over time"
        },
        {
            icon: TrendingUp,
            title: "Performance Analytics",
            description: "Detailed insights into your learning"
        },
        {
            icon: BookOpen,
            title: "Study History",
            description: "Review past questions and answers"
        }
    ];

    return (
        <EmptySectionWrapper>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
                {benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                        <div key={index} className="space-y-2">
                            <div className="mx-auto w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm">{benefit.title}</h4>
                                <p className="text-xs text-muted-foreground">{benefit.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </EmptySectionWrapper>
    );
}