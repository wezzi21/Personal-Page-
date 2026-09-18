import { useEffect, useRef, useState, ReactNode } from "react"
import "./presentation.css"
import fr1betLogo from "@/imports/red_white_logo.png"
import cardSpecialPitStop from "@/imports/card-special-pit-stop.png"
import cardSpecialTeamP5 from "@/imports/card-special-team-p5.png"
import cardQualifyingP5 from "@/imports/card-qualifying-p5.png"
import tiersSelectStake from "@/imports/tiers-select-stake.png"

const presentationHeroImage =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/this%20one-IUlE5S5w2X4ONx9rRKOoejhOtcZ56K.jpg"
const qrCode = fr1betLogo
const heroBg = presentationHeroImage
const logoBg = fr1betLogo
const fr1Coin = fr1betLogo
const insightScreenshot = fr1betLogo
const racingDivisionsScreenshot = fr1betLogo

const RED = "#E5001A"

/* ─── Scroll progress bar ─── */
function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 9999,
        background: "rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: RED,
          transition: "width 0.1s linear",
          boxShadow: `0 0 8px ${RED}`,
        }}
      />
    </div>
  )
}

/* ─── Animated counter ─── */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.unobserve(el)
        const duration = 1200
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setVal(Math.round(ease * to))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [to])
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  )
}

/* ─── Scroll-reveal wrapper ─── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
          obs.unobserve(el)
        }
      },
      { threshold: 0.12 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(48px)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}

/* ─── Logo background (with scroll parallax) ─── */
function LogoBg() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let frame = 0

    function update() {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // normalized distance of the slide's center from the viewport center
      const centerDelta = (rect.top + rect.height / 2 - vh / 2) / vh
      setOffset(centerDelta * 70)
    }

    function onScroll() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-10% 0",
          backgroundImage: `url(${logoBg})`,
          backgroundSize: "90%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          mixBlendMode: "screen",
          opacity: 0.18,
          transform: `translate3d(0, ${offset}px, 0)`,
          willChange: "transform",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(8,8,8,0.72) 100%)",
        }}
      />
    </div>
  )
}

/* ─── Slide wrapper ─── */
function Slide({
  children,
  id,
  noLogo,
}: {
  children: ReactNode
  id?: string
  noLogo?: boolean
}) {
  return (
    <section
      id={id}
      style={{
        background: "#080808",
        position: "relative",
        overflow: "hidden",
        minHeight: "100dvh",
      }}
    >
      {!noLogo && <LogoBg />}
      {children}
    </section>
  )
}

/* ─── Shared atoms ─── */
function Tag({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "'Barlow',sans-serif",
        fontSize: 11,
        letterSpacing: 3,
        fontWeight: 700,
        fontStyle: "italic",
        color: RED,
        textTransform: "uppercase",
        textShadow: "0 1px 8px rgba(0,0,0,0.9)",
      }}
    >
      {children}
    </span>
  )
}

function H1({ white, red }: { white?: string; red?: string }) {
  const base: React.CSSProperties = {
    fontFamily: "'Barlow',sans-serif",
    fontWeight: 900,
    fontStyle: "italic",
    fontSize: "clamp(42px,6vw,86px)",
    lineHeight: 1.0,
    textTransform: "uppercase",
    letterSpacing: "-0.01em",
    display: "block",
    textShadow: "0 2px 24px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8)",
  }
  return (
    <>
      {white && <span style={{ ...base, color: "#fff" }}>{white}</span>}
      {red && <span style={{ ...base, color: RED }}>{red}</span>}
    </>
  )
}

function Body({
  children,
  style,
}: {
  children: ReactNode
  style?: React.CSSProperties
}) {
  return (
    <p
      style={{
        fontFamily: "'Barlow',sans-serif",
        fontSize: 16,
        color: "#d4d4d4",
        lineHeight: 1.72,
        textShadow: "0 1px 8px rgba(0,0,0,0.95)",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  )
}

function Divider() {
  return (
    <div style={{ width: 36, height: 3, background: RED, margin: "18px 0" }} />
  )
}

function TiltCard({
  src,
  alt,
  rotate,
  offsetY = 0,
  style,
}: {
  src: string
  alt: string
  rotate: number
  offsetY?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const restTransform = `perspective(900px) rotate(${rotate}deg) translateY(${offsetY}px)`
  const [transform, setTransform] = useState(restTransform)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    const rotateX = (-py * 20).toFixed(2)
    const rotateY = (px * 20).toFixed(2)
    setTransform(
      `perspective(900px) rotate(${rotate}deg) translateY(${offsetY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`
    )
  }

  function handleMouseLeave() {
    setTransform(restTransform)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
        cursor: "pointer",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          display: "block",
          borderRadius: 14,
          boxShadow: "0 24px 56px rgba(0,0,0,0.85)",
        }}
      />
    </div>
  )
}

