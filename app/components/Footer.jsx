import Link from "next/link";
import { C } from "../lib/constants";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Workshops", href: "/workshops" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
];

const SOCIALS = [
  { label: "Instagram", abbr: "IG", href: "#" },
  { label: "TikTok", abbr: "TK", href: "#" },
  { label: "YouTube", abbr: "YT", href: "#" },
  { label: "WhatsApp", abbr: "WA", href: "#" },
  { label: "Email", abbr: "✉", href: "mailto:placeholder@rekalogik.my" },
];

export default function Footer() {
  return (
    <footer style={{ background: C.text, color: "#fff", padding: "72px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div className="rl-footer-grid" style={{ marginBottom: 56 }}>

          {/* Brand column */}
          <div>
            <img
              src="/assets/logo_cream_transparents.png"
              alt="RekaLogik Studio"
              style={{ height: 52, marginBottom: 20 }}
            />
            <p style={{
              color: "rgba(255,255,255,0.55)", fontSize: 14,
              lineHeight: 1.85, maxWidth: 280, marginBottom: 24,
            }}>
              Build Your Logic, Bit by Bit. Hands-on STEM & coding workshops for Malaysian students.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {SOCIALS.map(({ label, abbr, href }) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  className="rl-social-btn"
                  style={{
                    width: 38, height: 38, borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 11, fontWeight: 700,
                    border: "1px solid rgba(255,255,255,0.15)",
                    transition: "background 0.2s",
                  }}
                >
                  {abbr}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 3,
              textTransform: "uppercase", color: C.blueLight, marginBottom: 22,
            }}>
              Quick Links
            </h4>
            {QUICK_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} style={{
                display: "block", color: "rgba(255,255,255,0.6)",
                fontSize: 14, marginBottom: 13, lineHeight: 1,
                transition: "color 0.2s",
              }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 3,
              textTransform: "uppercase", color: C.blueLight, marginBottom: 22,
            }}>
              Contact
            </h4>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 14, lineHeight: 1.6 }}>
              📧 placeholder@rekalogik.my
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 14, lineHeight: 1.6 }}>
              📱 +60 1X-XXXXXXXX
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6 }}>
              📍 Malaysia
            </p>
          </div>

          {/* Become a facilitator */}
          <div>
            <h4 style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 3,
              textTransform: "uppercase", color: C.blueLight, marginBottom: 22,
            }}>
              Join Us
            </h4>
            <p style={{
              color: "rgba(255,255,255,0.6)", fontSize: 14,
              lineHeight: 1.85, marginBottom: 20,
            }}>
              Passionate about STEM education? Join our team and inspire the next generation of makers.
            </p>
            <a href="#" className="rl-btn-primary" style={{
              background: C.blue, fontSize: 13,
            }}>
              Become a Facilitator
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 10,
        }}>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
            © 2026 RekaLogik Studio. All rights reserved.
          </p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
            Empowering young minds through technology.
          </p>
        </div>

      </div>
    </footer>
  );
}
