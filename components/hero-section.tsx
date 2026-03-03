"use client"

import { useEffect, useRef, useState, useCallback } from "react"

function WordReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const words = text.split(" ")

  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span
            className="inline-block"
            style={{
              transform: visible ? "translateY(0) rotate(0deg)" : "translateY(120%) rotate(5deg)",
              transition: `transform 1s cubic-bezier(0.22, 1, 0.36, 1) ${i * 60}ms`,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  )
}

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute h-px w-px bg-primary-foreground/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: "100%",
            animation: `float ${12 + Math.random() * 10}s linear infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
    </div>
  )
}

function AnimatedCounter({ target, delay = 0 }: { target: string; delay?: number }) {
  const [value, setValue] = useState("00")
  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0
      const end = parseInt(target)
      const duration = 800
      const startTime = Date.now()
      function tick() {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        start = Math.round(eased * end)
        setValue(String(start).padStart(2, "0"))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(timer)
  }, [target, delay])
  return <span className="tabular-nums">{value}</span>
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let ticking = false
    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
  }, [])

  const heroOpacity = Math.max(0, 1 - scrollY / 800)
  const heroScale = 1 + scrollY * 0.0003

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-foreground text-primary-foreground"
      style={{ opacity: heroOpacity }}
    >
      {/* Animated noise overlay */}
      <div
        className="pointer-events-none absolute inset-[-50%] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: "noiseShift 8s steps(5) infinite",
        }}
      />

      {/* Rotating geometric decoration */}
      <div
        className="pointer-events-none absolute opacity-[0.04]"
        style={{
          width: "800px",
          height: "800px",
          animation: "rotateSlow 60s linear infinite",
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
        }}
      >
        <div className="absolute inset-0 border border-primary-foreground/20" style={{ borderRadius: "50%" }} />
        <div className="absolute inset-16 border border-primary-foreground/15" style={{ borderRadius: "50%" }} />
        <div className="absolute inset-32 border border-primary-foreground/10" style={{ borderRadius: "50%" }} />
      </div>

      <FloatingParticles />

      {/* Grid lines with parallax */}
      <div className="pointer-events-none absolute inset-0" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <div className="mx-auto h-full max-w-7xl">
          <div className="flex h-full justify-between px-6 lg:px-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-full w-px"
                style={{
                  background: `linear-gradient(to bottom, transparent, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent)`,
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 1.5s ease ${i * 100}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8"
        style={{
          transform: `scale(${heroScale}) translateY(${scrollY * -0.15}px) translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)`,
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Overline */}
        <div
          className="mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s",
          }}
        >
          <span className="inline-block border border-primary-foreground/15 px-6 py-2.5 text-[10px] tracking-[0.35em] uppercase text-primary-foreground/50">
            <span style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 1.5s ease 0.5s"
            }}>
              Електронна енциклопедія з української мови
            </span>
          </span>
        </div>

        {/* Title with word-by-word reveal */}
        <h1 className="mb-10">
          <span className="block font-serif text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl xl:text-9xl">
            <WordReveal text="Безсполучникове" delay={2000} />
          </span>
          <span className="mt-3 block font-serif text-5xl font-bold italic leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl xl:text-9xl">
            <WordReveal text="складне речення" delay={2300} />
          </span>
        </h1>

        {/* Animated separator */}
        <div className="mx-auto mb-10 flex items-center justify-center gap-3">
          <div
            className="h-px bg-primary-foreground/30"
            style={{
              width: isVisible ? "60px" : "0px",
              transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 2.6s",
              transformOrigin: "right",
            }}
          />
          <div
            className="h-1.5 w-1.5 bg-primary-foreground/40"
            style={{
              borderRadius: "50%",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scale(1)" : "scale(0)",
              transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1) 2.8s",
            }}
          />
          <div
            className="h-px bg-primary-foreground/30"
            style={{
              width: isVisible ? "60px" : "0px",
              transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 2.6s",
              transformOrigin: "left",
            }}
          />
        </div>

        {/* Subtitle */}
        <p
          className="mx-auto max-w-xl text-base leading-relaxed text-primary-foreground/45 sm:text-lg"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(25px)",
            transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1) 3s",
            filter: isVisible ? "blur(0px)" : "blur(4px)",
          }}
        >
          {"Синтаксична конструкція, частини якої з'єднуються без сполучників, лише за допомогою інтонації та розділових знаків"}
        </p>

        {/* Stats row */}
        <div
          className="mx-auto mt-14 flex max-w-md justify-center gap-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1) 3.3s",
          }}
        >
          <div className="text-center">
            <div className="font-mono text-2xl font-light text-primary-foreground/70">
              <AnimatedCounter target="06" delay={3500} />
            </div>
            <div className="mt-1 text-[9px] tracking-[0.25em] uppercase text-primary-foreground/30">
              Типів
            </div>
          </div>
          <div className="h-8 w-px bg-primary-foreground/10" />
          <div className="text-center">
            <div className="font-mono text-2xl font-light text-primary-foreground/70">
              <AnimatedCounter target="04" delay={3700} />
            </div>
            <div className="mt-1 text-[9px] tracking-[0.25em] uppercase text-primary-foreground/30">
              Розд. знаки
            </div>
          </div>
          <div className="h-8 w-px bg-primary-foreground/10" />
          <div className="text-center">
            <div className="font-mono text-2xl font-light text-primary-foreground/70">
              <AnimatedCounter target="06" delay={3900} />
            </div>
            <div className="mt-1 text-[9px] tracking-[0.25em] uppercase text-primary-foreground/30">
              Джерел
            </div>
          </div>
        </div>

        {/* Scroll indicator with pulse */}
        <div
          className="mt-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(15px)",
            transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1) 3.6s",
          }}
        >
          <a
            href="#definition"
            className="group relative inline-flex flex-col items-center gap-3 text-primary-foreground/35 no-underline transition-colors duration-500 hover:text-primary-foreground/70"
          >
            <span className="text-[9px] tracking-[0.35em] uppercase">
              Прокрутіть вниз
            </span>
            <div className="relative flex h-12 w-7 justify-center rounded-full border border-primary-foreground/15 pt-2">
              <div className="h-2.5 w-px animate-bounce bg-primary-foreground/40" />
              {/* Pulse rings */}
              <div
                className="absolute inset-0 rounded-full border border-primary-foreground/10"
                style={{ animation: "pulseRing 2s ease-out infinite" }}
              />
            </div>
          </a>
        </div>
      </div>

      {/* Corner decorations with animated draw */}
      <div
        className="pointer-events-none absolute top-8 left-8 h-20 w-20"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1s ease 3.5s",
        }}
      >
        <div className="absolute top-0 left-0 h-full w-px bg-primary-foreground/10" style={{ transformOrigin: "top", animation: isVisible ? "lineGrow 1s cubic-bezier(0.22,1,0.36,1) 3.5s both" : "none" }} />
        <div className="absolute top-0 left-0 h-px w-full bg-primary-foreground/10" style={{ transformOrigin: "left", animation: isVisible ? "lineGrow 1s cubic-bezier(0.22,1,0.36,1) 3.7s both" : "none" }} />
      </div>
      <div
        className="pointer-events-none absolute right-8 bottom-8 h-20 w-20"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1s ease 3.5s",
        }}
      >
        <div className="absolute right-0 bottom-0 h-full w-px bg-primary-foreground/10" style={{ transformOrigin: "bottom", animation: isVisible ? "lineGrow 1s cubic-bezier(0.22,1,0.36,1) 3.6s both" : "none" }} />
        <div className="absolute right-0 bottom-0 h-px w-full bg-primary-foreground/10" style={{ transformOrigin: "right", animation: isVisible ? "lineGrow 1s cubic-bezier(0.22,1,0.36,1) 3.8s both" : "none" }} />
      </div>
    </section>
  )
}
