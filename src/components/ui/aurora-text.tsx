"use client"

import React, { memo } from "react"
import colors from "tailwindcss/colors";
interface AuroraTextProps {
  children: React.ReactNode
  className?: string
  colorsA?: string[]
  speed?: number
}

export const AuroraText = memo(
  ({
    children,
    className = "",
    colorsA = ["var(--aurora-1)",
      "var(--aurora-2)",
      " var(--aurora-3)",
      " var(--aurora-4)"],
    speed = 1,
  }: AuroraTextProps) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colorsA.join(", ")}, ${colorsA[0]
        })`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`,
    }

    return (
      <span className={`relative inline-block ${className}`}>
        <span className="sr-only">{children}</span>
        <span
          className="animate-aurora relative bg-[length:200%_auto] bg-clip-text text-transparent"
          style={gradientStyle}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    )
  }
)

AuroraText.displayName = "AuroraText"
