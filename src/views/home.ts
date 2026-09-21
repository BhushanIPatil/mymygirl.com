import { brandText } from '../lib/html';
import { heroCarousel } from './heroCarousel';
import type { Product } from '../types';
import { categoryToSlug, filterProducts } from '../lib/products';
import { productGrid } from './productCard';

export function homeView(opts: { products: Product[]; categories: string[]; siteName: string }): string {
  const { products, categories, siteName } = opts;
  const featured = filterProducts(products, { fresh: true }).slice(0, 8);
  const heroImages = products.filter(p => ['carausel', 'carousel'].includes(p.type?.trim().toLowerCase() || ''));

  return `
  <section class="hero">
    <div class="wrap">
      <div>
        <h1>Pretty finds, one code away.</h1>
        <p class="lede">We hand-pick handbags, fragrances, makeup and jewellery worth your money — see it on Instagram, punch in the code, get the exact piece.</p>
        <form class="code-search" action="/products" method="get">
          <input type="text" name="code" placeholder="Enter product code e.g. MG001" aria-label="Product code" />
          <button class="btn btn-primary" type="submit">Find it</button>
        </form>
      </div>
      ${heroCarousel(heroImages)}
    </div>
  </section>

  <section class="section wrap home-categories">
    <div class="section-heading">
      <div>
        <h2>Shop by category</h2>
        <p>Everything we list, sorted the way you'd browse it.</p>
      </div>
    </div>
    <div class="chip-row">
      ${categories
        .map((c) => `<a class="chip" href="/category/${categoryToSlug(c)}">${c}</a>`)
        .join('\n')}
    </div>
  </section>

  <section class="section wrap home-fresh">
    <div class="section-heading">
      <div>
        <h2>Fresh picks</h2>
        <p>Added in the last seven days.</p>
      </div>
      <a class="see-all" href="/products">See all products →</a>
    </div>
    ${featured.length ? productGrid(featured) : '<p>No new picks in the last seven days. <a class="see-all" href="/products">Browse all products &rarr;</a></p>'}
  </section>

  <section class="section wrap prose">
    <h2>How ${brandText(siteName)} works</h2>
    <p>Every product we post on Instagram, Facebook and YouTube carries a short code, like <strong>MG001</strong>. Type that code into the search bar above, or scroll the shop page, to jump straight to the piece you saw. Tap "Shop now" and you'll land on the retailer — usually Amazon — to complete your purchase safely with their own checkout, delivery and returns.</p>
    <p>We don't hold stock or handle payments ourselves; we're a curation layer that saves you the scroll. See our <a href="/disclosure">affiliate disclosure</a> for how we earn from the links we share.</p>
  </section>
  `;
}
