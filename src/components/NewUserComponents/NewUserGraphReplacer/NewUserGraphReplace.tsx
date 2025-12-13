import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { Play, Sparkles, Star, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TextAtom } from '@/components/TextAtom';

const NewUserGraphReplace = () => {
    return (
        <Card className="h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-primary/3 to-background opacity-50"></div>
            <CardContent className="relative p-6 h-full flex flex-col justify-center">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-primary" />
                    </div>

                    <div className="space-y-2">
                        <TextAtom textVariantComponent='h3' textVariantColor='primary' className="text-xl font-semibold">newUser.welcome</TextAtom>
                        <TextAtom textVariantComponent='p' textClassName="text-sm text-muted-foreground">
                            newUser.readyToStart
                        </TextAtom>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-4">
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                            <TextAtom textVariantComponent='p' textClassName="text-xs text-muted-foreground">newUser.earnAchievements</TextAtom>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <Trophy className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                            <TextAtom textVariantComponent='p' textClassName="text-xs text-muted-foreground">newUser.climbLeaderboards</TextAtom>
                        </div>
                    </div>

                    <Button

                        className="w-full gap-2 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                        asChild>
                        <Link href='/quiz' className="w-full flex items-center gap-2">
                            <Play className="h-4 w-4" />
                            <TextAtom textClassName="text-xs text-muted-foreground"> newUser.takeFirstQuiz</TextAtom>
                        </Link>
                    </Button>
                    <TextAtom textVariantComponent='p' textClassName="text-xs text-muted-foreground">
                        newUser.joinLearners
                    </TextAtom>
                </div>
            </CardContent>
        </Card >
    );
}

export default NewUserGraphReplace