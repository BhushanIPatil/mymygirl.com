import type { Product } from '../types';
import { categoryToSlug } from '../lib/products';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function productCard(p: Product, opts: { highlight?: boolean } = {}): string {
  const highlightClass = opts.highlight ? ' is-matched' : '';
  return `
  <article class="product-card${highlightClass}" id="product-${escapeHtml(p.code)}">
    <a class="thumb" href="/go/${encodeURIComponent(p.code)}" rel="sponsored nofollow noopener" target="_blank" aria-label="View ${escapeHtml(p.name)} on the affiliate store">
      <img src="${escapeHtml(p.imageUrl)}" alt="${escapeHtml(p.name)}" loading="lazy" />
    </a>
    <div class="body">
      <a class="category-tag" href="/category/${categoryToSlug(p.category)}">${escapeHtml(p.category)}</a>
      <h3>${escapeHtml(p.name)}</h3>
      <div class="code">Code: ${escapeHtml(p.code)}</div>
      <a class="btn btn-primary btn-block" href="/go/${encodeURIComponent(p.code)}" rel="sponsored nofollow noopener" target="_blank">Shop now</a>
    </div>
  </article>`;
}

export function productGrid(products: Product[], matchedCode?: string | null): string {
  if (products.length === 0) {
    return `
    <div class="empty-state">
      <h3>No products found</h3>
      <p>Try a different code, or browse everything below.</p>
      <p><a class="btn btn-outline" href="/products">Browse all products</a></p>
    </div>`;
  }
  return `<div class="product-grid">
    ${products
      .map((p) => productCard(p, { highlight: !!matchedCode && p.code.toUpperCase() === matchedCode.toUpperCase() }))
      .join('\n')}
  </div>`;
}
