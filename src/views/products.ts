import type { Product } from '../types';
import { categoryToSlug } from '../lib/products';
import { productGrid } from './productCard';

export function productsView(opts: {
  pageItems: Product[];
  categories: string[];
  activeCategory?: string | null;
  codeQuery?: string | null;
  matchedCode?: string | null;
  page: number;
  totalPages: number;
  basePath: string;
}): string {
  const { pageItems, categories, activeCategory, codeQuery, matchedCode, page, totalPages, basePath } = opts;

  const pageLink = (p: number) => {
    const params = new URLSearchParams();
    if (activeCategory) params.set('category', activeCategory);
    if (codeQuery) params.set('code', codeQuery);
    if (p > 1) params.set('page', String(p));
    const qs = params.toString();
    return `${basePath}${qs ? `?${qs}` : ''}`;
  };

  const pagination =
    totalPages > 1
      ? `<nav class="pagination" aria-label="Pagination">
      ${Array.from({ length: totalPages }, (_, i) => i + 1)
        .map((p) =>
          p === page
            ? `<span class="is-current">${p}</span>`
            : `<a href="${pageLink(p)}">${p}</a>`,
        )
        .join('\n')}
    </nav>`
      : '';

  return `
  <div class="page-header">
    <div class="wrap">
      <h1>${activeCategory ? activeCategory : 'All products'}</h1>
      <p>${codeQuery ? `Showing results for code "${codeQuery}".` : "Browse everything we've listed, or filter by category."}</p>
      <form class="code-search" action="${basePath}" method="get" style="margin-top:18px;">
        ${activeCategory ? `<input type="hidden" name="category" value="${activeCategory}" />` : ''}
        <input type="text" name="code" value="${codeQuery ?? ''}" placeholder="Search by code" aria-label="Product code" />
        <button class="btn btn-primary" type="submit">Search</button>
      </form>
    </div>
  </div>

  <section class="section wrap">
    <div class="chip-row" style="margin-bottom:30px;">
      <a class="chip${!activeCategory ? ' is-active' : ''}" href="/products">All</a>
      ${categories
        .map(
          (c) =>
            `<a class="chip${activeCategory === c ? ' is-active' : ''}" href="/category/${categoryToSlug(c)}">${c}</a>`,
        )
        .join('\n')}
    </div>

    ${productGrid(pageItems, matchedCode)}
    ${pagination}
  </section>
  `;
}
