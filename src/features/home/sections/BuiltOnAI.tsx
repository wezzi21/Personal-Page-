import { Reveal } from "@/components/Reveal"

// ─── Built on AI Section ──────────────────────────────────────────────────────

const aiStats = [
  { stat: "One founder", sub: "With a waiter's salary" },
  { stat: "Two engineers", sub: "Who believed in the idea" },
  { stat: "Zero code written", sub: "By me, personally" },
  { stat: "Built anyway", sub: "Because AI made it possible" },
]

export function BuiltOnAI() {
  return (
    <section
      id="built-on-ai"
      className="relative"
      style={{
        background: "var(--black)",
        padding: "7rem 0",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
      <div className="grid-overlay absolute inset-0" />

      {/* Red glow right */}
      <div
        style={{
          position: "absolute",
          right: "-5%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "45vw",
          height: "45vw",
          background:
            "radial-gradient(ellipse at center, rgba(255,24,1,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto">
        <Reveal className="mb-14">
          <p className="section-label mb-3">WRJ Page</p>
          <h2
            className="hero-display"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            I Still Can't Write
            <br />a Line of Code.
          </h2>
          <span className="rule-red mt-5 block" />
        </Reveal>

        <div className="grid md:grid-cols-[3fr_2fr] gap-12 md:gap-20 items-start">
          <Reveal delay={80}>
            <div>
              <p
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                  color: "var(--neutral-400)",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                }}
              >
                A few years ago, building FR1BET would have required hundreds of
                thousands of dollars and a whole team of engineers. I had
                neither.
              </p>
              <p
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                  color: "var(--neutral-400)",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                }}
              >
                AI changed that. It gave me the ability to materialise a
                platform I could only see in my head — without knowing how to
                code. Not by making it easy. But by making it possible.
              </p>
              <p
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                  color: "var(--neutral-400)",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                }}
              >
                So I took my waiter salary and hired two exceptional software
                engineers — Riccardo & Pedro — who guided me and helped me build
                this. The idea was mine — but this became real because of what
                we built together.
              </p>
              <blockquote
                className="pull-quote my-8"
                style={{ maxWidth: "500px" }}
              >
                If I can do it, so can you.
              </blockquote>
              <p
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                  color: "var(--neutral-400)",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                }}
              >
                Following your ideas has never been more within reach than it is
                right now. I'm not saying it's easy. Literally everything is
                achievable today. The barrier isn't technology anymore — it's
                deciding to start.
              </p>
            </div>
          </Reveal>

          {/* Stats / callouts */}
          <div
            style={{
              borderTop: "1px solid var(--red)",
              paddingTop: "1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {aiStats.map((item, i, arr) => (
              <div
                key={item.stat}
                style={{
                  padding: "1.25rem 0",
                  borderBottom:
                    i < arr.length - 1
                      ? "1px solid var(--surface-800)"
                      : "none",
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 900,
                    fontStyle: "italic",
                    fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    color: "var(--white)",
                    marginBottom: "3px",
                  }}
                >
                  {item.stat}
                </p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "0.78rem",
                    color: "var(--neutral-500)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
