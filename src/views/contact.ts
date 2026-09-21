import { escapeHtml } from '../lib/html';

export function contactView(formUrl?: string): string {
  let embedUrl: string | undefined;
  let publicUrl: string | undefined;
  try {
    const url = new URL(formUrl || '');
    if (url.origin === 'https://docs.google.com' && /^\/forms\/d\/e\/[A-Za-z0-9_-]+\/viewform\/?$/.test(url.pathname)) {
      url.search = '';
      url.hash = '';
      publicUrl = url.toString();
      url.searchParams.set('embedded', 'true');
      embedUrl = url.toString();
    }
  } catch {
    // Show a helpful fallback when configuration is missing or invalid.
  }

  return `
  <div class="page-header contact-header">
    <div class="wrap">
      <h1>Get in touch</h1>
      <p>Have a question, product request, or a broken link to report? We'd love to hear from you.</p>
    </div>
  </div>
  <section class="section wrap">
    <div class="contact-form">
      ${embedUrl && publicUrl ? `
      <iframe class="contact-form-frame" src="${escapeHtml(embedUrl)}"
        title="Contact MyMyGirl" width="640" height="1100">Loading contact form...</iframe>
      <p class="contact-form-help">Having trouble with the form? <a href="${escapeHtml(publicUrl)}" target="_blank" rel="noopener noreferrer">Open it in a new tab</a>.</p>
      ` : '<p class="contact-form-help">Our contact form is temporarily unavailable. Please try again later.</p>'}
    </div>
  </section>
  `;
}
