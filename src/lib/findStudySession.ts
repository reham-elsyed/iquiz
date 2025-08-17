import prisma from "@/lib/db"; import { studySessionInterface } from "@/types/feedbackFlashcardTypes";
;

export async function findStudySession(gameId: string, userId: string): Promise<studySessionInterface | null> {

    if (!gameId || !userId) {
        throw new Error("Session ID is required to find a study session.");
    }
    const studySession = await prisma.studySession.findFirst({
        where: {
            gameId: gameId,
            userId: userId,
        },
    });
    if (!studySession) {
        throw new Error("Study session not found.");
    }
    console.log(studySession)
    return studySession;

}

export async function findStudySessionFeedback(sessionId: string) {
    if (!sessionId) {
        throw new Error("Session ID is required to find a study session.");
    }
    const studySessionFeedback = await prisma.questionFeedback.findMany({
        where: {
            sessionId: sessionId,

        },
        orderBy: {
            createdAt: 'desc',
        },
    })
    if (!studySessionFeedback) {
        throw new Error("Study session feedback not found.");
    }
    return studySessionFeedback;
}