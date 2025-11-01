import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/nextAuth";

export async function GET(req: Request, context: { params: Promise<{ sessionId: string }> }) {
    const { sessionId } = await context.params;
    const session = await getAuthSession();
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get session with feedback
    const studySession = await prisma.studySession.findUnique({
        where: { id: sessionId },
        include: {
            feedbacks: true,
            game: {
                select: {
                    questions: {
                        select: { id: true, question: true, answer: true, questionType: true },
                    },
                },
            },
        },
    });

    if (!studySession) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const questionsWithFeedback = studySession.game.questions.map(q => {
        const feedback = studySession.feedbacks.find(fb => fb.questionId === q.id);
        return {
            ...q,
            feedback: feedback?.feedback ?? null,
            timeSpent: feedback?.timeSpent ?? null,
        };
    });

    return NextResponse.json(questionsWithFeedback);
}
