import prisma from "./db";

export async function getEachTopicQuizesId() {
    const games = await prisma.game.findMany({
        where: { gameType: { in: ["mcq", "open_ended", "flash_card"] } },
        select: {
            id: true,
            topic: true,
            gameType: true,
        },
    });

    // Group games by topic
    const grouped = games.reduce((acc, game) => {
        const topic = game.topic || "untitled"; // handle null topics safely
        if (!acc[topic]) {
            acc[topic] = [];
        }
        acc[topic].push({
            id: game.id,
            gameType: game.gameType,
        });
        return acc;
    }, {} as Record<string, { id: string; gameType: string }[]>);

    // Convert to the desired array format
    return Object.entries(grouped).map(([topic, quizes]) => ({
        topic,
        quizes,
    }));
}