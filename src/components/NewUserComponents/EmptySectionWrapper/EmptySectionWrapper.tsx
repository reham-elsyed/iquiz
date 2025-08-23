import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Play } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const EmptySectionWrapper = ({ children }) => {
    return (
        <Card className="col-span-full h-full">
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

                    {children}

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
    )
}

export default EmptySectionWrapper