function Card({
  children,
  highlight = false,
  style,
}: {
  children: ReactNode
  highlight?: boolean
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        background: highlight
          ? "rgba(229,0,26,0.10)"
          : "rgba(255,255,255,0.04)",
        border: `1px solid ${
          highlight ? "rgba(229,0,26,0.3)" : "rgba(255,255,255,0.08)"
        }`,
        borderRadius: 8,
        padding: "22px 26px",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function CardTitle({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'Barlow',sans-serif",
        fontWeight: 800,
        fontStyle: "italic",
        fontSize: 15,
        color: "#fff",
        letterSpacing: 0.5,
        marginBottom: 8,
        textTransform: "uppercase",
        textShadow: "0 1px 6px rgba(0,0,0,0.8)",
      }}
    >
      {children}
    </div>
  )
}

function StatBlock({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div
      className="presentation-stat-block"
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 6,
        padding: "12px 20px",
        minWidth: 110,
      }}
    >
      <div
        style={{
          fontFamily: "'Barlow',sans-serif",
          fontWeight: 800,
          fontSize: 26,
          color: "#fff",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'Barlow',sans-serif",
          fontSize: 10,
          letterSpacing: 2,
          color: "#888",
          marginTop: 4,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  )
}

/* ─── Pill badge ─── */
function Pill({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "'Barlow',sans-serif",
        fontWeight: 700,
        fontStyle: "italic",
        fontSize: 11,
        letterSpacing: 2,
        padding: "4px 12px",
        borderRadius: 20,
        border: `1px solid ${active ? RED : "rgba(255,255,255,0.15)"}`,
        color: active ? RED : "#888",
        background: active ? "rgba(229,0,26,0.1)" : "transparent",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  )
}

/* ─── Slides ─── */

