import { useState, useEffect, useRef } from "react"

const useIncreament = (startValue: number, endValue: number): number => {
    const [value, setValue] = useState(startValue)
    const duration = (endValue - startValue) * 1000
    const startTimeRef = useRef<number | null>(null)
    const animationFrameRef = useRef<number | null>(null)

    useEffect(() => {
        const startAnimation = (timestamp: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp
            }

            const elapsedTime = timestamp - startTimeRef.current
            const progress = elapsedTime / duration
            const diff = endValue - startValue
            const newValue = startValue + Math.floor(diff * progress)

            setValue(newValue)

            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(startAnimation)
            }
        }

        animationFrameRef.current = requestAnimationFrame(startAnimation)

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [startValue, endValue])

    return value
}

export default useIncreament
