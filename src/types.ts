export interface Product {
  code: string;
  name: string;
  category: string;
  imageUrl: string;
  affiliateLink: string;
  price?: string;
  description?: string;
  status: string;
}

export interface Env {
  // KV binding
  PRODUCTS_KV: KVNamespace;

  // Plain vars (wrangler.toml [vars])
  SITE_NAME: string;
  SITE_URL: string;
  SITE_TAGLINE: string;
  GOOGLE_SHEET_ID: string;
  SHEET_RANGE: string;

  // Secrets (wrangler secret put / .dev.vars)
  GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
  GOOGLE_PRIVATE_KEY: string;
  RESYNC_SECRET: string;
}
