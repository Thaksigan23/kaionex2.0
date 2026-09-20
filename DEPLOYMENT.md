# KAIONEX marketing site — deployment

## Stack

- Node.js 20+ (LTS recommended)
- Next.js 16 (App Router)
- npm

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

## Production domain

Default canonical URL: `https://kaionex.app`

Override with `NEXT_PUBLIC_SITE_URL` for staging/preview if needed.

Point DNS for `kaionex.app` at the production host and configure HTTPS there. Set
`kaionex.app` as the primary domain; redirect `www.kaionex.app` to the non-www
domain at the hosting layer. Do not use a preview URL as the production canonical.

## Required environment variables

None required to build or run with Email/WhatsApp form fallback.

## Optional environment variables

See `.env.example`:

| Variable | Scope | Purpose |
|----------|--------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical site URL |
| `NEXT_PUBLIC_SIGN_IN_URL` | Public | Reserved for future app login (UI hidden until enabled) |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | Public | Analytics provider id (no SDK until wired) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public | Future Turnstile site key |
| `CONTACT_RECIPIENT_EMAIL` | Server | Official lead inbox; defaults to info@kaionex.app |
| `LEAD_FROM_EMAIL` | Server | Verified sender for provider integration |
| `LEAD_WEBHOOK_URL` | Server | Optional temporary delivery bridge |
| `LEAD_WEBHOOK_SECRET` | Server | Optional webhook bearer token |

## Integration status

| Capability | Status |
|------------|--------|
| Form UI | Ready |
| Lead API `/api/leads` | Ready |
| Intended delivery | **Email** to KAIONEX team |
| Email provider | **Prepared, not connected** |
| Form fallback | Email/WhatsApp handoff when delivery unconfigured |
| Sign In | **Hidden** — no customer app/login exists |
| Analytics | Event layer ready — no provider installed |
| CRM product | Coming Soon (not a form backend) |
| E-Commerce | Available — final branded name pending |

## Product truth (customer-facing)

| Product | Status |
|---------|--------|
| KAIONEX POS | Available |
| KAIONEX EMS | Available |
| KAIONEX FMS | Available |
| E-Commerce | Available |
| KAIONEX CRM | Coming Soon |

## Security headers (shipped)

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera/microphone/geolocation disabled)
- `X-Frame-Options: SAMEORIGIN`

CSP is deferred — see prior notes. Validate in staging before shipping a restrictive policy.

## Privacy / cookies

No analytics/advertising cookies are installed. Re-evaluate consent UX when third-party scripts are added.

## Forms

Primary future path:

Website Form → `/api/leads` → transactional email → KAIONEX team

WhatsApp remains an optional direct contact channel, not the primary form backend.

## Lead Email Delivery

- Official recipient: **info@kaionex.app**. Set `CONTACT_RECIPIENT_EMAIL=info@kaionex.app` on the server.
- Demo, Contact and CRM Get Updates post to `POST /api/leads`; delivery occurs server-side in `src/lib/forms/deliver.ts`.
- `LEAD_FROM_EMAIL` is the sender for a future email provider. Verify that address/domain with the chosen provider; visitor email is used only as Reply-To.
- Provider credentials must be server-only. No email provider or credentials are currently configured.
- The optional `LEAD_WEBHOOK_URL` bridge remains supported. A 2xx response alone does **not** count as delivery. Its response must confirm `{ "emailAccepted": true, "recipient": "info@kaionex.app" }` after provider acceptance before the UI reports success. The bridge receives structured lead fields and, when `LEAD_FROM_EMAIL` is set, provider-independent `emailMessage` with HTML, text, subject, From and Reply-To.
- When unconfigured, the API returns fallback and the forms offer a clear email/WhatsApp handoff. A failed delivery retains the entered form details for retry.

## Launch checklist

- [ ] Set the production domain, DNS, HTTPS, and host-level `www` → non-www redirect.
- [ ] Configure `NEXT_PUBLIC_SITE_URL=https://kaionex.app` and `CONTACT_RECIPIENT_EMAIL=info@kaionex.app`; keep `LEAD_WEBHOOK_SECRET` and any future provider credentials server-only.
- [ ] Run `npm install`, `npm run lint`, `npm run typecheck`, and `npm run build`; deploy the build and start it with `npm run start` if self-hosting.
- [ ] Confirm `/`, the official logo, mobile navigation, Products menu, every product and industry page, Pricing and its currency/billing controls, Contact, Book Demo, CRM Get Updates, and FAQ controls.
- [ ] Confirm unconfigured leads show the honest email/WhatsApp fallback; do not enable a delivered state until an email provider is configured and tested.
- [ ] Confirm an unknown route returns HTTP 404. Check `/robots.txt`, `/sitemap.xml`, canonical links, OG/Twitter preview tags, browser console, and hydration warnings on the deployed domain.
- [ ] Confirm the production responses retain `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and `X-Frame-Options`.

**Deferred:** transactional email provider and verified sender; optional analytics provider and Turnstile activation. Sign In remains disabled. A strict CSP remains deferred until the production scripts and integrations can be tested together.
