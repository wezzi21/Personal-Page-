import { useEffect, useRef } from "react"
import { useRafScroll } from "@/lib/use-raf-scroll"

/**
 * CarScrollReveal
 * ────────────────────────────────────────────────────────────────────────────
 * A scroll-scrubbed visual: a pre-rendered F1 car animation whose playback
 * position is driven directly by scroll progress, with a FIXED FR1BET logo
 * layer that is progressively revealed "underneath" the moving car.
 *
 * The video NEVER autoplays or loops — its `currentTime` is set manually from
 * scroll progress on every animation frame. Scrolling backwards scrubs back.
 *
 * The component is written so the video source can later be swapped for an
 * image-sequence / canvas implementation without touching the layout.
 *
 * ┌─ CONFIG ────────────────────────────────────────────────────────────────┐
 * All tunable values live in the `CONFIG` object below. Adjust freely.
 */
const CONFIG = {
  // ── Sources ──────────────────────────────────────────────────────────────
  videoSrc: "/assets/fr1bet-car-reveal.mp4",
  logoSrc: "/assets/fr1bet-story-poster.png", // FR1BET wordmark, fixed layer

  // ── Scroll mapping ─────────────────────────────────────────────────────────
  // Progress through the parent scroll target (0 → 1) is remapped into the
  // active animation window below. Before `animationStart` the video sits on
  // its first frame; after `animationEnd` it holds the last frame.
  animationStart: 0.05, // scroll progress where scrubbing begins
  animationEnd: 0.95, // scroll progress where scrubbing ends

  // ── Logo reveal window (share the same scroll progress) ────────────────────
  logoRevealStart: 0.15, // logo starts appearing
  logoRevealEnd: 0.85, // logo fully revealed

  // ── Logo placement (fixed within the scene; does NOT move with the car) ────
  logo: {
    // percentage-based so it scales with the scene
    widthPct: 78, // width relative to scene width
    topPct: 50, // vertical center anchor
    leftPct: 50, // horizontal center anchor
    opacityFloor: 0.0, // opacity before reveal starts
    opacityCeil: 1.0, // opacity at full reveal
  },

  // ── Video scaling ──────────────────────────────────────────────────────────
  objectFit: "contain" as const, // never distort; preserve aspect ratio

  // ── Desktop vs mobile scene sizing ──────────────────────────────────────────
  desktop: { maxWidth: 420 },
  mobile: { maxWidth: 300 },
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
  const logoRef = useRef<HTMLImageElement | null>(null)
  const durationRef = useRef(0)
  const reducedMotionRef = useRef(false)

  // Cache reduced-motion preference; render a static frame + logo instead.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => {
      reducedMotionRef.current = mq.matches
      if (mq.matches && logoRef.current) {
        logoRef.current.style.opacity = String(CONFIG.logo.opacityCeil)
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

    // ── Reveal fixed logo ──────────────────────────────────────────────────────
    const reveal = remap01(
      rawProgress,
      CONFIG.logoRevealStart,
      CONFIG.logoRevealEnd,
    )
    if (logoRef.current) {
      const opacity =
        CONFIG.logo.opacityFloor +
        (CONFIG.logo.opacityCeil - CONFIG.logo.opacityFloor) * reveal
      logoRef.current.style.opacity = String(opacity)
      // Wipe-in reveal from bottom → top as the car "uncovers" the logo.
      const wipe = (1 - reveal) * 100
      logoRef.current.style.clipPath = `inset(${wipe}% 0 0 0)`
    }
  })

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: `${CONFIG.desktop.maxWidth}px`,
        aspectRatio: "2 / 3",
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: "14px",
        // Sits in the background but stays visible.
        opacity: 0.92,
      }}
    >
      {/* ── Fixed logo layer (revealed, never moves) ─────────────────────────── */}
      <img
        ref={logoRef}
        src={CONFIG.logoSrc}
        alt="FR1BET"
        loading="lazy"
        decoding="async"
        style={{
          position: "absolute",
          top: `${CONFIG.logo.topPct}%`,
          left: `${CONFIG.logo.leftPct}%`,
          width: `${CONFIG.logo.widthPct}%`,
          transform: "translate(-50%, -50%)",
          opacity: CONFIG.logo.opacityFloor,
          clipPath: "inset(100% 0 0 0)",
          zIndex: 1,
          pointerEvents: "none",
          willChange: "opacity, clip-path",
        }}
      />

      {/* ── Scroll-scrubbed car animation (foreground) ───────────────────────── */}
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
          zIndex: 2,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
    </div>
  )
}