function Hero() {
  return (
    <Slide id="hero" noLogo>
      <div
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          position: "absolute",
          inset: 0,
          opacity: 0.32,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(8,8,8,0.05) 0%, rgba(8,8,8,0.5) 50%, #080808 100%)",
        }}
      />

      {/* Nav */}
      <nav
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 32px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="presentation-brand-wrap">
          <span className="presentation-brand">FR1BET PRESENTATION</span>
        </div>
        <div className="mob-hide">
          <a className="presentation-back-link" href="/">
            BACK TO MAIN PAGE
          </a>
        </div>
        <a
          className="presentation-back-mobile mob-only"
          href="/"
          aria-label="Back to main page"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          BACK
        </a>
      </nav>

      {/* Hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "clamp(48px,9vw,96px) clamp(20px,5vw,48px)",
          maxWidth: 820,
        }}
      >
        <Reveal>
          <Tag>Formula 1 · Prediction Platform · Live Now</Tag>
        </Reveal>
        <Reveal delay={80}>
          <div style={{ marginTop: 20 }}>
            <H1 white="No Odds." />
            <H1 red="Just Strategy." />
          </div>
        </Reveal>
        <Reveal delay={160}>
          <Body style={{ marginTop: 22, maxWidth: 500, fontSize: 17 }}>
            Predict finishing positions across every F1 race weekend. Each card
            is its own pool — win a card and get paid, no matter what happens on
            the others.
          </Body>
        </Reveal>
        <Reveal delay={240}>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 36,
              flexWrap: "wrap",
            }}
          >
            <StatBlock value={<CountUp to={10} />} label="Cards per race" />
            <StatBlock value={<CountUp to={6} />} label="Stake tiers" />
            <StatBlock value="0%" label="Rake on pools" />
          </div>
        </Reveal>
        <Reveal delay={320}>
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 32,
              flexWrap: "wrap",
            }}
          >
            <a
              className="presentation-hero-action presentation-hero-action-primary"
              href="https://fr1bet.com"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: RED,
                color: "#fff",
                fontFamily: "'Barlow',sans-serif",
                fontWeight: 800,
                fontStyle: "italic",
                fontSize: 16,
                letterSpacing: 1.5,
                padding: "14px 28px",
                borderRadius: 6,
                textDecoration: "none",
                boxShadow: `0 8px 32px rgba(229,0,26,0.45)`,
              }}
            >
              ENTER THE GRID ›
            </a>
            <a
              className="presentation-hero-action presentation-hero-action-secondary"
              href="#how"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#fff",
                fontFamily: "'Barlow',sans-serif",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: 15,
                letterSpacing: 1,
                padding: "14px 24px",
                borderRadius: 6,
                textDecoration: "none",
              }}
            >
              HOW IT WORKS
            </a>
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}

function HowItWorks() {
  return (
    <Slide id="how">
      <div className="sp">
        <Reveal>
          <Tag>How It Works</Tag>
        </Reveal>
        <Reveal delay={80}>
          <div style={{ marginTop: 16, marginBottom: 8 }}>
            <H1 white="Ten Cards." />
            <H1 red="Ten Independent Pools." />
          </div>
        </Reveal>
        <Reveal delay={130}>
          <Body style={{ marginBottom: 36, maxWidth: 620 }}>
            Every race weekend has 10 prediction cards — split between
            qualifying and race sessions. Fill all ten and submit your entry.
            Predict correctly on any individual card and you get paid from that
            card's pool, regardless of your other picks.
          </Body>
        </Reveal>

        {/* Prediction card examples */}
        <Reveal delay={160}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 28,
              marginBottom: 48,
              paddingTop: 12,
              paddingBottom: 24,
            }}
          >
            <TiltCard
              src={cardQualifyingP5}
              alt="Qualifying P5 prediction card"
              rotate={-7}
              offsetY={10}
              style={{ width: "27%", maxWidth: 300 }}
            />
            <TiltCard
              src={cardSpecialPitStop}
              alt="First Pit Stop prediction card"
              rotate={4}
              offsetY={-14}
              style={{ width: "27%", maxWidth: 300, zIndex: 2 }}
            />
            <TiltCard
              src={cardSpecialTeamP5}
              alt="Team P5 season prediction card"
              rotate={-3}
              offsetY={6}
              style={{ width: "27%", maxWidth: 300 }}
            />
          </div>
        </Reveal>

        <div className="g3">
          {[
            {
              n: "01",
              t: "Qualifying cards",
              b: "Predict who finishes P5, P11, and P17 in qualifying — the positions where strategy, traffic, and tire management make the biggest difference.",
            },
            {
              n: "02",
              t: "Race cards",
              b: "Predict the midfield finishers: P6, P10, P14, plus First Pit Stop, First DNF, Driver of the Day, and Constructor 5th.",
            },
            {
              n: "03",
              t: "Win each card separately",
              b: "There is no accumulator. Get Race P10 right and you collect from that pool — even if your other nine picks were wrong.",
            },
          ].map((c, i) => (
            <Reveal key={c.n} delay={240 + i * 70}>
              <Card>
                <div
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontSize: 10,
                    color: RED,
                    letterSpacing: 2,
                    marginBottom: 10,
                  }}
                >
                  {c.n}
                </div>
                <CardTitle>{c.t}</CardTitle>
                <Body style={{ fontSize: 13 }}>{c.b}</Body>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function PoolsExplained() {
  return (
    <Slide>
      <div className="sp">
        <div
          className="g-ti2"
          style={{ alignItems: "flex-start", marginBottom: 40 }}
        >
          <div>
            <Reveal>
              <Tag>Pool Mechanics</Tag>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ marginTop: 16, marginBottom: 20 }}>
                <H1 white="You Bet" />
                <H1 white="Against Fans." />
                <H1 red="Not The House." />
              </div>
            </Reveal>
            <Reveal delay={140}>
              <Divider />
            </Reveal>
            <Reveal delay={180}>
              <Body style={{ marginTop: 4 }}>
                Every card operates as a pari-mutuel pool. Your stake goes into
                a shared pot with everyone who predicted the same position.
                After the race, the full pot is split proportionally among
                correct predictors.
              </Body>
            </Reveal>
            <Reveal delay={240}>
              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {[
                  {
                    icon: "◎",
                    t: "Bet early or all week",
                    b: "Place your predictions any time from Monday, right up to 5 minutes before qualifying locks.",
                  },
                  {
                    icon: "◈",
                    t: "Edit until lock",
                    b: "Swap a driver, change your position pick, or withdraw entirely — any prediction can be adjusted until the lock window closes.",
                  },
                  {
                    icon: "◉",
                    t: "100% of the pot to winners",
                    b: "FR1BET takes no rake from pools. Subscriptions fund the platform; winners keep everything.",
                  },
                ].map((item) => (
                  <div key={item.t} style={{ display: "flex", gap: 14 }}>
                    <div
                      style={{
                        fontSize: 18,
                        color: RED,
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          fontWeight: 700,
                          fontSize: 13,
                          color: "#fff",
                          marginBottom: 4,
                          letterSpacing: 0.5,
                        }}
                      >
                        {item.t}
                      </div>
                      <Body style={{ fontSize: 13 }}>{item.b}</Body>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <img
              src={insightScreenshot}
              alt="FR1BET pool view"
              style={{
                width: "100%",
                borderRadius: 14,
                boxShadow: "0 32px 72px rgba(0,0,0,0.85)",
                display: "block",
              }}
            />
          </Reveal>
        </div>
      </div>
    </Slide>
  )
}

function StakeTiers() {
  const tiers = [
    {
      name: "ROOKIE",
      pts: "1",
      bg: "linear-gradient(135deg,#1c1c1e,#2a2a2e)",
      accent: "#888",
      icon: "⊙",
    },
    {
      name: "AMATEUR",
      pts: "5",
      bg: "linear-gradient(135deg,#0d1b2e,#1a3050)",
      accent: "#4A9EFF",
      icon: "⚡",
    },
    {
      name: "PRO",
      pts: "10",
      bg: "linear-gradient(135deg,#1e1a00,#3a3000)",
      accent: "#F5C400",
      icon: "♛",
    },
    {
      name: "EXPERT",
      pts: "25",
      bg: "linear-gradient(135deg,#2a1200,#4a2200)",
      accent: "#FF7A00",
      icon: "◈",
    },
    {
      name: "ELITE",
      pts: "50",
      bg: "linear-gradient(135deg,#1a0a2e,#2e1050)",
      accent: "#A855F7",
      icon: "✦",
    },
    {
      name: "LEGEND",
      pts: "100",
      bg: "linear-gradient(135deg,#2a0008,#4a0010)",
      accent: RED,
      icon: "🏆",
    },
  ]
  return (
    <Slide id="tiers">
      <div className="sp">
        <div
          className="g2"
          style={{ alignItems: "flex-end", marginBottom: 32 }}
        >
          <div>
            <Reveal>
              <Tag>Stake Tiers</Tag>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ marginTop: 16 }}>
                <H1 white="Six Tiers." />
                <H1 red="You Pick The Risk." />
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Body style={{ maxWidth: 420 }}>
              Choose how many PTS you stake per card — from 1 (Rookie) to 100
              (Legend). Each tier runs its own global pool; higher stakes mean a
              larger share of a bigger pot.
            </Body>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <TiltCard
            src={tiersSelectStake}
            alt="Select stake — active racing divisions"
            rotate={0}
            style={{ width: "100%", marginBottom: 32 }}
          />
        </Reveal>

        <div className="g3" style={{ gap: 10 }}>
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={260 + i * 50}>
              <div
                style={{
                  background: t.bg,
                  borderRadius: 12,
                  padding: "18px 18px 16px",
                  border: `1px solid ${t.accent}22`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      background: `${t.accent}22`,
                      border: `1px solid ${t.accent}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      color: t.accent,
                      flexShrink: 0,
                    }}
                  >
                    {t.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontWeight: 800,
                        fontSize: 13,
                        color: t.accent,
                        letterSpacing: 1,
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: 10,
                        color: "#666",
                        letterSpacing: 1,
                      }}
                    >
                      Stake per card
                    </div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "baseline", gap: 5 }}
                >
                  <span
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontWeight: 900,
                      fontStyle: "italic",
                      fontSize: 34,
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {t.pts}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      color: t.accent,
                    }}
                  >
                    PTS
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function SprintWeekends() {
  const sprintCards = [
    {
      pos: "P2",
      session: "Sprint Quali",
      desc: "Who qualifies second for the Sprint?",
    },
    { pos: "WIN", session: "Sprint Race", desc: "Sprint race winner" },
    {
      pos: "P8",
      session: "Sprint Race",
      desc: "Who finishes 8th in the Sprint?",
    },
    {
      pos: "LAST",
      session: "Sprint Race",
      desc: "The final classified finisher",
    },
    { pos: "PTS", session: "Sprint Teams", desc: "Constructor 5th in Sprint" },
  ]
  return (
    <Slide>
      <div className="sp">
        <div
          className="g-ti3"
          style={{ marginBottom: 40, alignItems: "flex-start" }}
        >
          <div>
            <Reveal>
              <Tag>Sprint Weekends</Tag>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ marginTop: 16, marginBottom: 16 }}>
                <H1 white="Six Weekends." />
                <H1 red="Five Bonus Cards." />
              </div>
            </Reveal>
            <Reveal delay={140}>
              <Divider />
            </Reveal>
            <Reveal delay={180}>
              <Body style={{ marginTop: 8 }}>
                Sprint race weekends unlock a completely separate five-card grid
                alongside the standard ten. Sprint pools settle right after
                Saturday's sprint — giving you results before the main race even
                starts.
              </Body>
            </Reveal>
            <Reveal delay={240}>
              <div
                style={{
                  marginTop: 20,
                  background: "rgba(229,0,26,0.08)",
                  border: "1px solid rgba(229,0,26,0.2)",
                  borderRadius: 8,
                  padding: "14px 18px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontSize: 11,
                    color: RED,
                    letterSpacing: 2,
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  LOCK TIMING
                </div>
                <Body style={{ fontSize: 13 }}>
                  Sprint bets lock 5 minutes before Sprint qualifying. Standard
                  race bets lock 5 minutes before the GP qualifying session.
                </Body>
              </div>
            </Reveal>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sprintCards.map((card, i) => (
              <Reveal key={card.pos} delay={100 + i * 60}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      background: RED,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontWeight: 900,
                        fontStyle: "italic",
                        fontSize: 13,
                        color: "#fff",
                        letterSpacing: 0.5,
                      }}
                    >
                      {card.pos}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: 10,
                        color: RED,
                        letterSpacing: 2,
                        marginBottom: 3,
                      }}
                    >
                      {card.session}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontWeight: 700,
                        fontSize: 13,
                        color: "#fff",
                      }}
                    >
                      {card.desc}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  )
}

function Dashboard() {
  return (
    <Slide>
      <div className="sp">
        <Reveal>
          <Tag>Your Dashboard</Tag>
        </Reveal>
        <Reveal delay={80}>
          <div style={{ marginTop: 16, marginBottom: 8 }}>
            <H1 white="Track Everything." />
            <H1 red="From Countdown To Payout." />
          </div>
        </Reveal>
        <Reveal delay={130}>
          <Body style={{ marginBottom: 36, maxWidth: 600 }}>
            The Paddock Control dashboard shows the countdown to the next Grand
            Prix, live pool sizes by tier, your driver profile stats, and your
            full bet history — all in one place.
          </Body>
        </Reveal>

        <Reveal delay={155}>
          <img
            src={racingDivisionsScreenshot}
            alt="FR1BET dashboard — active racing divisions and countdown"
            style={{
              width: "100%",
              borderRadius: 14,
              boxShadow: "0 32px 72px rgba(0,0,0,0.85)",
              display: "block",
              marginBottom: 32,
            }}
          />
        </Reveal>

        <div className="g3">
          {[
            {
              t: "Paddock Control",
              b: "Countdown to the next Grand Prix with circuit info, session times, and the exact moment betting locks. Division cards show live points sitting in each tier's pool.",
            },
            {
              t: "Driver Profile",
              b: "Track your Available PTS, In Escrow balance, and Total balance. Live telemetry shows your net performance, best payout, most-played market, and best race weekend.",
            },
            {
              t: "My Bets",
              b: "Full history organised by race weekend with season-level P&L. Edit any open bet before lock — swap a driver, change the position, or withdraw entirely.",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={280 + i * 70}>
              <Card>
                <CardTitle>{c.t}</CardTitle>
                <Body style={{ fontSize: 13 }}>{c.b}</Body>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function PitPass() {
  return (
    <Slide id="pitpass">
      <div className="sp">
        <Reveal>
          <Tag>Pit Pass</Tag>
        </Reveal>
        <Reveal delay={80}>
          <div style={{ marginTop: 16, marginBottom: 8 }}>
            <H1 white="Start Free." />
            <H1 red="Unlock Everything For €5.99." />
          </div>
        </Reveal>
        <Reveal delay={130}>
          <Body style={{ marginBottom: 40, maxWidth: 560 }}>
            FR1BET is free to join. Upgrade to Team Principal for private
            paddocks, all six stake tiers, and the AI probability dashboard.
          </Body>
        </Reveal>

        <div className="g2" style={{ gap: 20, maxWidth: 860 }}>
          {/* Rookie */}
          <Reveal delay={160}>
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontWeight: 900,
                    fontStyle: "italic",
                    fontSize: 22,
                    color: "#fff",
                    letterSpacing: 1,
                    marginBottom: 6,
                  }}
                >
                  ROOKIE LICENSE
                </div>
                <div
                  style={{ display: "flex", alignItems: "baseline", gap: 6 }}
                >
                  <span
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontWeight: 900,
                      fontStyle: "italic",
                      fontSize: 44,
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    FREE
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontSize: 12,
                    color: "#555",
                    marginTop: 6,
                  }}
                >
                  No card required
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 1,
                  background: "rgba(255,255,255,0.06)",
                }}
              />
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {[
                  "Public pools on every race weekend",
                  "Rookie stake tier (1 PTS per card)",
                  "150 PTS signup bonus",
                  "Full prediction history",
                  "Bet editing until lock",
                ].map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#555",
                        }}
                      />
                    </div>
                    <Body style={{ fontSize: 14 }}>{f}</Body>
                  </div>
                ))}
              </div>
              <a
                className="presentation-hero-action presentation-hero-action-primary"
                href="https://fr1bet.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontFamily: "'Barlow',sans-serif",
                  fontWeight: 800,
                  fontStyle: "italic",
                  fontSize: 14,
                  letterSpacing: 2,
                  padding: "14px",
                  borderRadius: 8,
                  textDecoration: "none",
                  marginTop: "auto",
                }}
              >
                START FOR FREE
              </a>
            </div>
          </Reveal>

          {/* Team Principal */}
          <Reveal delay={220}>
            <div
              style={{
                background: "rgba(229,0,26,0.07)",
                border: `2px solid rgba(229,0,26,0.4)`,
                borderRadius: 14,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 18, right: 18 }}>
                <Pill active>Best value</Pill>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontWeight: 900,
                    fontStyle: "italic",
                    fontSize: 22,
                    color: "#fff",
                    letterSpacing: 1,
                    marginBottom: 6,
                  }}
                >
                  TEAM PRINCIPAL
                </div>
                <div
                  style={{ display: "flex", alignItems: "baseline", gap: 6 }}
                >
                  <span
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontWeight: 900,
                      fontStyle: "italic",
                      fontSize: 44,
                      color: RED,
                      lineHeight: 1,
                    }}
                  >
                    €5.99
                  </span>
                  <span
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontSize: 14,
                      color: "#888",
                    }}
                  >
                    /month
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontSize: 12,
                    color: "#555",
                    marginTop: 6,
                  }}
                >
                  Cancel anytime
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 1,
                  background: "rgba(229,0,26,0.2)",
                }}
              />
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {[
                  "Everything in Rookie",
                  "All six stake tiers (1 → 100 PTS)",
                  "150 PTS + FR1 tokens each month",
                  "Private customisable paddocks",
                  "AI probability dashboard",
                  "Priority support",
                ].map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: "rgba(229,0,26,0.25)",
                        border: `1px solid ${RED}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: RED,
                        }}
                      />
                    </div>
                    <Body style={{ fontSize: 14 }}>{f}</Body>
                  </div>
                ))}
              </div>
              <a
                className="presentation-hero-action presentation-hero-action-primary"
                href="https://fr1bet.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: RED,
                  color: "#fff",
                  fontFamily: "'Barlow',sans-serif",
                  fontWeight: 800,
                  fontStyle: "italic",
                  fontSize: 14,
                  letterSpacing: 2,
                  padding: "14px",
                  borderRadius: 8,
                  textDecoration: "none",
                  marginTop: "auto",
                  boxShadow: `0 8px 32px rgba(229,0,26,0.4)`,
                }}
              >
                UPGRADE NOW
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </Slide>
  )
}

