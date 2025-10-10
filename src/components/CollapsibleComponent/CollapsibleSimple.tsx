'use client'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from "react"
import { quizesByTopicsArraySchema } from "@/app/schemas/formSchema/quizSchema"
import { z } from "zod"
import TakeQuizButton from "../Buttons/TakeQuizButton/TakeQuizButton"
import { Badge } from "../ui/badge"

export default function CollapsibleSimple({ topic }: { topic: string }) {


  async function getEachTopicQuizesId(): Promise<z.infer<typeof quizesByTopicsArraySchema>> {
    const response = await axios.get(`/api/gamesByTopic?topic=${topic}`);
    return response.data.games;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['quizezByTopic', topic],
    queryFn: getEachTopicQuizesId
  })
  return (
    <div

      className="w-full p-6 flex justify-start">
      <Collapsible className="w-full space-y-2">
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
        </CollapsibleTrigger >
        <CollapsibleContent className="space-y-2 w-full grow">
          <div className="rounded-md border px-4 py-3 text-sm w-full">
            {isLoading && <div>Loading...</div>}
            {error && <div>Error loading quizzes.</div>}
            {data && data.length === 0 && <div>No quizzes found for this topic.</div>}
            {data && data?.length > 0 && (
              <ul className=" list-inside space-y-1">
                {data.map((quiz, i) => (<li
                  className="card-app w-full list-none"
                  key={quiz.id}>

                  <div className="app-card-content">
                    {/* Title */}
                    <h3 className="text-base font-semibold text-foreground">
                      {quiz.topic} — Quiz #{i + 1}
                    </h3>
                    <Badge variant={'secondary'} className="inline-block">{quiz.gameType}</Badge>
                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Test your knowledge in <span className="font-medium">{quiz.topic}</span>.
                      This quiz includes curated questions designed to challenge your understanding
                      and help you strengthen your skills.
                    </p>

                    {/* CTA */}
                    <div className="flex justify-end pt-3">
                      <TakeQuizButton text="Take quiz" id={quiz.id} gameType={quiz.gameType} />
                    </div></div>
                </li>))}
              </ul>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div >
  )
}