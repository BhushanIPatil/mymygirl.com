# Setup & Deployment Guide

Follow this top to bottom the first time. Everything secret is kept out of
git — you'll paste real values directly into Cloudflare (or a local
`.dev.vars` file that's gitignored).

## 0. Prerequisites

- Node.js 18+ installed
- A Cloudflare account with `mymygirl.com`'s nameservers pointed to Cloudflare
- A Google Cloud service account JSON key, with the target Google Sheet
  shared (Viewer) with that service account's email
  *(see the two guides you already have for both of these — this doc picks
  up after they're done)*

## 1. Install dependencies

```bash
cd mymygirl-website
npm install
```

## 2. Log in to Cloudflare via Wrangler

```bash
npx wrangler login
```

## 3. Create the KV namespace

```bash
npx wrangler kv namespace create PRODUCTS_KV
npx wrangler kv namespace create PRODUCTS_KV --preview
```

Each command prints an `id`. Open `wrangler.toml` and replace:

```toml
id = "REPLACE_WITH_YOUR_KV_NAMESPACE_ID"
preview_id = "REPLACE_WITH_YOUR_KV_PREVIEW_NAMESPACE_ID"
```

with the two real ids.

## 4. Set your Google Sheet ID

Still in `wrangler.toml`, under `[vars]`, set:

```toml
GOOGLE_SHEET_ID = "the-long-id-from-your-sheets-url"
```

(It's the long string in the sheet's URL between `/d/` and `/edit`.)
This is not secret — it just identifies which sheet to read — so it's fine
to commit.

## 5. Set the real secrets

Never put these in `wrangler.toml`. Run each command and paste the value
when prompted:

```bash
npx wrangler secret put GOOGLE_SERVICE_ACCOUNT_EMAIL
npx wrangler secret put GOOGLE_PRIVATE_KEY
npx wrangler secret put RESYNC_SECRET
```

- `GOOGLE_SERVICE_ACCOUNT_EMAIL` — from the service account, e.g.
  `sheets-reader@mymygirl-sheets.iam.gserviceaccount.com`
- `GOOGLE_PRIVATE_KEY` — the full `private_key` field from the downloaded
  JSON key file, including the `-----BEGIN PRIVATE KEY-----` /
  `-----END PRIVATE KEY-----` lines. Paste it with literal `\n` for
  newlines if your terminal collapses it to one line — the code handles
  both forms.
- `RESYNC_SECRET` — make up your own long random string. This is the
  password that protects `/api/resync` from strangers refreshing your
  cache. Treat it like a password.

## 6. Try it locally first (optional but recommended)

```bash
cp .dev.vars.example .dev.vars
```

If `.dev.vars` already exists, preserve it instead of copying over it.
Fill in your real credentials and set `LOCAL_SYNC_ON_EMPTY="true"` to load
products into local KV on the first request. Leave it `"false"` to preview
sample products without credentials. See LOCAL-CONFIG.md for details.

```bash
npm run dev
```

Open `http://localhost:8787`. Try `/api/resync?key=<your .dev.vars RESYNC_SECRET>`
to test a real sync if you filled in real credentials.

## 7. Deploy

```bash
npm run deploy
```

This publishes the Worker to `*.workers.dev` first.

## 8. Attach your domain

In the Cloudflare dashboard: **Workers & Pages → mymygirl-website → Settings
→ Domains & Routes → Add → Custom Domain**, enter `mymygirl.com` (and
`www.mymygirl.com` if you want both). Cloudflare handles the DNS/SSL
automatically since the domain is already on your account.

Alternatively, uncomment the `[[routes]]` block at the bottom of
`wrangler.toml` and run `npm run deploy` again.

## 9. Run your first sync

Visit:

```
https://mymygirl.com/api/resync?key=YOUR_RESYNC_SECRET
```

You should get back JSON like:

```json
{"ok": true, "count": 12, "syncedAt": "2026-09-21T10:00:00.000Z"}
```

If you get `{"ok": false, "error": "..."}`, the error message will say
exactly what's wrong (usually: sheet not shared with the service account,
or a malformed private key). Check `/api/status` for a quick read on
whether the site is currently serving demo data or real synced data.

## 10. Bookmark the resync link

Since resync is manual (by design — no surprise API costs, no timers to
manage), bookmark `https://mymygirl.com/api/resync?key=...` on your phone
so refreshing the site after a sheet edit is one tap.

---

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Site shows the 8 demo products, not yours | Resync hasn't been run yet, or failed — check `/api/status` and `/api/resync` |
| `/api/resync` returns 401 | Wrong `key` query param, or `RESYNC_SECRET` wasn't set with `wrangler secret put` |
| `/api/resync` returns a Google auth error | Service account email/private key wrong, or the Sheets API isn't enabled on the Google Cloud project |
| `/api/resync` returns a 403 from Sheets | The sheet isn't shared with the service account's email (Viewer access) |
| A product doesn't show up | Its status is Inactive, or product_code / affiliate_link is blank |
| Images look broken | Image URL column isn't a direct, publicly-accessible image link |

## Google Sheet headers, product type and date

Put these snake_case headers in row 1; product data starts in row 2:

```text
product_code	product_name	category	image_url	affiliate_link	price	description	status	type	date
```

Columns are matched by header name and may be reordered within the configured range.
The first five headers are required; the others are optional. Legacy labels such as
Product Code remain supported. Duplicate or missing required headers cause a sync
error and preserve the previous cache. Prices are not displayed.

The final two optional fields control the homepage carousel and date filters:

| Column | Header | Value |
| --- | --- | --- |
| I | type | `carausel` to include the product in the hero carousel (`carousel` is also accepted) |
| J | date | `YYYY-MM-DD`, for example `2026-09-21`; use plain text or this date display format in Sheets |

Use `SHEET_RANGE = "Products!A1:J"`, including any local or deployed override. Resync after updating the sheet. Fresh picks and the Fresh filter include today and the previous six days (UTC). Date-range endpoints are inclusive; products without a valid date remain in the catalog but are excluded from date filters. The catalog shows dated products newest first.

Migration: change any old range starting at A2 to `Products!A1:J` in wrangler.toml, local `.dev.vars`, and any deployed overrides. The range must include headers. Deploy and resync after making these changes.
