import { brandText } from '../lib/html';
export function aboutView(siteName: string): string {
  return `
  <div class="page-header">
    <div class="wrap">
      <h1>About ${brandText(siteName)}</h1>
      <p>Why we started this, and what we're trying to make easier for you.</p>
    </div>
  </div>
  <section class="section wrap prose">
    <p>${brandText(siteName)} started as a simple idea: the best product finds happen mid-scroll, on Instagram or YouTube, but tracking down the exact link afterwards is a pain — dead links, "swipe up" that doesn't work, comments full of "link please?". We wanted a place where a short code does that job instead.</p>
    <h2>How we pick what we feature</h2>
    <p>We look for pieces that feel worth the price and the wait — handbags, fragrances, makeup and jewellery we'd actually buy ourselves — and we post them with a code and a photo. No filler, no "50 products you don't need."</p>
    <h2>What we're not</h2>
    <p>We're not a store. We don't hold inventory, handle payments, or manage shipping — when you shop through us, you're buying directly from the retailer (usually Amazon), under their policies. We're the shortcut between "I saw this on Instagram" and "I found it."</p>
    <p>Have a question, or a product you wish we'd feature? <a href="/contact">Get in touch</a>.</p>
  </section>
  `;
}
