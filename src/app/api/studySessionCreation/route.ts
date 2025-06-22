// app/api/study-session/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getAuthSession } from "@/lib/nextAuth";
// Update the import path below to the correct location of quizSchema
import { studySessionSchema } from "@/app/schemas/formSchema/quizSchema";
import createStudySession from "@/lib/createStudySession";

export async function POST(req: Request) {
  const session = await getAuthSession(); // should work if it uses cookies
const reqData = studySessionSchema.parse(await req.json());
  try {
 const newSession=  createStudySession(reqData)
console.log("______________________newSession_____________________", newSession);
    return NextResponse.json({ response: newSession }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create study session" }, { status: 500 });
  }
}
