// app/api/study-session/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getAuthSession } from "@/lib/nextAuth";

export async function POST(req: Request) {
  const session = await getAuthSession(); // should work if it uses cookies

  try {
    const newSession = await prisma.studySession.create({
      data: {
        userId: session?.user.id as string,
      },
    });
console.log("______________________newSession_____________________", newSession);
    return NextResponse.json({ response: newSession }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create study session" }, { status: 500 });
  }
}
