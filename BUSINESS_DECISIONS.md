# Business decisions

## RESOLVED — CMS vs CRM

CMS and CRM refer to the **same** client/customer management product.

- Official public product name: **KAIONEX CRM**
- Status: **Under Development / Coming Soon**
- There is **no separate CMS product**

---

## RESOLVED — HRM vs EMS

HRM-style functionality is part of **KAIONEX EMS**.

- There is **no separate KAIONEX HRM product**
- **KAIONEX EMS is Available**
- EMS covers employee management, tasks, work monitoring, team communication/chat, and workforce workflows

---

## RESOLVED — E-Commerce status

**E-Commerce is an available ecosystem product.**

---

## OPEN — E-Commerce final branded product name

The product exists and is Available. The final branded KAIONEX product name has **not** been chosen.

Until then, customer-facing label remains: **E-Commerce**

---

## RESOLVED — Demo/contact destination

Form submissions should ultimately be delivered to the KAIONEX team **via email**.

Engineering still needs a production email provider and its credentials.
The provider's From address/domain must also be verified before live delivery.

## RESOLVED — Lead recipient

All website leads should go to **info@kaionex.app**. Set `CONTACT_RECIPIENT_EMAIL` server-side. This is the only official lead recipient.

Until connected, forms use the honest Email/WhatsApp fallback from `/api/leads`.

---

## RESOLVED — Sign In

No KAIONEX customer application/login currently exists.

Customer-facing **Sign In must remain hidden** until an application exists.

Configuration architecture may stay prepared (`siteConfig.signIn.enabled = false`).

---

## DEFERRED — Optional analytics and CAPTCHA

No analytics provider is selected and no tracking SDK is active. Turnstile is
not enabled. Re-evaluate provider choice, consent needs, and anti-abuse controls
only when these integrations are requested.
