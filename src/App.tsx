import { useState, useEffect, useRef } from "react";
import fr1betLogo from "@/imports/red_white_logo.png";
import generatedSocialPosts from "./social-posts.json";

// ─── Scroll Reveal ────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, fade = false, className = "" }: { children: React.ReactNode; delay?: number; fade?: boolean; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`${fade ? "reveal-fade" : "reveal"} ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function ReactiveMesh() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let targetX = 50;
    let targetY = 42;
    let currentX = targetX;
    let currentY = targetY;
    let currentGlowX = targetX;
    let currentGlowY = targetY;

    const handlePointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth) * 100;
      targetY = (event.clientY / window.innerHeight) * 100;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;
      currentGlowX += (currentX - currentGlowX) * 0.035;
      currentGlowY += (currentY - currentGlowY) * 0.035;
      mesh.style.setProperty("--mesh-x", `${currentX}%`);
      mesh.style.setProperty("--mesh-y", `${currentY}%`);
      mesh.style.setProperty("--mesh-trail-x", `${currentGlowX}%`);
      mesh.style.setProperty("--mesh-trail-y", `${currentGlowY}%`);
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    frame = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="reactive-mesh" aria-hidden="true" />;
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function IconLinkedIn() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconDiscord() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function IconPinterest() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.162 9.429 7.627 11.188-.105-.949-.2-2.405.042-3.441l1.1-4.679s-.281-.563-.281-1.397c0-1.307.758-2.284 1.701-2.284.802 0 1.189.602 1.189 1.324 0 .806-.513 2.012-.778 3.131-.221.936.469 1.699 1.392 1.699 1.671 0 2.956-1.763 2.956-4.307 0-2.251-1.618-3.826-3.929-3.826-2.676 0-4.247 2.008-4.247 4.084 0 .809.312 1.677.701 2.149a.282.282 0 0 1 .065.27l-.261 1.072c-.042.173-.14.21-.324.127-1.208-.562-1.962-2.327-1.962-3.746 0-3.05 2.216-5.849 6.391-5.849 3.355 0 5.963 2.39 5.963 5.585 0 3.333-2.102 6.015-5.019 6.015-.98 0-1.902-.509-2.218-1.11l-.603 2.296c-.218.839-.808 1.89-1.204 2.531.906.28 1.864.431 2.858.431 6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

// ─── Animation Placeholder ────────────────────────────────────────────────────

