import type { Env, Product } from '../types';
import { getCachedProducts } from './cache';
import { demoProducts } from './demoData';

export interface ProductSource {
  products: Product[];
  isDemoData: boolean;
}

/**
 * Reads products for a normal page render. Never calls the Google Sheets
 * API directly — that only happens via /api/resync. Falls back to demo
 * products so the site is never empty before the first sync.
 */
export async function getProducts(env: Env): Promise<ProductSource> {
  const cached = await getCachedProducts(env);
  if (cached && cached.length > 0) {
    return { products: cached, isDemoData: false };
  }
  return { products: demoProducts, isDemoData: true };
}

export function getCategories(products: Product[]): string[] {
  const set = new Set(products.map((p) => p.category).filter(Boolean));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function findCategoryBySlug(products: Product[], slug: string): string | null {
  const categories = getCategories(products);
  return categories.find((c) => categoryToSlug(c) === slug) || null;
}

export function findByCode(products: Product[], code: string): Product | null {
  const normalized = code.trim().toUpperCase();
  return products.find((p) => p.code.toUpperCase() === normalized) || null;
}

export function filterProducts(
  products: Product[],
  opts: { category?: string | null; code?: string | null },
): Product[] {
  let result = products;
  if (opts.category) {
    result = result.filter((p) => categoryToSlug(p.category) === categoryToSlug(opts.category!));
  }
  if (opts.code) {
    const normalized = opts.code.trim().toUpperCase();
    result = result.filter((p) => p.code.toUpperCase().includes(normalized));
  }
  return result;
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    totalItems: items.length,
  };
}
