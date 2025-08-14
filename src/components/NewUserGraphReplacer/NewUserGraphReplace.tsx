import React from 'react'
import { Card, CardContent } from '../ui/card';
import { Play, Sparkles, Star, Trophy } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const NewUserGraphReplace = () => {
    return (
        <Card className="h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-background opacity-50"></div>
            <CardContent className="relative p-6 h-full flex flex-col justify-center">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-primary" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold">Welcome to IQuiz! 🎉</h3>
                        <p className="text-sm text-muted-foreground">
                            Ready to start your learning journey? Take your first quiz and begin building your knowledge!
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-4">
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                            <p className="text-xs text-muted-foreground">Earn achievements</p>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <Trophy className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                            <p className="text-xs text-muted-foreground">Climb leaderboards</p>
                        </div>
                    </div>

                    <Button

                        className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                        asChild>
                        <Link href='/quiz' className="w-full flex items-center gap-2">
                            <Play className="h-4 w-4" />
                            Take Your First Quiz
                        </Link>
                    </Button>
                    <p className="text-xs text-muted-foreground">
                        Join 10,000+ learners already improving their knowledge
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

export default NewUserGraphReplace