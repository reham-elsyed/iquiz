
import prisma from "@/lib/db";
import { getEachTopicQuizesId } from "@/lib/quizesOfTopic";

import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: Request, res: Response) {
    try {
        const { searchParams } = new URL(req.url)
        const topic = searchParams.get("topic")

        const games = await getEachTopicQuizesId(topic as string);
        if (!games) {
            return NextResponse.json(
                {
                    error: "Question not found",
                },
                {
                    status: 404,
                },
            );
        }

        return NextResponse.json(
            {
                games: games,
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    error: error.issues,
                },
                {
                    status: 400,
                },
            );
        }
    }
}
