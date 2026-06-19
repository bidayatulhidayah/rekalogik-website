# RekaLogik Studio — Official Website

The official marketing and registration website for **RekaLogik Studio**, a STEM and coding workshop provider for Malaysian primary and secondary school students.

---

## Overview

This website serves two purposes:

1. **Marketing site** — introduces the studio, showcases workshops and services, displays a gallery, and collects enquiries.
2. **Registration portal** — a multi-step workshop registration form connected to Google Sheets via Google Apps Script.

Built with **Next.js 16 App Router** for server-side rendering and SEO, ensuring marketing pages are fully indexed by search engines.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | JavaScript (no TypeScript) |
| Styling | Inline styles + global CSS utility classes |
| Fonts | Poppins, Bebas Neue (Google Fonts) |
| Backend | Google Apps Script (Google Sheets integration) |
| Deployment | Vercel |

---

## Project Structure

```
app/
├── (marketing)/               # Route group — all public marketing pages
│   ├── layout.js              # Shared layout: Navbar + Footer
│   ├── page.js                # Homepage (/)
│   ├── about/page.js          # About Us (/about)
│   ├── workshops/page.js      # Workshops (/workshops)
│   ├── services/page.js       # Tailored Services (/services)
│   ├── gallery/page.js        # Gallery (/gallery)
│   ├── feedback/page.js       # Testimonials (/feedback)
│   ├── faqs/page.js           # FAQs (/faqs)
│   └── contact/page.js        # Contact Us (/contact)
│
├── register/                  # Workshop registration form (/register)
│   └── page.jsx               # Multi-step form (client component)
│
├── api/submit/                # API route — proxies form to Google Apps Script
│   └── route.js
│
├── components/                # Shared UI components
│   ├── Navbar.jsx             # Sticky navigation bar (client component)
│   ├── Footer.jsx             # Site footer
│   ├── PageHero.jsx           # Inner page hero banner with breadcrumb
│   └── FaqAccordion.jsx       # Accordion for FAQs (client component)
│
├── lib/
│   └── constants.js           # Shared colour palette and all page data
│
├── layout.js                  # Root layout (fonts, metadata, html/body)
└── globals.css                # Global reset + CSS utility classes
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, stats, and section previews linking to full pages |
| `/about` | Studio story, mission, values, and team |
| `/workshops` | Full workshop details — REKABIT Basic, REKABIT Advanced, ESP32 Basic |
| `/services` | Tailored services — school workshops, holiday camps, corporate CSR |
| `/gallery` | Past event photo gallery |
| `/feedback` | Participant testimonials and ratings |
| `/faqs` | Frequently asked questions with accordion |
| `/contact` | Contact details and enquiry form |
| `/register` | Multi-step workshop registration form |

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## Registration Form

The `/register` page is a multi-step registration form with the following flow:

- **Step 0** — Workshop overview and landing
- **Step 1** — Participant info and workshop selection
- **Step 2** — Payment via bank transfer or DuitNow QR, with receipt upload
- **Step 3** — Meal selection and background survey
- **Confirmation** — Summary, Google Calendar links, WhatsApp group links

### Google Apps Script Integration

Workshop data (slots, pricing, dates, food options, discounts) is loaded live from Google Sheets via a Google Apps Script web app. The endpoint URL is set in two places — both must stay in sync:

| File | Constant |
|---|---|
| `app/register/page.jsx` | `APPS_SCRIPT_URL` |
| `app/api/submit/route.js` | `GAS_URL` |

---

## Colour Palette

| Name | Hex |
|---|---|
| Blue | `#6B8EAE` |
| Blue Dark | `#4A6F8A` |
| Blue Light | `#A8C5DA` |
| Blue Pale | `#E8F1F8` |
| Cream | `#F0EBE5` |
| Text | `#2C3E50` |
| Muted | `#7A8E9A` |

---

## Deployment

This project is deployed on **Vercel**. Pushing to `main` triggers an automatic deployment.

```bash
git push origin main
```

---

## Related

- **Old registration app** — `rekalogik-registration-vercel` (Vite/React SPA, kept live as backup). Do not modify.
