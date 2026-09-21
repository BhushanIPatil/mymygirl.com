import { getAccessToken } from './googleAuth';
import type { Env, Product } from '../types';

/**
 * Expected sheet columns, in order (row 1 = header, data starts row 2):
 *   A: Product Code   B: Product Name   C: Category   D: Image URL
 *   E: Affiliate Link F: Price          G: Description H: Status
 */
export async function fetchProductsFromSheet(env: Env): Promise<Product[]> {
  const accessToken = await getAccessToken(env);
  const range = encodeURIComponent(env.SHEET_RANGE || 'Products!A2:H');
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${env.GOOGLE_SHEET_ID}/values/${range}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Sheets API error (${res.status}): ${text}`);
  }

  const data = (await res.json()) as { values?: string[][] };
  const rows = data.values || [];

  return rows
    .filter((row) => row.length > 0 && (row[0] || '').trim())
    .map(
      (row): Product => ({
        code: (row[0] || '').trim(),
        name: (row[1] || '').trim(),
        category: (row[2] || '').trim() || 'Uncategorized',
        imageUrl: (row[3] || '').trim(),
        affiliateLink: (row[4] || '').trim(),
        price: (row[5] || '').trim(),
        description: (row[6] || '').trim(),
        status: (row[7] || 'Active').trim(),
      }),
    )
    .filter((p) => p.status.toLowerCase() !== 'inactive' && p.code && p.affiliateLink);
}
