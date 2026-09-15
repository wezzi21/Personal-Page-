import { Reveal } from "@/components/Reveal"

// ─── Vision Section ────────────────────────────────────────────────────────────

const milestones = [
  {
    marker: "Then",
    headline: "Friday nights with my father.",
    body: "A printed spreadsheet. Ten bets. Two people watching the same race with completely different opinions.",
  },
  {
    marker: "Now",
    headline: "Building FR1BET.",
    body: "Turning the idea into a platform. Building the world we imagined at that table, and opening it to every F1 fan.",
    active: true,
  },
  {
    marker: "Next",
    headline: "A new way to experience the grid.",
    body: "A place where fans don't just watch a race weekend — they enter it. Together.",
  },
]

export function Vision() {
  return (
    <section
      id="vision"
      className="relative"
      style={{
        background: "var(--black)",
        padding: "7rem 0",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow left */}
      <div
        style={{
          position: "absolute",
          left: "-5%",
          top: "40%",
          transform: "translateY(-50%)",
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(ellipse at center, rgba(255,24,1,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto">
        <Reveal className="mb-16">
          <p className="section-label mb-3">The Vision</p>
          <h2
            className="hero-display"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Where This Goes
          </h2>
          <span className="rule-red mt-5 block" />
        </Reveal>

        {/* Large central quote */}
        <Reveal delay={100}>
          <blockquote
            className="pull-quote mb-16"
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
              maxWidth: "700px",
            }}
          >
            I want FR1BET to become a place where Formula 1 fans don't just
            watch a race weekend — they enter it.
          </blockquote>
        </Reveal>

        {/* Then / Now / Next */}
        <div className="grid md:grid-cols-3 gap-0">
          {milestones.map((m, i) => (
            <Reveal key={m.marker} delay={i * 100}>
              <div
                style={{
                  borderTop: `1px solid ${
                    m.active ? "var(--red)" : "var(--surface-700)"
                  }`,
                  paddingTop: "1.75rem",
                  paddingRight: i < 2 ? "2rem" : "0",
                  paddingLeft: i > 0 ? "2rem" : "0",
                  borderLeft: i > 0 ? "1px solid var(--surface-800)" : "none",
                }}
              >
                <p
                  className="section-label mb-3"
                  style={{
                    color: m.active ? "var(--red)" : "var(--neutral-500)",
                  }}
                >
                  {m.marker}
                </p>
                <h3
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 900,
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    color: m.active ? "var(--white)" : "var(--neutral-400)",
                    marginBottom: "0.75rem",
                    lineHeight: 1.2,
                  }}
                >
                  {m.headline}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "0.875rem",
                    color: "var(--neutral-500)",
                    lineHeight: 1.7,
                  }}
                >
                  {m.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
