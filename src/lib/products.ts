import type { Env, Product } from '../types';
import { getCachedProducts, setCachedProducts } from './cache';
import { fetchProductsFromSheet } from './sheets';
import { demoProducts } from './demoData';

export interface ProductSource {
  products: Product[];
  isDemoData: boolean;
}

let localSync: Promise<ProductSource> | null = null;

/**
 * Reads cached products. Production syncs through /api/resync; local
 * development can opt into loading an empty cache through .dev.vars.
 */
export async function getProducts(env: Env): Promise<ProductSource> {
  const cached = await getCachedProducts(env);
  if (cached && (cached.length > 0 || env.LOCAL_SYNC_ON_EMPTY === 'true')) {
    return { products: cached, isDemoData: false };
  }
  if (env.LOCAL_SYNC_ON_EMPTY === 'true') {
    // Share an in-flight request when several local pages load together.
    if (!localSync) {
      localSync = (async () => {
        const products = await fetchProductsFromSheet(env);
        await setCachedProducts(env, products);
        return { products, isDemoData: false };
      })().finally(() => { localSync = null; });
    }
    return localSync;
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
  opts: { category?: string | null; code?: string | null; fresh?: boolean; from?: string | null; to?: string | null; sort?: string | null },
): Product[] {
  let result = products;
  if (opts.category) {
    result = result.filter((p) => categoryToSlug(p.category) === categoryToSlug(opts.category!));
  }
  if (opts.code) {
    const normalized = opts.code.trim().toUpperCase();
    result = result.filter((p) => p.code.toUpperCase().includes(normalized));
  }
  const today = new Date().toISOString().slice(0, 10);
  const freshFrom = new Date(Date.parse(today) - 6 * 86400000).toISOString().slice(0, 10);
  const from = normalizeDate(opts.from);
  const to = normalizeDate(opts.to);
  if (opts.fresh || from || to) {
    result = result.filter((p) => {
      const date = normalizeDate(p.date);
      return !!date && (!opts.fresh || (date >= freshFrom && date <= today)) && (!from || date >= from) && (!to || date <= to);
    });
  }
  return [...result].sort((a, b) => {
    if (opts.sort === 'name-asc') return a.name.localeCompare(b.name);
    if (opts.sort === 'name-desc') return b.name.localeCompare(a.name);
    const aDate = normalizeDate(a.date);
    const bDate = normalizeDate(b.date);
    if (!aDate) return bDate ? 1 : 0;
    if (!bDate) return -1;
    return opts.sort === 'oldest' ? aDate.localeCompare(bDate) : bDate.localeCompare(aDate);
  });
}

export function normalizeDate(value?: string | null): string | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value ? value : null;
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
