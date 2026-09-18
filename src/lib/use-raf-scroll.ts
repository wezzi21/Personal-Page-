import { useEffect, useRef } from "react"

/**
 * Runs `onScroll` at most once per animation frame while the page scrolls or
 * resizes, instead of once per native scroll event. Trackpads and fast wheel
 * scrolling can fire many scroll events between two frames — if each one
 * triggers a synchronous read like `getBoundingClientRect`, the browser is
 * forced to flush layout repeatedly per frame, which is what causes visible
 * stutter while scrolling. Batching to one measure+write per frame keeps
 * scrolling smooth at the display's native refresh rate (e.g. 120fps on
 * ProMotion displays).
 *
 * `onScroll` doesn't need to be memoized — the latest version is always
 * called, and the listeners are only attached once on mount.
 */
export function useRafScroll(onScroll: () => void) {
  const callbackRef = useRef(onScroll)
  callbackRef.current = onScroll

  useEffect(() => {
    let frame = 0
    let ticking = false

    const run = () => {
      ticking = false
      callbackRef.current()
    }

    const schedule = () => {
      if (ticking) return
      ticking = true
      frame = requestAnimationFrame(run)
    }

    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule, { passive: true })
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      cancelAnimationFrame(frame)
    }
  }, [])
}
