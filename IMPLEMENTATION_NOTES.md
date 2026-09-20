# KAIONEX Website — Implementation Notes

Premium marketing site for the KAIONEX connected business software ecosystem by Techloom.ai.

See `DEPLOYMENT.md` for operations and `BUSINESS_DECISIONS.md` for product decisions.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

## Configuration map

| Concern | Location |
|---------|----------|
| Site URL / env | `src/lib/env.ts`, `src/lib/site.ts`, `.env.example` |
| Product taxonomy & status | `src/content/products.ts` |
| Pricing | `src/content/pricing.ts` |
| Lead submission | `src/lib/forms/*`, `POST /api/leads` |
| Analytics events | `src/lib/analytics.ts` |

## Product status (`src/content/products.ts`)

| Product | Status | Action CTA |
|---------|--------|------------|
| KAIONEX POS | available | Book a Demo |
| KAIONEX EMS | available | Book a Demo |
| KAIONEX FMS | available | Book a Demo |
| E-Commerce | available | Book a Demo |
| KAIONEX CRM | coming-soon | Get Updates → `/contact` |

E-Commerce final branded name is pending — display name remains **E-Commerce**.

## Sign In

Hidden from customer-facing UI. No KAIONEX application login exists yet.

## Forms

- Target delivery: **email** (`CONTACT_RECIPIENT_EMAIL`)
- Provider: **prepared, not connected**
- Fallback: Email/WhatsApp handoff when unconfigured

## Pricing

Monetary values unchanged. Terminology: CRM — Coming Soon; EMS replaces HRM wording.
