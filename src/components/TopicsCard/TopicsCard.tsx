"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { quizesByTopicsArraySchema } from "@/app/schemas/formSchema/quizSchema";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import TakeQuizButton from "../Buttons/TakeQuizButton/TakeQuizButton";
import { Loader2, BookOpenIcon } from "lucide-react";

type QuizByTopic = z.infer<typeof quizesByTopicsArraySchema>[number];

const TopicsCard = () => {
    // Fetch grouped quizzes by topic
    async function getAllTopicsWithQuizzes(): Promise<
        z.infer<typeof quizesByTopicsArraySchema>
    > {
        const response = await axios.get(`/api/gamesByTopic`);
        return response.data.games;
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ["quizzesByTopic"],
        queryFn: getAllTopicsWithQuizzes,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading quizzes...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-10">
                Error loading quizzes. Please try again later.
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-10">
                No quizzes found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((topicGroup: QuizByTopic) => (
                <Card key={topicGroup.topic} className=" app-card--raised ">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold capitalize">
                            {topicGroup.topic}
                        </CardTitle>
                        <BookOpenIcon className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>

                    <CardContent className="space-y-3 scrollbar-thin overflow-auto max-h-[60vh]">
                        {topicGroup.quizes.length === 0 ? (
                            <div className="text-sm text-muted-foreground">
                                No quizzes available for this topic.
                            </div>
                        ) : (
                            <ul className="space-y-2">
                                {topicGroup.quizes.map((quiz, i) => (
                                    <li
                                        key={quiz.id}
                                        className="p-3 border rounded-md bg-background/40 hover:bg-accent/20 transition"
                                    >
                                        <div className="flex flex-col space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-medium text-foreground text-sm">
                                                    Quiz #{i + 1}
                                                </h3>
                                                <Badge variant="secondary" className="capitalize">
                                                    {quiz.gameType}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Test your knowledge in{" "}
                                                <span className="font-medium">{topicGroup.topic}</span>{" "}
                                                with this {quiz.gameType} quiz.
                                            </p>

                                            <div className="flex justify-end">

                                                <TakeQuizButton
                                                    text="Take quiz"
                                                    id={quiz.id}
                                                    gameType={quiz.gameType}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default TopicsCard;
