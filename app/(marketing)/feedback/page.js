import Link from "next/link";
import PageHero from "../../components/PageHero";
import { C, TESTIMONIALS } from "../../lib/constants";

export const metadata = {
  title: "Testimonials | RekaLogik Studio",
  description:
    "Read what parents, students, and teachers say about their experience with RekaLogik Studio workshops.",
};

const RATINGS = [
  { label: "Overall Experience", pct: 98 },
  { label: "Facilitator Quality", pct: 97 },
  { label: "Workshop Content", pct: 95 },
  { label: "Would Recommend", pct: 99 },
];

export default function FeedbackPage() {
  return (
    <>
      <PageHero
        breadcrumb="Testimonials"
        label="What They Say"
        title="Feedback & Testimonials"
        subtitle="Words from the parents, students, and educators who have experienced RekaLogik Studio first-hand."
      />

      {/* ── RATINGS STRIP ─────────────────────────────── */}
      <section style={{ padding: "56px 24px", background: C.blueDark }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-4col">
            {RATINGS.map(({ label, pct }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: 56,
                  color: "#fff", lineHeight: 1,
                }}>
                  {pct}%
                </div>
                <div style={{
                  color: C.blueLight, fontSize: 13, fontWeight: 500,
                  marginTop: 8, lineHeight: 1.4,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL TESTIMONIALS ──────────────────────────── */}
      <section className="rl-section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-section-header">
            <span className="rl-label">Real Voices</span>
            <h2 className="rl-heading">What Our Community Says</h2>
          </div>

          <div className="rl-3col">
            {TESTIMONIALS.map(({ quote, name, role }) => (
              <div key={name + role} className="rl-card" style={{
                border: `1px solid ${C.bluePale}`,
                boxShadow: "0 2px 16px rgba(74,111,138,0.06)",
              }}>
                {/* Star rating */}
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {[1,2,3,4,5].map(s => (
                    <span key={s} style={{ color: "#F4B942", fontSize: 16 }}>★</span>
                  ))}
                </div>
                <div style={{ fontSize: 44, color: C.blueLight, lineHeight: 1, marginBottom: 16 }}>"</div>
                <p style={{
                  color: C.text, fontSize: 15, lineHeight: 1.85,
                  marginBottom: 28, fontStyle: "italic",
                }}>
                  {quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: C.bluePale, border: `2px solid ${C.blueLight}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20,
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
        </div>
      </section>

      {/* ── SUBMIT FEEDBACK ───────────────────────────── */}
      <section className="rl-section-sm" style={{ background: C.cream }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{
            background: "#fff", borderRadius: 24, padding: "48px 40px",
            border: `1px solid ${C.blueLight}`,
            boxShadow: "0 4px 24px rgba(74,111,138,0.08)",
            textAlign: "center",
          }}>
            <span style={{ fontSize: 36, display: "block", marginBottom: 16 }}>✍️</span>
            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 36,
              color: C.text, lineHeight: 1.05, marginBottom: 12,
            }}>
              Attended One of Our Workshops?
            </h3>
            <p className="rl-subtext" style={{ marginBottom: 32 }}>
              We'd love to hear about your experience. Your feedback helps us improve and inspires other families to join.
            </p>
            <a href="mailto:placeholder@rekalogik.my?subject=Workshop Feedback" className="rl-btn-primary">
              Share Your Feedback
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="rl-section" style={{
        background: `linear-gradient(135deg, ${C.blueDark} 0%, ${C.blue} 100%)`,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 48,
            color: "#fff", lineHeight: 1.05, marginBottom: 16,
          }}>
            Join Hundreds of Happy Students
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
            Register for an upcoming workshop and see what the excitement is all about.
          </p>
          <Link href="/register" style={{
            background: "#fff", color: C.blueDark,
            padding: "14px 40px", borderRadius: 999,
            fontWeight: 700, fontSize: 15,
          }}>
            Register Now →
          </Link>
        </div>
      </section>
    </>
  );
}
