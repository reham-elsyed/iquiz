import { errorResponse, successResponse } from "@/lib/apiResponse";
import prisma from "@/lib/db";
import { getAuthSession } from "@/lib/nextAuth";

export async function POST(req: Request) {
    const session = await getAuthSession();
    if (!session?.user) {
        return errorResponse("Unautherized", 401)
    }
    const { sessionId } = await req.json()

    const studySession = await prisma.studySession.findUnique({
        where: { id: sessionId },
        include: {
            feedbacks: true,
            game: { select: { _count: { select: { questions: true } } } }
        }
    })

    const allAnswered =
        studySession?.feedbacks.length === studySession?.game._count.questions
    if (!allAnswered) {
        return errorResponse("please provide feedback to all questions", 422)
    }
    try {
        const updated = await prisma.studySession.updateMany({
            where: {
                id: sessionId,
                userId: session.user.id,
                status: 'ACTIVE',

            },
            data: {
                endedAt: new Date(),
                status: "FINISHED",
            }
        })
        if (updated.count === 0) {
            return errorResponse("No session updated", 404);
        }

        return successResponse("Study session finalized", 200);
    } catch (err) {
        return errorResponse("something went wrong", 400)
    }

}