import { getAccessToken } from './googleAuth';
import type { Env, Product } from '../types';

/** The selected range must include the header row; columns can be reordered. */
export async function fetchProductsFromSheet(env: Env): Promise<Product[]> {
  const accessToken = await getAccessToken(env);
  const range = encodeURIComponent(env.SHEET_RANGE || 'Products!A1:J');
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${env.GOOGLE_SHEET_ID}/values/${range}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Sheets API error (${res.status}): ${text}`);
  }

  const data = (await res.json()) as { values?: string[][] };
  return parseProductRows(data.values || []);
}

/** Accept snake_case headers and legacy labels such as "Product Code". */
export function parseProductRows(values: string[][]): Product[] {
  const [headers = [], ...rows] = values;
  const columns = new Map<string, number>();
  headers.forEach((header, index) => {
    const name = header.trim().toLowerCase().replace(/\s+/g, '_');
    if (!name) return;
    if (columns.has(name)) throw new Error(`Duplicate sheet header: ${name}`);
    columns.set(name, index);
  });
  const required = ['product_code', 'product_name', 'category', 'image_url', 'affiliate_link'];
  const missing = required.filter((name) => !columns.has(name));
  if (missing.length) {
    throw new Error(
      `Missing sheet headers: ${missing.join(', ')}. Include the header row in SHEET_RANGE (for example Products!A1:J).`,
    );
  }
  const cell = (row: string[], name: string): string => {
    const index = columns.get(name);
    return index === undefined ? '' : (row[index] || '').trim();
  };

  return rows
    .map(
      (row): Product => ({
        code: cell(row, 'product_code'),
        name: cell(row, 'product_name'),
        category: cell(row, 'category') || 'Uncategorized',
        imageUrl: cell(row, 'image_url'),
        affiliateLink: cell(row, 'affiliate_link'),
        price: cell(row, 'price'),
        description: cell(row, 'description'),
        status: cell(row, 'status') || 'Active',
        type: cell(row, 'type').toLowerCase(),
        date: cell(row, 'date'),
      }),
    )
    .filter((p) => p.status.toLowerCase() !== 'inactive' && p.code && p.affiliateLink);
}
