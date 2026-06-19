"use client";
import { useState } from "react";
import { C } from "../lib/constants";

export default function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(null);

  return (
    <div>
      {faqs.map(({ q, a }, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx} className="rl-faq-item">
            <button
              className="rl-faq-btn"
              onClick={() => setOpen(isOpen ? null : idx)}
            >
              <span style={{
                color: C.text, fontSize: 16, fontWeight: 600,
                fontFamily: "Poppins, sans-serif", flex: 1,
              }}>
                {q}
              </span>
              <span
                className="rl-faq-icon"
                style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
              >
                +
              </span>
            </button>

            <div style={{
              maxHeight: isOpen ? 300 : 0,
              overflow: "hidden",
              transition: "max-height 0.32s ease, padding 0.32s ease",
              paddingBottom: isOpen ? 22 : 0,
            }}>
              <p style={{
                color: C.muted, fontSize: 15, lineHeight: 1.85,
                fontFamily: "Poppins, sans-serif",
              }}>
                {a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
