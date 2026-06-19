import Link from "next/link";
import PageHero from "../../components/PageHero";
import { C } from "../../lib/constants";

export const metadata = {
  title: "Contact Us | RekaLogik Studio",
  description:
    "Get in touch with RekaLogik Studio. Contact us via WhatsApp, email, or our enquiry form.",
};

const CONTACT_ITEMS = [
  {
    icon: "📧",
    label: "Email",
    value: "placeholder@rekalogik.my",
    href: "mailto:placeholder@rekalogik.my",
  },
  {
    icon: "📱",
    label: "WhatsApp",
    value: "+60 1X-XXXXXXXX",
    href: "https://wa.me/601XXXXXXXXX",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Malaysia",
    href: null,
  },
  {
    icon: "⏰",
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb="Contact Us"
        label="Reach Out"
        title="Contact Us"
        subtitle="Have a question, want to bring us to your school, or just want to say hello? We'd love to hear from you."
      />

      {/* ── CONTACT LAYOUT ────────────────────────────── */}
      <section className="rl-section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-2col">

            {/* Contact details */}
            <div>
              <span className="rl-label">Get In Touch</span>
              <h2 className="rl-heading" style={{ marginBottom: 16 }}>
                We're Here to Help
              </h2>
              <p className="rl-subtext" style={{ marginBottom: 40 }}>
                Whether you're a parent looking to enrol your child, a school administrator interested in a programme, or an organisation exploring CSR opportunities — reach out and we'll guide you from there.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {CONTACT_ITEMS.map(({ icon, label, value, href }) => (
                  <div key={label} style={{
                    display: "flex", alignItems: "center", gap: 20,
                    background: C.bluePale, borderRadius: 16, padding: "20px 24px",
                    border: `1px solid ${C.blueLight}`,
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: "#fff", display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 22, flexShrink: 0,
                      border: `1px solid ${C.blueLight}`,
                    }}>
                      {icon}
                    </div>
                    <div>
                      <p style={{ color: C.muted, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
                        {label}
                      </p>
                      {href ? (
                        <a href={href} style={{ color: C.blueDark, fontSize: 15, fontWeight: 600 }}>
                          {value}
                        </a>
                      ) : (
                        <p style={{ color: C.text, fontSize: 15, fontWeight: 600 }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div style={{ marginTop: 40 }}>
                <p style={{ color: C.muted, fontSize: 13, fontWeight: 600, marginBottom: 16, letterSpacing: 1, textTransform: "uppercase" }}>
                  Follow Us
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  {[
                    { label: "Instagram", icon: "📸", href: "#" },
                    { label: "TikTok", icon: "🎵", href: "#" },
                    { label: "YouTube", icon: "▶️", href: "#" },
                  ].map(({ label, icon, href }) => (
                    <a key={label} href={href} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: C.bluePale, borderRadius: 10, padding: "10px 18px",
                      border: `1px solid ${C.blueLight}`, fontSize: 13,
                      fontWeight: 600, color: C.text,
                    }}>
                      <span>{icon}</span> {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Enquiry form */}
            <div style={{
              background: C.cream, borderRadius: 24, padding: "40px",
              border: `1px solid ${C.blueLight}`,
            }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: C.text, lineHeight: 1.05, marginBottom: 8 }}>
                Send an Enquiry
              </h3>
              <p className="rl-subtext" style={{ fontSize: 14, marginBottom: 28 }}>
                Fill in your details and we'll get back to you within 24 hours.
              </p>

              <form action="#" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { id: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                  { id: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+60 1X-XXXXXXXX" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} style={{
                      display: "block", fontSize: 13, fontWeight: 600,
                      color: C.text, marginBottom: 6,
                    }}>
                      {label}
                    </label>
                    <input
                      id={id} type={type} placeholder={placeholder}
                      style={{
                        width: "100%", padding: "12px 16px", borderRadius: 10,
                        border: `1.5px solid ${C.blueLight}`, fontSize: 14,
                        background: "#fff", color: C.text, outline: "none",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" style={{
                    display: "block", fontSize: 13, fontWeight: 600,
                    color: C.text, marginBottom: 6,
                  }}>
                    Message
                  </label>
                  <textarea
                    id="message" rows={4}
                    placeholder="Tell us what you're interested in..."
                    style={{
                      width: "100%", padding: "12px 16px", borderRadius: 10,
                      border: `1.5px solid ${C.blueLight}`, fontSize: 14,
                      background: "#fff", color: C.text, outline: "none",
                      fontFamily: "Poppins, sans-serif", resize: "vertical",
                    }}
                  />
                </div>

                <button type="submit" className="rl-btn-primary" style={{
                  border: "none", cursor: "pointer", width: "100%",
                  padding: "14px", fontSize: 15, borderRadius: 12,
                }}>
                  Send Enquiry
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER ───────────────────────────── */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            background: C.bluePale, borderRadius: 24, height: 320,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 12,
            border: `1px solid ${C.blueLight}`,
          }}>
            <span style={{ fontSize: 44 }}>🗺️</span>
            <p style={{ color: C.muted, fontSize: 14, fontWeight: 500 }}>Map / location embed placeholder</p>
          </div>
        </div>
      </section>
    </>
  );
}
