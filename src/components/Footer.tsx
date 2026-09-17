import fr1betLogo from "@/imports/red_white_logo.png"

// ─── Footer ───────────────────────────────────────────────────────────────────
// Shared across the home page and the socials page.

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--surface-900)",
        borderTop: "1px solid var(--surface-800)",
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span
          style={{
            fontFamily: "Inter",
            fontWeight: 900,
            fontStyle: "italic",
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--neutral-500)",
          }}
        >
          <a
            href="#hero"
            className="wordmark-zoom"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            WRJ<span style={{ color: "var(--red)" }}>.</span>
          </a>
        </span>
        <span
          style={{
            width: "1px",
            height: "16px",
            background: "var(--surface-700)",
            display: "inline-block",
          }}
        />
        <a
          href="https://fr1bet.com"
          className="footer-logo-hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={fr1betLogo}
            alt="FR1BET"
            style={{
              height: "22px",
              objectFit: "contain",
              opacity: 0.5,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.opacity = "1"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.opacity = "0.5"
            }}
          />
        </a>
        <a href="mailto:info@fr1bet.com" className="footer-email">
          info@fr1bet.com
        </a>
      </div>
      <span
        style={{
          fontFamily: "Inter",
          fontWeight: 400,
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          color: "var(--neutral-500)",
        }}
      >
        Wesley Robin Jaesch · Founder, FR1BET
      </span>
      <span
        style={{
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: "0.65rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--surface-700)",
        }}
      >
        {new Date().getFullYear()}
      </span>
    </footer>
  )
}
