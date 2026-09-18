import { useEffect, useRef } from "react"
import { useRafScroll } from "@/lib/use-raf-scroll"

/**
 * CarScrollReveal
 * ────────────────────────────────────────────────────────────────────────────
 * A scroll-scrubbed visual: a pre-rendered F1 car + logo reveal animation whose
 * playback position is driven directly by scroll progress. The clip carries the
 * ENTIRE reveal (car, motion, and the FR1BET logo emerging) — there is no
 * separate overlay layer.
 *
 * The video NEVER autoplays or loops — its `currentTime` is set manually from
 * scroll progress on every animation frame. Scrolling backwards scrubs back.
 *
 * INTEGRATION: the source clip is composed on a black field, so it is blended
 * into the page with `mix-blend-mode: screen`. Black pixels merge seamlessly
 * into the section's black background (no rectangular "video card" edge) while
 * the car, gold, and red detail read as if they are printed into the page. A
 * soft feather mask fades the top and bottom so it dissolves into the layout.
 *
 * ┌─ CONFIG ────────────────────────────────────────────────────────────────┐
 * All tunable values live in the `CONFIG` object below. Adjust freely.
 */
const CONFIG = {
  // ── Source ───────────────────────────────────────────────────────────────
  videoSrc: "/assets/fr1bet-car-reveal.mp4",

  // ── Scroll mapping ─────────────────────────────────────────────────────────
  // Progress through the parent scroll target (0 → 1) is remapped into the
  // active animation window below. Before `animationStart` the video sits on
  // its first frame; after `animationEnd` it holds the last frame.
  animationStart: 0.05, // scroll progress where scrubbing begins
  animationEnd: 0.98, // scroll progress where scrubbing ends

  // ── Sizing ──────────────────────────────────────────────────────────────────
  // Height is viewport-driven so, inside the sticky rail, the clip stretches
  // from just under "05 / FR1BET" down to the bottom edge of the slide.
  height: "min(76vh, 880px)",

  // ── Video scaling ──────────────────────────────────────────────────────────
  objectFit: "contain" as const, // never distort; preserve aspect ratio
} as const

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v))
}

/** Linear remap of `value` from [inMin,inMax] into [0,1], clamped. */
function remap01(value: number, inMin: number, inMax: number) {
  if (inMax <= inMin) return 0
  return clamp((value - inMin) / (inMax - inMin))
}

type CarScrollRevealProps = {
  /** Element id whose scroll extent drives the scrub. Defaults to "story". */
  scrollTargetId?: string
  className?: string
}

export function CarScrollReveal({
  scrollTargetId = "story",
  className,
}: CarScrollRevealProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const durationRef = useRef(0)
  const reducedMotionRef = useRef(false)

  // Cache reduced-motion preference; hold the final frame instead of scrubbing.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => {
      reducedMotionRef.current = mq.matches
      const video = videoRef.current
      if (mq.matches && video && durationRef.current > 0) {
        video.currentTime = durationRef.current
      }
    }
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  // Keep the video paused at all times; we only mutate currentTime.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    const onMeta = () => {
      durationRef.current = video.duration || 0
    }
    if (video.readyState >= 1) onMeta()
    video.addEventListener("loadedmetadata", onMeta)
    return () => video.removeEventListener("loadedmetadata", onMeta)
  }, [])

  // High-frequency scrub driven by rAF scroll — no React state updates.
  useRafScroll(() => {
    if (reducedMotionRef.current) return
    const target = document.getElementById(scrollTargetId)
    const video = videoRef.current
    if (!target || !video) return

    const rect = target.getBoundingClientRect()
    const scrollable = rect.height - window.innerHeight
    // 0 when target top reaches viewport top, 1 when its bottom reaches bottom.
    const rawProgress = scrollable > 0 ? clamp(-rect.top / scrollable) : 0

    // ── Scrub video ──────────────────────────────────────────────────────────
    const animProgress = remap01(
      rawProgress,
      CONFIG.animationStart,
      CONFIG.animationEnd,
    )
    const duration = durationRef.current
    if (duration > 0) {
      const t = animProgress * duration
      // Avoid redundant seeks (perf + prevents stutter on tiny deltas).
      if (Math.abs(video.currentTime - t) > 1 / 60) {
        video.currentTime = t
      }
    }
  })

  // Feather mask fades the clip into the page at top and bottom so it never
  // reads as a hard-edged rectangle sitting on top of the layout.
  const featherMask =
    "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)"

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: CONFIG.height,
        // Blend the black-field clip into the section background.
        mixBlendMode: "screen",
        WebkitMaskImage: featherMask,
        maskImage: featherMask,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      {/* ── Scroll-scrubbed car + logo reveal ────────────────────────────────── */}
      <video
        ref={videoRef}
        src={CONFIG.videoSrc}
        muted
        playsInline
        preload="auto"
        // no autoplay / no loop — scrubbed by scroll only
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: CONFIG.objectFit,
          willChange: "transform",
        }}
      />
    </div>
  )
}
