# KAIONEX Website CMS — Setup Guide

This document explains how to set up and bootstrap the KAIONEX Website Content
Management System (CMS), which is implemented in Phase D1.

---

> **Scope**: This CMS manages **website content** for the KAIONEX marketing site
> (product descriptions, pricing, industries, solutions, FAQs, resources, leads,
> site settings). It is **not** connected to the operational databases of
> KAIONEX POS, EMS, FMS, E-Commerce, or CRM.

---

## Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) account (free tier works)
- Access to the KAIONEX GitHub repository

---

## 1. Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com) → **New project**
2. Choose your organization, name the project (e.g. `kaionex-cms`), set a strong database password
3. Wait for provisioning (~2 min)

---

## 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in the Supabase values from your project dashboard:

**Dashboard → Settings → API:**

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key |
| `SUPABASE_SECRET_KEY` | Secret key — **keep secret** |

> ⚠ **NEVER commit `.env.local` or expose `SUPABASE_SECRET_KEY` to the browser.**
> The secret key bypasses all Row-Level Security policies.

---

## 3. Apply Database Migrations

### Option A: Supabase CLI (recommended)

```bash
# Install CLI
npm install -g supabase

# Link to your project
supabase login
supabase link --project-ref <your-project-ref>

# Push migrations
supabase db push

# Seed initial data
supabase db seed
```

### Option B: Manual (Supabase SQL Editor)

1. Open your Supabase project → **SQL Editor**
2. Paste and run `supabase/migrations/001_initial_schema.sql`
3. Paste and run `supabase/seed.sql`

---

## 4. Create the First Admin User

Admin accounts are **intentionally provisioned** — there is no public self-registration.

### Step 1 — Create the Auth user

In the Supabase Dashboard → **Authentication → Users → Invite user**, or use the CLI:

```bash
# Using Supabase Management API (replace values)
curl -X POST 'https://<project-ref>.supabase.co/auth/v1/admin/users' \
  -H "apikey: <secret-key>" \
  -H "Authorization: Bearer <secret-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@kaionex.app",
    "password": "strong-password-here",
    "email_confirm": true
  }'
```

Note the returned `id` (UUID).

### Step 2 — Add to admin_profiles

In the Supabase SQL Editor (replace the UUID and email):

```sql
INSERT INTO admin_profiles (id, role, display_name, is_active)
VALUES (
  '<auth-user-uuid>',
  'owner',
  'KAIONEX Admin',
  true
);
```

**Role options:**
- `owner` — full access, can manage all admins
- `admin` — manage all website content
- `editor` — publish and edit content

### Step 3 — Sign in

Navigate to `/admin/login` and sign in with the credentials created above.

---

## 5. Create the Storage Bucket

In Supabase Dashboard → **Storage → New bucket:**

- Name: `site-media`
- Public: **on** (so media URLs are publicly accessible)
- Click **Save**

Expected folder structure (create manually or via upload):
```
site-media/
  products/        — product images
  resources/       — blog/resource cover images
  site/            — logos, OG images, misc
```

> Anonymous uploads are disabled by RLS. All uploads go through
> authenticated admin server actions.

---

## 6. Regenerate Database Types (optional)

After any schema change, regenerate `src/lib/supabase/types.ts`:

```bash
npx supabase gen types typescript \
  --project-id <your-project-ref> \
  > src/lib/supabase/types.ts
```

---

## 7. Revalidation Strategy (Phase D2)

The current implementation reads data server-side on every request (no caching).
In **Phase D2**, the following Next.js revalidation strategy is planned:

| Content type | Strategy | Tag |
|---|---|---|
| Published products | `revalidateTag('products')` on mutation | `products` |
| Pricing plans | `revalidateTag('pricing')` on mutation | `pricing` |
| FAQs | `revalidateTag('faqs')` on mutation | `faqs` |
| Industries | `revalidateTag('industries')` on mutation | `industries` |
| Solutions | `revalidateTag('solutions')` on mutation | `solutions` |
| Resources | `revalidateTag('resources')` on mutation | `resources` |
| Site settings | `revalidateTag('settings')` on mutation | `settings` |

Server actions will call `revalidateTag()` after successful mutations to
invalidate the relevant cache segments without full page rebuilds.

---

## 8. Admin Mutation Pattern (Phase D2)

All admin mutations follow this server action pattern:

```typescript
'use server'

export async function updateProduct(id: string, input: ProductInput) {
  // 1. Authenticate
  const session = await verifyAdminSession();

  // 2. Authorize role
  await requireRole('admin', 'owner');

  // 3. Validate input
  const validated = ProductSchema.safeParse(input);
  if (!validated.success) throw new Error('Invalid input');

  // 4. Mutate via admin client
  const admin = createAdminClient();
  const { error } = await admin
    .from('products')
    .update(validated.data)
    .eq('id', id);
  if (error) throw error;

  // 5. Write audit log
  await writeAuditLog({
    adminId: session.userId,
    action: 'update',
    tableName: 'products',
    recordId: id,
  });

  // 6. Revalidate cache
  revalidateTag('products');
}
```

---

## Security Notes

- `proxy.ts` performs optimistic route protection (cookie check) for UX redirects
- Every server action **independently verifies** session and admin_profiles — proxy is not the only guard
- The secret key (`SUPABASE_SECRET_KEY`) is only imported via `src/lib/supabase/admin.ts`, which is tagged `import "server-only"`
- RLS is enabled on all tables; public reads are limited to `is_published = true` rows
- No anonymous writes are permitted on any table

---

## File Structure Reference

```
d:\kaiii\
├── src/
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts      — browser client (@supabase/ssr)
│   │   │   ├── server.ts      — SSR server client
│   │   │   ├── admin.ts       — service-role admin client (server-only)
│   │   │   └── types.ts       — database types
│   │   ├── admin/
│   │   │   ├── auth.ts        — session verification, login/logout actions
│   │   │   ├── audit.ts       — cms_audit_log helper
│   │   │   └── schemas.ts     — Zod validation schemas
│   │   └── data/
│   │       ├── products.ts    — product data access layer
│   │       ├── pricing.ts     — pricing data access layer
│   │       ├── industries.ts  — industries DAL
│   │       ├── solutions.ts   — solutions DAL
│   │       ├── faqs.ts        — FAQs DAL
│   │       ├── resources.ts   — resources DAL
│   │       └── settings.ts    — site settings DAL
│   ├── app/
│   │   └── admin/
│   │       ├── layout.tsx     — admin shell layout (session-protected)
│   │       ├── page.tsx       — dashboard
│   │       ├── login/page.tsx — login page (public)
│   │       ├── products/      — products management
│   │       ├── pricing/       — pricing management
│   │       ├── industries/    — industries management
│   │       ├── solutions/     — solutions management
│   │       ├── resources/     — resources management
│   │       ├── faqs/          — FAQs management
│   │       ├── leads/         — leads viewer
│   │       ├── media/         — media management
│   │       └── settings/      — site settings
│   └── proxy.ts               — Next.js 16.x route protection (proxy)
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── seed.sql
└── docs/
    └── CMS_SETUP.md           — this file
```
