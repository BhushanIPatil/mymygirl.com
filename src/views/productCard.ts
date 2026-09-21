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
  const nameCharacters = Array.from(p.name);
  return `
  <article class="product-card${highlightClass}" id="product-${escapeHtml(p.code)}">
    <a class="thumb" href="/go/${encodeURIComponent(p.code)}" rel="sponsored nofollow noopener" target="_blank" aria-label="View ${escapeHtml(p.name)} on the affiliate store">
      <img src="${escapeHtml(p.imageUrl)}" alt="${escapeHtml(p.name)}" loading="lazy" />
    </a>
    <div class="body">
      <a class="category-tag" href="/category/${categoryToSlug(p.category)}">${escapeHtml(p.category)}</a>
      <div class="code">Code: ${escapeHtml(p.code)}</div>
      ${nameCharacters.length > 30 ? `<details class="product-name">
        <summary><h3><span class="name-short">${escapeHtml(nameCharacters.slice(0, 30).join(''))}&hellip;</span><span class="name-full">${escapeHtml(p.name)}</span><span class="text-toggle"><span class="when-closed">See more</span><span class="when-open"> See less</span></span></h3></summary>
      </details>` : `<h3>${escapeHtml(p.name)}</h3>`}
      ${p.description?.trim() ? `<details class="product-description">
        <summary class="text-toggle"><span class="when-closed">Show description</span><span class="when-open">Hide description</span></summary>
        <p>${escapeHtml(p.description)}</p>
      </details>` : ''}
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
