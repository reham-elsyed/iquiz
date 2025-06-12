import { quizCreationSchema } from "@/app/schemas/formSchema/quizSchema";
import prisma from "@/lib/db";
import { getAuthSession } from "@/lib/nextAuth";
import { NextResponse } from "next/server";
import { number, ZodError } from "zod";
import axios from "axios";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "You must be logged in",
        },
        {
          status: 401,
        },
      );
    }
    const body = await req.json();
    const { amount, type, topic } = quizCreationSchema.parse(body);

    //send request to ai to create questions through question endpoint and receive response data with questiond
    let data;
    try {
      data = await axios.post(`${process.env.IQUIZ_URL_API}/api/questions`, {
        amount,
        topic,
        type,
      });
      console.log("data from ai", data.data);
    } catch (aiError) {
      return NextResponse.json(
        {
          error: aiError,
        },
        {
          status: 502 ,
        },
      );
    }
    //create game in db and store game id
    const game = await prisma.game.create({
      data: {
        gameType: type,
        timeStarted: new Date(),
        userId: session.user.id,
        topic,
      },
    });
    console.log(game);
    await prisma.topic_count.upsert({
      where: {
        topic,
      },
      create: {
        topic,
        count: 1,
      },
      update: {
        count: {
          increment: 1,
        },
      },
    });
    // console.log("data from game route aka api", data)
    if (type === "mcq") {
      await createMCQQuizPrisma(data.data, game.id);
    } else if (type === "open_ended" || type === "flash_card") {
      type openQuestion = {
        question: string;
        answer: string;
      };
      //create array of questions and answers to send to db
      console.log("data from game route aka api", data);
      let manyData = data.data.questions.map((question: openQuestion) => {
        return {
          question: question.question,
          answer: question.answer,
          gameId: game.id,
          questionType: type,
        };
      });
      //store quiz in db 'open ended
      await prisma.question.createMany({
        data: manyData,
      });
    }
    //return game id in the db
    return NextResponse.json({
      gameId: game.id,
    });
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
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}

interface MCQQuestion {
  question: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
}

import { GameType } from "@prisma/client";

interface MCQQuestionData {
  question: string;
  answer: string;
  options: string;
  gameId: string;
  questionType: GameType;
}

async function createMCQQuizPrisma(
  qData: { questions: MCQQuestion[] },
  gameId: string,
): Promise<void> {
  let manyData: MCQQuestionData[] = qData.questions.map(
    (question: MCQQuestion) => {
      let options = [
        question.answer,
        question.option1,
        question.option2,
        question.option3,
      ];
      options = options.sort(() => Math.random() - 0.5);
      return {
        question: question.question,
        answer: question.answer,
        options: JSON.stringify(options),
        gameId: gameId,
        questionType: "mcq",
      };
    },
  );
  //save created question to db mcq
  await prisma.question.createMany({
    data: manyData,
  });
}
