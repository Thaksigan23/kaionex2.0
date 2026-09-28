/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * KAIONEX CMS — Phase D2: Product Content & Features Migration
 *
 * Updates the 5 canonical products in Supabase with complete approved content
 * and populates `product_features`.
 *
 * Run with: node scripts/migrate-products-d2.js
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Read .env.local
const envPath = path.resolve(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split(/\r?\n/).forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const idx = trimmed.indexOf('=');
  if (idx !== -1) {
    const key = trimmed.slice(0, idx).trim();
    let val = trimmed.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
});

if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
  console.error('Error: Supabase environment variables not found in .env.local');
  process.exit(1);
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SECRET_KEY);

const productsData = [
  {
    slug: 'pos',
    name: 'KAIONEX POS',
    short_name: 'POS',
    tagline: 'Fast, practical point-of-sale operations.',
    summary: 'Sell faster with offline-ready billing, multi-payment checkout, and practical inventory tracking built for your counter.',
    headline: 'Sell faster.\nOperate smarter.',
    description: 'KAIONEX POS is a fast, offline-ready billing system built for retail counters, restaurant floors, and service desks. It keeps sales, local inventory, and payments recorded when internet drops, then syncs automatically with the cloud when you reconnect.',
    accent: 'pos',
    benefits: [
      'Faster checkout and shorter queues',
      'Keep selling during connectivity outages',
      'Accurate records for every register and counter',
      'A focused checkout flow for counter staff',
    ],
    audience: 'Retail stores, supermarkets, restaurants, cafés, and any business with a physical counter or till.',
    connection: 'Part of the KAIONEX product family, serving the counter and sales operations of your business.',
    cta_label: 'Learn More',
    cta_href: '/products/pos',
    status: 'available',
    sort_order: 1,
    is_published: true,
    features: [
      'Fast checkout with barcode and SKU scanning',
      'Cash, card, and digital payment methods',
      'Split payments, discounts, and tax configuration',
      'Digital and printed receipts',
      'Counter stock tracking and low-stock alerts',
      'Multi-counter and multi-location operations',
      'Offline-ready billing with automatic cloud sync',
      'Sales reporting and role-based access',
    ],
  },
  {
    slug: 'ems',
    name: 'KAIONEX EMS',
    short_name: 'EMS',
    tagline: 'Manage your people and work in a dedicated workspace.',
    summary: 'Employee management, tasks, work visibility, team communication, and workforce workflows — purpose-built under the KAIONEX brand.',
    headline: 'Your people and work.\nOrganized in one workspace.',
    description: 'KAIONEX EMS brings employee and work management together in one focused system. Manage staff records, assign tasks, coordinate work activity, and keep teams communicating with the workforce tools your operations need.',
    accent: 'ems',
    benefits: [
      'People and work stay in one organized system',
      'Clearer accountability by role, task, and location',
      'Less time lost to manual roster and coordination work',
      'Dedicated workforce visibility for store and facility managers',
    ],
    audience: 'Any business with hourly or shift-based staff — retail, hospitality, and service teams especially.',
    connection: 'Part of the KAIONEX product family, focused on employee management and team coordination.',
    cta_label: 'Learn More',
    cta_href: '/products/ems',
    status: 'available',
    sort_order: 2,
    is_published: true,
    features: [
      'Employee management and workforce profiles',
      'Task management and internal coordination',
      'Work and employee monitoring',
      'Team communication / chat',
      'Attendance tracking with exception flags',
      'Leave management and shift/roster planning',
      'Role-based permissions',
      'Workforce reports across branches',
    ],
  },
  {
    slug: 'fms',
    name: 'KAIONEX FMS',
    short_name: 'FMS',
    tagline: 'Financial visibility and control.',
    summary: 'Accounting, invoicing, expenses, cash flow, and reporting from a secure finance workspace built for business owners.',
    headline: 'Know where\nyour money is going.',
    description: 'KAIONEX FMS simplifies financial management for businesses of all sizes. Manage invoices, track income and expenses, monitor cash flow, and generate accurate financial reports from one secure platform.',
    accent: 'fms',
    benefits: [
      'Up-to-date view of revenue and expenses',
      'Faster month-end reporting',
      'Clear cash flow and invoice tracking',
      'Exportable records for accountants',
    ],
    audience: 'Growing businesses that have outgrown spreadsheet accounting and need dedicated financial management.',
    connection: 'Part of the KAIONEX product family, providing dedicated financial tools for your business.',
    cta_label: 'Learn More',
    cta_href: '/products/fms',
    status: 'available',
    sort_order: 3,
    is_published: true,
    features: [
      'Accounting and invoice management',
      'Payments and expense tracking',
      'Cash flow visibility',
      'Tax configuration',
      'Financial reporting and revenue analytics',
      'Project-based billing where needed',
      'Exportable statements for accountants',
      'Comprehensive ledger and transaction management',
    ],
  },
  {
    slug: 'ecommerce',
    name: 'E-Commerce',
    short_name: 'E-Commerce',
    tagline: 'Purpose-built digital commerce.',
    summary: 'Online storefronts, product catalogs, order tracking, and digital checkout for growing brands.',
    headline: 'Commerce built\nfor modern brands.',
    description: 'E-Commerce provides dedicated digital selling software for modern businesses. Manage product catalogs, process online orders, handle digital payments, and track fulfillment in a focused online commerce environment.',
    accent: 'ecommerce',
    benefits: [
      'Dedicated storefront management',
      'Clear digital catalog and order tracking',
      'Streamlined fulfillment from order to dispatch',
      'Comprehensive digital sales reporting',
    ],
    audience: 'Retail stores and commercial businesses managing online storefronts, catalog sales, and customer deliveries.',
    connection: 'Part of the KAIONEX product family, dedicated to online storefronts and order management.',
    cta_label: 'Learn More',
    cta_href: '/products/ecommerce',
    status: 'available',
    sort_order: 4,
    is_published: true,
    features: [
      'Product catalog and online order management',
      'Storefront stock tracking and low-stock alerts',
      'Customer and payment workflows',
      'Order tracking and fulfillment visibility',
      'Promotions and discount configurations',
      'Sales analytics for online revenue',
      'Digital receipts and shipping notifications',
      'Fewer missed orders with clear dispatch queues',
    ],
  },
  {
    slug: 'crm',
    name: 'KAIONEX CRM',
    short_name: 'CRM',
    tagline: 'Customer relationships planned for the KAIONEX family.',
    summary: 'Client and customer relationship management planned for the KAIONEX product suite — currently under development.',
    headline: 'Customer relationships\nplanned for the KAIONEX family.',
    description: 'KAIONEX CRM is currently being developed as a future product in the KAIONEX portfolio. It is designed to provide dedicated customer and client relationship tools. Concept preview — not yet released.',
    accent: 'crm',
    benefits: [
      'Future customer management under the familiar KAIONEX design language',
      'Dedicated tools for client profiles and communication history',
      'Modular addition to your KAIONEX product toolkit when available',
    ],
    audience: 'Retail, hospitality, and service businesses that want updates as dedicated customer management joins KAIONEX.',
    connection: 'Coming soon — planned as a future customer relationship product in the KAIONEX portfolio.',
    cta_label: 'Get Updates',
    cta_href: '/contact?interest=crm',
    status: 'coming_soon',
    sort_order: 5,
    is_published: true,
    features: [
      'Planned: centralized customer and client profiles',
      'Planned: relationship history and interaction logs',
      'Planned: follow-up and communication context',
      'Planned: segmentation for targeted campaigns',
    ],
  },
];