function HeroAnimation() {
  return (
    <div
      className="hero-parallax relative w-full h-full overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Telemetry labels */}
      <div className="absolute left-6" style={{ top: "76px", color: "rgba(255,255,255,0.35)", fontFamily: "Inter", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
        SESSION: FOUNDER / FR1BET
      </div>
      <div className="absolute right-6" style={{ top: "76px", color: "rgba(255,255,255,0.25)", fontFamily: "Inter", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
        P1 &nbsp;|&nbsp; QUALIFYING
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <span style={{ color: "rgba(255,255,255,0.15)", fontFamily: "Inter", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          LOOP / FR1BET — LIVE HEADER MEDIA
        </span>
      </div>

      {/* Silhouette / placeholder figure */}
      <div
        className="absolute"
        style={{
          left: "50%",
          bottom: "22%",
          transform: "translateX(-50%)",
          width: "2px",
          height: "48px",
          background: "linear-gradient(to top, rgba(255,255,255,0.6), transparent)",
        }}
      />
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Nav({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Story", href: "#story" },
    { label: "Vision", href: "#vision" },
    { label: "About", href: "#about" },
    { label: "AI", href: "#built-on-ai" },
    { label: "Socials", href: "/socials" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
        style={{
          height: "64px",
          background: scrolled || menuOpen ? "rgba(10,10,10,0.96)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.04)" : "none",
          transition: "background 0.3s, backdrop-filter 0.3s, border-color 0.3s",
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

        {/* Desktop: empty left */}
        <div className="hidden md:block" />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="social-link">{l.label}</a>
          ))}
          <a href="https://fr1bet.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <img className="fr1bet-logo-hover" src={fr1betLogo} alt="FR1BET" style={{ height: "20px", objectFit: "contain" }} />
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
          <a href="#connect" className="cta-primary" style={{ padding: "8px 18px", fontSize: "0.65rem" }}>
            <span>Connect</span>
          </a>
        </div>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5"
          onClick={() => setMenuOpen((v) => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", width: "32px", height: "32px" }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span style={{ display: "block", width: "20px", height: "1.5px", background: "var(--white)", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: "20px", height: "1.5px", background: "var(--white)", transition: "opacity 0.2s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "20px", height: "1.5px", background: "var(--white)", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none" }} />
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
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--white)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--neutral-400)"; }}
              >
                {l.label}
              </a>
            ))}
            <div style={{ paddingTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <a href="https://fr1bet.com" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
                <img src={fr1betLogo} alt="FR1BET" style={{ height: "24px", objectFit: "contain" }} />
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
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col"
      style={{ background: "var(--black)" }}
    >
      {/* Animation fills top portion */}
      <div className="relative w-full" style={{ height: "65vh", minHeight: "400px" }}>
        <HeroAnimation />

        {/* Hero copy overlay — bottom of animation */}
        <div
          className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10"
          style={{
            background: "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.7) 60%, transparent 100%)",
          }}
        >
          <Reveal delay={100}><p className="section-label mb-4">Founder · FR1BET</p></Reveal>
          <Reveal delay={200}><h1 className="hero-display" style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}>
            Wesley <span style={{ fontSize: "0.45em", fontWeight: 700, letterSpacing: "0.04em", verticalAlign: "middle", opacity: 0.7 }}>Robin</span><br />Jaesch
          </h1></Reveal>
        </div>
      </div>

      {/* Below animation */}
      <div className="px-6 md:px-12 pt-8 pb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
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
            Founder of FR1BET — built from a personal tradition, a loss, and a decision to act.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="#story" className="cta-primary">
              <span>The Story</span>
            </a>
            <a href="https://fr1bet.com" target="_blank" rel="noopener noreferrer" className="cta-ghost" style={{ padding: "8px 14px" }}>
              <img src={fr1betLogo} alt="FR1BET" style={{ height: "28px", objectFit: "contain" }} />
            </a>
          </div>
          </Reveal>
        </div>

        {/* Social links */}
        <div className="home-social-links flex flex-col items-start gap-4 md:items-end md:gap-5">
          <a href="https://www.linkedin.com/in/wrjaesch" target="_blank" rel="noopener noreferrer" className="social-link">
            <IconLinkedIn /> LinkedIn
          </a>
          <a href="https://instagram.com/fr1.bet" target="_blank" rel="noopener noreferrer" className="social-link">
            <IconInstagram /> Instagram
          </a>
          <a href="https://x.com/fr1bet" target="_blank" rel="noopener noreferrer" className="social-link">
            <IconX /> X
          </a>
          <a href="https://fr1bet.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <span style={{ color: "var(--red)" }}>●</span>&nbsp;FR1BET
          </a>
          <a href="https://discord.gg/PUVN3A6XVN" target="_blank" rel="noopener noreferrer" className="social-link">
            <IconDiscord /> Discord
          </a>
          <a href="https://pinterest.com/fr1bet" target="_blank" rel="noopener noreferrer" className="social-link">
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
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, var(--red))" }} />
        <span style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--neutral-500)" }}>Scroll</span>
      </div>
    </section>
  );
}

// ─── Story Section ────────────────────────────────────────────────────────────

type StoryBeat = {
  number: string;
  label: string;
  headline: string;
  body: string[];
  quote?: string;
};

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
    quote: "Built to bring the grid to life — not just as a race to watch, but as a world to enter.",
  },
];

function StoryBeatBlock({ beat, index }: { beat: StoryBeat; index: number }) {
  const isLast = index === storyBeats.length - 1;
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

      {/* Quote */}
      {beat.quote && (
        <blockquote
          className="pull-quote mt-5"
          style={{ maxWidth: "500px" }}
        >
          {beat.quote}
        </blockquote>
      )}
    </div>
    </Reveal>
  );
}

function Story() {
  return (
    <section
      id="story"
      className="relative"
      style={{ background: "var(--black)", padding: "7rem 0" }}
    >
      <div className="dot-grid absolute inset-0 opacity-60" />

      <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto">
        <Reveal className="mb-14">
          <p className="section-label mb-3">Origin</p>
          <h2
            className="hero-display"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--white)" }}
          >
            The Story
          </h2>
          <span className="rule-red mt-5 block" />
        </Reveal>

        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          {/* Left: sticky context on desktop */}
          <div className="hidden md:block">
            <div
              style={{
                position: "sticky",
                top: "100px",
                borderTop: "1px solid var(--surface-800)",
                paddingTop: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--neutral-500)",
                  lineHeight: 2,
                }}
              >
                Founder<br />Wesley Robin Jaesch<br /><br />
                <span style={{ color: "var(--red)" }}>FR1BET</span><br />
                Origin Story
              </p>
              <div className="mt-8">
                {storyBeats.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3">
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--surface-700)",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--neutral-500)" }}>
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
  );
}

