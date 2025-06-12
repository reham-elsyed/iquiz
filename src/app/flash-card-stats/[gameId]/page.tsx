import FlashCardStats from '@/components/FlashCardStats/FlashCardStats'
import { findStudySession, findStudySessionFeedback } from '@/lib/findStudySession';
import { getAuthSession } from '@/lib/nextAuth';
import { redirect } from 'next/navigation';
import React from 'react'
type Props= {
    gameId?: string;
}
const flashcardStatistics= async ({gameId}:Props) => {
const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }
  const studySessionId = await findStudySession(gameId as string, session.user.id)
    const studySessionFeedback=await findStudySessionFeedback(studySessionId?.id as string);

    if(!studySessionFeedback) {
      redirect("/");
    }
  if (studySessionFeedback?.length === 0) {
    redirect("/");
  }
  return (
    <div> flashcardStatistics
        <h1 className='text-2xl font-bold'>Flashcard Statistics</h1>
        <div>
          {studySessionFeedback.map((feedback) => (
            <div key={feedback.id} className='mb-4'>
              <p>Question ID: {feedback.questionId}</p>
              <p>Feedback: {feedback.feedback}</p>
              <p>Time Spent: {feedback.timeSpent} seconds</p>
              <p>Session ID: {feedback.sessionId}</p>
              <p>Created At: {new Date(feedback.createdAt).toLocaleString()}</p>
            </div>
          ))}
            <FlashCardStats/>
        </div>
    </div>
  )
}

export default flashcardStatistics
