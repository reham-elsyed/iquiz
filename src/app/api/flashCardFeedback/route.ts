import { flashcardFeedbackSchema, quizCreationSchema } from "@/app/schemas/formSchema/quizSchema";
import { getAuthSession } from "@/lib/nextAuth";
import saveFeedbackFlashCard from "@/lib/saveFeedbackFlashCard";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import prisma from "@/lib/db";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 401 },
      );
    }
    const body = await req.json();
    console.log("______________________body_____________________",body)
    //use same schema for flash card body request
    const {  questionId, feedback, timeSpent, sessionId } = flashcardFeedbackSchema.parse(body);
    //  const studySession = await prisma.studySession.findFirst({
    //   where: {
    //     userId: session.user.id,
    //     // optionally: isActive: true or by topicId/quizId if needed
    //   },
    // });
    // console.log("______________________studySession_____________________",studySession)
  
    const data= {
       questionId, 
       feedback, 
       timeSpent,
       sessionId: sessionId,
    }
    console.log(data)
   const res= await saveFeedbackFlashCard(data);
   console.log("______________________feedback saved ____________________",res)
    return NextResponse.json(
      {
        response: res
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
