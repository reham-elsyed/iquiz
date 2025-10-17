import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import ChoicesButton from '../ChoicesButton/ChoicesButton';
import { Button } from '../ui/button';
import TitleCard from '../TitleCard/TitleCard';

type Props = {

}
export const mockGame = {
    id: "mock-mockGame-001",
    topic: "Frontend Basics",
    userId: "user-12345",
    gameType: "mcq", // or "open_ended"
    timeStarted: new Date("2025-10-12T09:00:00Z"),
    timeEnded: null, // still ongoing
    questions: [
        {
            id: "1",
            question: "What does HTML stand for?",
            options: [
                "Hyper Trainer Marking Language",
                "HyperText Markup Language",
                "Hyper Transfer Markup Level",
                "HighText Machine Language",
            ],
        }
    ],
};
const Mockquiz = () => {
    return (
        <div className="flex justify-center items-center min-h-screen py-10">
            <div className="md:w-[80vm] max-w-4xl w-[90vm] ">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <TitleCard topic={mockGame.topic} />

                        <div className="flex self-start mt-3 h-6 w-28 text-slate-400">

                        </div>
                        <Card className="w-full mt-4">
                            <CardHeader className="flex flex-row item-center">
                                <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
                                    <div>{mockGame.topic}</div>
                                    <div className="text-base text-slate-400">
                                        {mockGame.questions.length}
                                    </div>
                                </CardTitle>
                                <CardDescription className="grow text-lg">
                                    {mockGame.questions[0].question}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <div className="flex flex-col items-stretch justify-center w-full mt-4">
                            {mockGame?.questions[0]?.options?.map((option, index) => {
                                return (
                                    <ChoicesButton
                                        key={index}
                                        index={index}

                                        option={option}
                                    />
                                );
                            })}
                        </div>
                        <Button
                            className="mt-2"

                        >

                        </Button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Mockquiz