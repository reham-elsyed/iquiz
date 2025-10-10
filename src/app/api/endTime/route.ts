import {
  checkAnswerSchema,
  gameIdSchema,
} from "@/app/schemas/formSchema/quizSchema";
import prisma from "@/lib/db";

import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { gameId } = gameIdSchema.parse(body);
    //get the question data from db
    const game = await prisma.game.findUnique({
      where: { id: gameId },
    });
    if (!game) {
      return NextResponse.json(
        {
          error: "Question not found",
        },
        {
          status: 404,
        },
      );
    }
    //update db with user answer
    const updatedGame = await prisma.game.update({
      where: { id: gameId },
      data: {
        timeEnded: new Date(),
      },
    });
    return NextResponse.json(
      {
        timeOfEnd: updatedGame.timeEnded,
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
    console.error("Unhandled error in /api/endTime:", error);

    // ✅ Ensure a response is always returned
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}
