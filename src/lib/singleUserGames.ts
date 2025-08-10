import prisma from "./db";
const singleUserGames = async (userId: string, limit: number) => {
  const games = await prisma.game.findMany({
    where: {
      userId,
    },
    take: limit,
    orderBy: {
      timeStarted: "desc",
    },
  });
  console.log("-------single user games", games)
  return games
}
export default singleUserGames