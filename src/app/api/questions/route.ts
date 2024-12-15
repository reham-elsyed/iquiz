import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextAuth";
import { quizCreationSchema } from "@/app/schemas/formSchema/quizSchema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const runtime = "nodejs";
export const maxDuration = 500;

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
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
    if (type === "open_ended") {
      questions = await strict_output(
        `You are a professional question creator that generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array You are to generate exactly ${amount} open-ended questions about ${topic}`,type
        )  
    }
     else if (type === "mcq") {
      questions = await strict_output(
        `You are a expert question designer and interviewer that is able to generate exactly ${amount} mcq questions and answers about ${topic}, the length of each answer should not be more than 15 words always return one right answer in the choices`,type
      );
    }
    console.log(questions)
    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.error("elle gpt error", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}