import fr1betLogo from "@/imports/red_white_logo.png"
import { Reveal } from "@/components/Reveal"
import {
  IconLinkedIn,
  IconInstagram,
  IconX,
  IconDiscord,
  IconPinterest,
} from "@/components/icons/SocialIcons"
import { HeroAnimation } from "@/features/home/HeroAnimation"

// ─── Hero Section ──────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col"
      style={{ background: "var(--black)" }}
    >
      {/* Full-bleed animation behind the headline */}
      <div className="hero-background-layer" aria-hidden="true">
        <HeroAnimation />
      </div>

      {/* Hero content */}
      <div
        className="hero-headline-content relative z-10 w-full"
        style={{ minHeight: "65vh" }}
      >
        {/* Hero copy overlay — bottom of animation */}
        <div
          className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10 hero-copy-overlay"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.7) 60%, transparent 100%)",
            transform: "translateY(24mm)",
            borderRadius: "261px",
            textAlign: "left",
            fontFamily: '"Inter", sans-serif',
            fontSize: "15px",
            minHeight: "245px",
            height: "auto",
            width: "min(663px, calc(100% - 24px))",
            marginLeft: "-4px",
            paddingTop: "18px",
            paddingLeft: "74px",
            paddingRight: "42px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            overflow: "hidden",
            opacity: 0.8,
            boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
            boxSizing: "border-box",
          }}
        >
          <Reveal delay={100}>
            <p className="section-label mb-4">Founder · FR1BET</p>
          </Reveal>
          <Reveal delay={200}>
            <h1
              className="hero-display"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
            >
              <span style={{ display: "block" }}>Wesley</span>
              <span style={{ display: "block" }}>Jaesch</span>
            </h1>{" "}
          </Reveal>
        </div>
      </div>

      {/* Supporting hero content */}
      <div
        className="hero-support-content relative z-10 px-6 md:px-12 pt-8 pb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        style={{ top: "6mm" }}
      >
        <div style={{ maxWidth: "560px" }}>
          <Reveal delay={100}>
            <p
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "var(--neutral-400)",
                lineHeight: 1.6,
                marginBottom: "2rem",
              }}
            >
              Founder of FR1BET — built from a personal tradition, a loss, and a
              decision to act.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#story" className="cta-primary">
                <span>The Story</span>
              </a>
              <a
                href="https://fr1bet.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-ghost"
                style={{ padding: "8px 14px" }}
              >
                <img
                  src={fr1betLogo}
                  alt="FR1BET"
                  width="140"
                  height="28"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  style={{
                    height: "28px",
                    width: "140px",
                    objectFit: "contain",
                  }}
                />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Social links */}
        <div className="home-social-links flex flex-col items-start gap-4 md:items-end md:gap-5">
          <a
            href="https://www.linkedin.com/in/wrjaesch"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <IconLinkedIn /> LinkedIn
          </a>
          <a
            href="https://instagram.com/fr1.bet"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <IconInstagram /> Instagram
          </a>
          <a
            href="https://x.com/fr1bet"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <IconX /> X
          </a>
          <a
            href="https://fr1bet.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <span style={{ color: "var(--red)" }}>●</span>&nbsp;FR1BET
          </a>
          <a
            href="https://discord.gg/PUVN3A6XVN"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <IconDiscord /> Discord
          </a>
          <a
            href="https://pinterest.com/fr1bet"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <IconPinterest /> Pinterest
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-4 left-1/2"
        style={{
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          opacity: 0.3,
        }}
      >
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, transparent, var(--red))",
          }}
        />
        <span
          style={{
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: "0.55rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--neutral-500)",
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
