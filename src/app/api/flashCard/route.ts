import { quizCreationSchema } from "@/app/schemas/formSchema/quizSchema";
import { getAuthSession } from "@/lib/nextAuth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req:Request, res:Response){
    try{
        const session = await getAuthSession();
        if (!session?.user){
            return NextResponse.json(
                {error: "You must be logged in"},
                {status:401,}
            );
        }
        const body = await req.json();
        //use same schema for flash card body request
        const {amount, type, topic} = quizCreationSchema.parse(body)
        return NextResponse.json(
            {
              question: "how is this working",
              answer:"i don't know"

            },
            {
              status: 200,
            },
          );
    }catch(error){
        if (error instanceof ZodError){
return NextResponse.json(
    {
        error: error.issues,
    },{
        status:400
    }
)
        }
    }
}