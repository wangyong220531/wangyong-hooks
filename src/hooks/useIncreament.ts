import { useState, useEffect, useRef } from "react"

const useIncreament = (initialTargetValue: number, duration: number): [number, (e: number) => void] => {
    const [value, setValue] = useState(0)
    const targetValueRef = useRef(initialTargetValue)
    const startTimeRef = useRef<number | null>(null)
    const animationFrameRef = useRef<number | null>(null)
    const startValueRef = useRef<number>(0)
    const [isIt, setIsIt] = useState(false)

    useEffect(() => {
        const startAnimation = (timestamp: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp
            }

            const elapsedTime = timestamp - startTimeRef.current
            const progress = elapsedTime / duration
            const diff = targetValueRef.current - startValueRef.current
            const newValue = Math.floor(startValueRef.current + diff * progress)

            setValue(newValue)

            if (Math.floor(progress) < 1) {
                animationFrameRef.current = requestAnimationFrame(startAnimation)
            } else {
                setValue(targetValueRef.current)
            }
        }

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
        }

        startValueRef.current = value

        if (!isIt) {
            targetValueRef.current = initialTargetValue
        }

        startTimeRef.current = null

        animationFrameRef.current = requestAnimationFrame(startAnimation)

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
                setIsIt(false)
            }
        }
    }, [targetValueRef.current])

    const changeValue = (e: number) => {
        targetValueRef.current = e
        setIsIt(true)
    }

    return [value, changeValue]
}

export default useIncreament
