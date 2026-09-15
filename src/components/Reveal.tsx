import { useEffect, useRef, type ReactNode } from "react"

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
// Fades/slides children into view the first time they intersect the viewport.

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible")
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

export function Reveal({
  children,
  delay = 0,
  fade = false,
  className = "",
}: {
  children: ReactNode
  delay?: number
  fade?: boolean
  className?: string
}) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className={`${fade ? "reveal-fade" : "reveal"} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
