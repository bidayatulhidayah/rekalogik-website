import Link from "next/link";
import PageHero from "../../components/PageHero";
import { C, VALUES } from "../../lib/constants";

export const metadata = {
  title: "About Us | RekaLogik Studio",
  description:
    "Learn about RekaLogik Studio — our story, our mission, and the team behind Malaysia's hands-on STEM and coding workshops.",
};

const TEAM = [
  { name: "Facilitator Placeholder", role: "Lead Facilitator", icon: "👩‍💻" },
  { name: "Facilitator Placeholder", role: "STEM Educator", icon: "👨‍🏫" },
  { name: "Facilitator Placeholder", role: "Electronics Specialist", icon: "🔧" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About Us"
        label="Who We Are"
        title="About RekaLogik Studio"
        subtitle="We are a team of educators and engineers on a mission to make STEM accessible, hands-on, and genuinely fun for every Malaysian student."
      />

      {/* ── OUR STORY ─────────────────────────────────── */}
      <section className="rl-section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-2col">
            <div>
              <span className="rl-label">Our Story</span>
              <h2 className="rl-heading" style={{ marginBottom: 24 }}>
                How RekaLogik Studio Began
              </h2>
              <p className="rl-subtext" style={{ marginBottom: 18 }}>
                RekaLogik Studio grew out of a university outreach programme — running STEM workshops for students around Gombak, including sessions at international schools, just to stay busy and do something that felt meaningful outside of lectures and office hours. Nothing dramatic. But those sessions taught us something real.
              </p>
              <p className="rl-subtext" style={{ marginBottom: 18 }}>
                We noticed that teachers wanted to deliver engaging lessons on coding, electronics, and AI — but many didn't have the background or the time to prepare them confidently. And parents were looking for something worthwhile to fill their children's free time outside the classroom, beyond the usual tuition routine.
              </p>
              <p className="rl-subtext" style={{ marginBottom: 18 }}>
                RekaLogik Studio is our answer to both. We're a mix of students and working engineers who genuinely enjoy keeping busy with something purposeful on the side. It's a great way to stay productive, meet new faces, and step outside our usual comfort zones — and if we can help a teacher feel more confident in front of her class, or give a child an afternoon they actually remember, that's more than enough reason to show up.
              </p>
              <p className="rl-subtext">
                Today, we run structured coding and electronics workshops across Malaysia — from block-based programming for primary school students to IoT hardware projects at secondary level. Our approach is simple: learn by making.
              </p>
            </div>

            <div style={{
              background: C.bluePale, borderRadius: 24, minHeight: 420,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 12,
              border: `1px solid ${C.blueLight}`,
            }}>
              <span style={{ fontSize: 44 }}>📸</span>
              <p style={{ color: C.muted, fontSize: 13, fontWeight: 500 }}>Studio photo placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ──────────────────────────── */}
      <section className="rl-section" style={{ background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-2col">
            <div style={{
              background: C.blueDark, borderRadius: 24, padding: "48px 40px",
            }}>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase",
                color: C.blueLight, display: "block", marginBottom: 14,
              }}>
                Our Mission
              </span>
              <h2 style={{
                fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 32,
                color: "#fff", lineHeight: 1.1, marginBottom: 20,
              }}>
                Make STEM Education Truly Hands-On
              </h2>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.85 }}>
                To deliver structured, engaging, and accessible STEM programmes that equip Malaysian students with practical skills — not just theoretical knowledge — and inspire them to become confident creators and problem-solvers.
              </p>
            </div>

            <div style={{
              background: "#fff", borderRadius: 24, padding: "48px 40px",
              border: `1px solid ${C.blueLight}`,
            }}>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase",
                color: C.blue, display: "block", marginBottom: 14,
              }}>
                Our Vision
              </span>
              <h2 style={{
                fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 32,
                color: C.text, lineHeight: 1.1, marginBottom: 20,
              }}>
                A Malaysia Where Every Child Can Build
              </h2>
              <p className="rl-subtext" style={{ fontSize: 15 }}>
                We envision a future where no Malaysian child is left out of the digital economy — where access to quality STEM learning is the norm, not the exception, regardless of background or location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR VALUES ────────────────────────────────── */}
      <section className="rl-section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-section-header">
            <span className="rl-label">What Drives Us</span>
            <h2 className="rl-heading">Our Values</h2>
          </div>
          <div className="rl-4col">
            {VALUES.map(({ title, desc, icon }) => (
              <div key={title} className="rl-card" style={{
                border: `1px solid ${C.bluePale}`,
                boxShadow: "0 2px 16px rgba(74,111,138,0.06)",
              }}>
                <div style={{
                  width: 52, height: 52, background: C.bluePale, borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, marginBottom: 20, border: `1px solid ${C.blueLight}`,
                }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 10 }}>{title}</h3>
                <p className="rl-subtext" style={{ fontSize: 14 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────── */}
      <section className="rl-section" style={{ background: C.bluePale }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-section-header">
            <span className="rl-label">The People</span>
            <h2 className="rl-heading">Our Team</h2>
            <p className="rl-subtext">
              Passionate educators and engineers who believe every child can learn to build.
            </p>
          </div>
          <div className="rl-3col">
            {TEAM.map(({ name, role, icon }) => (
              <div key={role} className="rl-card" style={{ textAlign: "center" }}>
                <div style={{
                  width: 88, height: 88, borderRadius: "50%",
                  background: C.bluePale, border: `3px solid ${C.blueLight}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 36, margin: "0 auto 20px",
                }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 6 }}>{name}</h3>
                <p style={{ color: C.blue, fontSize: 13, fontWeight: 500 }}>{role}</p>
              </div>
            ))}
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
            fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 38,
            color: "#fff", lineHeight: 1.05, marginBottom: 16,
          }}>
            Ready to Join Us?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
            Explore our workshops or get in touch to find out how RekaLogik Studio can work with your school or organisation.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/workshops" style={{
              background: "#fff", color: C.blueDark,
              padding: "14px 36px", borderRadius: 999, fontWeight: 700, fontSize: 15,
            }}>
              See Workshops
            </Link>
            <Link href="/contact" style={{
              background: "rgba(255,255,255,0.12)", color: "#fff",
              padding: "14px 36px", borderRadius: 999, fontWeight: 600, fontSize: 15,
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
