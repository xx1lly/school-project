"use client"

import { useEffect, useState } from "react"

export function IntroLoader() {
  const [phase, setPhase] = useState<"loading" | "revealing" | "done">("loading")
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Counting animation
    const duration = 1800
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * 100))
      if (progress >= 1) {
        clearInterval(interval)
        setTimeout(() => setPhase("revealing"), 200)
        setTimeout(() => setPhase("done"), 1200)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [])

  if (phase === "done") return null

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-foreground"
      style={{
        transition: "transform 1s cubic-bezier(0.76, 0, 0.24, 1)",
        transform: phase === "revealing" ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div
        className="flex flex-col items-center gap-6"
        style={{
          transition: "opacity 0.4s ease, transform 0.4s ease",
          opacity: phase === "revealing" ? 0 : 1,
          transform: phase === "revealing" ? "scale(0.9)" : "scale(1)",
        }}
      >
        {/* Logo */}
        <div className="flex h-14 w-14 items-center justify-center border border-primary-foreground/30 text-lg font-bold tracking-widest text-primary-foreground">
          E
        </div>

        {/* Counter */}
        <div className="font-mono text-5xl font-light tabular-nums tracking-tight text-primary-foreground">
          {String(count).padStart(3, "0")}
        </div>

        {/* Loading bar */}
        <div className="h-px w-48 overflow-hidden bg-primary-foreground/10">
          <div
            className="h-full bg-primary-foreground transition-[width] duration-100 ease-linear"
            style={{ width: `${count}%` }}
          />
        </div>

        <p className="text-[10px] tracking-[0.4em] uppercase text-primary-foreground/40">
          Завантаження
        </p>
      </div>
    </div>
  )
}
