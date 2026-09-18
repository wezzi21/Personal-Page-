import fr1betLogo from "@/imports/red_white_logo.png"
import { Reveal } from "@/components/Reveal"
import { useRafScroll } from "@/lib/use-raf-scroll"

const STORY_POSTER_SRC = "/assets/fr1bet-story-bg.png"

// ─── Story Section ────────────────────────────────────────────────────────────

type StoryBeat = {
  number: string
  label: string
  headline: string
  body: string[]
  quote?: string
  flipImage?: { src: string; alt: string }
}

const storyBeats: StoryBeat[] = [
  {
    number: "01",
    label: "Friday",
    headline: "Friday Betting.",
    body: [
      "It started as something my father and I did together. Every Friday before an F1 weekend, we sat down with a printed spreadsheet and went through the grid.",
      "We called it Friday Betting. Ten predictions, one race weekend — a father and son, and a group of friends who'd gather to make their picks. We had our opinions about everything — not just who would win, but who would fight, who would fall, when strategy would change the order.",
      "We did it for years. It was ours.",
    ],
    flipImage: {
      src: "/assets/fr1bet-friday-betting.jpg",
      alt: "Father and son sitting at a table filling out a printed Formula 1 prediction spreadsheet, with a cat resting between them",
    },
  },
  {
    number: "02",
    label: "The Question",
    headline: "What Are We Really Watching For?",
    body: [
      "Sitting there with my father, I started asking a bigger question. When people follow Formula 1, what is it they are actually watching for?",
      "Is it the podium? The strategy calls? The split-second battles through the chicane? Or the moment everything changes — a safety car, an unexpected overtake, a retirement that reshapes the race?",
    ],
    quote: "The uncertainty of not knowing what happens next.",
    flipImage: {
      src: "/assets/fr1bet-the-question.jpg",
      alt: "Fans watching the pit lane and grandstands packed with spectators during a race weekend",
    },
  },
  {
    number: "03",
    label: "The Turning Point",
    headline: "Then I Lost My Father.",
    body: [
      "My father passed away due to leukemia.",
      "After losing him, I sat with the idea we had built together every Friday. I thought about the question we had been asking. I thought about how much more there was to say about it.",
      "And I decided to act.",
    ],
    quote: "The idea deserved to exist outside my head.",
  },
  {
    number: "04",
    label: "The Build",
    headline: "So I Started Building.",
    body: [
      "I imagined a platform where every fan could become part of that experience — a place to predict, compete, react, and follow the race together.",
      "Not just who wins. The whole grid. The whole weekend.",
      "I started turning what had only ever existed in my mind into something real.",
    ],
  },
  {
    number: "05",
    label: "FR1BET",
    headline: "That Idea Became FR1BET.",
    body: [],
    quote:
      "Built to bring the grid to life — not just as a race to watch, but as a world to enter.",
  },
]

// Large decorative artwork pinned to the left side of the story section.
// It is intentionally oversized and much taller than the viewport — the full
// image is always shown at its native aspect ratio (never cropped), and it
// fades softly into the page background instead of sitting in a hard box.
// Tweak these values to resize/reposition it without touching the JSX below.
const STORY_ARTWORK = {
  width: "380px", // rendered width — height follows automatically from the image's aspect ratio
  scale: 1, // quick overall size multiplier
  top: "-40px", // vertical offset from the top of the section
  left: "-60px", // horizontal offset from the left edge of the section (negative bleeds off-screen)
  opacity: 0.8, // how visible the artwork is at its most opaque point
  fadeInner: 55, // % of the artwork radius that stays fully opaque before the fade begins
}

function StoryArtwork() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: STORY_ARTWORK.top,
        left: STORY_ARTWORK.left,
        width: `calc(${STORY_ARTWORK.width} * ${STORY_ARTWORK.scale})`,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <img
        src="/assets/fr1bet-track-banner.png"
        alt=""
        loading="lazy"
        decoding="async"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          mixBlendMode: "screen",
          opacity: STORY_ARTWORK.opacity,
          maskImage: `radial-gradient(70% 45% at 50% 38%, black ${STORY_ARTWORK.fadeInner}%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(70% 45% at 50% 38%, black ${STORY_ARTWORK.fadeInner}%, transparent 100%)`,
        }}
      />
    </div>
  )
}

