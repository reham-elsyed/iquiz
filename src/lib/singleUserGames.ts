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
  // console.log("-------single user games", games)
  return games
}
export default singleUserGames

export const singeUserWeekPerformanceQuestions = async (userId: string, limit: number) => {
  const games = await prisma.game.findMany({
    where: {
      userId,
      gameType: { in: ["mcq", "open_ended"] },
    },
    take: 10,
    orderBy: { timeStarted: "desc" },
    include: {
      questions: {
        where: {
          OR: [
            { isCorrect: false },
            { percentageCorrect: { lt: 50 } },
          ]
        },
      },
    },
  });
  console.log("-------single user week performance questions", games)
  const gamesTopicQuestionsWithWeakPerformance = games.map(game => {
    return {
      gameId: game.id,
      questions: game.questions.map(question => ({
        questionId: question.id,
        question: question.question,
        answer: question.answer,
        questionType: question.questionType,
      })),
    }
  })
  console.log("Games with weak performance:", gamesTopicQuestionsWithWeakPerformance[0]?.questions[0]);
  return gamesTopicQuestionsWithWeakPerformance;
}
