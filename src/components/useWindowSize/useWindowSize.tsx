import { useState, useEffect } from "react";

interface Size {
    width: number,
    height: number
}

const useWindowSize = (): Size => {
    const [windowSize, SetWindowSize] = useState<Size>({ width: 0, height: 0 })

    const resizeHandler = () => {
        SetWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }
    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        resizeHandler()

        return () => {
            window.removeEventListener("resize", resizeHandler)
        }

    }, [])

    return windowSize
}

export default useWindowSize