import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { BookOpen, Play, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

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
        <Card className="col-span-full">
            <CardContent className="p-8 text-center">
                <div className="max-w-md mx-auto space-y-6">
                    <div className="w-20 h-20 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
                        <BookOpen className="h-10 w-10 text-muted-foreground" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold">No Quiz History Yet</h3>
                        <p className="text-muted-foreground">
                            Start taking quizzes to build your learning history and track your progress over time.
                        </p>
                    </div>

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

                    <div className="space-y-3">
                        <Button size="lg" className="gap-2">
                            <Link href="/quiz" className="flex items-center gap-2">
                                <Play className="h-5 w-5" />
                                Take Your First Quiz
                            </Link>
                        </Button>
                        <p className="text-xs text-muted-foreground">
                            Choose from 500+ quizzes across multiple subjects
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}