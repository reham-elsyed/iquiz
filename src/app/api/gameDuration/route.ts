import { NextRequest, NextResponse } from "next/server";
import singleUserGames from "@/lib/singleUserGames";
import { getAuthSession } from "@/lib/nextAuth";
import { calculateDurationOfFlashCardStudy } from "@/lib/utils";

// GET /api/user-games?limit=5
export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to create a game." },
        {
          status: 401,
        }
      );
    }

    // Get `limit` from query params or default to 10
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");

    const games = await singleUserGames(session.user.id, limit);

    if (games) {
      const gamesDuration = games.map((game, i) => {
        const duration = calculateDurationOfFlashCardStudy(game.timeEnded ?? new Date() as Date, game.timeStarted)
        return {
          topic: game.topic,
          duration: duration,
          fill: `var(--chart-${i})`,
          // gameId: game.id
        }
      })
      console.log("Games Duration:", gamesDuration);
      return NextResponse.json({ gamesDuration }, { status: 200 });
    }
  } catch (error) {




    console.error("Error fetching user games:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
