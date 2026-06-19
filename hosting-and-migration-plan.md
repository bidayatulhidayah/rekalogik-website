# Hosting & Migration Plan

## Decision Summary

| Concern | Decision |
|---|---|
| Hosting | Cloudflare Pages (free) |
| Database | Firebase Firestore (Blaze plan) |
| File storage | Firebase Storage |
| Sheets mirror | Firebase Cloud Function (Firestore trigger) |
| API route | Removed — form calls Firebase directly from browser |
| GAS | Fully removed |

---

## Why These Choices

### Hosting — Cloudflare Pages
- Truly free with no bandwidth limits and commercial use allowed
- No cold starts (unlike Render, Koyeb)
- Fast in Malaysia — Cloudflare has edge nodes in Kuala Lumpur and Singapore
- Works for this app because no Node.js server is needed (see below)

### Backend — Firebase (Blaze plan)
- Never pauses free projects (unlike Supabase which pauses after 7 days of inactivity)
- 10GB file storage free — proper place for receipt uploads
- Firestore is a good fit for registration documents
- Same Google account as existing Sheets/Apps Script setup
- Blaze is pay-as-you-go — at this scale, cost is effectively RM 0

### No API route / No Node.js server
Firebase is designed to be called directly from the browser. The old API route (`/api/submit`) only existed to proxy requests to Google Apps Script. With Firebase, the form submits directly to Firestore and Storage using the Firebase JS SDK. Security is handled by Firestore Security Rules instead.

---

## Final Architecture

```
Custom domain
  └── Cloudflare DNS (free) — DDoS protection, CDN, free SSL
        └── Cloudflare Pages (Next.js hosting, free, no cold starts)
              ├── Marketing pages (SSR/static)
              └── /register — form calls Firebase directly from browser

Firebase (Blaze plan)
  ├── Firestore — registrations, workshops, settings
  ├── Storage — receipt images (replaces base64 in Sheets)
  └── Cloud Function — Firestore trigger → Google Sheets API (Sheets mirror)

Google Sheets — read-only mirror, team views registrations here
```

---

## What Replaces Google Apps Script

| GAS responsibility | Replaced by |
|---|---|
| Store registration data | Firestore (client-side write) |
| Load workshop data / settings | Firestore (client-side read) |
| IC duplicate detection | Firestore query (`where icNumber ==`) |
| Receipt as base64 in Sheets | Firebase Storage (proper file, URL saved) |
| Append row to Sheets | Cloud Function (Firestore `onDocumentCreated` trigger) |

GAS is fully removed. Google Sheets becomes a read-only mirror only.

---

## Firestore Collections

```
/registrations/{id}
  participantName, icNumber, workshop, paymentStatus,
  receiptUrl, createdAt, ...

/workshops/{id}
  name, price, slots, dates, prerequisites, ...

/settings
  bankName, accountNumber, accountHolder, ...

/testimonials/{id}
  name, workshop, text, rating, visible, date

/gallery/{id}
  imageUrl, title, description, order, visible
```

Gallery images are stored in Firebase Storage under `gallery/`.
The `/gallery` Firestore collection holds metadata (title, order, visible toggle).
If no metadata is needed, the page can list Storage files directly — no Firestore entry required.

---

## Firestore Security Rules (outline)

```javascript
match /registrations/{id} {
  allow create: if request.resource.data.participantName is string
                && request.resource.data.icNumber is string;
  allow read: false; // only Cloud Function and admin
}

match /workshops/{id} {
  allow read: true;   // form loads workshop data publicly
  allow write: false; // only via Firebase Console
}

match /settings/{id} {
  allow read: true;
  allow write: false;
}

match /testimonials/{id} {
  allow create: if request.resource.data.visible == false  // must submit as hidden
                && request.resource.data.name is string
                && request.resource.data.text is string;
  allow read: if resource.data.visible == true;
  allow update, delete: false; // only via Firebase Console
}

match /gallery/{id} {
  allow read: if resource.data.visible == true;
  allow write: false; // only via Firebase Console
}
```

---

## Cloud Function — Sheets Mirror

