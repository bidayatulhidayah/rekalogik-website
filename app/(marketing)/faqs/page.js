import Link from "next/link";
import PageHero from "../../components/PageHero";
import FaqAccordion from "../../components/FaqAccordion";
import { C, FAQS } from "../../lib/constants";

export const metadata = {
  title: "FAQs | RekaLogik Studio",
  description:
    "Frequently asked questions about RekaLogik Studio workshops — who can join, pricing, location, registration, and more.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        breadcrumb="FAQs"
        label="Got Questions?"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before registering. If you can't find your answer here, reach out to us directly."
      />

      {/* ── FAQ ACCORDION ─────────────────────────────── */}
      <section className="rl-section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FaqAccordion faqs={FAQS} />
        </div>
      </section>

      {/* ── STILL HAVE QUESTIONS ──────────────────────── */}
      <section className="rl-section-sm" style={{ background: C.bluePale }}>
        <div style={{
          maxWidth: 640, margin: "0 auto", textAlign: "center",
          background: "#fff", borderRadius: 20, padding: "48px 40px",
          border: `1px solid ${C.blueLight}`,
          boxShadow: "0 4px 24px rgba(74,111,138,0.08)",
        }}>
          <span style={{ fontSize: 36, display: "block", marginBottom: 16 }}>💬</span>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 28, color: C.text, lineHeight: 1.1, marginBottom: 12 }}>
            Still Have Questions?
          </h3>
          <p className="rl-subtext" style={{ marginBottom: 32 }}>
            We're happy to help. Send us a message on WhatsApp or use our contact form and we'll get back to you promptly.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="rl-btn-primary">
              Contact Us
            </Link>
            <Link href="/register" className="rl-btn-outline">
              Register Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
