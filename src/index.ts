import logo from '../mymygirl_logo.png';
import favicon from '../mymygirl_fav.png';
import { normalizeDate } from './lib/products';
import { Hono } from 'hono';
import type { Env } from './types';
import { layout } from './views/layout';
import { homeView } from './views/home';
import { productsView } from './views/products';
import { faqView, faqStructuredData } from './views/faq';
import { aboutView } from './views/about';
import { contactView } from './views/contact';
import { disclosureView } from './views/disclosure';
import { notFoundView } from './views/notFound';
import {
  getProducts,
  getCategories,
  categoryToSlug,
  findCategoryBySlug,
  findByCode,
  filterProducts,
  paginate,
} from './lib/products';
import { fetchProductsFromSheet } from './lib/sheets';
import { setCachedProducts, getLastSyncedAt } from './lib/cache';

const app = new Hono<{ Bindings: Env }>();
const PAGE_SIZE = 12;
app.get('/mymygirl_logo.png', (c) => c.body(logo, 200, { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' }));
app.get('/mymygirl_fav.png', (c) => c.body(favicon, 200, { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' }));

// ---------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------
app.get('/', async (c) => {
  const { products } = await getProducts(c.env);
  const categories = getCategories(products);
  const body = homeView({ products, categories, siteName: c.env.SITE_NAME });
  return c.html(
    layout({
      env: c.env,
      title: `${c.env.SITE_NAME} — Pretty finds, one code away`,
      description: `Shop handbags, perfume, makeup and jewellery featured on ${c.env.SITE_NAME}'s Instagram, Facebook and YouTube. Search by product code or browse by category.`,
      path: '/',
      bodyHtml: body,
    }),
  );
});

// ---------------------------------------------------------------------
// All products (supports ?code= and ?category= and ?page=)
// ---------------------------------------------------------------------
app.get('/products', async (c) => {
  const { products } = await getProducts(c.env);
  const categories = getCategories(products);

  const codeQuery = c.req.query('code')?.trim() || null;
  const categoryQuery = c.req.query('category')?.trim() || null;
  const sortQuery = c.req.query('sort') || 'newest';
  const sort = ['newest', 'oldest', 'name-asc', 'name-desc'].includes(sortQuery) ? sortQuery : 'newest';
  const fresh = c.req.query('fresh') === '1';
  const from = normalizeDate(c.req.query('from'));
  const to = normalizeDate(c.req.query('to'));
  const pageParam = parseInt(c.req.query('page') || '1', 10) || 1;

  const filtered = filterProducts(products, { category: categoryQuery, code: codeQuery, fresh, from, to, sort });
  const { items, page, totalPages, totalItems } = paginate(filtered, pageParam, PAGE_SIZE);

  const exactMatch = codeQuery ? findByCode(products, codeQuery) : null;

  const body = productsView({
    pageItems: items,
    fresh, from, to, sort, totalItems, pageSize: PAGE_SIZE,
    categoryCounts: Object.fromEntries(categories.map(category => [category, filterProducts(products, { category, code: codeQuery, fresh, from, to }).length])),
    categories,
    activeCategory: categoryQuery,
    codeQuery,
    matchedCode: exactMatch?.code || null,
    page,
    totalPages,
    basePath: '/products',
  });

  return c.html(
    layout({
      env: c.env,
      title: codeQuery
        ? `Search "${codeQuery}" — ${c.env.SITE_NAME}`
        : `Shop all products — ${c.env.SITE_NAME}`,
      description: `Browse every product listed on ${c.env.SITE_NAME}, or search by the code from our Instagram, Facebook or YouTube posts.`,
      path: '/products',
      bodyHtml: body,
    }),
  );
});

// ---------------------------------------------------------------------
// Category pages — /category/handbags
// ---------------------------------------------------------------------
app.get('/category/:slug', async (c) => {
  const slug = c.req.param('slug');
  const { products } = await getProducts(c.env);
  const categories = getCategories(products);
  const categoryName = findCategoryBySlug(products, slug);

  if (!categoryName) {
    c.status(404);
    return c.html(
      layout({
        env: c.env,
        title: `Category not found — ${c.env.SITE_NAME}`,
        description: 'That category does not exist.',
        path: `/category/${slug}`,
        bodyHtml: notFoundView(),
      }),
    );
  }

  const sortQuery = c.req.query('sort') || 'newest';
  const sort = ['newest', 'oldest', 'name-asc', 'name-desc'].includes(sortQuery) ? sortQuery : 'newest';
  const fresh = c.req.query('fresh') === '1';
  const from = normalizeDate(c.req.query('from'));
  const to = normalizeDate(c.req.query('to'));
  const pageParam = parseInt(c.req.query('page') || '1', 10) || 1;
  const codeQuery = c.req.query('code')?.trim() || null;
  const filtered = filterProducts(products, { category: categoryName, code: codeQuery, fresh, from, to, sort });
  const { items, page, totalPages, totalItems } = paginate(filtered, pageParam, PAGE_SIZE);

  const body = productsView({
    pageItems: items,
    fresh, from, to, sort, totalItems, pageSize: PAGE_SIZE,
    categoryCounts: Object.fromEntries(categories.map(category => [category, filterProducts(products, { category, code: codeQuery, fresh, from, to }).length])),
    categories,
    activeCategory: categoryName,
    codeQuery,
    matchedCode: codeQuery,
    page,
    totalPages,
    basePath: `/category/${slug}`,
  });

  return c.html(
    layout({
      env: c.env,
      title: `${categoryName} — ${c.env.SITE_NAME}`,
      description: `Shop our full ${categoryName.toLowerCase()} collection, featured on Instagram, Facebook and YouTube. Search by code or browse the full range.`,
      path: `/category/${slug}`,
      bodyHtml: body,
    }),
  );
});

// ---------------------------------------------------------------------
// /go/:code — the link you put in an Instagram bio / caption.
// Redirects straight to the affiliate URL. Not indexed (see robots.txt).
// ---------------------------------------------------------------------
app.get('/go/:code', async (c) => {
  const code = c.req.param('code');
  const { products } = await getProducts(c.env);
  const match = findByCode(products, code);

  if (!match) {
    c.status(404);
    return c.html(
      layout({
        env: c.env,
        title: `Code not found — ${c.env.SITE_NAME}`,
        description: 'That product code does not match anything we currently list.',
        path: `/go/${code}`,
        bodyHtml: notFoundView(),
      }),
    );
  }

  return c.redirect(match.affiliateLink, 302);
});

// ---------------------------------------------------------------------
// FAQ / About / Contact / Disclosure
// ---------------------------------------------------------------------
app.get('/faq', (c) =>
  c.html(
    layout({
      env: c.env,
      title: `FAQ — ${c.env.SITE_NAME}`,
      description: `Answers about product codes, affiliate links and how ${c.env.SITE_NAME} works.`,
      path: '/faq',
      bodyHtml: faqView(),
      structuredDataJson: faqStructuredData(),
    }),
  ),
);

app.get('/about', (c) =>
  c.html(
    layout({
      env: c.env,
      title: `About — ${c.env.SITE_NAME}`,
      description: `The story behind ${c.env.SITE_NAME} and how we choose what to feature.`,
      path: '/about',
      bodyHtml: aboutView(c.env.SITE_NAME),
    }),
  ),
);

app.get('/contact', (c) =>
  c.html(
    layout({
      env: c.env,
      title: `Contact — ${c.env.SITE_NAME}`,
      description: `Get in touch with ${c.env.SITE_NAME} about a product, a link, or a request.`,
      path: '/contact',
      bodyHtml: contactView(c.env.CONTACT_FORM_URL),
    }),
  ),
);

app.get('/disclosure', (c) =>
  c.html(
    layout({
      env: c.env,
      title: `Affiliate Disclosure — ${c.env.SITE_NAME}`,
      description: `How ${c.env.SITE_NAME} earns commission through affiliate links, in plain terms.`,
      path: '/disclosure',
      bodyHtml: disclosureView(c.env.SITE_NAME),
    }),
  ),
);

// ---------------------------------------------------------------------
// SEO plumbing
// ---------------------------------------------------------------------
app.get('/robots.txt', (c) => {
  const siteUrl = c.env.SITE_URL.replace(/\/$/, '');
  return c.text(
    `User-agent: *\nAllow: /\nDisallow: /go/\nDisallow: /api/\nSitemap: ${siteUrl}/sitemap.xml\n`,
  );
});

app.get('/sitemap.xml', async (c) => {
  const siteUrl = c.env.SITE_URL.replace(/\/$/, '');
  const { products } = await getProducts(c.env);
  const categories = getCategories(products);

  const staticPaths = ['/', '/products', '/faq', '/about', '/contact', '/disclosure'];
  const categoryPaths = categories.map((cat) => `/category/${categoryToSlug(cat)}`);
  const urls = [...staticPaths, ...categoryPaths];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${siteUrl}${u}</loc></url>`).join('\n')}
</urlset>`;

  return c.body(xml, 200, { 'Content-Type': 'application/xml' });
});

// ---------------------------------------------------------------------
// Manual resync — pulls fresh data from Google Sheets into KV.
// Protected by RESYNC_SECRET. Call after you edit the sheet:
//   GET /api/resync?key=YOUR_SECRET
// ---------------------------------------------------------------------
app.get('/api/resync', async (c) => {
  const key = c.req.query('key') || c.req.header('x-resync-key');
  if (!c.env.RESYNC_SECRET || key !== c.env.RESYNC_SECRET) {
    return c.json({ ok: false, error: 'Unauthorized' }, 401);
  }

  try {
    const products = await fetchProductsFromSheet(c.env);
    await setCachedProducts(c.env, products);
    return c.json({ ok: true, count: products.length, syncedAt: new Date().toISOString() });
  } catch (err) {
    return c.json({ ok: false, error: err instanceof Error ? err.message : String(err) }, 500);
  }
});

app.get('/api/status', async (c) => {
  const lastSyncedAt = await getLastSyncedAt(c.env);
  const { products, isDemoData } = await getProducts(c.env);
  return c.json({
    ok: true,
    isDemoData,
    productCount: products.length,
    lastSyncedAt,
  });
});

// ---------------------------------------------------------------------
// 404
// ---------------------------------------------------------------------
app.notFound((c) => {
  c.status(404);
  return c.html(
    layout({
      env: c.env,
      title: `Page not found — ${c.env.SITE_NAME}`,
      description: 'The page you were looking for does not exist.',
      path: c.req.path,
      bodyHtml: notFoundView(),
    }),
  );
});

export default app;
