import type { Env, Product } from '../types';

const PRODUCTS_KEY = 'products:v1';
const LAST_SYNC_KEY = 'products:lastSyncedAt';

export async function getCachedProducts(env: Env): Promise<Product[] | null> {
  const raw = await env.PRODUCTS_KV.get(PRODUCTS_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Product[]) : null;
  } catch {
    return null;
  }
}

export async function setCachedProducts(env: Env, products: Product[]): Promise<void> {
  await env.PRODUCTS_KV.put(PRODUCTS_KEY, JSON.stringify(products));
  await env.PRODUCTS_KV.put(LAST_SYNC_KEY, new Date().toISOString());
}

export async function getLastSyncedAt(env: Env): Promise<string | null> {
  return env.PRODUCTS_KV.get(LAST_SYNC_KEY);
}
