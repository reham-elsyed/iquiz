import prisma from "./db";

export async function getEachTopicQuizesId(topic: string) {
    const games = await prisma.game.findMany({
        where: { topic: topic, gameType: { in: ["mcq", "open_ended"] } },
        select: { id: true, topic: true, gameType: true }
    })
    return games
}