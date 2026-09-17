import { useState } from "react"
import fr1betLogo from "@/imports/red_white_logo.png"

// ─── Navigation ───────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Vision", href: "#vision" },
  { label: "About", href: "#about" },
  { label: "AI", href: "#built-on-ai" },
  { label: "Socials", href: "/socials" },
]

export function Nav({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
        style={{
          height: "64px",
          background:
            scrolled || menuOpen ? "rgba(10,10,10,0.96)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          borderBottom:
            scrolled || menuOpen ? "1px solid rgba(255,255,255,0.04)" : "none",
          transition:
            "background 0.3s, backdrop-filter 0.3s, border-color 0.3s",
        }}
      >
        {/* Mobile: WRJ on the left */}
        <a
          href="#hero"
          className="md:hidden"
          style={{
            fontFamily: "Inter",
            fontWeight: 900,
            fontStyle: "italic",
            fontSize: "0.9rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--white)",
            textDecoration: "none",
          }}
        >
          WRJ<span style={{ color: "var(--red)", marginLeft: "2px" }}>.</span>
        </a>

        {/* Desktop: presentation shortcut */}
        <div className="presentation-nav-group hidden md:flex items-center">
          <a href="/presentation" className="social-link">
            FR1BET PRESENTATION
          </a>
          <span aria-hidden="true" className="presentation-nav-divider">
            /
          </span>
          <a href="#" className="social-link" aria-label="Guide coming soon">
            Guide
          </a>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="social-link">
              {l.label}
            </a>
          ))}
          <a
            href="https://fr1bet.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <img
              className="fr1bet-logo-hover"
              src={fr1betLogo}
              alt="FR1BET"
              style={{ height: "20px", objectFit: "contain" }}
            />
          </a>
          <a
            href="#hero"
            className="wordmark-zoom"
            style={{
              fontFamily: "Inter",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--white)",
              textDecoration: "none",
            }}
          >
            WRJ<span style={{ color: "var(--red)", marginLeft: "2px" }}>.</span>
          </a>
          <a
            href="#connect"
            className="cta-primary"
            style={{ padding: "8px 18px", fontSize: "0.65rem" }}
          >
            <span>Connect</span>
          </a>
        </div>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5"
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            position: "relative",
            zIndex: 60,
            background: menuOpen ? "rgba(255,255,255,0.08)" : "none",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            padding: "4px",
            width: "36px",
            height: "36px",
            transition: "background 0.2s",
          }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            style={{
              display: "block",
              width: "20px",
              height: "1.5px",
              background: "var(--white)",
              transition: "transform 0.2s, opacity 0.2s",
              transform: menuOpen ? "translateY(7.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "20px",
              height: "1.5px",
              background: "var(--white)",
              transition: "opacity 0.2s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: "20px",
              height: "1.5px",
              background: "var(--white)",
              transition: "transform 0.2s, opacity 0.2s",
              transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className="fixed top-16 left-0 right-0 z-40 md:hidden"
          style={{
            background: "rgba(10,10,10,0.97)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--surface-800)",
            padding: "1.5rem 1.5rem 2rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--neutral-400)",
                  textDecoration: "none",
                  padding: "1rem 0",
                  borderBottom: "1px solid var(--surface-800)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--white)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--neutral-400)"
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/presentation"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--red)",
                textDecoration: "none",
                padding: "1rem 0",
                borderBottom: "1px solid var(--surface-800)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--white)"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--red)"
              }}
            >
              FR1BET Presentation
            </a>
            <div
              style={{
                paddingTop: "1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <a
                href="https://fr1bet.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                <img
                  src={fr1betLogo}
                  alt="FR1BET"
                  style={{ height: "24px", objectFit: "contain" }}
                />
              </a>
              <a
                href="#connect"
                className="cta-primary"
                onClick={() => setMenuOpen(false)}
                style={{ padding: "10px 22px", fontSize: "0.65rem" }}
              >
                <span>Connect</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
