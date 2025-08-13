import prisma from "./db";

type GetUserGamesOptions = {
    limit?: number;                // limit number of games
    includeQuestions?: boolean;    // include all questions?
    weakOnly?: boolean;            // include only weak performance questions?
    since?: Date;                   // filter games by date
};

export const getUserGames = async (userId: string, opts: GetUserGamesOptions = {}) => {
    return prisma.game.findMany({
        where: {
            userId,
            ...(opts.since ? { timeStarted: { gte: opts.since } } : {}),
        },
        take: opts.limit || undefined,
        orderBy: { timeStarted: "desc" },
        include: opts.includeQuestions
            ? {
                questions: opts.weakOnly
                    ? {
                        where: {
                            OR: [
                                { isCorrect: false },
                                { percentageCorrect: { lt: 50 } },
                            ],
                        },
                    }
                    : true,
            }
            : undefined,
    });
};

// Now calculate streak in JS
function calculateStreak(games: { timeStarted: Date }[]) {
    let streak = 0;
    let currentDate = new Date();

    for (const s of games) {
        const diff = Math.floor(
            (currentDate.getTime() - s.timeStarted.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diff === 0 || diff === 1) {
            streak++;
            currentDate = s.timeStarted;
        } else {
            break;
        }
    }
    return streak;
}


export const avgScore = (gamesStat) => {
    const scor = gamesStat.reduce((sum, game) => {
        const total = game.questions.length;
        const correct = game.questions.filter(q => q.isCorrect).length;
        return sum + (total ? correct / total : 0);
    }, 0) / gamesStat.length;

    return scor
}


//study time



export const totalMinutes = (games) => {
    let currentDate = new Date();
    const total = games.reduce((sum, s) => {
        return sum + ((s.timeEnded?.getTime() || currentDate.getTime() - s.timeStarted.getTime()) / 1000 / 60);
    }, 0);

    const hours = Math.floor(total / 60);
    const minutes = Math.floor(total % 60);

    return `${hours}h ${minutes}m`
}

