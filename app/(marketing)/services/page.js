import Link from "next/link";
import PageHero from "../../components/PageHero";
import { C, SERVICES } from "../../lib/constants";

export const metadata = {
  title: "Our Services | RekaLogik Studio",
  description:
    "Beyond public workshops — RekaLogik Studio offers tailored STEM services for schools, holiday camps, and corporate CSR programmes.",
};

const PROCESS = [
  {
    step: "01",
    title: "Enquire",
    desc: "Reach out to us with your goals, student profile, and preferred timeline. We'll listen and ask the right questions.",
  },
  {
    step: "02",
    title: "We Plan",
    desc: "Our team designs a programme tailored to your needs — content, format, duration, materials, and facilitator allocation.",
  },
  {
    step: "03",
    title: "We Deliver",
    desc: "Our trained facilitators show up fully prepared. You sit back while your students learn, build, and have a great time.",
  },
  {
    step: "04",
    title: "Report & Review",
    desc: "After the programme, we provide a summary report with attendance, highlights, and participant feedback.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Services"
        label="Beyond Workshops"
        title="Our Tailored Services"
        subtitle="We design and deliver custom STEM experiences for schools, organisations, and companies — fully managed, end-to-end."
      />

      {/* ── SERVICES DETAIL ───────────────────────────── */}
      <section className="rl-section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
            {SERVICES.map(({ title, icon, fullDesc, features }, idx) => (
              <div key={title} className="rl-2col" style={{
                background: idx % 2 === 0 ? C.bluePale : C.cream,
                borderRadius: 24, overflow: "hidden",
                border: "1px solid rgba(107,142,174,0.12)",
                gap: 0,
              }}>
                {/* Order alternates */}
                <div style={{
                  padding: "48px 40px",
                  order: idx % 2 === 0 ? 0 : 1,
                }}>
                  <div style={{
                    width: 60, height: 60, background: C.blueDark, borderRadius: 16,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, marginBottom: 20,
                  }}>
                    {icon}
                  </div>
                  <h2 style={{
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 32,
                    color: C.text, lineHeight: 1.05, marginBottom: 16,
                  }}>
                    {title}
                  </h2>
                  <p className="rl-subtext" style={{ fontSize: 15, marginBottom: 36 }}>
                    {fullDesc}
                  </p>
                  <Link href="/contact" className="rl-btn-primary">
                    Enquire About This Service
                  </Link>
                </div>

                {/* Features */}
                <div style={{
                  background: C.blueDark, padding: "48px 40px",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                  order: idx % 2 === 0 ? 1 : 0,
                }}>
                  <h3 style={{
                    color: C.blueLight, fontSize: 11, fontWeight: 700,
                    letterSpacing: 3, textTransform: "uppercase", marginBottom: 24,
                  }}>
                    What's Included
                  </h3>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                    {features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <span style={{
                          width: 22, height: 22, borderRadius: "50%",
                          background: "rgba(255,255,255,0.15)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, fontSize: 12, color: "#fff", fontWeight: 700, marginTop: 1,
                        }}>
                          ✓
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.6 }}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS ───────────────────────────────── */}
      <section className="rl-section" style={{ background: C.bluePale }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-section-header">
            <span className="rl-label">How It Works</span>
            <h2 className="rl-heading">Our Process</h2>
            <p className="rl-subtext">
              From first contact to final report — we handle everything so you can focus on your students.
            </p>
          </div>
          <div className="rl-4col">
            {PROCESS.map(({ step, title, desc }) => (
              <div key={step} style={{ position: "relative" }}>
                <div style={{
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 52,
                  color: C.blueLight, lineHeight: 1, marginBottom: 12,
                }}>
                  {step}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 10 }}>{title}</h3>
                <p className="rl-subtext" style={{ fontSize: 14 }}>{desc}</p>
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
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <span className="rl-label" style={{ color: C.blueLight }}>Let's Work Together</span>
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 42,
            color: "#fff", lineHeight: 1.05, marginBottom: 16,
          }}>
            Bring RekaLogik Studio to Your School
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
            Tell us what you need and we'll design a programme that fits your students, your schedule, and your budget.
          </p>
          <Link href="/contact" style={{
            background: "#fff", color: C.blueDark,
            padding: "14px 40px", borderRadius: 999,
            fontWeight: 700, fontSize: 15,
          }}>
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
