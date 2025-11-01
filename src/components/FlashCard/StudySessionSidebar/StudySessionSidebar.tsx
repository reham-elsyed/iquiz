import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { durationOfQuiz } from '@/lib/utils';
import { set } from 'date-fns';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import React from 'react';

// Define a type for QuestionWithFeedback for better type safety
type QuestionWithFeedback = {
  id: string; // Assuming an ID is present
  question: string;
  feedback?: 'EASY' | 'MEDIUM' | 'HARD' | string | null;
  // Add other properties if needed
};

type Props = {
  setStoredValue?: (value: number) => void;
  startOfStudySession?: Date;
  numberOfCards?: number;
  progressValue?: number;
  studysessionId?: string;
  questionsWithFeedback?: QuestionWithFeedback[]; // Use the defined type
}

export const StudySessionSidebar = ({
  setStoredValue,
  startOfStudySession,
  numberOfCards,
  progressValue,
  questionsWithFeedback
}: Props) => {
  // Calculate duration only if startOfStudySession is provided
  const duration = startOfStudySession
    ? durationOfQuiz(new Date(), startOfStudySession)
    : null;

  // Use progressValue if provided, otherwise default to 0 for ProgressBar
  const currentProgress = progressValue !== undefined ? progressValue : 0;

  return (
    <div className='flex flex-col h-full'>

      {/* --- Progress and Duration Section --- */}
      <div className='p-4 bg-white shadow-md rounded-lg mb-6'>
        {duration && (
          <div className='mb-4 text-center text-sm font-semibold text-gray-700'>
            ⏱️ Time Elapsed: **{duration}**
          </div>
        )}
        {/* Fixed the ProgressBar to use props */}
        <ProgressBar value={currentProgress} max={numberOfCards || 1} />
        <div className="text-center text-xs text-gray-500 mt-2">
          Card {currentProgress} of {numberOfCards || '?'}
        </div>
      </div>

      {/* --- Progress Detail Section --- */}
      <div className="flex-grow overflow-y-auto p-4 bg-white shadow-md rounded-lg">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Review Progress</h3>

        {questionsWithFeedback && questionsWithFeedback.length > 0 ? (
          <div className="space-y-3">
            {questionsWithFeedback.map((q, index) => (
              <div
                key={q.id || index}
                className="flex items-start p-3 border rounded-md transition-shadow hover:shadow-sm"
              >
                {/* Card Number and Question Text */}
                <div
                  onClick={() => { setStoredValue && setStoredValue(index); }}
                  className="flex-1 min-w-0">
                  <span className="font-medium text-sm text-gray-600 mr-2 block sm:inline">
                    Card {index + 1}:
                  </span>
                  <p className="text-sm font-semibold truncate text-gray-900">
                    {q.question}
                  </p>
                </div>

                {/* Feedback Icon */}
                <div className="ml-3 flex-shrink-0">
                  {q.feedback === 'EASY' && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" aria-label="Easy" role="img" />
                  )}
                  {q.feedback === 'MEDIUM' && (
                    <AlertCircle className="w-5 h-5 text-yellow-500" aria-label="Medium" role="img" />
                  )}
                  {q.feedback === 'HARD' && (
                    <XCircle className="w-5 h-5 text-red-500" aria-label="Hard" role="img" />
                  )}
                  {!q.feedback && (
                    <span className="text-xs text-gray-400">...</span>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No questions or feedback data available yet.</p>
        )}
      </div>
    </div>
  );
};