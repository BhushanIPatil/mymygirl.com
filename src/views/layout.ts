import { globalStyles } from '../styles';
import type { Env } from '../types';

export interface LayoutOptions {
  env: Env;
  title: string;
  description: string;
  path: string;
  bodyHtml: string;
  structuredDataJson?: string;
  canonicalPath?: string;
}

function navLink(href: string, label: string, currentPath: string): string {
  const isCurrent = currentPath === href || (href !== '/' && currentPath.startsWith(href));
  return `<a href="${href}"${isCurrent ? ' aria-current="page"' : ''}>${label}</a>`;
}

export function layout(opts: LayoutOptions): string {
  const { env, title, description, path, bodyHtml, structuredDataJson, canonicalPath } = opts;
  const siteUrl = env.SITE_URL.replace(/\/$/, '');
  const canonical = `${siteUrl}${canonicalPath ?? path}`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonical}" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${env.SITE_NAME}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta name="twitter:card" content="summary_large_image" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />

  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💗</text></svg>" />

  ${structuredDataJson ? `<script type="application/ld+json">${structuredDataJson}</script>` : ''}

  <style>${globalStyles}</style>
</head>
<body>
  <header class="site-header">
    <div class="wrap">
      <a class="logo" href="/">MyMy<span>Girl</span></a>

      <input type="checkbox" id="nav-check" class="nav-toggle" aria-hidden="true" style="display:none" />
      <label for="nav-check" class="nav-toggle" aria-label="Toggle menu">☰</label>

      <nav class="main-nav">
        ${navLink('/', 'Home', path)}
        ${navLink('/products', 'Shop', path)}
        ${navLink('/faq', 'FAQ', path)}
        ${navLink('/about', 'About', path)}
        ${navLink('/contact', 'Contact', path)}
      </nav>
    </div>
  </header>

  <main>
    ${bodyHtml}
  </main>

  <footer class="site-footer">
    <div class="wrap">
      <div>
        <h4>MYMYGIRL</h4>
        <p>${env.SITE_TAGLINE}</p>
      </div>
      <div>
        <h4>SHOP</h4>
        <ul>
          <li><a href="/products">All products</a></li>
          <li><a href="/faq">How codes work</a></li>
        </ul>
      </div>
      <div>
        <h4>SITE</h4>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/disclosure">Affiliate disclosure</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      © ${new Date().getFullYear()} ${env.SITE_NAME}. As an Amazon Associate and affiliate partner, we may earn from qualifying purchases.
    </div>
  </footer>
</body>
</html>`;
}