function StoryBeatBlock({ beat, index }: { beat: StoryBeat; index: number }) {
  const isLast = index === storyBeats.length - 1
  return (
    <Reveal delay={index * 80}>
      <div
        className="relative"
        style={{
          paddingLeft: "2rem",
          paddingBottom: isLast ? "0" : "4rem",
          borderLeft: "1px solid var(--surface-800)",
        }}
      >
        {/* Red dot on timeline */}
        <div
          style={{
            position: "absolute",
            left: "-5px",
            top: "2px",
            width: "9px",
            height: "9px",
            borderRadius: "50%",
            background: index === 0 ? "var(--red)" : "var(--surface-700)",
            border: index === 0 ? "none" : "1px solid var(--surface-600)",
            boxShadow: index === 0 ? "0 0 12px var(--red-glow)" : "none",
          }}
        />

        {/* Label */}
        <p className="section-label mb-3">
          {beat.number} / {beat.label}
        </p>

        {/* Headline */}
        <h2
          className="story-number mb-5"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)" }}
        >
          {beat.headline}
        </h2>

        {/* Body */}
        {beat.flipImage ? (
          <div
            className="flip-card"
            tabIndex={0}
            style={{
              maxWidth: "560px",
              height: "440px",
              outline: "none",
            }}
          >
            <div className="flip-card-hint" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 2.1 21 6l-4 3.9" />
                <path d="M3 12.5v-2A5 5 0 0 1 8 5.5h13" />
                <path d="M7 21.9 3 18l4-3.9" />
                <path d="M21 11.5v2a5 5 0 0 1-5 5H3" />
              </svg>
            </div>
            <div className="flip-card-inner">
              {/* Front: story text */}
              <div
                className="flip-card-front"
                style={{
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {beat.body.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                      color: "var(--neutral-400)",
                      lineHeight: 1.75,
                      marginBottom: "1rem",
                    }}
                  >
                    {para}
                  </p>
                ))}
                {beat.quote && (
                  <blockquote className="pull-quote mt-2">
                    {beat.quote}
                  </blockquote>
                )}
              </div>

              {/* Back: photo */}
              <div className="flip-card-back">
                <img
                  src={beat.flipImage.src}
                  alt={beat.flipImage.alt}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            {beat.body.map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                  color: "var(--neutral-400)",
                  lineHeight: 1.75,
                  maxWidth: "560px",
                  marginBottom: "1rem",
                }}
              >
                {para}
              </p>
            ))}

            {beat.quote && (
              <blockquote
                className="pull-quote mt-5"
                style={{ maxWidth: "500px" }}
              >
                {beat.quote}
              </blockquote>
            )}
          </>
        )}
      </div>
    </Reveal>
  )
}

export function Story() {
  useRafScroll(() => {
    const section = document.getElementById("story")
    if (!section) return
    const bounds = section.getBoundingClientRect()
    const offset = Math.max(
      -140,
      Math.min(
        140,
        (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) * 0.16,
      ),
    )
    section.style.setProperty("--story-parallax-y", `${offset}px`)
  })

  return (
    <section
      id="story"
      className="relative story-3d-section"
      style={{ background: "var(--black)", padding: "7rem 0" }}
    >
      <div className="story-poster-layer" aria-hidden="true">
        <img src={STORY_POSTER_SRC} alt="" loading="eager" decoding="async" />
      </div>
      <div className="story-presentation-logo" aria-hidden="true">
        <img src={fr1betLogo} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="dot-grid absolute inset-0 opacity-60" />
      <StoryArtwork />

      <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto">
        <Reveal className="mb-14">
          <p className="section-label mb-3">Origin</p>
          <h2
            className="hero-display"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "var(--white)",
            }}
          >
            The Story
          </h2>
          <span className="rule-red mt-5 block" />
        </Reveal>

        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          {/* Left: sticky context on desktop */}
          <div className="hidden md:flex md:flex-col">
            <div
              style={{
                position: "sticky",
                top: "100px",
                borderTop: "1px solid var(--surface-800)",
                paddingTop: "1.5rem",
                zIndex: 1,
                background: "transparent",
                display: "flex",
                flexDirection: "column",
                height: "calc(100vh - 140px)",
              }}
            >
              <p
                style={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--white)",
                  lineHeight: 2,
                }}
              >
                Founder
                <br />
                Wesley Robin Jaesch
                <br />
                <br />
                <span style={{ color: "var(--red)" }}>FR1BET</span>
                <br />
                Origin Story
              </p>
              <div className="mt-8">
                {storyBeats.map((b, i) => (
                  <div
                    key={i}
                    className="story-nav-item flex items-center gap-3 mb-3"
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--surface-700)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 600,
                        fontSize: "0.65rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--neutral-500)",
                      }}
                    >
                      {b.number} / {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: story beats */}
          <div>
            {storyBeats.map((beat, i) => (
              <StoryBeatBlock key={i} beat={beat} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
