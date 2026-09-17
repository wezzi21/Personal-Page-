import { useEffect, useState } from "react"
import { ReactiveMesh } from "@/components/ReactiveMesh"
import { Footer } from "@/components/Footer"
import { Nav } from "@/features/home/Nav"
import { Hero } from "@/features/home/sections/Hero"
import { Story } from "@/features/home/sections/Story"
import { WhatImBuilding } from "@/features/home/sections/WhatImBuilding"
import { Vision } from "@/features/home/sections/Vision"
import { About } from "@/features/home/sections/About"
import { BuiltOnAI } from "@/features/home/sections/BuiltOnAI"
import { Connect } from "@/features/home/sections/Connect"

// ─── Home Page ────────────────────────────────────────────────────────────────
// Composes the personal profile / FR1BET founder story page from its sections.

export function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="page-with-mesh"
      style={{ background: "var(--black)", minHeight: "100%" }}
    >
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
  )
}
