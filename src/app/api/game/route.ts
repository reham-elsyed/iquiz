import { quizCreationSchema } from "@/app/schemas/formSchema/quizSchema";
import prisma from "@/lib/db";
import { getAuthSession } from "@/lib/nextAuth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import axios from 'axios';

export async function POST(req:Request, res:Response){
    try{
        const session = await getAuthSession();
        if(!session?.user){
            return NextResponse.json(
                {
                    error: "You must br logged in",
                },
                {
                    status: 401
                }
            );
        }
        const body = await req.json()
        const {amount, type, topic } = quizCreationSchema.parse(body);
        const game = await prisma.game.create({
            data:{
                gameType: type,
                timeStarted:new Date(),
                userId: session.user.id,
                topic
            }
        })
        const {data} = await axios.post(`${process.env.IQUIZ_URL_API}/api/questions`,
            {
                amount,
                topic,
                type,
            }
        );
        console.log("data from game route aka api", data)
        if(type=== 'mcq'){
            type mcqQuestion={
                question:string,
                answer:string,
                option1:string,
                option2:string,
                option3:string,
               
            }
            let manyData = data.questions.map((question: mcqQuestion) =>{
                let options = [question.answer, question.option1, question.option2, question.option3]
                options = options.sort(()=> Math.random() - 0.5)
                return {
                    question: question.question,
                    answer: question.answer,
                    options: JSON.stringify(options),
                    gameId: game.id,
                    questionType: 'mcq'
                }

                
            })
            await prisma.question.createMany({
                data: manyData
            })
        }
        else if (data === 'open_ended'){
            type openQuestion={
                question:string,
                answer:string,
            }
            let manyData = data.questions.map((question: openQuestion)=>{
                return{
                    question : question.question,
                    answer: question.answer,
                    gameId: game.id,
                    questionType:'open_ended'
                }
            })
            await prisma.question.createMany({
                data: manyData
            })
        }
        return NextResponse.json({
            gameId: game.id,
        })
    }catch(error){
        if (error instanceof ZodError){
            return NextResponse.json({
                error: error.issues
            },
            {
                status: 400,
            })
        }
        return NextResponse.json({
            error: "Something went wrong"
        },
    {
        status: 500
    })
    }
}