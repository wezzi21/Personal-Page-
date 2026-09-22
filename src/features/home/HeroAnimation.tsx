import { useEffect, useRef, useState } from "react"
import { useRafScroll } from "@/lib/use-raf-scroll"

// ─── Hero looping video with scroll parallax ─────────────────────────────────

/** Skip the heavy video entirely on very slow connections or when the user
 *  has enabled data saver — the animated gradient fallback keeps the hero
 *  from ever looking broken while avoiding a large mobile download. */
function shouldSkipVideo() {
  if (typeof navigator === "undefined") return false
  const connection = (navigator as any).connection
  if (!connection) return false
  if (connection.saveData) return true
  const slowTypes = ["slow-2g", "2g"]
  return slowTypes.includes(connection.effectiveType)
}

export function HeroAnimation() {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    setVideoEnabled(!shouldSkipVideo())
  }, [])

  // iOS Safari frequently ignores the autoplay attribute for the first
  // paint, especially right after load — explicitly calling play() (and
  // retrying on the first touch if the promise rejects) reliably starts it.
  useEffect(() => {
    if (!videoEnabled) return
    const video = videoRef.current
    if (!video) return

    let cancelled = false

    const tryPlay = () => {
      const playPromise = video.play()
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          if (cancelled) return
          const retry = () => {
            video.play().catch(() => {})
          }
          document.addEventListener("touchstart", retry, {
            once: true,
            passive: true,
          })
          document.addEventListener("visibilitychange", retry, {
            once: true,
          })
        })
      }
    }

    if (video.readyState >= 2) {
      tryPlay()
    } else {
      video.addEventListener("loadeddata", tryPlay, { once: true })
    }

    return () => {
      cancelled = true
      video.removeEventListener("loadeddata", tryPlay)
    }
  }, [videoEnabled])

  useRafScroll(() => {
    const hero = heroRef.current
    if (!hero) return
    hero.style.setProperty(
      "--hero-parallax-y",
      `${Math.min(window.scrollY * 0.18, 180)}px`,
    )
  })

  return (
    <div
      ref={heroRef}
      className="hero-parallax relative w-full h-full overflow-hidden"
      style={{ background: "transparent" }}
    >
      {videoEnabled && (
        <video
          ref={videoRef}
          className={`hero-parallax-video${videoReady ? " is-ready" : ""}`}
          src="/assets/social/looping%20video%20mp4.mp4"
          autoPlay
          muted
          loop
          playsInline
          // @ts-expect-error legacy iOS attribute, harmless elsewhere
          webkit-playsinline="true"
          preload="auto"
          // @ts-expect-error fetchPriority is valid on <video> but missing from React's DOM typings
          fetchPriority="high"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
        />
      )}
      <div className="hero-parallax-shade" aria-hidden="true" />
      <div
        className="absolute right-6"
        style={{
          top: "76px",
          color: "rgba(255,255,255,0.25)",
          fontFamily: "Inter",
          fontSize: "0.6rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        P1 &nbsp;|&nbsp; QUALIFYING
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <span
          style={{
            color: "rgba(255,255,255,0.15)",
            fontFamily: "Inter",
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          LOOP / FR1BET — LIVE HEADER MEDIA
        </span>
      </div>
    </div>
  )
}
