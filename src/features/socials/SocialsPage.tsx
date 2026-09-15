import { ReactiveMesh } from "@/components/ReactiveMesh"
import { Footer } from "@/components/Footer"
import generatedSocialPosts from "@/social-posts.json"
import type { SocialPost } from "@/features/socials/types"

// ─── Socials Page ──────────────────────────────────────────────────────────────

const socialPosts = generatedSocialPosts as SocialPost[]

export function SocialsPage() {
  return (
    <div
      className="socials-page page-with-mesh"
      style={{ background: "var(--black)", minHeight: "100vh" }}
    >
      <ReactiveMesh />
      <header className="socials-header">
        <a href="/" className="wordmark">
          WRJ<span>.</span>
        </a>
        <a href="/" className="socials-back">
          Back to profile
        </a>
      </header>

      <main className="socials-main">
        <div className="socials-intro">
          <p className="section-label">Content library</p>
          <h1 className="hero-display">Socials</h1>
          <span className="rule-red" />
          <p className="socials-lede">
            A working library for the photos, videos, and captions behind the
            next post.
          </p>
        </div>

        {socialPosts.length === 0 ? (
          <section
            className="socials-empty"
            aria-labelledby="socials-empty-title"
          >
            <div className="socials-empty-mark">+</div>
            <p className="section-label">Ready for the first drop</p>
            <h2 id="socials-empty-title">No posts yet.</h2>
            <p>
              Upload a picture or video to <code>public/assets/social/</code>.
              The GitHub Action creates its caption automatically, then the new
              post appears here after the site rebuilds.
            </p>
            <div className="socials-file-note">
              <span>Recommended format</span>
              <strong>image · video · caption</strong>
            </div>
          </section>
        ) : (
          <section className="socials-grid" aria-label="Social posts">
            {socialPosts.map((post, index) => (
              <article className="social-card" key={post.asset}>
                <div className="social-card-media">
                  {post.type === "video" ? (
                    <video
                      src={post.asset}
                      controls
                      preload="metadata"
                      aria-label={post.title}
                    />
                  ) : (
                    <img
                      src={post.asset}
                      alt={post.title}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={index === 0 ? "high" : "low"}
                    />
                  )}
                </div>
                <div className="social-card-copy">
                  <p className="section-label">
                    {post.type} / {post.platforms.join(" · ")}
                  </p>
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
  )
}
