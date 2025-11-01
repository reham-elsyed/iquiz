import { SquareM } from "lucide-react";
import React from "react";
import { ElementLoader, SkeletonLoader, SpinDotsLoader, WaveLoader } from 'react-loadly';
type Props = {};

const Loading = (props: Props) => {
  return (
    <div
      className="flex items-center justify-center h-screen "
      aria-label="Loading"
    >
      <SpinDotsLoader
        color="#ff8080"
        size={58}
        speed={1.9}
        loadingText="Loading..."
        dots={8}
        gap={4}
        showText={true}
      />


    </div>
  );
};

export default Loading;
