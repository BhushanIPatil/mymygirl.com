export const globalStyles = /* css */ `
:root {
  --bg: #FFF8F4;
  --bg-soft: #FFEFE7;
  --card: #FFFFFF;
  --pink: #EE93B8;
  --pink-deep: #D6467D;
  --pink-pale: #FBDDE9;
  --chocolate: #472A22;
  --chocolate-soft: #7A5548;
  --caramel: #C6875A;
  --caramel-pale: #F3DCC4;
  --border: #F0DCD2;
  --shadow: 0 10px 30px rgba(71, 42, 34, 0.08);
  --shadow-sm: 0 4px 12px rgba(71, 42, 34, 0.06);
  --radius-lg: 22px;
  --radius-md: 14px;
  --radius-sm: 9px;
  --max-width: 1120px;
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--chocolate);
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img { max-width: 100%; display: block; }

a { color: inherit; text-decoration: none; }

.wrap {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
}

/* ---------- Header ---------- */

.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 40;
}

.site-header .wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 16px;
  gap: 16px;
}

.logo {
  font-weight: 900;
  font-size: 1.5rem;
  color: var(--chocolate);
  display: flex;
  align-items: baseline;
  gap: 2px;
  white-space: nowrap;
}

.logo span { color: var(--pink-deep); }

.main-nav {
  display: flex;
  gap: 28px;
  align-items: center;
}

.main-nav a {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--chocolate-soft);
  padding: 6px 2px;
  border-bottom: 2px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.main-nav a:hover,
.main-nav a[aria-current="page"] {
  color: var(--pink-deep);
  border-bottom-color: var(--pink-deep);
}

.nav-toggle {
  display: none;
}

@media (max-width: 720px) {
  .main-nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--card);
    border-bottom: 1px solid var(--border);
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 12px 20px 20px;
  }
  .main-nav a { padding: 10px 0; width: 100%; }
  #nav-check:checked ~ .main-nav { display: flex; }
  .nav-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    cursor: pointer;
    background: var(--bg-soft);
  }
}

/* ---------- Hero ---------- */

.hero {
  background: linear-gradient(160deg, var(--pink-pale) 0%, var(--bg) 55%);
  border-bottom: 1px solid var(--border);
  padding: 56px 0 48px;
}

.hero .wrap {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;
}

@media (max-width: 860px) {
  .hero .wrap { grid-template-columns: 1fr; }
}

.hero h1 {
  font-size: clamp(2rem, 4vw, 2.9rem);
  line-height: 1.15;
  font-weight: 900;
  margin: 0 0 16px;
  color: var(--chocolate);
}

.hero p.lede {
  font-size: 1.1rem;
  color: var(--chocolate-soft);
  margin: 0 0 28px;
  max-width: 52ch;
}

.code-search {
  display: flex;
  gap: 10px;
  background: var(--card);
  padding: 8px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  max-width: 460px;
}

.code-search input {
  flex: 1;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 10px 14px;
  background: transparent;
  color: var(--chocolate);
  text-transform: uppercase;
}

.code-search input::placeholder {
  color: #C9A79A;
  text-transform: none;
  font-weight: 600;
  letter-spacing: normal;
}

.hero-visual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.hero-visual img {
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.hero-visual > :first-child { grid-row: span 2; aspect-ratio: 1 / 2.05; }

/* ---------- Buttons ---------- */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 22px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.btn-primary {
  background: var(--pink-deep);
  color: #fff;
  box-shadow: 0 6px 16px rgba(214, 70, 125, 0.35);
}

.btn-primary:hover { transform: translateY(-1px); }

.btn-outline {
  background: transparent;
  border: 1.5px solid var(--chocolate);
  color: var(--chocolate);
}

.btn-block { width: 100%; }

/* ---------- Section headings ---------- */

.section {
  padding: 52px 0;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 26px;
  flex-wrap: wrap;
}

.section-heading h2 {
  font-size: 1.7rem;
  font-weight: 900;
  margin: 0;
  color: var(--chocolate);
}

.section-heading p {
  margin: 6px 0 0;
  color: var(--chocolate-soft);
}

.see-all {
  font-weight: 800;
  color: var(--pink-deep);
  white-space: nowrap;
}

/* ---------- Category chips ---------- */

.chip-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.chip {
  padding: 9px 18px;
  border-radius: 999px;
  background: var(--card);
  border: 1.5px solid var(--border);
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--chocolate-soft);
}

.chip:hover { border-color: var(--pink); color: var(--pink-deep); }

.chip.is-active {
  background: var(--chocolate);
  border-color: var(--chocolate);
  color: #fff;
}

/* ---------- Product grid ---------- */

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

@media (max-width: 980px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 720px) { .product-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } }
@media (max-width: 460px) { .product-grid { grid-template-columns: 1fr 1fr; } }

.product-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.15s ease, transform 0.15s ease;
}

.product-card:hover { box-shadow: var(--shadow); transform: translateY(-2px); }

.product-card.is-matched {
  outline: 2.5px solid var(--pink-deep);
  outline-offset: 2px;
}

.product-card .thumb {
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--bg-soft);
}

.product-card .thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card .body {
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.product-card .category-tag {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: var(--pink-deep);
}

.product-card h3 {
  font-size: 1rem;
  font-weight: 800;
  margin: 0;
  color: var(--chocolate);
  line-height: 1.3;
}

.product-card .price {
  font-weight: 900;
  color: var(--chocolate);
}

.product-card .code {
  font-size: 0.78rem;
  color: var(--caramel);
  font-weight: 700;
}

.product-card .btn { margin-top: 8px; }

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--chocolate-soft);
}

.empty-state h3 { color: var(--chocolate); margin-bottom: 8px; }

/* ---------- Pagination ---------- */

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 36px;
  flex-wrap: wrap;
}

.pagination a, .pagination span {
  min-width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--border);
  font-weight: 700;
  color: var(--chocolate-soft);
}

.pagination a:hover { border-color: var(--pink); color: var(--pink-deep); }

.pagination .is-current {
  background: var(--chocolate);
  border-color: var(--chocolate);
  color: #fff;
}

/* ---------- Content blocks (SEO copy, about, disclosure) ---------- */

.prose { max-width: 74ch; }

.prose h1 { font-size: 2.2rem; font-weight: 900; margin: 0 0 18px; }
.prose h2 { font-size: 1.4rem; font-weight: 800; margin: 34px 0 12px; color: var(--chocolate); }
.prose p { color: var(--chocolate-soft); margin: 0 0 14px; }
.prose ul { color: var(--chocolate-soft); padding-left: 20px; }
.prose li { margin-bottom: 6px; }

.page-header {
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border);
  padding: 44px 0;
}

.page-header h1 {
  font-size: clamp(1.8rem, 3.4vw, 2.4rem);
  font-weight: 900;
  margin: 0 0 8px;
}

.page-header p {
  color: var(--chocolate-soft);
  margin: 0;
  max-width: 60ch;
}

/* ---------- FAQ ---------- */

.faq-list { display: flex; flex-direction: column; gap: 12px; }

.faq-item {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 4px 20px;
}

.faq-item summary {
  cursor: pointer;
  font-weight: 800;
  padding: 16px 0;
  color: var(--chocolate);
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.faq-item summary::-webkit-details-marker { display: none; }

.faq-item summary::after {
  content: '+';
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--pink-deep);
  flex-shrink: 0;
}

.faq-item[open] summary::after { content: '–'; }

.faq-item p {
  margin: 0 0 16px;
  color: var(--chocolate-soft);
}

/* ---------- Contact form ---------- */

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 480px;
}

.contact-form label {
  font-weight: 800;
  font-size: 0.9rem;
  color: var(--chocolate);
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  font-family: inherit;
  font-size: 1rem;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--border);
  outline: none;
  background: var(--card);
  color: var(--chocolate);
}

.contact-form input:focus,
.contact-form textarea:focus { border-color: var(--pink); }

/* ---------- Footer ---------- */

.site-footer {
  background: var(--chocolate);
  color: #F3E5DE;
  margin-top: 60px;
}

.site-footer .wrap {
  padding: 44px 20px 28px;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 32px;
}

@media (max-width: 720px) {
  .site-footer .wrap { grid-template-columns: 1fr; }
}

.site-footer h4 {
  font-size: 0.85rem;
  letter-spacing: 0.03em;
  color: #F0B9CF;
  margin: 0 0 14px;
}

.site-footer a, .site-footer p { color: #E6D2C8; font-size: 0.92rem; }

.site-footer ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }

.site-footer a:hover { color: #fff; }

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.12);
  padding: 18px 20px;
  text-align: center;
  font-size: 0.82rem;
  color: #C9A79A;
}

/* ---------- Focus visibility ---------- */

a:focus-visible, button:focus-visible, input:focus-visible, summary:focus-visible {
  outline: 2.5px solid var(--pink-deep);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
`;
