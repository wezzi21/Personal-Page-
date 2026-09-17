import { Reveal } from "@/components/Reveal"
import {
  IconLinkedIn,
  IconInstagram,
  IconX,
  IconArrow,
  IconDiscord,
  IconPinterest,
} from "@/components/icons/SocialIcons"

// ─── Connect Section ──────────────────────────────────────────────────────────

const links = [
  {
    label: "LinkedIn",
    icon: <IconLinkedIn />,
    href: "https://www.linkedin.com/in/wrjaesch",
  },
  {
    label: "Instagram",
    icon: <IconInstagram />,
    href: "https://instagram.com/fr1.bet",
  },
  { label: "X", icon: <IconX />, href: "https://x.com/fr1bet" },
  {
    label: "Discord",
    icon: <IconDiscord />,
    href: "https://discord.gg/PUVN3A6XVN",
  },
  {
    label: "Pinterest",
    icon: <IconPinterest />,
    href: "https://pinterest.com/fr1bet",
  },
]

export function Connect() {
  return (
    <section
      id="connect"
      className="relative"
      style={{
        background: "var(--black)",
        padding: "8rem 0 6rem",
        overflow: "hidden",
      }}
    >
      {/* Red glow centre */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(ellipse at center, rgba(255,24,1,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div className="dot-grid absolute inset-0 opacity-40" />

      <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto">
        <Reveal className="mb-14 text-center">
          <p className="section-label mb-4">Connect</p>
          <h2
            className="hero-display"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            Let's Connect.
          </h2>
          <p
            style={{
              fontFamily: "Inter",
              fontWeight: 400,
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              color: "var(--neutral-500)",
              marginTop: "1.5rem",
              lineHeight: 1.7,
            }}
          >
            Whether you follow Formula 1, build things, or are simply curious —
            I'm always open to a conversation.
          </p>
        </Reveal>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="social-box"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                padding: "24px 12px",
                border: "1px solid var(--surface-800)",
                textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s",
                background: "transparent",
                color: "var(--neutral-400)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "var(--red)"
                ;(e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--white)"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "var(--surface-800)"
                ;(e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--neutral-400)"
              }}
            >
              <span>{link.icon}</span>
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                {link.label}
              </span>
            </a>
          ))}
        </div>

        {/* Primary CTA row */}
        <div className="flex items-center justify-center">
          <a
            href="https://fr1bet.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary"
          >
            <span>
              Visit FR1BET <IconArrow />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
