import { quizesByTopicsArraySchema } from "@/app/schemas/formSchema/quizSchema";
import { getEachTopicQuizesId } from "@/lib/quizesOfTopic";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: Request) {
    try {

        const games = await getEachTopicQuizesId();

        // If there are no games, just return empty instead of error
        if (!games || games.length === 0) {
            return NextResponse.json({ games: [] }, { status: 200 });
        }

        // Validate shape but don’t throw if invalid — fallback to empty
        let validatedGames;
        try {
            validatedGames = quizesByTopicsArraySchema.parse(games);
        } catch {
            validatedGames = [];
        }

        return NextResponse.json({ games: validatedGames }, { status: 200 });
    } catch (error) {
        // Catch any Zod validation errors — return empty instead of throwing
        if (error instanceof ZodError) {
            return NextResponse.json({ games: [] }, { status: 200 });
        }

        // Catch any other unexpected errors — still return empty list
        console.error("Unexpected error in /api/gamesByTopic:", error);
        return NextResponse.json({ games: [] }, { status: 200 });
    }
}