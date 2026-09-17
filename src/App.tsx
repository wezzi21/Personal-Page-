import { lazy, Suspense } from "react"
import { HomePage } from "@/features/home/HomePage"
import { SocialsPage } from "@/features/socials/SocialsPage"

const PresentationPage = lazy(
  () => import("@/features/presentation/PresentationPage"),
)

// ─── App ──────────────────────────────────────────────────────────────────────
// Thin path-based router. Each route delegates to its own page component.

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/"
  const isSocialsPage = path === "/socials"
  const isPresentationPage = path === "/presentation"

  if (isSocialsPage) return <SocialsPage />

  if (isPresentationPage) {
    return (
      <Suspense
        fallback={
          <div className="presentation-route-loading" role="status">
            Loading presentation…
          </div>
        }
      >
        <PresentationPage />
      </Suspense>
    )
  }

  return <HomePage />
}
