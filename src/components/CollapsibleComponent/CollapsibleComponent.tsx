'use client'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"

export default function CollapsibleSimple({ topic }: { topic: string }) {

  type Quiz = { id: string; topic: string };

  async function GetEachTopicQuizesId(): Promise<Quiz[]> {
    const response = await axios.get(`/api/gamesByTopic?topic=${topic}`);
    return response.data.games as Quiz[];
  }
  const { data, error, isLoading } = useQuery<Quiz[]>({
    queryKey: ['quizezByTopic', topic],
    queryFn: GetEachTopicQuizesId
  })
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
          <div className="rounded-md border px-4 py-3 text-sm w-full">
            {isLoading && <div>Loading...</div>}
            {error && <div>Error loading quizzes.</div>}
            {data && data.length === 0 && <div>No quizzes found for this topic.</div>}
            {data && data?.length > 0 && (
              <ul className="list-disc list-inside space-y-1">
                {data.map((quiz, i) => (<li
                  className="card-app w-full"
                  key={quiz.id}>

                  <div className="app-card-content">
                    {/* Title */}
                    <h3 className="text-base font-semibold text-foreground">
                      {quiz.topic} — Quiz #{i + 1}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Test your knowledge in <span className="font-medium">{quiz.topic}</span>.
                      This quiz includes curated questions designed to challenge your understanding
                      and help you strengthen your skills.
                    </p>

                    {/* CTA */}
                    <div className="flex justify-end pt-3">
                      <Button
                        variant="default"
                        className="rounded-md text-sm font-medium app-button"
                        onClick={() => console.log(`Start quiz ${quiz.id}`)}
                      >
                        Take Test
                      </Button>
                    </div></div>
                </li>))}
              </ul>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}