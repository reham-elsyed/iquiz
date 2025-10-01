'use client'
import React, { memo } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const AnimationRobot = () => {
    return (
        <div className="w-full "> {/* optional size */}
            <DotLottieReact
                src="https://lottie.host/aa312ea6-183f-4ea2-a4c9-d5a79ce25e40/nvI2g32D49.lottie"
                loop
                autoplay
                width={"100%"}
                height={"100%"}
            />
        </div>
    )
}

export default memo(AnimationRobot)