function Currencies() {
  return (
    <Slide>
      <div className="sp">
        <div className="g2" style={{ alignItems: "center" }}>
          <div>
            <Reveal>
              <Tag>Currencies</Tag>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ marginTop: 16, marginBottom: 20 }}>
                <H1 white="Three Currencies." />
                <H1 red="One Platform." />
              </div>
            </Reveal>
            <Reveal delay={140}>
              <Divider />
            </Reveal>
            <Reveal delay={180}>
              <Body style={{ marginTop: 8, marginBottom: 32 }}>
                Switch between currencies using the header pills. Your available
                balance and escrowed (locked-in) points display live at all
                times.
              </Body>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  symbol: "PTS",
                  name: "Prediction Points",
                  desc: "The primary betting currency. Buy point packs from the Paddock Store — from 75 PTS up to 2,000 PTS with bonus points on larger packs.",
                  color: "#fff",
                },
                {
                  symbol: "FR1",
                  name: "Platform Token",
                  desc: "FR1 is the native SPL token on Solana. Earn it by winning pools or subscribing. Redeem at 200 FR1 = 1 USDC — no house fee.",
                  color: "#C8A84B",
                },
                {
                  symbol: "USDC",
                  name: "Stablecoin",
                  desc: "Stable dollar-pegged pools for players who want real-value stakes. Non-custodial on-chain settlement — your funds, your keys.",
                  color: "#2775CA",
                },
              ].map((c, i) => (
                <Reveal key={c.symbol} delay={200 + i * 70}>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      padding: "16px 20px",
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 10,
                        background: `${c.color}18`,
                        border: `1px solid ${c.color}33`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          fontWeight: 900,
                          fontStyle: "italic",
                          fontSize: 12,
                          color: c.color,
                          letterSpacing: 0.5,
                        }}
                      >
                        {c.symbol}
                      </span>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          fontWeight: 800,
                          fontSize: 14,
                          color: "#fff",
                          marginBottom: 4,
                        }}
                      >
                        {c.name}
                      </div>
                      <Body style={{ fontSize: 13 }}>{c.desc}</Body>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={100}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
              }}
            >
              <img
                src={fr1Coin}
                alt="FR1 token"
                style={{
                  width: "clamp(200px,28vw,320px)",
                  filter: "drop-shadow(0 20px 60px rgba(200,168,75,0.55))",
                  display: "block",
                }}
              />
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {[
                  { v: "200 FR1", l: "= 1 USDC" },
                  { v: "1 FR1", l: "= 10 PTS" },
                  { v: "150 PTS", l: "signup bonus" },
                ].map((s) => (
                  <div
                    key={s.l}
                    style={{
                      textAlign: "center",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 8,
                      padding: "12px 16px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontWeight: 800,
                        fontStyle: "italic",
                        fontSize: 15,
                        color: "#fff",
                      }}
                    >
                      {s.v}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: 10,
                        color: "#555",
                        letterSpacing: 1,
                        marginTop: 3,
                      }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Slide>
  )
}

