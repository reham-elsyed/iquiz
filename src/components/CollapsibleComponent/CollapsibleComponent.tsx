
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { getEachTopicQuizesId } from "@/lib/quizesOfTopic"
import { useQuery } from "@tanstack/react-query"
import React from "react"

export default function CollapsibleSimple({ topic }: { topic: string }) {

  const data = async () => {
    if (!topic) return []
    const res = await getEachTopicQuizesId(topic)
    console.log("-------quizes of topic", res)
    return res
  }
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['quizezByTopic', topic],
  //   queryFn: HandlegetEachTopicQuizesId
  // })
  return (
    <div

      className="w-full p-6 flex justify-start">
      <Collapsible className="w-[350px] space-y-2">
        <CollapsibleTrigger
          className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-2 font-medium [&[data-state=open]>svg]:rotate-180">
          Explore tests
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition-transform duration-200"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 text-sm">
            {/* {isLoading && <div>Loading...</div>}
            {error && <div>Error loading quizzes.</div>}
            {data && data.length === 0 && <div>No quizzes found for this topic.</div>} */}
            {data && data.length > 0 && (
              <ul className="list-disc list-inside space-y-1">
                {data.map((quiz, i) => (<li key={quiz.id}>{quiz.topic} quiz No. {i + 1}: {quiz.id.slice(0, 3)} </li>))}
              </ul>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}