"use client"

import { useEffect, useRef } from "react"

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationFrame: number
    let currentWidth = 0

    function update() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const targetWidth = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      // Smooth lerp
      currentWidth += (targetWidth - currentWidth) * 0.1
      if (Math.abs(currentWidth - targetWidth) < 0.01) currentWidth = targetWidth

      if (barRef.current) {
        barRef.current.style.width = `${currentWidth}%`
      }
      if (bgRef.current) {
        bgRef.current.style.opacity = currentWidth > 0 ? "1" : "0"
      }

      animationFrame = requestAnimationFrame(update)
    }

    animationFrame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div ref={bgRef} className="fixed top-0 left-0 z-[100] h-[2px] w-full opacity-0 transition-opacity duration-500">
      <div
        ref={barRef}
        className="scroll-glow h-full bg-foreground"
        style={{ width: "0%", willChange: "width" }}
      />
    </div>
  )
}