// ─── What I'm Building ────────────────────────────────────────────────────────

function WhatImBuilding() {
  return (
    <section
      id="idea"
      className="relative"
      style={{ background: "var(--surface-900)", padding: "7rem 0", overflow: "hidden" }}
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
          background: "radial-gradient(ellipse at center, rgba(255,24,1,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div className="grid-overlay absolute inset-0" />

      <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto">
        <Reveal className="mb-14">
          <p className="section-label mb-3">The Idea</p>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            <h2 className="hero-display" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
              What I'm Building
            </h2>
            <div style={{ paddingBottom: "0.5rem", flexShrink: 0 }}>
              <a className="fr1bet-idea-logo" href="https://fr1bet.com" target="_blank" rel="noopener noreferrer">
                <img
                  className="fr1bet-idea-logo-image"
                  src={fr1betLogo}
                  alt="FR1BET — F1 Pari-Mutuel Prediction Platform"
                  style={{ height: "clamp(36px, 5vw, 56px)", objectFit: "contain", opacity: 0.95 }}
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
              FR1BET started as a simple question: what if the parts of Formula 1 that fans obsess over could become part of the experience itself?
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
              I'm building toward a platform where fans can engage with the entire grid — share predictions, compete with friends, and experience race weekends in a more interactive way.
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
            {[
              { label: "Predict", desc: "The whole grid. Not just the winner." },
              { label: "Compete", desc: "Against friends and the community." },
              { label: "Experience", desc: "Race weekends as a shared world." },
              { label: "Enter", desc: "The grid — as a participant, not a viewer." },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4"
                style={{ borderBottom: "1px solid var(--surface-800)", paddingBottom: "1.25rem" }}
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
                  <p style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--white)", marginBottom: "2px" }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "0.85rem", color: "var(--neutral-500)", lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Vision Section ────────────────────────────────��──────────────────────────

function Vision() {
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
  ];

  return (
    <section
      id="vision"
      className="relative"
      style={{ background: "var(--black)", padding: "7rem 0", overflow: "hidden" }}
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
          background: "radial-gradient(ellipse at center, rgba(255,24,1,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto">
        <Reveal className="mb-16">
          <p className="section-label mb-3">The Vision</p>
          <h2 className="hero-display" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Where This Goes
          </h2>
          <span className="rule-red mt-5 block" />
        </Reveal>

        {/* Large central quote */}
        <Reveal delay={100}>
        <blockquote
          className="pull-quote mb-16"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", maxWidth: "700px" }}
        >
          I want FR1BET to become a place where Formula 1 fans don't just watch a race weekend — they enter it.
        </blockquote>
        </Reveal>

        {/* Then / Now / Next */}
        <div className="grid md:grid-cols-3 gap-0">
          {milestones.map((m, i) => (
            <Reveal key={m.marker} delay={i * 100}>
            <div
              style={{
                borderTop: `1px solid ${m.active ? "var(--red)" : "var(--surface-700)"}`,
                paddingTop: "1.75rem",
                paddingRight: i < 2 ? "2rem" : "0",
                paddingLeft: i > 0 ? "2rem" : "0",
                borderLeft: i > 0 ? "1px solid var(--surface-800)" : "none",
              }}
            >
              <p
                className="section-label mb-3"
                style={{ color: m.active ? "var(--red)" : "var(--neutral-500)" }}
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
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

const qualities = [
  "Leadership", "Adaptability", "Attention to detail",
  "International experience", "Working under pressure",
  "Understanding people", "Team coordination", "Communication",
];

function About() {
  return (
    <section
      id="about"
      className="relative"
      style={{ background: "var(--surface-900)", padding: "7rem 0", overflow: "hidden" }}
    >
      <div className="grid-overlay absolute inset-0 opacity-70" />

      <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto">
        <Reveal className="mb-14">
          <p className="section-label mb-3">Founder</p>
          <h2 className="hero-display" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            About Wesley
          </h2>
          <span className="rule-red mt-5 block" />
        </Reveal>

        <div className="grid md:grid-cols-[2fr_1fr] gap-12 md:gap-20">
          <Reveal delay={100}><div>
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
              I spent years working across Europe in hospitality — Portugal, Austria, Switzerland, Corsica — moving from service roles into leadership. I learned to work under pressure, read people quickly, and care about the details others miss.
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
              Entrepreneurship is another chapter of the same journey. FR1BET didn't start with a market report or a pitch deck. It started with a tradition my father and I kept for years — and a question I couldn't stop asking.
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
              I build from personal experience. I take ideas seriously enough to act on them.
            </p>
          </div></Reveal>

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
              <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "0.875rem", color: "var(--neutral-500)", lineHeight: 1.6 }}>
                Europe
              </p>
              <p className="section-label mt-4 mb-3">Building</p>
              <p style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "0.875rem", color: "var(--white)", letterSpacing: "0.04em" }}>
                FR1BET
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Built on AI Section ──────────────────────────────────────────────────────

function BuiltOnAI() {
  return (
    <section
      id="built-on-ai"
      className="relative"
      style={{ background: "var(--black)", padding: "7rem 0", overflow: "hidden" }}
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
          background: "radial-gradient(ellipse at center, rgba(255,24,1,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto">
        <Reveal className="mb-14">
          <p className="section-label mb-3">WRJ Page</p>
          <h2 className="hero-display" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            I Still Can't Write<br />a Line of Code.
          </h2>
          <span className="rule-red mt-5 block" />
        </Reveal>

        <div className="grid md:grid-cols-[3fr_2fr] gap-12 md:gap-20 items-start">
          <Reveal delay={80}><div>
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
              A few years ago, building FR1BET would have required hundreds of thousands of dollars and a whole team of engineers. I had neither.
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
              AI changed that. It gave me the ability to materialise a platform I could only see in my head — without knowing how to code. Not by making it easy. But by making it possible.
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
              So I took my waiter salary and hired two exceptional software engineers — Riccardo & Pedro — who guided me and helped me build this. The idea was mine — but this became real because of what we built together.
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
              Following your ideas has never been more within reach than it is right now. I'm not saying it's easy. Literally everything is achievable today. The barrier isn't technology anymore — it's deciding to start.
            </p>
          </div></Reveal>

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
            {[
              { stat: "One founder", sub: "With a waiter's salary" },
              { stat: "Two engineers", sub: "Who believed in the idea" },
              { stat: "Zero code written", sub: "By me, personally" },
              { stat: "Built anyway", sub: "Because AI made it possible" },
            ].map((item, i, arr) => (
              <div
                key={item.stat}
                style={{
                  padding: "1.25rem 0",
                  borderBottom: i < arr.length - 1 ? "1px solid var(--surface-800)" : "none",
                }}
              >
                <p style={{ fontFamily: "Inter", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", textTransform: "uppercase", letterSpacing: "-0.01em", color: "var(--white)", marginBottom: "3px" }}>
                  {item.stat}
                </p>
                <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "0.78rem", color: "var(--neutral-500)", letterSpacing: "0.04em" }}>
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Connect Section ──────────────────────────────────────────────────────────

function Connect() {
  const links = [
    { label: "LinkedIn", icon: <IconLinkedIn />, href: "https://www.linkedin.com/in/wrjaesch" },
    { label: "Instagram", icon: <IconInstagram />, href: "https://instagram.com/fr1.bet" },
    { label: "X", icon: <IconX />, href: "https://x.com/fr1bet" },
    { label: "Discord", icon: <IconDiscord />, href: "https://discord.gg/PUVN3A6XVN" },
    { label: "Pinterest", icon: <IconPinterest />, href: "https://pinterest.com/fr1bet" },
  ];

  return (
    <section
      id="connect"
      className="relative"
      style={{ background: "var(--black)", padding: "8rem 0 6rem", overflow: "hidden" }}
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
          background: "radial-gradient(ellipse at center, rgba(255,24,1,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div className="dot-grid absolute inset-0 opacity-40" />

      <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto">
        <Reveal className="mb-14 text-center">
          <p className="section-label mb-4">Connect</p>
          <h2 className="hero-display" style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
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
            Whether you follow Formula 1, build things, or are simply curious — I'm always open to a conversation.
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
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--red)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--white)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--surface-800)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--neutral-400)";
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
          <a href="https://fr1bet.com" target="_blank" rel="noopener noreferrer" className="cta-primary">
            <span>Visit FR1BET <IconArrow /></span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
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
          <a href="#hero" className="wordmark-zoom" style={{ color: "inherit", textDecoration: "none" }}>
            WRJ<span style={{ color: "var(--red)" }}>.</span>
          </a>
        </span>
        <span style={{ width: "1px", height: "16px", background: "var(--surface-700)", display: "inline-block" }} />
        <a href="https://fr1bet.com" target="_blank" rel="noopener noreferrer">
          <img src={fr1betLogo} alt="FR1BET" style={{ height: "22px", objectFit: "contain", opacity: 0.5, transition: "opacity 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.5"; }}
          />
        </a>
        <a href="mailto:info@fr1bet.com" className="footer-email">info@fr1bet.com</a>
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
  );
}

// ─── Socials Page ──────────────────────────────────────────────────────────────

type SocialPost = {
  title: string;
  caption: string;
  asset: string;
  type: "image" | "video";
  platforms: string[];
};

const socialPosts = generatedSocialPosts as SocialPost[];

function SocialsPage() {
  return (
    <div className="socials-page page-with-mesh" style={{ background: "var(--black)", minHeight: "100vh" }}>
      <ReactiveMesh />
      <header className="socials-header">
        <a href="/" className="wordmark">WRJ<span>.</span></a>
        <a href="/" className="socials-back">Back to profile</a>
      </header>

      <main className="socials-main">
        <div className="socials-intro">
          <p className="section-label">Content library</p>
          <h1 className="hero-display">Socials</h1>
          <span className="rule-red" />
          <p className="socials-lede">
            A working library for the photos, videos, and captions behind the next post. Add a picture or video to <code>public/assets/social/</code>; GitHub Actions will create a simple caption and publish it here automatically.
          </p>
        </div>

        {socialPosts.length === 0 ? (
          <section className="socials-empty" aria-labelledby="socials-empty-title">
            <div className="socials-empty-mark">+</div>
            <p className="section-label">Ready for the first drop</p>
            <h2 id="socials-empty-title">No posts yet.</h2>
            <p>
              Upload a picture or video to <code>public/assets/social/</code>. The GitHub Action creates its caption automatically, then the new post appears here after the site rebuilds.
            </p>
            <div className="socials-file-note">
              <span>Recommended format</span>
              <strong>image · video · caption</strong>
            </div>
          </section>
        ) : (
          <section className="socials-grid" aria-label="Social posts">
            {socialPosts.map((post) => (
              <article className="social-card" key={post.asset}>
                <div className="social-card-media">
                  {post.type === "video" ? (
                    <video src={post.asset} controls preload="metadata" aria-label={post.title} />
                  ) : (
                    <img src={post.asset} alt={post.title} />
                  )}
                </div>
                <div className="social-card-copy">
                  <p className="section-label">{post.type} / {post.platforms.join(" · ")}</p>
                  <h2>{post.title}</h2>
                  <p>{post.caption}</p>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

// ─── App ──────────────────────────�����───────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const isSocialsPage = window.location.pathname === "/socials";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isSocialsPage) return <SocialsPage />;

  return (
    <div className="page-with-mesh" style={{ background: "var(--black)", minHeight: "100%" }}>
      <ReactiveMesh />
      <Nav scrolled={scrolled} />
      <Hero />
      <Story />
      <WhatImBuilding />
      <Vision />
      <About />
      <BuiltOnAI />
      <Connect />
      <Footer />
    </div>
  );
}
