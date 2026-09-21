import { useState } from "react"
import fr1betLogo from "@/imports/red_white_logo.png"
import { Reveal } from "@/components/Reveal"

// ─── What I'm Building ─────────────────────────────────────────────────────────

const buildingItems = [
  { label: "Predict", desc: "The whole grid. Not just the winner." },
  { label: "Compete", desc: "Against friends and the community." },
  { label: "Experience", desc: "Race weekends as a shared world." },
  { label: "Enter", desc: "The grid — as a participant, not a viewer." },
]

export function WhatImBuilding() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      id="idea"
      className="relative"
      style={{
        background: "var(--surface-900)",
        padding: "7rem 0",
        overflow: "hidden",
      }}
    >
      {/* Red glow */}
      <div
        style={{
          position: "absolute",
          right: "-10%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(ellipse at center, rgba(255,24,1,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div className="grid-overlay absolute inset-0" />

      <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto">
        <Reveal className="mb-14">
          <p className="section-label mb-3">The Idea</p>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            <h2
              className="hero-display"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              What I'm Building
            </h2>
            <div style={{ paddingBottom: "0.5rem", flexShrink: 0 }}>
              <a
                className="fr1bet-idea-logo"
                href="https://fr1bet.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="fr1bet-idea-logo-image"
                  src={fr1betLogo}
                  alt="FR1BET — F1 Pari-Mutuel Prediction Platform"
                  style={{
                    height: "clamp(36px, 5vw, 56px)",
                    objectFit: "contain",
                    opacity: 0.95,
                  }}
                />
              </a>
            </div>
          </div>
          <span className="rule-red mt-5 block" />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
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
                FR1BET started as a simple question: what if the parts of
                Formula 1 that fans obsess over could become part of the
                experience itself?
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
                I'm building toward a platform where fans can engage with the
                entire grid — share predictions, compete with friends, and
                experience race weekends in a more interactive way.
              </p>
            </div>
          </Reveal>

          {/* Concept visual */}
          <div
            style={{
              borderTop: "1px solid var(--surface-700)",
              paddingTop: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {buildingItems.map((item, i) => {
              const isUnfocused = hoveredIndex !== null && hoveredIndex !== i
              return (
                <Reveal key={item.label} fade delay={i * 140}>
                  <div
                    className="flex items-start gap-4"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      borderBottom: "1px solid var(--surface-800)",
                      paddingBottom: "1.25rem",
                      opacity: isUnfocused ? 0.35 : 1,
                      filter: isUnfocused ? "blur(3px)" : "blur(0px)",
                      transform: isUnfocused ? "scale(0.98)" : "scale(1)",
                      transition:
                        "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--red)",
                        marginTop: "6px",
                        flexShrink: 0,
                        boxShadow: "0 0 8px var(--red-glow)",
                      }}
                    />
                    <div>
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--white)",
                          marginBottom: "2px",
                        }}
                      >
                        {item.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 400,
                          fontSize: "0.85rem",
                          color: "var(--neutral-500)",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
