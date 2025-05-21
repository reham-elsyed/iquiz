import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-[hsl(var(--background))]"
      aria-label="Loading"
    >
      <div
        className="w-16 h-16 border-4 border-[hsl(var(--muted))] border-t-[hsl(var(--primary))] rounded-full animate-spin"
        role="status"
        aria-busy="true"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
