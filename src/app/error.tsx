"use client";
import React from "react";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-[hsl(var(--destructive))]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.29 3.86L1.82 19.02A1 1 0 002.73 21h18.54a1 1 0 00.91-1.98L13.71 3.86a1 1 0 00-1.72 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v4m0 4h.01"
          />
        </svg>
        <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
          Error
        </h1>
      </div>
      <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
        {process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong. Please try again later."}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] rounded-md hover:bg-[hsl(var(--primary), 70%)] focus:ring focus:ring-[hsl(var(--ring))] focus:outline-none"
      >
        Retry
      </button>
    </div>
  );
};

export default Error;
