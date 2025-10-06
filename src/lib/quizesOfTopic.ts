import prisma from "./db";

// async function quizesByTopic() {
//     const games = await prisma.game.groupBy({
//         by: ['topic'],
//         _count: { id: true },
//         orderBy: {
//             _count: { id: 'desc' }
//         },
//         take: 10
//     })
//     let quizesByTopics = []
//     for (let game of games) {
//         const quizes = await getEachTopicQuizesId(game.topic)
//         quizesByTopics.push({ quizes: quizes })
//     }
// }
export async function getEachTopicQuizesId(topic: string) {
    console.log("-------topic in lib", topic)
    const games = await prisma.game.findMany({
        where: { topic: topic },
        select: { id: true, topic: true }
    })
    console.log("-------games in lib", games)
    return games
}