import prisma from "./db";



export const totalQuizzes = async (userId: string) => {
    return + await prisma.game.count({
        where: { userId }
    });
}
//streak query
const sessions = await prisma.game.findMany({
    where: { userId },
    orderBy: { timeStarted: 'desc' },
    select: { timeStarted: true }
});

// Now calculate streak in JS
function calculateStreak(sessions: { createdAt: Date }[]) {
    let streak = 0;
    let currentDate = new Date();

    for (const s of sessions) {
        const diff = Math.floor(
            (currentDate.getTime() - s.createdAt.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diff === 0 || diff === 1) {
            streak++;
            currentDate = s.createdAt;
        } else {
            break;
        }
    }
    return streak;
}

const currentStreak = calculateStreak(sessions);
//average score 
const gamesWithScores = await prisma.game.findMany({
    where: { userId },
    include: {
        questions: {
            select: { isCorrect: true }
        }
    }
});

const avgScore =
    gamesWithScores.reduce((sum, game) => {
        const total = game.questions.length;
        const correct = game.questions.filter(q => q.isCorrect).length;
        return sum + (total ? correct / total : 0);
    }, 0) / gamesWithScores.length;

console.log(`Average Score: ${(avgScore * 100).toFixed(2)}%`);

//study time

const sessionsWithTime = await prisma.game.findMany({
    where: { userId, timeEnded: { not: null } },
    select: { timeStarted: true, timeEnded: true }
});

const totalMinutes = sessionsWithTime.reduce((sum, s) => {
    return sum + ((s.timeEnded!.getTime() - s.timeStarted.getTime()) / 1000 / 60);
}, 0);

const hours = Math.floor(totalMinutes / 60);
const minutes = Math.floor(totalMinutes % 60);

console.log(`${hours}h ${minutes}m`);
//global rank
const usersWithScores = await prisma.user.findMany({
    include: {
        games: {
            include: { questions: { select: { isCorrect: true } } }
        }
    }
});

const userScores = usersWithScores.map(user => {
    const avg =
        user.games.reduce((sum, game) => {
            const total = game.questions.length;
            const correct = game.questions.filter(q => q.isCorrect).length;
            return sum + (total ? correct / total : 0);
        }, 0) / (user.games.length || 1);
    return { id: user.id, avg };
});

userScores.sort((a, b) => b.avg - a.avg);

const globalRank = userScores.findIndex(u => u.id === userId) + 1;

console.log(`#${globalRank}`);
