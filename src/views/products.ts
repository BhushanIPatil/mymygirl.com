import type { Product } from '../types';
import { categoryToSlug } from '../lib/products';
import { escapeHtml } from '../lib/html';
import { productGrid } from './productCard';
import { handbagGuide, isHandbagCategory } from './handbags';

export function productsView(opts: {
  pageItems: Product[]; categories: string[]; activeCategory?: string | null;
  codeQuery?: string | null; matchedCode?: string | null;
  fresh?: boolean; from?: string | null; to?: string | null; sort: string;
  page: number; totalPages: number; totalItems: number; pageSize: number;
  categoryCounts: Record<string, number>; basePath: string;
}): string {
  const { pageItems, categories, activeCategory, codeQuery, matchedCode, fresh, from, to, sort, page, totalPages, totalItems, pageSize, categoryCounts } = opts;
  const selectedCategory = categories.find(c => categoryToSlug(c) === categoryToSlug(activeCategory || '')) || activeCategory;
  const params = new URLSearchParams();
  if (selectedCategory) params.set('category', selectedCategory);
  if (codeQuery) params.set('code', codeQuery);
  if (fresh) params.set('fresh', '1');
  if (from) params.set('from', from);
  if (to) params.set('to', to);
  if (sort !== 'newest') params.set('sort', sort);
  const link = (remove?: string, pageNumber = 1) => {
    const next = new URLSearchParams(params);
    if (remove) next.delete(remove);
    if (pageNumber > 1) next.set('page', String(pageNumber));
    const qs = next.toString();
    return escapeHtml('/products' + (qs ? '?' + qs : ''));
  };
  const applied = [
    selectedCategory ? ['category', selectedCategory] : null,
    codeQuery ? ['code', 'Code: ' + codeQuery] : null,
    fresh ? ['fresh', 'Last 7 days'] : null,
    from ? ['from', 'From: ' + from] : null,
    to ? ['to', 'To: ' + to] : null,
  ].filter((item): item is string[] => item !== null);
  const categoryOption = (value: string, label: string, count: number, checked: boolean) => `<label class="filter-option"><input form="product-filters" type="radio" name="category" value="${escapeHtml(value)}"${checked ? ' checked' : ''} /><span>${escapeHtml(label)}</span><span class="filter-count">${count}</span></label>`;
  return `
  <div class="page-header">
    <div class="wrap products-header">
      <div>
        <h1>${escapeHtml(isHandbagCategory(selectedCategory) ? 'Handbags for women' : selectedCategory || 'All products')}</h1>
        <p>${isHandbagCategory(selectedCategory) ? 'Explore curated ladies handbags. Compare styles and check materials, dimensions and availability at the retailer.' : "Browse everything we've listed, or filter by category."}</p>
      </div>
      <form id="product-filters" class="code-search" action="/products" method="get">
        <input type="text" name="code" value="${escapeHtml(codeQuery || '')}" placeholder="Search by code" aria-label="Product code" />
        <button class="btn btn-primary" type="submit">Search</button>
      </form>
    </div>
  </div>
  <section class="section wrap catalog-layout">
    <aside id="catalog-filters" class="filter-sidebar" aria-label="Product filters">
      <details class="filter-panel" open>
        <summary>Filters <span class="filter-summary-count">${applied.length ? applied.length + ' applied' : 'Refine results'}</span></summary>
        <div class="filter-content">
          <div class="filter-reset"><a class="see-all" href="/products">Clear all</a></div>
          <fieldset class="filter-group">
            <legend>Category</legend>
            ${categoryOption('', 'All categories', Object.values(categoryCounts).reduce((sum, n) => sum + n, 0), !selectedCategory)}
            ${categories.map(c => categoryOption(c, c, categoryCounts[c] || 0, selectedCategory === c)).join('')}
          </fieldset>
          <fieldset class="filter-group">
            <legend>New arrivals</legend>
            <label class="filter-option"><input form="product-filters" type="checkbox" name="fresh" value="1"${fresh ? ' checked' : ''} /><span>Fresh picks</span></label>
            <p class="filter-hint">Added in the last 7 days</p>
          </fieldset>
          <fieldset class="filter-group">
            <legend>Date added</legend>
            <label class="filter-date">From <input form="product-filters" type="date" name="from" value="${escapeHtml(from || '')}" /></label>
            <label class="filter-date">To <input form="product-filters" type="date" name="to" value="${escapeHtml(to || '')}" /></label>
          </fieldset>
          <button form="product-filters" class="btn btn-primary btn-block" type="submit">Apply filters</button>
        </div>
      </details>
    </aside>
    <div class="catalog-results">
      <div class="results-toolbar">
        <p role="status">${totalItems ? `Showing <strong>${(page - 1) * pageSize + 1}–${(page - 1) * pageSize + pageItems.length}</strong> of <strong>${totalItems}</strong> products` : 'No products match your filters'}</p>
        <div class="sort-control"><label for="product-sort">Sort by</label><select id="product-sort" name="sort" form="product-filters">
          ${[['newest', 'Newest first'], ['oldest', 'Oldest first'], ['name-asc', 'Name: A–Z'], ['name-desc', 'Name: Z–A']].map(([value, label]) => `<option value="${value}"${sort === value ? ' selected' : ''}>${label}</option>`).join('')}
        </select><button class="filter-toggle" type="button" aria-label="Toggle product filters" aria-controls="catalog-filters" aria-expanded="false" hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="var(--card)"/><circle cx="15" cy="17" r="3" fill="var(--card)"/></svg></button><button class="btn btn-outline sort-submit" form="product-filters" type="submit">Sort</button></div>
      </div>
      ${applied.length ? `<div class="applied-filters" aria-label="Applied filters">${applied.map(([key, label]) => `<a class="applied-filter" href="${link(key)}" aria-label="Remove ${escapeHtml(label)}">${escapeHtml(label)} <span aria-hidden="true">&times;</span></a>`).join('')}<a class="see-all" href="/products">Clear all</a></div>` : ''}
      ${from && to && from > to ? '<p class="filter-error" role="alert">Choose a To date on or after the From date.</p>' : ''}
      ${pageItems.length ? productGrid(pageItems, matchedCode) : '<div class="empty-state"><h3>No products found</h3><p>Try another category, code, or date range.</p><a class="btn btn-outline" href="/products">Clear all filters</a></div>'}
      ${totalPages > 1 ? '<nav class="pagination" aria-label="Pagination">' + Array.from({ length: totalPages }, (_, i) => i + 1).map(p => p === page ? '<span class="is-current" aria-current="page">' + p + '</span>' : '<a href="' + link(undefined, p) + '">' + p + '</a>').join('') + '</nav>' : ''}
    </div>
  </section>
  ${isHandbagCategory(selectedCategory) ? handbagGuide() : ''}
  <script>
    (() => {
      const form = document.getElementById('product-filters');
      const panel = document.querySelector('.filter-panel');
      const sidebar = document.querySelector('.filter-sidebar');
      const toggle = document.querySelector('.filter-toggle');
      const catalog = document.querySelector('.catalog-layout');
      const toolbar = document.querySelector('.results-toolbar');
      const mobile = matchMedia('(max-width: 720px)');
      const adapt = () => {
        panel.open = !mobile.matches;
        sidebar.hidden = mobile.matches;
        sidebar.classList.toggle('is-collapsible', mobile.matches);
        toggle.hidden = !mobile.matches;
        toggle.setAttribute('aria-expanded', 'false');
        if (mobile.matches) toolbar.after(sidebar);
        else catalog.prepend(sidebar);
      };
      toggle.addEventListener('click', () => {
        sidebar.hidden = !sidebar.hidden;
        panel.open = !sidebar.hidden;
        toggle.setAttribute('aria-expanded', String(!sidebar.hidden));
      });
      adapt();
      mobile.addEventListener('change', adapt);
      document.getElementById('product-sort').addEventListener('change', () => form.requestSubmit());
      document.querySelector('.sort-submit').hidden = true;
      const from = document.querySelector('input[name="from"]');
      const to = document.querySelector('input[name="to"]');
      const validate = () => to.setCustomValidity(from.value && to.value && from.value > to.value ? 'Choose a To date on or after the From date.' : '');
      from.addEventListener('input', validate);
      to.addEventListener('input', validate);
      validate();
    })();
  </script>`;
}
