import Link from "next/link";
import PageHero from "../../components/PageHero";
import { C, WORKSHOPS } from "../../lib/constants";

export const metadata = {
  title: "Our Workshops | RekaLogik Studio",
  description:
    "Explore our STEM and coding workshops — REKABIT Basic, REKABIT Advanced, and ESP32 Basic. Designed for Malaysian primary and secondary school students.",
};

export default function WorkshopsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Workshops"
        label="What We Offer"
        title="Our Workshops"
        subtitle="Structured, hands-on coding and electronics programmes designed for every level — from complete beginner to aspiring maker."
      />

      {/* ── WORKSHOP LIST ─────────────────────────────── */}
      <section className="rl-section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {WORKSHOPS.map(({ name, level, icon, bg, fullDesc, whatYouLearn, duration, price, suitable }, idx) => (
              <div key={name} style={{
                background: bg, borderRadius: 24, overflow: "hidden",
                border: "1px solid rgba(107,142,174,0.12)",
                boxShadow: "0 4px 24px rgba(74,111,138,0.07)",
              }}>
                <div className="rl-2col" style={{ gap: 0 }}>
                  {/* Info */}
                  <div style={{ padding: "48px 40px" }}>
                    <div style={{
                      width: 56, height: 56, background: C.blueDark, borderRadius: 14,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 26, marginBottom: 20,
                    }}>
                      {icon}
                    </div>
                    <p style={{ color: C.blue, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
                      {level}
                    </p>
                    <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: C.text, lineHeight: 1.05, marginBottom: 16 }}>
                      {name}
                    </h2>
                    <p className="rl-subtext" style={{ fontSize: 15, marginBottom: 28 }}>
                      {fullDesc}
                    </p>

                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
                      {[
                        { label: "Duration", value: duration },
                        { label: "Suitable for", value: suitable },
                        { label: "Pricing", value: price },
                      ].map(({ label, value }) => (
                        <div key={label} style={{
                          background: "#fff", borderRadius: 10, padding: "10px 16px",
                          border: `1px solid ${C.blueLight}`,
                        }}>
                          <p style={{ color: C.muted, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{label}</p>
                          <p style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{value}</p>
                        </div>
                      ))}
                    </div>

                    <Link href="/register" className="rl-btn-primary">
                      Register for {name} →
                    </Link>
                  </div>

                  {/* What you'll learn */}
                  <div style={{
                    background: C.blueDark, padding: "48px 40px",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                  }}>
                    <h3 style={{
                      color: C.blueLight, fontSize: 11, fontWeight: 700,
                      letterSpacing: 3, textTransform: "uppercase", marginBottom: 24,
                    }}>
                      What You'll Learn
                    </h3>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                      {whatYouLearn.map(item => (
                        <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                          <span style={{
                            width: 22, height: 22, borderRadius: "50%",
                            background: "rgba(255,255,255,0.15)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0, fontSize: 12, color: "#fff", fontWeight: 700, marginTop: 1,
                          }}>
                            ✓
                          </span>
                          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.6 }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIR DISCOUNT NOTE ────────────────────────── */}
      <section className="rl-section-sm" style={{ background: C.bluePale }}>
        <div style={{
          maxWidth: 760, margin: "0 auto", textAlign: "center",
          background: "#fff", borderRadius: 20, padding: "40px 48px",
          border: `1px solid ${C.blueLight}`,
          boxShadow: "0 4px 24px rgba(74,111,138,0.08)",
        }}>
          <span style={{ fontSize: 36, display: "block", marginBottom: 16 }}>🎁</span>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: C.text, lineHeight: 1.05, marginBottom: 12 }}>
            Pair Discount Available
          </h3>
          <p className="rl-subtext" style={{ marginBottom: 28 }}>
            Register for both REKABIT Basic and REKABIT Advanced at the same time and enjoy a special discount. Perfect for students ready to go all the way.
          </p>
          <Link href="/register" className="rl-btn-primary">
            Register & Save
          </Link>
        </div>
      </section>

      {/* ── HOW TO REGISTER ───────────────────────────── */}
      <section className="rl-section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-section-header">
            <span className="rl-label">Simple Process</span>
            <h2 className="rl-heading">How to Register</h2>
          </div>
          <div className="rl-3col">
            {[
              { step: "01", title: "Fill the Form", desc: "Complete the online registration form with your child's details and select the workshop." },
              { step: "02", title: "Make Payment", desc: "Pay via bank transfer or DuitNow QR and upload your payment receipt." },
              { step: "03", title: "Attend & Learn", desc: "Show up on the day, bring your curiosity, and let's build something amazing together." },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: 64,
                  color: C.blueLight, lineHeight: 1, marginBottom: 16,
                }}>
                  {step}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 10 }}>{title}</h3>
                <p className="rl-subtext" style={{ fontSize: 14 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/register" className="rl-btn-primary">
              Register Now →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
