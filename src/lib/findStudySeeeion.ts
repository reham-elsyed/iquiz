import prisma from "@/lib/db";;

export function findStudySession(sessionId: string, userId: string) {
if (!sessionId || !userId) {
    throw new Error("Session ID is required to find a study session.");
  }
const studySession = prisma.studySession.findFirst({
    where: {
        id: sessionId,
        userId: userId,
    },
});
    if (!studySession) {
        throw new Error("Study session not found.");
    }
    return studySession;
}