```javascript
// functions/index.js
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { google } = require("googleapis");

exports.mirrorToSheets = onDocumentCreated("registrations/{id}", async (event) => {
  const data = event.data.data();

  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: "YOUR_SHEET_ID",
    range: "Registrations!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        data.participantName,
        data.icNumber,
        data.workshop,
        data.paymentStatus,
        data.createdAt,
      ]],
    },
  });
});
```

The Cloud Function's service account email must be shared as an Editor on the Google Sheet.
No separate credentials file needed — Firebase provides the service account automatically.

---

## Migration Steps

### One-time setup
1. Create Firebase project, enable Blaze plan (billing required, cost ~RM 0 at this scale)
2. Create Firestore database and Storage bucket
3. Write Firestore Security Rules
4. Copy workshop data and settings from Google Sheets to Firestore (manual, one-time)
5. Share Google Sheet with Cloud Function service account email
6. Deploy Cloud Function (`mirrorToSheets`)

### Code changes
7. Remove `app/api/submit/route.js` — no longer needed
8. Rewrite form submission in `app/register/page.jsx` to use Firebase JS SDK directly
9. Rewrite workshop data fetching to read from Firestore instead of GAS
10. Add Firebase config to environment variables

### Deployment
11. Connect repo to Cloudflare Pages
12. Set environment variables (Firebase config) in Cloudflare Pages dashboard
13. Point custom domain DNS to Cloudflare

### After deployment
14. Keep old Google Sheets registration history as read-only archive
15. Old GAS script can be left in place but is no longer called

---

## Content Management (CMS-like) via Firebase

Dynamic content that updates without code changes:

| Content | Stored in | How team edits |
|---|---|---|
| Gallery photos | Firebase Storage `gallery/` folder | Upload / delete files in Console |
| Gallery metadata (optional) | Firestore `gallery` collection | Edit documents in Console |
| Testimonials | Firestore `testimonials` collection | Add / edit / hide documents in Console |
| Workshop details | Firestore `workshops` collection | Edit fields in Console |

### Gallery — Storage listing approach (simplest)
Upload images to Firebase Storage under `gallery/`. The gallery page lists all files in that folder automatically. To add a photo: upload. To remove: delete. To reorder: prefix filenames with numbers (`01-photo.jpg`, `02-photo.jpg`). No Firestore entry needed.

### Testimonials — public submission form + Firestore

The `/feedback` page has a built-in submission form. Anyone (parents, teachers, students, RekaLogik team) can submit directly on the website — no Google Form needed.

**Form fields:** name, role (Parent / Student / Teacher / School Admin / RekaLogik Team), workshop attended (optional), feedback text, rating (optional 1–5 stars).

**Moderation workflow:**
- Every submission saves to Firestore with `visible: false` (hidden from site)
- Admin opens Firebase Console → `testimonials` collection → sets `visible: true` to publish
- Testimonial appears on the page within the next revalidation cycle (1 hour)
- Firestore Security Rules enforce that submissions cannot set `visible: true` themselves

**What changes in code:**
- `TESTIMONIALS` constant in `lib/constants.js` becomes seed data for Firestore (then unused)
- Testimonials grid on `/feedback` fetches from Firestore instead of the hardcoded constant
- "Share Your Feedback" `mailto:` link is replaced with a real form component

### Page data revalidation
Marketing pages fetch from Firestore with `revalidate = 3600` (1 hour). Content edits appear on the live site within 1 hour — no redeploy required.

---

## What Does NOT Change

- The 4-step form UI and flow
- All form validation and business logic
- Discount logic (pair discount, returning participant)
- Prerequisite enforcement
- Draft auto-save to localStorage
- Receipt upload (still 3MB max, just stored in Firebase Storage now)
- Google Sheets for the team — still works, populated automatically by Cloud Function

---

## Monthly Cost Estimate

| Service | Cost |
|---|---|
| Cloudflare Pages | Free |
| Cloudflare DNS | Free |
| Firebase Firestore | Free (within free limits) |
| Firebase Storage | Free (within 10GB) |
| Firebase Cloud Functions | Free (within 2M invocations/month) |
| **Total** | **RM 0** |

If registrations grow significantly, Firebase Blaze billing kicks in at a very low rate.
At a few hundred registrations per year, cost remains negligible.
