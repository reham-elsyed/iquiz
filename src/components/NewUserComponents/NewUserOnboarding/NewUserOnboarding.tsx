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
import AutoDirectionText from "@/components/TextDirection/TextDirextion";
import { useTranslations } from "next-intl";
import { TextAtom } from "@/components/TextAtom";

export default function NewUserOnboarding() {
    const t = useTranslations('onboarding');

    const onboardingSteps = [
        {
            icon: Play,
            title: t('steps.firstQuiz.title'),
            description: t('steps.firstQuiz.description'),
            action: t('steps.firstQuiz.action'),
            color: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400",
            completed: false
        },
        {
            icon: Target,
            title: t('steps.setGoals.title'),
            description: t('steps.setGoals.description'),
            action: t('steps.setGoals.action'),
            color: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400",
            completed: false
        },
        {
            icon: Users,
            title: t('steps.joinCommunity.title'),
            description: t('steps.joinCommunity.description'),
            action: t('steps.joinCommunity.action'),
            color: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400",
            completed: false
        }
    ];

    const quickFacts = [
        {
            label: t('communityStats.activeLearners.label'),
            value: t('communityStats.activeLearners.value'),
            color: "text-blue-600 dark:text-blue-400"
        },
        {
            label: t('communityStats.quizzesAvailable.label'),
            value: t('communityStats.quizzesAvailable.value'),
            color: "text-emerald-600 dark:text-emerald-400"
        },
        {
            label: t('communityStats.avgStudyTime.label'),
            value: t('communityStats.avgStudyTime.value'),
            color: "text-purple-600 dark:text-purple-400"
        },
        {
            label: t('communityStats.successRate.label'),
            value: t('communityStats.successRate.value'),
            color: "text-orange-600 dark:text-orange-400"
        }
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
                            <AutoDirectionText as="h3" className="text-lg font-semibold">
                                {t('title')}
                            </AutoDirectionText>
                            <AutoDirectionText as="p" className="text-sm text-muted-foreground">
                                {t('subtitle')}
                            </AutoDirectionText>
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
                                            <AutoDirectionText as="h4" className="font-medium">
                                                {step.title}
                                            </AutoDirectionText>
                                            {step.completed && (
                                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                    {t('badges.complete')}
                                                </Badge>
                                            )}
                                        </div>
                                        <AutoDirectionText as="p" className="text-sm text-muted-foreground">
                                            {step.description}
                                        </AutoDirectionText>
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
                    <AutoDirectionText as="h3" className="text-lg font-semibold mb-4">
                        {t('communityStats.title')}
                    </AutoDirectionText>

                    <div className="grid grid-cols-2 gap-4">
                        {quickFacts.map((fact, index) => (
                            <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                                <p className={`text-2xl font-bold ${fact.color}`}>{fact.value}</p>
                                <AutoDirectionText as="p" className="text-sm text-muted-foreground">
                                    {fact.label}
                                </AutoDirectionText>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t text-center">
                        <TextAtom textVariantComponent="p" textClassName="text-sm text-muted-foreground mb-3">
                            communityStats.joinMessage
                        </TextAtom>
                        <Button variant="outline" className="gap-2">
                            <Trophy className="h-4 w-4" />
                            <TextAtom textVariantComponent="span" textClassName="text-sm">communityStats.viewLeaderboard</TextAtom>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}