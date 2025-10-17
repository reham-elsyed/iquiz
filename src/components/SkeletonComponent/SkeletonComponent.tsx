import React from "react";
import { AutoSkeletonLoader, SkeletonLoader } from "react-loadly";

// type Props = {
//     loading: boolean;
//     component: any;
// };

export function SkeletonComponent() {

    return <SkeletonLoader
        lines={3}
        color="#f0f0f0"
        highlightColor="#e0e0e0"
        shimmerColor="rgba(255, 255, 255, 0.6)"
        spacing="900px"
        shimmer={true}
        waveWidth="200px"
        waveDirection="left-to-right"
        speed={1.5}
    />
}