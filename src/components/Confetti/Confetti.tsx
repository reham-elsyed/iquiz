"use client"

import { useEffect } from "react"
import confetti from "canvas-confetti"

export function ConfettiSideCannons() {
    useEffect(() => {
        const end = Date.now() + 3 * 1000 // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]

        const frame = () => {
            if (Date.now() > end) return

            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
                colors,
                zIndex: 100
            })
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
                colors,
                zIndex: 100
            })

            requestAnimationFrame(frame)
        }

        frame()
    }, []) // ✅ runs once on page load

    return null // no need for a button 
}
