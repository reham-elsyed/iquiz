import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function resetStarTime(id: string) {
    const updatedQuiz = await prisma.game.update({
        where: { id },
        data: {
            timeStarted: new Date(),
            timeEnded: null,
        },
    });
    return updatedQuiz.id
}
