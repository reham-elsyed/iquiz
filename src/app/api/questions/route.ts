import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextAuth";
import { quizCreationSchema } from "@/app/schemas/formSchema/quizSchema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import axios from "axios";

// export const runtime = "nodejs";
// export const maxDuration = 60;

export async function POST(req: Request, res: Response) {
  try {
    //  const session = await getAuthSession();
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: "You must be logged in to create a game." },
    //     {
    //       status: 401,
    //     }
    //   );
    // }
    const body = await req.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);
    let questions: any;
    if (type === "open_ended" || type === "flash_card") {
      questions = await strict_output(
        `You are a professional question creator that generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array You are to generate exactly ${amount} open-ended questions about ${topic}`,
        type,
      );
    } else if (type === "mcq") {
      questions = await strict_output(
        `You are a expert question designer and interviewer that is able to generate exactly ${amount} mcq questions and answers about ${topic}, the length of each answer should not be more than 15 words always return one right answer in the choices`,
        type,
      );
    }
  if (!questions) {
      return NextResponse.json(
        {
          error: "Failed to generate questions",
        },
        {
          status: 500,
        },
      );
    }
    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
  
    if (
      error instanceof Error &&
      error.message.includes("Too Many Requests")
    ) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }
  
    console.error("elle gpt error", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
