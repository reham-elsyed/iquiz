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
export function calculateStreak(games: { timeStarted: Date }[]) {
    if (!games.length) return 0;

    // Sort games from newest to oldest
    const sortedGames = [...games].sort(
        (a, b) => b.timeStarted.getTime() - a.timeStarted.getTime()
    );

    let streak = 0;
    let currentDate = new Date(); // start from today

    for (const game of sortedGames) {
        const diff = Math.floor(
            (currentDate.getTime() - game.timeStarted.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diff === 0 || diff === 1) {
            streak++;
            currentDate = game.timeStarted; // move streak date back to this game's day
        } else {
            break; // streak broken
        }
    }

    return streak;
}



export const avgScore = (gamesStat) => {
    const scor = gamesStat.reduce((sum, game) => {
        const total = game.questions.length;
        const correct = game.questions.filter(q => q.isCorrect || q.percentageCorrect > 50).length;
        return sum + (total ? correct / total : 0);
    }, 0) / gamesStat.length;

    return +(scor * 100).toFixed(1);
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
export function calculateBestStreak(games: { timeStarted: Date }[]) {
    if (!games.length) return 0;

    // Sort ascending by date
    const sortedGames = [...games].sort(
        (a, b) => a.timeStarted.getTime() - b.timeStarted.getTime()
    );

    let bestStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sortedGames.length; i++) {
        const prevDate = new Date(sortedGames[i - 1].timeStarted);
        const currentDate = new Date(sortedGames[i].timeStarted);

        // Normalize both dates to midnight so times don't affect diff
        prevDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        const diffDays =
            (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
            currentStreak++;
        } else if (diffDays > 1) {
            currentStreak = 1; // streak broken
        }
        // If diffDays === 0, same day → ignore without reset

        if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
        }
    }

    return bestStreak;
}

