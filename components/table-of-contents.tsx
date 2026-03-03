"use client"

import { useEffect, useState, useRef } from "react"

const sections = [
  { id: "definition", label: "Визначення" },
  { id: "types", label: "Типи відношень" },
  { id: "punctuation", label: "Розділові знаки" },
  { id: "examples", label: "Приклади" },
  { id: "comparison", label: "Порівняння" },
  { id: "sources", label: "Джерела" },
]

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>("")
  const [indicatorTop, setIndicatorTop] = useState(0)
  const navRef = useRef<HTMLUListElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Update indicator position
  useEffect(() => {
    if (!navRef.current || !activeId) return
    const activeIndex = sections.findIndex((s) => s.id === activeId)
    if (activeIndex >= 0) {
      const links = navRef.current.querySelectorAll("li")
      if (links[activeIndex]) {
        const rect = links[activeIndex].getBoundingClientRect()
        const navRect = navRef.current.getBoundingClientRect()
        setIndicatorTop(rect.top - navRect.top)
      }
    }
  }, [activeId])

  return (
    <nav
      className="hidden lg:block"
      aria-label="Table of contents"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-20px)",
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <p className="mb-6 text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
        Зміст
      </p>
      <div className="relative">
        {/* Sliding indicator */}
        <div
          className="absolute left-0 h-8 w-0.5 bg-foreground"
          style={{
            top: `${indicatorTop}px`,
            transition: "top 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        <ul ref={navRef} className="flex flex-col gap-0 border-l border-border">
          {sections.map(({ id, label }, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="block py-2 pl-5 text-sm no-underline transition-all duration-400"
                style={{
                  color: activeId === id ? "oklch(0.1 0 0)" : "oklch(0.45 0 0)",
                  fontWeight: activeId === id ? 500 : 400,
                  paddingLeft: activeId === id ? "24px" : "20px",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(-10px)",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Info box with reveal */}
      <div
        className="mt-10 border border-border p-5 transition-all duration-500 hover:bg-secondary/50"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(15px)",
          transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s, background-color 0.5s ease",
        }}
      >
        {[
          { label: "Дата публікації", value: "Березень 2026" },
          { label: "Категорія", value: "Синтаксис" },
          { label: "Мова", value: "Українська" },
        ].map((item, i, arr) => (
          <div key={item.label}>
            <p className="mb-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              {item.label}
            </p>
            <p className="text-sm text-foreground">{item.value}</p>
            {i < arr.length - 1 && <div className="my-4 h-px bg-border" />}
          </div>
        ))}
      </div>
    </nav>
  )
}
