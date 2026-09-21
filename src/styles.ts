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

.logo img { width: 160px; height: 64px; object-fit: contain; }
.footer-logo { width: fit-content; padding: 8px; border-radius: var(--radius-sm); background: var(--bg); margin-bottom: 14px; }
.brand-text { color: var(--chocolate); white-space: nowrap; }
.brand-text > span { color: var(--pink); }
.footer-bottom .brand-text { background: var(--bg); border-radius: 3px; padding: 0 3px; }

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

.hero-carousel { min-width: 0; max-width: 400px; width: 100%; justify-self: center; }
.carousel-track { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; border-radius: var(--radius-md); }
.carousel-track::-webkit-scrollbar { display: none; }
.carousel-slide { flex: 0 0 100%; min-width: 0; scroll-snap-align: start; }
.carousel-slide a { display: block; }
.carousel-slide img { width: 100%; aspect-ratio: 1 / 1; object-fit: contain; }
.carousel-dots { display: flex; align-items: center; justify-content: center; margin-top: 10px; }
.carousel-dot { display: grid; place-items: center; width: 24px; height: 28px; padding: 0; border: 0; background: transparent; cursor: pointer; }
.carousel-dot::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--chocolate); opacity: 0.3; transition: transform 0.2s ease, opacity 0.2s ease; }
.carousel-dot[aria-current="true"]::before { background: var(--pink-deep); opacity: 1; }
.carousel-dot.is-small::before { transform: scale(0.8); opacity: 0.22; }
.carousel-dot.is-faded::before { transform: scale(0.55); opacity: 0.14; }
.carousel-dots[hidden], .carousel-dot[hidden] { display: none; }

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
  padding-block: 52px;
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

.home-categories { padding-bottom: 16px; }
.home-categories .section-heading { margin-bottom: 16px; }
.home-fresh { padding-top: 16px; }
.products-header { display: flex; align-items: center; justify-content: space-between; gap: 28px; }
.products-header > div { flex: 1; }
.products-header .code-search { width: 42%; flex-shrink: 0; }
.code-search input { min-width: 0; }
@media (max-width: 720px) {
  .products-header { flex-direction: column; align-items: stretch; }
  .products-header .code-search { width: 100%; max-width: none; }
}
/* ---------- Catalog filters ---------- */
.catalog-layout { display: grid; grid-template-columns: 240px minmax(0, 1fr); gap: 28px; align-items: start; padding: 32px 20px; }
.filter-sidebar { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; }
.filter-panel > summary { padding: 18px; font-weight: 900; cursor: pointer; }
.filter-summary-count { margin-left: 8px; font-size: 0.75rem; font-weight: 600; color: var(--chocolate-soft); }
.filter-content { padding: 0 18px 20px; }
.filter-reset { border-top: 1px solid var(--border); padding-top: 12px; font-size: 0.82rem; }
.filter-group { margin: 20px 0; padding: 0 0 18px; border: 0; border-bottom: 1px solid var(--border); min-width: 0; }
.filter-group legend { padding: 0; margin-bottom: 12px; font-size: 0.88rem; font-weight: 900; }
.filter-option { display: flex; align-items: center; gap: 9px; padding: 6px 0; cursor: pointer; font-size: 0.88rem; }
.filter-option input { margin: 0; accent-color: var(--pink-deep); width: 16px; height: 16px; flex-shrink: 0; }
.filter-count { margin-left: auto; color: var(--chocolate-soft); font-size: 0.78rem; }
.filter-hint { margin: 0 0 0 25px; color: var(--chocolate-soft); font-size: 0.76rem; }
.filter-date { display: flex; flex-direction: column; gap: 5px; margin-top: 10px; font-size: 0.82rem; color: var(--chocolate-soft); }
.filter-date input, .sort-control select { font: inherit; color: var(--chocolate); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 9px; background: var(--card); min-width: 0; max-width: 100%; }
.catalog-results { min-width: 0; }
.results-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-bottom: 18px; border-bottom: 1px solid var(--border); margin-bottom: 20px; }
.results-toolbar p { margin: 0; font-size: 0.88rem; color: var(--chocolate-soft); }
.sort-control { display: flex; align-items: center; gap: 8px; font-size: 0.82rem; }
.sort-control label { font-weight: 800; white-space: nowrap; }
.sort-submit { padding: 8px 14px; }
.sort-submit[hidden] { display: none; }
.applied-filters { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 22px; font-size: 0.78rem; }
.applied-filter { display: inline-flex; gap: 10px; align-items: center; background: var(--pink-pale); color: var(--chocolate); border-radius: 999px; padding: 6px 12px; }
.applied-filter:hover { background: var(--bg-soft); }
.applied-filter span { font-size: 1rem; }
.filter-error { color: var(--pink-deep); }
.catalog-results .product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.sort-control select:focus-visible { outline: 2.5px solid var(--pink-deep); outline-offset: 2px; }
@media (max-width: 980px) {
  .catalog-layout { grid-template-columns: 210px minmax(0, 1fr); gap: 20px; }
  .catalog-results .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 720px) {
  .catalog-layout { grid-template-columns: 1fr; gap: 20px; padding-top: 22px; }
  .filter-panel > summary { padding: 14px 18px; }
  .catalog-results .product-grid { gap: 14px; }
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

@media (max-width: 980px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 720px) { .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; } }
@media (max-width: 460px) {
  .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .product-grid .product-card .body { padding: 12px; }
  .product-grid .product-card .btn { padding-inline: 10px; }
  .product-grid .product-card h3 { overflow-wrap: anywhere; }
}

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

.contact-header { text-align: center; }

.contact-form-frame { display: block; width: 100%; height: 1100px; border: 0; }
.contact-form-help { text-align: center; font-size: 0.9rem; color: var(--chocolate-soft); }
.contact-form-help a { color: var(--chocolate); text-decoration: underline; }

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  max-width: 760px;
  margin-inline: auto;
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
