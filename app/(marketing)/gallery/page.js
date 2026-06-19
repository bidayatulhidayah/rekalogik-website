import PageHero from "../../components/PageHero";
import { C } from "../../lib/constants";

export const metadata = {
  title: "Gallery | RekaLogik Studio",
  description:
    "Browse photos from past RekaLogik Studio STEM and coding workshops and events across Malaysia.",
};

const EVENTS = [
  { label: "REKABIT Basic — Season 1", count: 4 },
  { label: "REKABIT Advanced — Season 1", count: 3 },
  { label: "ESP32 Basic — Season 1", count: 3 },
];

const PHOTOS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  bg: i % 3 === 0 ? C.bluePale : i % 3 === 1 ? C.cream : "#E3EEF7",
  tall: i === 0 || i === 5 || i === 8,
}));

export default function GalleryPage() {
  return (
    <>
      <PageHero
        breadcrumb="Gallery"
        label="Memories"
        title="Past Events Gallery"
        subtitle="Snapshots from our workshops — students building, learning, and creating alongside our facilitators."
      />

      {/* ── EVENTS FILTER ─────────────────────────────── */}
      <section style={{ padding: "40px 24px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button style={{
              background: C.blueDark, color: "#fff",
              padding: "10px 22px", borderRadius: 999,
              border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 600,
            }}>
              All Events
            </button>
            {EVENTS.map(({ label }) => (
              <button key={label} style={{
                background: "#fff", color: C.text,
                padding: "10px 22px", borderRadius: 999,
                border: `1.5px solid ${C.blueLight}`, cursor: "pointer",
                fontSize: 13, fontWeight: 500,
              }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GRID ────────────────────────────────── */}
      <section className="rl-section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rl-gallery-grid">
            {PHOTOS.map(({ id, bg, tall }) => (
              <div key={id} style={{
                background: bg, borderRadius: 16,
                border: `1px solid ${C.blueLight}`,
                height: tall ? 320 : 220,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 10,
                cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
                position: "relative", overflow: "hidden",
              }}>
                <span style={{ fontSize: 32 }}>📷</span>
                <p style={{ color: C.muted, fontSize: 12, fontWeight: 500 }}>
                  Photo {id}
                </p>
                {/* Hover overlay placeholder */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(74,111,138,0.0)",
                  transition: "background 0.2s",
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ────────────────────────────── */}
      <section className="rl-section-sm" style={{ background: C.bluePale }}>
        <div style={{
          maxWidth: 640, margin: "0 auto", textAlign: "center",
          background: "#fff", borderRadius: 20, padding: "40px 48px",
          border: `1px solid ${C.blueLight}`,
          boxShadow: "0 4px 24px rgba(74,111,138,0.08)",
        }}>
          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 36,
            color: C.text, lineHeight: 1.05, marginBottom: 12,
          }}>
            Want to Be Part of the Next Event?
          </h3>
          <p className="rl-subtext" style={{ marginBottom: 28 }}>
            Register for an upcoming workshop and create your own memories with us.
          </p>
          <a href="/register" className="rl-btn-primary">
            Register Now →
          </a>
        </div>
      </section>
    </>
  );
}
