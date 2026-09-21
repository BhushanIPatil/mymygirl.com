# Local configuration

Maintain your private values in `.dev.vars` in the project root. Git ignores
this file. The committed `.dev.vars.example` contains placeholders only.
`npm run dev` loads `.dev.vars` automatically and runs Wrangler in local mode.
Local KV storage is separate from the deployed catalog.

- `CONTACT_FORM_URL`: full published Google Forms URL ending in `/viewform`.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Google service account email.
- `GOOGLE_PRIVATE_KEY`: private key, quoted on one line with `\n` for newlines.
- `GOOGLE_SHEET_ID`: product spreadsheet ID.
- `RESYNC_SECRET`: a long random value protecting the resync endpoint.
- `LOCAL_SYNC_ON_EMPTY`: set to `"true"` to fetch Google Sheets automatically on the
  first local request when local KV is empty. Valid Google credentials and Viewer
  access to the sheet are required. Leave `"false"` for a demo-only preview.
- `SITE_URL`: use `"http://localhost:8787"` for local canonical links.

The contact page converts the URL to an embedded form and centers it.
The form URL stays out of Git, but visitors can see it in the page HTML.
Genuine credentials remain server-side.

## Loading real products locally

Your private file should contain real service account credentials, with
`LOCAL_SYNC_ON_EMPTY="true"` and `SHEET_RANGE="Products!A1:J"`.
The sheet ID defaults to the value in `wrangler.toml`; override it in
`.dev.vars` only if you want a different spreadsheet.

Run `npm run dev` and open `http://localhost:8787`. The first request
fetches the sheet and saves products to local KV. Later requests use that cache.
Check `http://localhost:8787/api/status` for `isDemoData: false` and the
product count. An authentication or sheet error appears in the dev terminal;
fix the credentials or sheet access and retry. Restart the dev server after
editing `.dev.vars`.

To refresh after editing the sheet, call the local `/api/resync` endpoint
with your `RESYNC_SECRET` in the `x-resync-key` request header.
Local sync writes only to local KV and does not refresh production.

## Production

Deploying code does not upload `.dev.vars`. Set production secrets separately
in your Cloudflare Worker settings or use these interactive commands:

```powershell
npx wrangler secret put CONTACT_FORM_URL
npx wrangler secret put GOOGLE_SERVICE_ACCOUNT_EMAIL
npx wrangler secret put GOOGLE_PRIVATE_KEY
npx wrangler secret put RESYNC_SECRET
```

Paste each value when prompted. For the private key, use the actual PEM key
with real newlines; the `\n` representation above is for the local vars file.

The existing `wrangler.toml` has a configured `GOOGLE_SHEET_ID`. To keep its
real value out of Git in production too, remove that entry from `[vars]`
before setting `GOOGLE_SHEET_ID` as a Worker secret.

Ensure your published form accepts responses from your intended audience.
Enable new-response email notifications in Google Forms to receive alerts.

The sheet range must include its snake_case header row: `SHEET_RANGE="Products!A1:J"`.
This is the default in wrangler.toml. Update any older local or production override starting at A2.
