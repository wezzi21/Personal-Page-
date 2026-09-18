import { useEffect, useRef } from "react"

// ─── Pointer-reactive background mesh ─────────────────────────────────────────
// Tracks pointer position and eases a CSS-variable-driven glow toward it.

export function ReactiveMesh() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mesh = ref.current
    if (!mesh || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return

    let frame = 0
    let running = false
    let targetX = 50
    let targetY = 42
    let currentX = targetX
    let currentY = targetY
    let currentGlowX = targetX
    let currentGlowY = targetY

    const SETTLE_THRESHOLD = 0.02

    const animate = () => {
      currentX += (targetX - currentX) * 0.055
      currentY += (targetY - currentY) * 0.055
      currentGlowX += (currentX - currentGlowX) * 0.035
      currentGlowY += (currentY - currentGlowY) * 0.035
      mesh.style.setProperty("--mesh-x", `${currentX}%`)
      mesh.style.setProperty("--mesh-y", `${currentY}%`)
      mesh.style.setProperty("--mesh-trail-x", `${currentGlowX}%`)
      mesh.style.setProperty("--mesh-trail-y", `${currentGlowY}%`)

      // Stop once the eased values have caught up to the pointer instead of
      // repainting this full-viewport layer forever. Idle repaints here were
      // fighting the compositor thread during scrolling for no visual gain.
      const settled =
        Math.abs(targetX - currentX) < SETTLE_THRESHOLD &&
        Math.abs(targetY - currentY) < SETTLE_THRESHOLD &&
        Math.abs(currentX - currentGlowX) < SETTLE_THRESHOLD &&
        Math.abs(currentY - currentGlowY) < SETTLE_THRESHOLD

      if (settled) {
        running = false
        return
      }
      frame = requestAnimationFrame(animate)
    }

    const ensureRunning = () => {
      if (running) return
      running = true
      frame = requestAnimationFrame(animate)
    }

    const handlePointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth) * 100
      targetY = (event.clientY / window.innerHeight) * 100
      ensureRunning()
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={ref} className="reactive-mesh" aria-hidden="true" />
}
