import { useEffect, useRef } from "react"

// ─── Hero looping video with scroll parallax ─────────────────────────────────

export function HeroAnimation() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const updateParallax = () => {
      hero.style.setProperty(
        "--hero-parallax-y",
        `${Math.min(window.scrollY * 0.18, 180)}px`,
      )
    }

    updateParallax()
    window.addEventListener("scroll", updateParallax, { passive: true })
    return () => window.removeEventListener("scroll", updateParallax)
  }, [])

  return (
    <div
      ref={heroRef}
      className="hero-parallax relative w-full h-full overflow-hidden"
      style={{ background: "transparent" }}
    >
      <video
        className="hero-parallax-video"
        src="/assets/social/looping%20video%20mp4.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
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
