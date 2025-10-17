import React from "react";
import { WaveLoader } from 'react-loadly';
type Props = {};

const Loading = (props: Props) => {
  return (
    <div
      className="flex items-center justify-center h-screen "
      aria-label="Loading"
    >
      <WaveLoader
        color="#f50591"
        size={67}
        speed={1}
        loadingText="Loading..."
      />
    </div>
  );
};

export default Loading;
