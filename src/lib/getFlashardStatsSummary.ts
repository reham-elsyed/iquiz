import { formatTimeDelta } from "./utils";

export function getFeedbackSummary(feedbackData: { timeSpent: number; feedback: string }[]) {
    const durationMs = feedbackData.reduce((sum, f) => sum + f.timeSpent, 0);
    const totalQuestions = feedbackData.length;
    const averageTime = totalQuestions ? durationMs / totalQuestions : 0;
    const averageFormatted = formatTimeDelta(averageTime);

    const easyCount = feedbackData.filter(f => f.feedback === "EASY").length;
    const hardCount = feedbackData.filter(f => f.feedback === "HARD").length;

    const getDifficultyInsight = () => {
        if (easyCount === totalQuestions) return "Excellent! All questions felt easy to you.";
        if (hardCount === totalQuestions) return "This was challenging! Consider reviewing the material.";
        if (easyCount > hardCount) return "Great job! Most questions were manageable.";
        return "Good effort on a challenging set of questions.";
    };

    const getTimeInsight = () => {
        if (averageTime < 1.5) return "You answered quickly and confidently!";
        if (averageTime > 2.5) return "You took time to think through each question.";
        return "You maintained a steady pace throughout.";
    };

    const questionsPerMinute = totalQuestions
        ? (totalQuestions / (durationMs / 60000)).toFixed(1)
        : "0.0";

    const sessionEfficiency = easyCount >= hardCount ? "High" : "Moderate";

    // ✅ Return everything as one clean object
    return {
        durationMs,
        totalQuestions,
        averageTime,
        averageFormatted,
        easyCount,
        hardCount,
        questionsPerMinute,
        sessionEfficiency,
        difficultyInsight: getDifficultyInsight(),
        timeInsight: getTimeInsight(),
    };
}
