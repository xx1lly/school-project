"use client"

import { useEffect, useRef, useState } from "react"

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={ref} className="border-t border-border bg-foreground text-primary-foreground overflow-hidden">
      {/* Large reveal text */}
      <div className="overflow-hidden border-b border-primary-foreground/10 py-12">
        <div
          className="mx-auto max-w-7xl px-6 lg:px-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(60px)",
            transition: "all 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <p className="font-serif text-4xl font-bold italic leading-tight tracking-tight text-primary-foreground/10 sm:text-6xl lg:text-7xl">
            Безсполучникове складне речення
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div
          className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s",
          }}
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center border border-primary-foreground/30 text-xs font-bold tracking-widest text-primary-foreground transition-all duration-500 hover:bg-primary-foreground/10">
                E
              </div>
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary-foreground">
                Енциклопедія
              </span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-primary-foreground/40">
              {"Електронна енциклопедія з української мови. Стаття створена у 2026 році для навчальних цілей."}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-[10px] font-bold tracking-[0.3em] uppercase text-primary-foreground/40">
              Навігація
            </p>
            <ul className="flex flex-col gap-2">
              {[
                { href: "#definition", label: "Визначення" },
                { href: "#types", label: "Типи відношень" },
                { href: "#punctuation", label: "Розділові знаки" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="fancy-link text-sm text-primary-foreground/60 no-underline transition-all duration-300 hover:text-primary-foreground hover:pl-1"
                    style={{
                      backgroundImage: "linear-gradient(oklch(0.985 0 0 / 0.6), oklch(0.985 0 0 / 0.6))",
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <p className="mb-4 text-[10px] font-bold tracking-[0.3em] uppercase text-primary-foreground/40">
              Ще
            </p>
            <ul className="flex flex-col gap-2">
              {[
                { href: "#examples", label: "Приклади" },
                { href: "#comparison", label: "Порівняння" },
                { href: "#sources", label: "Джерела" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="fancy-link text-sm text-primary-foreground/60 no-underline transition-all duration-300 hover:text-primary-foreground hover:pl-1"
                    style={{
                      backgroundImage: "linear-gradient(oklch(0.985 0 0 / 0.6), oklch(0.985 0 0 / 0.6))",
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="mb-4 text-[10px] font-bold tracking-[0.3em] uppercase text-primary-foreground/40">
              Інформація
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Тема", value: "Синтаксис" },
                { label: "Мова", value: "Українська" },
                { label: "Клас", value: "9" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-xs">
                  <span className="text-primary-foreground/30">{item.label}</span>
                  <span className="text-primary-foreground/60">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 sm:flex-row"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1s ease 0.6s",
          }}
        >
          <p className="text-xs text-primary-foreground/30">
            {"Електронна енциклопедія. Березень 2026."}
          </p>
          <p className="text-xs text-primary-foreground/30">
            {"Безсполучникове складне речення"}
          </p>
        </div>
      </div>
    </footer>
  )
}
