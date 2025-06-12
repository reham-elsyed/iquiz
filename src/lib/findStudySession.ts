import prisma from "@/lib/db";;

export function findStudySession(gameId: string, userId: string) {
if (!gameId || !userId) {
    throw new Error("Session ID is required to find a study session.");
  }
const studySession = prisma.studySession.findFirst({
    where: {
        gameId: gameId,
        userId: userId,
    },
});
    if (!studySession) {
        throw new Error("Study session not found.");
    }
    return studySession;
}

export function findStudySessionFeedback(sessionId: string) {
if (!sessionId ) {
    throw new Error("Session ID is required to find a study session.");
  }
const studySessionFeedback = prisma.questionFeedback.findMany({
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