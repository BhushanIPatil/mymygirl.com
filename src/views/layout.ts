import { brandText, escapeHtml } from '../lib/html';
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
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-SGCHT34RQH"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-SGCHT34RQH');
  </script>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(canonical)}" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${escapeHtml(env.SITE_NAME)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:card" content="summary_large_image" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />

  <link rel="icon" type="image/png" href="/mymygirl_fav.png" />
  <link rel="manifest" href="/manifest.webmanifest" />
  <meta name="theme-color" content="#FFF8F4" />
  <link rel="apple-touch-icon" href="/icons/icon-192.png" />

  ${structuredDataJson ? `<script type="application/ld+json">${structuredDataJson}</script>` : ''}

  <style>${globalStyles}</style>
</head>
<body>
  <header class="site-header">
    <div class="wrap">
      <a class="logo" href="/" aria-label="mymygirl home"><img src="/mymygirl_logo.png" alt="mymygirl" /></a>

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
        <a class="logo footer-logo" href="/" aria-label="mymygirl home"><img src="/mymygirl_logo.png" alt="mymygirl" loading="lazy" /></a>
        <p>${env.SITE_TAGLINE}</p>
      </div>
      <div>
        <h4>SHOP</h4>
        <ul>
          <li><a href="/products">All products</a></li>
          <li><a href="/faq">Handbag care &amp; shopping FAQ</a></li>
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
      © ${new Date().getFullYear()} ${brandText(env.SITE_NAME)}. As an Amazon Associate and affiliate partner, we may earn from qualifying purchases.
    </div>
  </footer>
</body>
</html>`;
}
