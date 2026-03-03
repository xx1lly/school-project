"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let currentScale = 1
    let targetScale = 1

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    function animate() {
      // Smooth follow for ring
      ringX += (mouseX - ringX) * 0.06
      ringY += (mouseY - ringY) * 0.06
      currentScale += (targetScale - currentScale) * 0.1

      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`
      ring.style.transform = `translate(-50%, -50%) scale(${currentScale})`

      requestAnimationFrame(animate)
    }

    function onMouseDown() {
      setIsClicking(true)
      targetScale = 0.6
    }
    function onMouseUp() {
      setIsClicking(false)
      targetScale = isHovering ? 2.5 : 1
    }

    // Detect hoverable elements
    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.closest(".magnetic-card")
      ) {
        setIsHovering(true)
        targetScale = 2.5
      }
    }
    function onMouseOut(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.closest(".magnetic-card")
      ) {
        setIsHovering(false)
        targetScale = 1
      }
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseover", onMouseOver)
    document.addEventListener("mouseout", onMouseOut)
    animate()

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseover", onMouseOver)
      document.removeEventListener("mouseout", onMouseOut)
    }
  }, [isHovering])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[200] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 lg:block"
        style={{
          borderRadius: "50%",
          background: "oklch(0.1 0 0)",
          mixBlendMode: "difference",
          transition: "width 0.3s, height 0.3s, background 0.3s",
          ...(isHovering
            ? { width: "6px", height: "6px", background: "oklch(0.985 0 0)" }
            : {}),
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[199] hidden h-10 w-10 lg:block"
        style={{
          borderRadius: "50%",
          border: isHovering
            ? "1px solid oklch(0.1 0 0 / 0.6)"
            : "1px solid oklch(0.1 0 0 / 0.15)",
          mixBlendMode: "difference",
          transition: "border 0.4s, opacity 0.4s",
          opacity: isClicking ? 0.5 : 1,
        }}
      />
    </>
  )
}
