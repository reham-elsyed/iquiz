import prisma from "./db";

async function quizesByTopic() {
    const games = await prisma.game.groupBy({
        by: ['topic'],
        _count: { id: true },
        orderBy: {
            _count: { id: 'desc' }
        },
        take: 10
    })
}