async function migrate() {
  console.log('--- Migrating Product Content to Supabase ---');

  for (const item of productsData) {
    const { features, ...productRow } = item;

    // Check if product exists by slug
    const { data: existing, error: fetchErr } = await supabase
      .from('products')
      .select('id, slug, name')
      .eq('slug', item.slug)
      .single();

    if (fetchErr && fetchErr.code !== 'PGRST116') {
      console.error(`Error querying product ${item.slug}:`, fetchErr.message);
      continue;
    }

    let productId = existing?.id;

    if (existing) {
      console.log(`Updating product: ${item.slug} (${item.name})`);
      const { error: updateErr } = await supabase
        .from('products')
        .update({
          ...productRow,
          updated_at: new Date().toISOString(),
        })
        .eq('id', productId);

      if (updateErr) {
        console.error(`Failed to update ${item.slug}:`, updateErr.message);
        continue;
      }
    } else {
      console.log(`Inserting product: ${item.slug} (${item.name})`);
      const { data: inserted, error: insertErr } = await supabase
        .from('products')
        .insert(productRow)
        .select('id')
        .single();

      if (insertErr) {
        console.error(`Failed to insert ${item.slug}:`, insertErr.message);
        continue;
      }
      productId = inserted.id;
    }

    // Now sync features
    console.log(`Syncing ${features.length} features for ${item.slug}...`);
    // Delete existing features for this product
    await supabase.from('product_features').delete().eq('product_id', productId);

    const featureRows = features.map((feat, index) => ({
      product_id: productId,
      feature: feat,
      sort_order: index + 1,
    }));

    const { error: featErr } = await supabase
      .from('product_features')
      .insert(featureRows);

    if (featErr) {
      console.error(`Failed to insert features for ${item.slug}:`, featErr.message);
    } else {
      console.log(`  ✓ ${features.length} features inserted for ${item.slug}`);
    }
  }

  console.log('--- Migration completed successfully! ---');
}

migrate().catch(console.error);
