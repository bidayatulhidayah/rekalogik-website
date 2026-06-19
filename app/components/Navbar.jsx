"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { C } from "../lib/constants";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Workshops", href: "/workshops" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkColor = scrolled ? C.text : "#fff";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      transition: "background 0.3s, box-shadow 0.3s",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 72,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={scrolled ? "/assets/logo_steelBlue_transparents.png" : "/assets/logo_cream_transparents.png"}
            alt="RekaLogik Studio"
            style={{ height: 44, transition: "opacity 0.3s" }}
          />
        </Link>

        {/* Desktop */}
        <div className="rl-nav-desktop" style={{ alignItems: "center", gap: 36 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} style={{
              color: linkColor, fontSize: 14, fontWeight: 500,
              letterSpacing: 0.3, transition: "color 0.3s",
              textShadow: scrolled ? "none" : "0 1px 6px rgba(0,0,0,0.25)",
            }}>
              {label}
            </Link>
          ))}
          <Link href="/register" style={{
            background: C.blue, color: "#fff",
            padding: "10px 26px", borderRadius: 8,
            fontSize: 14, fontWeight: 700, letterSpacing: 0.3,
            fontFamily: "Lato, sans-serif",
          }}>
            Register
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="rl-hamburger"
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 8, flexDirection: "column", gap: 5,
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 24, height: 2,
              background: linkColor, borderRadius: 2,
              transition: "background 0.3s",
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{
        background: "#fff",
        maxHeight: menuOpen ? 480 : 0,
        overflow: "hidden",
        transition: "max-height 0.35s ease",
        borderTop: menuOpen ? "1px solid #eee" : "none",
      }}>
        <div style={{ padding: "12px 24px 20px" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)} style={{
              display: "block", color: C.text, fontSize: 15, fontWeight: 500,
              padding: "13px 0", borderBottom: "1px solid #f5f5f5",
            }}>
              {label}
            </Link>
          ))}
          <Link href="/register" onClick={() => setMenuOpen(false)} style={{
            display: "block", background: C.blue, color: "#fff",
            textAlign: "center", padding: "13px", borderRadius: 8,
            marginTop: 16, fontWeight: 700, fontSize: 15,
            fontFamily: "Lato, sans-serif",
          }}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
