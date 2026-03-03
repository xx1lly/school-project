"use client"

import { useEffect, useState } from "react"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const textColor = scrolled ? "oklch(0.1 0 0)" : "oklch(0.985 0 0)"
  const mutedColor = scrolled ? "oklch(0.45 0 0)" : "oklch(0.985 0 0 / 0.6)"

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Background layer - no borders, just smooth bg + blur */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-700 ease-out"
        style={{
          backgroundColor: scrolled ? "oklch(0.985 0 0 / 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
          borderBottom: scrolled ? "1px solid oklch(0.88 0 0 / 0.5)" : "1px solid transparent",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-3 no-underline" data-cursor-hover>
          <div
            className="flex h-8 w-8 items-center justify-center text-xs font-bold tracking-widest transition-all duration-500"
            style={{
              border: `1px solid ${scrolled ? "oklch(0.1 0 0)" : "oklch(0.985 0 0 / 0.5)"}`,
              color: textColor,
            }}
          >
            E
          </div>
          <span
            className="hidden text-sm font-medium tracking-[0.2em] uppercase transition-colors duration-500 sm:inline"
            style={{ color: textColor }}
          >
            {"Енциклопедія"}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            { href: "#definition", label: "Визначення" },
            { href: "#types", label: "Типи" },
            { href: "#punctuation", label: "Пунктуація" },
            { href: "#examples", label: "Приклади" },
            { href: "#sources", label: "Джерела" },
          ].map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-xs tracking-[0.15em] uppercase no-underline"
              style={{
                color: mutedColor,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-10px)",
                transition: `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 50 + 200}ms, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 50 + 200}ms, color 0.3s ease`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = textColor
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = mutedColor
              }}
              data-cursor-hover
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out"
                style={{ backgroundColor: textColor }}
              />
            </a>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center border-none bg-transparent md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className="absolute block h-px w-5 transition-all duration-500"
            style={{
              backgroundColor: textColor,
              transform: menuOpen ? "rotate(45deg)" : "translateY(-4px)",
            }}
          />
          <span
            className="absolute block h-px w-5 transition-all duration-500"
            style={{
              backgroundColor: textColor,
              transform: menuOpen ? "rotate(-45deg)" : "translateY(4px)",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="overflow-hidden md:hidden"
        style={{
          maxHeight: menuOpen ? "400px" : "0px",
          opacity: menuOpen ? 1 : 0,
          backgroundColor: "oklch(0.985 0 0 / 0.95)",
          backdropFilter: "blur(20px)",
          transition: "max-height 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease",
        }}
      >
        <nav className="flex flex-col gap-4 px-6 py-6" style={{ borderTop: "1px solid oklch(0.88 0 0 / 0.5)" }}>
          {[
            { href: "#definition", label: "Визначення" },
            { href: "#types", label: "Типи" },
            { href: "#punctuation", label: "Пунктуація" },
            { href: "#examples", label: "Приклади" },
            { href: "#sources", label: "Джерела" },
          ].map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-[0.1em] uppercase no-underline transition-all duration-300"
              style={{
                color: "oklch(0.45 0 0)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 60}ms`,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.1 0 0)"; (e.currentTarget as HTMLElement).style.paddingLeft = "8px" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.45 0 0)"; (e.currentTarget as HTMLElement).style.paddingLeft = "0px" }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
