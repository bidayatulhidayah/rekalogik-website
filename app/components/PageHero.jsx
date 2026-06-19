import Link from "next/link";
import { C } from "../lib/constants";

export default function PageHero({ label, title, subtitle, breadcrumb }) {
  return (
    <section className="rl-page-hero" style={{
      background: `linear-gradient(135deg, ${C.blueDark} 0%, ${C.blue} 100%)`,
      position: "relative", overflow: "hidden",
    }}>
      {/* Texture overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/assets/bg-texture-tile.jpg')",
        backgroundSize: "280px", opacity: 0.04,
      }} />
      {/* Decorative circle */}
      <div style={{
        position: "absolute", top: -80, right: -80,
        width: 400, height: 400, borderRadius: "50%",
        background: "rgba(255,255,255,0.04)",
      }} />

      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        {/* Breadcrumb */}
        {breadcrumb && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 8, marginBottom: 20, color: "rgba(255,255,255,0.55)", fontSize: 13,
          }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.55)" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.85)" }}>{breadcrumb}</span>
          </div>
        )}

        {label && <span className="rl-label" style={{ color: C.blueLight }}>{label}</span>}

        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 64, color: "#fff", lineHeight: 1.05, marginBottom: subtitle ? 16 : 0,
        }}>
          {title}
        </h1>

        {subtitle && (
          <p style={{
            color: "rgba(255,255,255,0.75)", fontSize: 17,
            lineHeight: 1.8, maxWidth: 560, margin: "0 auto",
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
