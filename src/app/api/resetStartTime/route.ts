import {
    gameIdSchema,
} from "@/app/schemas/formSchema/quizSchema";
import prisma from "@/lib/db";
import { getAuthSession } from "@/lib/nextAuth";

import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response): Promise<NextResponse> {
    const session = await getAuthSession();
    if (!session?.user) {
        return NextResponse.json(
            { error: "You must be logged in to play a game." },
            {
                status: 401,
            }
        );
    }
    try {
        const body = await req.json();
        const { gameId } = gameIdSchema.parse(body);
        //update db with user answer
        const updatedGame = await prisma.game.update({
            where: { id: gameId, userId: session.user.id },
            data: {
                timeStarted: new Date(),
                timeEnded: null
            },
        });
        if (updatedGame.gameType === "flash_card") {
            const game = await prisma.game.findFirst({
                where: { id: gameId, userId: session.user.id },
            });
            if (game) {
                // find the existing study session first (non-unique lookup)
                const sessionRecord = await prisma.studySession.findFirst({
                    where: { gameId: game.id, userId: session.user.id },
                });

                if (sessionRecord) {
                    // update by unique id
                    await prisma.studySession.update({
                        where: { id: sessionRecord.id },
                        data: {
                            // Add any fields you want to update here, e.g. timeStarted: new Date()
                            status: "ACTIVE",
                            createdAt: new Date(),
                            endedAt: null,
                        },
                    });
                } else {
                    // fallback: create a session if none exists
                    await prisma.studySession.create({
                        data: {
                            gameId: game.id,
                            userId: session.user.id,
                            status: "ACTIVE",
                            createdAt: new Date(),
                        },
                    });
                }
            }
        }
        // else {
        //     // ✅ Create a new one if it doesn't exist
        //     const studySession = await prisma.studySession.create({
        //         data: {
        //             gameId,
        //             userId: session.user.id,
        //             status: "ACTIVE",
        //             createdAt: new Date(),
        //         },
        //     });
        // }
        return NextResponse.json(
            {
                success: "you can retake this quiz",
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
        console.error("Unhandled error in /api/resetTime:", error);

        // ✅ Ensure a response is always returned
        return NextResponse.json(
            { error: "Internal Server Error", details: String(error) },
            { status: 500 }
        );
    }
}