import { TopicStyle } from "@/types/weakQuestionsPerformanceTypes";

export const styles: TopicStyle[] = [{
    background: "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/50 dark:to-gray-900/50",
    badge: "bg-gray-500 text-white",
    text: "text-gray-900 dark:text-gray-100",
    accent: "border-gray-200 dark:border-gray-800"
},
{
    background: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50",
    badge: "bg-orange-500 text-white",
    text: "text-orange-900 dark:text-orange-100",
    accent: "border-orange-200 dark:border-orange-800"
},
{
    background: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50",
    badge: "bg-emerald-500 text-white",
    text: "text-emerald-900 dark:text-emerald-100",
    accent: "border-emerald-200 dark:border-emerald-800"
},
{
    background: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50",
    badge: "bg-blue-500 text-white",
    text: "text-blue-900 dark:text-blue-100",
    accent: "border-blue-200 dark:border-blue-800"
},
{
    background: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50",
    badge: "bg-purple-500 text-white",
    text: "text-purple-900 dark:text-purple-100",
    accent: "border-purple-200 dark:border-purple-800"
},
{
    background: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50",
    badge: "bg-orange-500 text-white",
    text: "text-orange-900 dark:text-orange-100",
    accent: "border-orange-200 dark:border-orange-800"
},];

type Topic = string;

type ColorsMap = Record<string, TopicStyle>;

export const topicColorsFormatter = (topics: string[]): ColorsMap => {
    const colorsMap: ColorsMap = {};
    topics.map((topic: Topic, index: number) => {
        colorsMap[topic] = styles[index % styles.length];
    });
    return colorsMap;
}
