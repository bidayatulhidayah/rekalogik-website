import Link from "next/link";
import { C, STATS, WORKSHOPS, SERVICES, TESTIMONIALS } from "../lib/constants";

export const metadata = {
  title: "RekaLogik Studio | STEM & Coding Workshops Malaysia",
  description:
    "Hands-on STEM and coding workshops for Malaysian students. Block coding, text coding, ESP32, and more. Register today.",
};

export default function HomePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section style={{
        position: "relative", minHeight: "100vh",
        background: `linear-gradient(135deg, ${C.blueDark} 0%, #0a2034 100%)`,
        display: "flex", alignItems: "center", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/assets/bg-texture-tile.jpg')",
          backgroundSize: "280px", opacity: 0.04,
        }} />
        <div style={{
          position: "absolute", top: -100, right: -100,
          width: 600, height: 600, borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
        }} />

        <div style={{
          position: "relative", maxWidth: 1200, margin: "0 auto",
          padding: "140px 24px 100px", width: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.12)", borderRadius: 999,
              padding: "6px 16px", marginBottom: 24,
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB400", display: "inline-block" }} />
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 500, letterSpacing: 1 }}>
                Now enrolling — 2025 season
              </span>
            </div>

            <h1 className="rl-hero-title">
              Build Your Logic,<br />Bit by Bit.
            </h1>
            <p style={{
              color: "rgba(255,255,255,0.82)", fontSize: 18, lineHeight: 1.75,
              maxWidth: 480, marginBottom: 40,
            }}>
              Hands-on STEM & coding workshops that spark curiosity and build real skills — for Malaysian students from primary to secondary school.
            </p>
            <div className="rl-hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/register" style={{
                background: "#fff", color: C.blueDark,
                padding: "14px 36px", borderRadius: 999,
                fontWeight: 700, fontSize: 15, letterSpacing: 0.3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}>
                Register Now →
              </Link>
              <Link href="/workshops" style={{
                background: "rgba(255,255,255,0.12)", color: "#fff",
                padding: "14px 36px", borderRadius: 999,
                fontWeight: 600, fontSize: 15, letterSpacing: 0.3,
                border: "1.5px solid rgba(255,255,255,0.35)",
              }}>
                Explore Workshops
              </Link>
            </div>
          </div>

          <div style={{ flexShrink: 0 }}>
            <img
              src="/assets/hero.png"
              alt="RekaLogik Studio"
              style={{
                width: 300, maxWidth: "38vw", opacity: 0.9,
                filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.3))",
              }}
            />
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: 2,
        }}>
          <span>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.2)" }} />
        </div>
      </section>

      {/* ── ABOUT TEASER ──────────────────────────────── */}
      <section className="rl-section" style={{ background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-2col">
            <div>
              <span className="rl-label">Our Story</span>
              <h2 className="rl-heading" style={{ marginBottom: 24 }}>
                Empowering Young Minds Through Technology
              </h2>
              <p className="rl-subtext" style={{ marginBottom: 16 }}>
                RekaLogik Studio started as a university outreach side project — running STEM sessions for students around Gombak, just to stay productive and do something meaningful outside of everyday schedules. Those sessions revealed two real gaps: teachers who need to deliver STEM and AI lessons but don't have the knowledge or capacity, and parents looking to fill their child's free time with something genuinely useful outside the classroom.
              </p>
              <p className="rl-subtext" style={{ marginBottom: 36 }}>
                We're students and working engineers who enjoy keeping busy with something purposeful. RekaLogik Studio is how we do that — hands-on coding and electronics workshops that help teachers teach and give students an afternoon they'll actually remember.
              </p>
              <Link href="/about" className="rl-btn-primary">
                Learn More About Us
              </Link>
            </div>
            <div style={{
              background: C.bluePale, borderRadius: 24, minHeight: 360,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 12,
              border: `1px solid ${C.blueLight}`,
            }}>
              <span style={{ fontSize: 40 }}>📸</span>
              <p style={{ color: C.muted, fontSize: 13, fontWeight: 500 }}>About photo placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────── */}
      <section style={{ padding: "72px 24px", background: C.blueDark }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-4col" style={{ textAlign: "center" }}>
            {STATS.map(({ num, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 52,
                  color: "#fff", lineHeight: 1,
                }}>
                  {num}
                </div>
                <div style={{ color: C.blueLight, fontSize: 14, fontWeight: 500, marginTop: 8, letterSpacing: 0.5 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKSHOP PREVIEW ──────────────────────────── */}
      <section className="rl-section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-section-header">
            <span className="rl-label">What We Offer</span>
            <h2 className="rl-heading">Our Workshops</h2>
            <p className="rl-subtext">
              Choose the right programme for your child — all workshops are beginner-friendly and fully hands-on.
            </p>
          </div>

          <div className="rl-3col" style={{ marginBottom: 48 }}>
            {WORKSHOPS.map(({ name, level, desc, icon, bg }) => (
              <div key={name} className="rl-card" style={{
                background: bg, boxShadow: "0 2px 16px rgba(74,111,138,0.06)",
              }}>
                <div style={{
                  width: 52, height: 52, background: C.blueDark, borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, marginBottom: 20,
                }}>
                  {icon}
                </div>
                <p style={{ color: C.blue, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
                  {level}
                </p>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 12 }}>{name}</h3>
                <p className="rl-subtext" style={{ fontSize: 14, marginBottom: 24 }}>{desc}</p>
                <Link href="/register" className="rl-btn-primary" style={{ fontSize: 13 }}>
                  Register →
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/workshops" className="rl-btn-outline">
              View All Workshop Details
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES TEASER ───────────────────────────── */}
      <section className="rl-section" style={{ background: C.bluePale }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-section-header">
            <span className="rl-label">Beyond Workshops</span>
            <h2 className="rl-heading">Our Tailored Services</h2>
            <p className="rl-subtext">
              We collaborate with schools, NGOs, and companies to deliver custom STEM experiences.
            </p>
          </div>

          <div className="rl-3col" style={{ marginBottom: 48 }}>
            {SERVICES.map(({ title, desc, icon }) => (
              <div key={title} className="rl-card">
                <div style={{
                  width: 52, height: 52, background: C.bluePale, borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, marginBottom: 20,
                  border: `1px solid ${C.blueLight}`,
                }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 10 }}>{title}</h3>
                <p className="rl-subtext" style={{ fontSize: 14 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/services" className="rl-btn-primary">
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ───────────────────────────── */}
      <section className="rl-section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-section-header">
            <span className="rl-label">Memories</span>
            <h2 className="rl-heading">Past Events Gallery</h2>
          </div>

          <div className="rl-gallery-grid" style={{ marginBottom: 48 }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{
                background: i % 2 === 0 ? C.bluePale : C.cream,
                borderRadius: 16, border: `1px solid ${C.blueLight}`,
                height: i === 1 || i === 4 ? 260 : 200,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                <span style={{ fontSize: 28 }}>📷</span>
                <p style={{ color: C.muted, fontSize: 12, fontWeight: 500 }}>Photo {i}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/gallery" className="rl-btn-outline">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL PREVIEW ───────────────────────── */}
      <section className="rl-section" style={{ background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-section-header">
            <span className="rl-label">What They Say</span>
            <h2 className="rl-heading">Feedbacks</h2>
          </div>

          <div className="rl-3col" style={{ marginBottom: 48 }}>
            {TESTIMONIALS.slice(0, 3).map(({ quote, name, role }) => (
              <div key={name + role} className="rl-card">
                <div style={{ fontSize: 44, color: C.blueLight, lineHeight: 1, marginBottom: 16 }}>"</div>
                <p style={{ color: C.text, fontSize: 15, lineHeight: 1.85, marginBottom: 24, fontStyle: "italic" }}>
                  {quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: C.bluePale, border: `2px solid ${C.blueLight}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18,
                  }}>
                    👤
                  </div>
                  <div>
                    <p style={{ color: C.text, fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{name}</p>
                    <p style={{ color: C.muted, fontSize: 12 }}>{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/feedback" className="rl-btn-primary">
              Read All Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ───────────────────────────────── */}
      <section style={{
        padding: "100px 24px",
        background: `linear-gradient(135deg, ${C.blueDark} 0%, ${C.blue} 100%)`,
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <span className="rl-label" style={{ color: C.blueLight }}>Get In Touch</span>
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 44,
            color: "#fff", lineHeight: 1.05, marginBottom: 16,
          }}>
            Ready to Start?
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.75)", fontSize: 17,
            lineHeight: 1.8, marginBottom: 44,
          }}>
            Have questions about our workshops or want to bring RekaLogik Studio to your school? We'd love to hear from you.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" style={{
              background: "#fff", color: C.blueDark,
              padding: "14px 38px", borderRadius: 999, fontWeight: 700, fontSize: 15,
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}>
              Register Now
            </Link>
            <Link href="/contact" style={{
              background: "rgba(255,255,255,0.12)", color: "#fff",
              padding: "14px 38px", borderRadius: 999, fontWeight: 600, fontSize: 15,
              border: "1.5px solid rgba(255,255,255,0.3)",
            }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
