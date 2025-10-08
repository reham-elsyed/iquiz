import React from "react";

const GradientEffect = () => {
    return (
        <div className="absolute inset-0 overflow-hidden -z-50">
            {/* Base background color */}
            <div
                className="absolute inset-0"
                style={{ background: "var(--background)" }}
            />

            {/* Layered gradient blurs */}
            <div className="absolute inset-0">
                {/* Primary accent blur - top left */}
                <div
                    className="absolute rounded-full blur-[12vw] opacity-40"
                    style={{
                        background: "var(--primary)",
                        top: "-10vw",
                        left: "-8vw",
                        width: "25vw",
                        height: "25vw",
                    }}
                />

                {/* Secondary accent blur - bottom right */}
                <div
                    className="absolute rounded-full blur-[15vw] opacity-60"
                    style={{
                        background: "var(--accent)",
                        bottom: "-5vw",
                        right: "-5vw",
                        width: "28vw",
                        height: "28vw",
                    }}
                />

                {/* Muted highlight - center overlay */}
                <div
                    className="absolute rounded-full blur-[20vw] opacity-40"
                    style={{
                        background: "var(--foreground)",
                        top: "30%",
                        left: "25%",
                        width: "30vw",
                        height: "30vw",
                    }}
                />
            </div>
        </div>
    );
};

export default GradientEffect;
