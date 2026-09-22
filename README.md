# Nellai Ace Logistics – Tata Ace transport website

React + Vite front end built from the Figma design, with a Vercel serverless function that saves quote requests to Supabase.
There are only 2 runtime dependencies (`react`, `react-dom`); the Supabase call uses plain `fetch` on the server.

## 1. Run locally
```bash
npm install
cp .env.example .env      # then fill in values (see section 3)
npm run dev               # UI at http://localhost:5173
npm test                  # unit tests (validation + WhatsApp URL encoding)
npm run build && npm run preview
```
`/api/enquiry` only exists under Vercel. To test the form end-to-end locally use `npx vercel dev` (reads the same `.env`).

## 2. Add your real content (required before launch)
| What | Where |
|---|---|
| Real vehicle photo(s) | `public/images/tata-ace.jpg` (hero). Compress to ≤200 KB, ~1280px wide. Also add `public/images/og-share.jpg` (1200×630) for link previews. |
| Logo | Replace the inline `<svg>` in `src/components/Header.jsx` (`Logo`) with `<img src="/images/logo.png" ...>` |
| Phone / WhatsApp / address | `.env` (`VITE_PHONE_E164`, `VITE_WHATSAPP_E164`, `VITE_BUSINESS_ADDRESS`) – never hard-code |
| Rates | `src/content.js` → `DROPS[].base` and `HELPER_FEE`. Only the Thoothukudi base (₹950) and helper (₹300) came from the design; other routes show "Confirmed on call" until you set real rates. |
| Domain | `VITE_SITE_URL`, plus `public/robots.txt` and `public/sitemap.xml` (replace `YOUR-DOMAIN.example`) |

### Figma sample content that is NOT verified
The design contained sample text that this project treats as unverified. **Reviews, the 4.9 rating, "1,200+ trips", "45+ hubs", "1 vehicle ready" are hidden** unless `VITE_SHOW_SAMPLE_CONTENT=true`. Replace them in `src/content.js` (`REVIEWS`) and `Lower.jsx`/`Hero.jsx` with real, permissioned customer data first. Also verify these claims in `content.js`: 12+ years accident-free driver, zero-depreciation insurance, Fastag plazas, "TN-72 Commercial Permit" (in `Hero.jsx`), 15-minute callback, 4:30 AM dispatch, service hours, corridor km/price ranges.
Structured data (`App.jsx`) intentionally emits **no** ratings or reviews.

## 3. Environment variables
See `.env.example`. `VITE_*` values are public (bundled into the browser). `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are **server-only** – set them in Vercel → Project → Settings → Environment Variables, never with a `VITE_` prefix, never in Git.

## 4. Supabase
1. Create a project at supabase.com.
2. SQL Editor → paste and run `supabase/schema.sql` (creates `enquiries`, enables Row Level Security with **no** policies and revokes anon/authenticated access, so the public anon key cannot read or write anything).
3. Project Settings → API: copy the Project URL and the `service_role` key into Vercel env vars.
4. View enquiries in Table Editor; update `status` as you call customers.

## 5. Google Maps
1. Google Cloud Console → enable **Maps Embed API** → create an API key.
2. Restrict it: *Application restrictions* = HTTP referrers (`https://your-domain/*`, plus `http://localhost:5173/*` for dev); *API restrictions* = Maps Embed API only.
3. Put it in `VITE_GOOGLE_MAPS_EMBED_KEY`. Without a key the site shows a placeholder and an "Open in Google Maps" link.
(Directions/autocomplete would need the Maps JavaScript + Places APIs – not included to keep the bundle small.)

## 6. Analytics
Set `VITE_GA_ID` (GA4). Events sent: `call_click`, `whatsapp_click`, `form_submit` (`via` = whatsapp | callback), `form_success`. Mark them as key events in GA4 if wanted. **Confirmed bookings** happen off-site (phone/WhatsApp), so they cannot be measured automatically; set `status='confirmed'` in Supabase and count those, or import them to GA4 via the Measurement Protocol. Add the site in Google Search Console and submit `/sitemap.xml`.
If you use analytics cookies for visitors in regions that require consent, add a consent banner.

## 7. Deploy (Vercel)
1. Push to a **private** GitHub repo (`.env` is git-ignored).
2. Vercel → Add New Project → import the repo (Framework: Vite; build `npm run build`; output `dist`).
3. Add the env vars from section 3, deploy, then add your domain.
Netlify: move `api/enquiry.js` to `netlify/functions/` and adapt the handler signature (`(event) => ({statusCode, body})`); the logic is unchanged.

## 8. Security notes
- Service-role key is used only in `api/enquiry.js`; the browser never sees it.
- Server re-validates and sanitises every field (`src/lib/validate.js`), caps lengths, rejects bad dates/phones.
- Spam: hidden honeypot field, minimum-fill-time check, and an in-memory per-IP limit (5 / 10 min). The in-memory limit resets per serverless instance – for strict limits use Vercel KV/Upstash or Cloudflare Turnstile.
- Only data needed to quote a trip is collected (no email, no address beyond landmarks). Add a Privacy Policy page before launch (footer links are placeholders).

## 9. Test checklist
Automated (`npm test`, 6 tests): validation rules, sanitising, WhatsApp URL encoding round-trip.
Manual, before launch: mobile/tablet/desktop layouts; submit empty and invalid forms (errors are announced, first bad field gets focus); tap call and WhatsApp links on a phone; submit with Supabase configured (success) and with a wrong key / offline (error state shows); keyboard-only navigation; screen-reader pass; Lighthouse in Chrome DevTools (mobile) on the deployed URL; confirm no secrets appear in DevTools → Sources.

## Project structure
```
api/enquiry.js          serverless endpoint → Supabase
supabase/schema.sql     table + RLS
src/content.js          all copy, options, rates
src/config.js           env → phone/WhatsApp helpers
src/lib/                validate, whatsapp, analytics (pure, unit-tested)
src/components/         Header, Hero, Estimator (form), Lower (below-fold, code-split)
src/styles.css          design tokens + responsive styles
```
