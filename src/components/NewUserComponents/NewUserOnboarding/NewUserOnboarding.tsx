import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
    BookOpen,
    Trophy,
    Users,
    Clock,
    Target,
    ArrowRight,
    CheckCircle2,
    Play
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NewUserOnboarding() {
    const onboardingSteps = [
        {
            icon: Play,
            title: "Take Your First Quiz",
            description: "Start with an easy topic to get familiar with the platform",
            action: "Start Now",
            color: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400",
            completed: false
        },
        {
            icon: Target,
            title: "Set Your Goals",
            description: "Choose topics you want to focus on and set learning targets",
            action: "Set Goals",
            color: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400",
            completed: false
        },
        {
            icon: Users,
            title: "Join the Community",
            description: "Connect with other learners and compete on leaderboards",
            action: "Explore",
            color: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400",
            completed: false
        }
    ];

    const quickFacts = [
        { label: "Active Learners", value: "10,000+", color: "text-blue-600 dark:text-blue-400" },
        { label: "Quizzes Available", value: "500+", color: "text-emerald-600 dark:text-emerald-400" },
        { label: "Avg. Study Time", value: "15 min/day", color: "text-purple-600 dark:text-purple-400" },
        { label: "Success Rate", value: "94%", color: "text-orange-600 dark:text-orange-400" }
    ];

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Getting Started</h3>
                            <p className="text-sm text-muted-foreground">Complete these steps to maximize your learning experience</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {onboardingSteps.map((step, index) => {
                            const IconComponent = step.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-sm transition-all"
                                >
                                    <div className={`p-3 rounded-lg ${step.color}`}>
                                        {step.completed ? (
                                            <CheckCircle2 className="h-5 w-5" />
                                        ) : (
                                            <IconComponent className="h-5 w-5" />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-medium">{step.title}</h4>
                                            {step.completed && (
                                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                    Complete
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                    </div>

                                    <Button
                                        variant={step.completed ? "outline-solid" : "default"}
                                        size="sm"
                                        className="gap-2 shrink-0"
                                    >
                                        {step.action}
                                        <ArrowRight className="h-3 w-3" />
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Community Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {quickFacts.map((fact, index) => (
                            <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                                <p className={`text-2xl font-bold ${fact.color}`}>{fact.value}</p>
                                <p className="text-sm text-muted-foreground">{fact.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t text-center">
                        <p className="text-sm text-muted-foreground mb-3">
                            Join thousands of learners improving their knowledge every day
                        </p>
                        <Button variant="outline" className="gap-2">
                            <Trophy className="h-4 w-4" />
                            View Global Leaderboard
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}