function NoRake() {
  return (
    <Slide>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(229,0,26,0.12) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div className="sp" style={{ position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 700 }}>
          <Reveal>
            <Tag>Why FR1BET Is Different</Tag>
          </Reveal>
          <Reveal delay={80}>
            <div style={{ marginTop: 16, marginBottom: 20 }}>
              <H1 white="The House Doesn't" />
              <H1 red="Win Here." />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <Divider />
          </Reveal>
          <Reveal delay={180}>
            <Body style={{ marginTop: 8, fontSize: 17, maxWidth: 540 }}>
              FR1BET takes zero rake from prediction pools. 100% of every pool
              goes to winners. The platform is funded by subscriptions — your
              subscription, not your losses.
            </Body>
          </Reveal>
        </div>

        <div className="g2" style={{ marginTop: 48, gap: 20 }}>
          {[
            {
              icon: "⊙",
              t: "No race winner card",
              b: "There is no 'who wins the race' card. Every sportsbook already prices that. FR1BET covers the 21 questions nobody else asks — the midfield, the back, the strategy calls.",
            },
            {
              icon: "◈",
              t: "Easy to join",
              b: "Sign up with Google one-tap or email. No crypto knowledge required. FR1BET automatically creates a wallet for you via Privy — you never touch seed phrases.",
            },
            {
              icon: "◉",
              t: "On-chain transparent",
              b: "Settlement logic is written in the smart contract, verifiable on Solana. No spreadsheet, no trust-me — the code is the rule.",
            },
            {
              icon: "✦",
              t: "Private Paddocks",
              b: "Build a custom prediction sheet — any position, any session — and run a private pool with friends or your community. Same engine, zero rake.",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={200 + i * 70}>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  padding: "24px 26px",
                  display: "flex",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    color: RED,
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {c.icon}
                </div>
                <div>
                  <CardTitle>{c.t}</CardTitle>
                  <Body style={{ fontSize: 14 }}>{c.b}</Body>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function GetStarted() {
  const steps = [
    {
      n: "01",
      t: "Create your account",
      b: "Google one-tap or email signup — takes under 30 seconds.",
    },
    {
      n: "02",
      t: "Get your bonus PTS",
      b: "150 PTS land in your account the moment you verify your email.",
    },
    {
      n: "03",
      t: "Open the grid",
      b: "Pick your predictions across all 10 cards for the upcoming race weekend.",
    },
    {
      n: "04",
      t: "Set your stake tier",
      b: "Choose 1–100 PTS per card. You can edit your picks until 5 minutes before qualifying.",
    },
    {
      n: "05",
      t: "Race weekend settles",
      b: "Results confirmed. Winners paid automatically from each card's pool.",
    },
  ]
  return (
    <Slide id="cta">
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 55%, rgba(229,0,26,0.15) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          minHeight: "100dvh",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "clamp(32px,5vw,72px)",
            padding: "clamp(24px,6vw,64px) clamp(20px,5vw,56px)",
            flexWrap: "wrap",
          }}
        >
          {/* Left */}
          <div style={{ flex: "1 1 300px", minWidth: 0 }}>
            <Reveal>
              <Tag>Get Started</Tag>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ marginTop: 16, marginBottom: 24 }}>
                <H1 white="Your Race Weekend" />
                <H1 white="Starts Here." />
              </div>
            </Reveal>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                marginBottom: 36,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 9,
                  top: 24,
                  bottom: 24,
                  width: 1,
                  background: "rgba(255,255,255,0.07)",
                }}
              />
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={100 + i * 70}>
                  <div
                    style={{
                      display: "flex",
                      gap: 20,
                      paddingBottom: 18,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: i === 0 ? RED : "rgba(255,255,255,0.08)",
                        border: `1px solid ${
                          i === 0 ? RED : "rgba(255,255,255,0.15)"
                        }`,
                        flexShrink: 0,
                        marginTop: 3,
                        zIndex: 1,
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          fontWeight: 800,
                          fontStyle: "italic",
                          fontSize: 14,
                          color: "#fff",
                          marginBottom: 3,
                          letterSpacing: 0.5,
                        }}
                      >
                        {s.t}
                      </div>
                      <Body style={{ fontSize: 13 }}>{s.b}</Body>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={500}>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a
                  className="presentation-hero-action presentation-hero-action-primary"
                  href="https://fr1bet.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: RED,
                    color: "#fff",
                    fontFamily: "'Barlow',sans-serif",
                    fontWeight: 800,
                    fontStyle: "italic",
                    fontSize: 16,
                    letterSpacing: 1.5,
                    padding: "16px 32px",
                    borderRadius: 8,
                    textDecoration: "none",
                    boxShadow: `0 8px 32px rgba(229,0,26,0.45)`,
                  }}
                >
                  ENTER THE GRID ›
                </a>
              </div>
            </Reveal>
            <Reveal delay={560}>
              <div style={{ marginTop: 24 }}>
                <div
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#fff",
                  }}
                >
                  fr1bet.com
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — QR */}
          <Reveal delay={200}>
            <div
              style={{
                flex: "0 0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
              }}
            >
              <img
                src={qrCode}
                alt="Scan to open fr1bet.com"
                style={{
                  width: "clamp(220px,28vw,340px)",
                  height: "clamp(220px,28vw,340px)",
                  borderRadius: 16,
                  boxShadow: `0 0 0 3px ${RED}, 0 24px 64px rgba(0,0,0,0.8)`,
                  display: "block",
                }}
              />
              <span
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontWeight: 700,
                  fontStyle: "italic",
                  fontSize: 12,
                  color: "#555",
                  letterSpacing: 3,
                  textTransform: "uppercase",
                }}
              >
                Scan to open
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </Slide>
  )
}

/* ─── Root ─── */
export default function App() {
  return (
    <div style={{ background: "#080808" }}>
      <ScrollProgress />
      <Hero />
      <HowItWorks />
      <PoolsExplained />
      <StakeTiers />
      <SprintWeekends />
      <Dashboard />
      <PitPass />
      <Currencies />
      <NoRake />
      <GetStarted />
    </div>
  )
}
