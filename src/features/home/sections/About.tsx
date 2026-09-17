import { Reveal } from "@/components/Reveal"

// ─── About Section ────────────────────────────────────────────────────────────

const qualities = [
  "Leadership",
  "Adaptability",
  "Attention to detail",
  "International experience",
  "Working under pressure",
  "Understanding people",
  "Team coordination",
  "Communication",
]

export function About() {
  return (
    <section
      id="about"
      className="relative"
      style={{
        background: "var(--surface-900)",
        padding: "7rem 0",
        overflow: "hidden",
      }}
    >
      <div className="grid-overlay absolute inset-0 opacity-70" />

      <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto">
        <Reveal className="mb-14">
          <p className="section-label mb-3">Founder</p>
          <h2
            className="hero-display"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            About Wesley
          </h2>
          <span className="rule-red mt-5 block" />
        </Reveal>

        <div className="grid md:grid-cols-[2fr_1fr] gap-12 md:gap-20">
          <Reveal delay={100}>
            <div>
              <p
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                  color: "var(--neutral-400)",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                }}
              >
                I spent years working across Europe in hospitality — Portugal,
                Austria, Switzerland, Corsica — moving from service roles into
                leadership. I learned to work under pressure, read people
                quickly, and care about the details others miss.
              </p>
              <p
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                  color: "var(--neutral-400)",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                }}
              >
                Entrepreneurship is another chapter of the same journey. FR1BET
                didn't start with a market report or a pitch deck. It started
                with a tradition my father and I kept for years — and a question
                I couldn't stop asking.
              </p>
              <p
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                  color: "var(--neutral-400)",
                  lineHeight: 1.8,
                }}
              >
                I build from personal experience. I take ideas seriously enough
                to act on them.
              </p>
            </div>
          </Reveal>

          {/* Qualities */}
          <div
            style={{
              borderTop: "1px solid var(--surface-700)",
              paddingTop: "1.5rem",
            }}
          >
            <p className="section-label mb-4">Background</p>
            <div className="flex flex-wrap gap-2">
              {qualities.map((q) => (
                <span
                  key={q}
                  className="quality-tag"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 600,
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--neutral-400)",
                    border: "1px solid var(--surface-700)",
                    padding: "5px 10px",
                    display: "inline-block",
                  }}
                >
                  {q}
                </span>
              ))}
            </div>

            <div
              style={{
                marginTop: "2.5rem",
                borderTop: "1px solid var(--surface-800)",
                paddingTop: "1.5rem",
              }}
            >
              <p className="section-label mb-3">Based in</p>
              <p
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "0.875rem",
                  color: "var(--neutral-500)",
                  lineHeight: 1.6,
                }}
              >
                Europe
              </p>
              <p className="section-label mt-4 mb-3">Building</p>
              <p
                style={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  color: "var(--white)",
                  letterSpacing: "0.04em",
                }}
              >
                FR1BET
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
