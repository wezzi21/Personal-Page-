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
    let targetX = 50
    let targetY = 42
    let currentX = targetX
    let currentY = targetY
    let currentGlowX = targetX
    let currentGlowY = targetY

    const handlePointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth) * 100
      targetY = (event.clientY / window.innerHeight) * 100
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.055
      currentY += (targetY - currentY) * 0.055
      currentGlowX += (currentX - currentGlowX) * 0.035
      currentGlowY += (currentY - currentGlowY) * 0.035
      mesh.style.setProperty("--mesh-x", `${currentX}%`)
      mesh.style.setProperty("--mesh-y", `${currentY}%`)
      mesh.style.setProperty("--mesh-trail-x", `${currentGlowX}%`)
      mesh.style.setProperty("--mesh-trail-y", `${currentGlowY}%`)
      frame = requestAnimationFrame(animate)
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    frame = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={ref} className="reactive-mesh" aria-hidden="true" />
}
