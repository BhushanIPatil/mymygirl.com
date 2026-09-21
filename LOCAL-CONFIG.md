# Local configuration

Maintain your private values in `.dev.vars` in the project root. Git ignores
this file. The committed `.dev.vars.example` contains placeholders only.
`npm run dev` loads `.dev.vars` automatically.

- `CONTACT_FORM_URL`: full published Google Forms URL ending in `/viewform`.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Google service account email.
- `GOOGLE_PRIVATE_KEY`: private key, quoted on one line with `\n` for newlines.
- `GOOGLE_SHEET_ID`: product spreadsheet ID.
- `RESYNC_SECRET`: a long random value protecting the resync endpoint.

The contact page converts the URL to an embedded form and centers it.
The form URL stays out of Git, but visitors can see it in the page HTML.
Genuine credentials remain server-side.

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

The existing `wrangler.toml` has a `GOOGLE_SHEET_ID` placeholder. To keep its
real value out of Git in production too, remove that entry from `[vars]`
before setting `GOOGLE_SHEET_ID` as a Worker secret.

Ensure your published form accepts responses from your intended audience.
Enable new-response email notifications in Google Forms to receive alerts.

The sheet range must include its snake_case header row: `SHEET_RANGE="Products!A1:J"`.
This is the default in wrangler.toml. Update any older local or production override starting at A2.
