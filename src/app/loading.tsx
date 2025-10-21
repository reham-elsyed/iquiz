import React from "react";
import { ElementLoader, WaveLoader } from 'react-loadly';
type Props = {};

const Loading = (props: Props) => {
  return (
    <div
      className="flex items-center justify-center h-screen "
      aria-label="Loading"
    >
      <ElementLoader
        color="#ff8080"
        size={50}
        speed={1}
        loadingText="Loading..."
        animationType="spin"
        glowIntensity={0.5}
      />

    </div>
  );
};

export default Loading;
