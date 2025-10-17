import prisma from "./db";

export default async function getRecentActivityGameData(userId: string) {
    const games = await prisma.game.findMany({
        where: {
            userId,
            gameType: { in: ["mcq", "open_ended", "flash_card"] },
        },
        take: 20,
        orderBy: { timeStarted: "desc" },
        include: {
            _count: { select: { questions: true } },
            questions: {
                select: { isCorrect: true, percentageCorrect: true },
            },
        },
    });

    const formatted = games.map((game) => {
        const total = game._count.questions || 0;

        // ✅ count accurate questions safely
        const accurateCount = game.questions.filter((q) => {
            const isCorrect = q.isCorrect ?? false;
            const percent = q.percentageCorrect ?? 0;
            return isCorrect || percent > 50;
        }).length;

        // ✅ calculate accuracy percentage
        const accuracy = total > 0 ? Math.round((accurateCount / total) * 100) : 0;

        return {
            id: game.id,
            topic: game.topic, // or game.name / game.title depending on your schema
            gameType: game.gameType,
            timeStarted: game.timeStarted,
            accuracy,
            questionsCount: total,
        };
    });

    return formatted;
}
