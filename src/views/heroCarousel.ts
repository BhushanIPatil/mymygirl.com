import type { Product } from '../types';
import { escapeHtml } from '../lib/html';

export function heroCarousel(products: Product[]): string {
  if (!products.length) return '';
  return `<div class="hero-carousel" role="region" aria-roledescription="carousel" aria-label="Featured products">
    <div class="carousel-track" tabindex="0" aria-label="Swipe or use arrow keys to browse featured products">
      ${products.map((p, i) => `<div class="carousel-slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${products.length}">
        <a href="/go/${encodeURIComponent(p.code)}" rel="sponsored nofollow noopener" target="_blank" aria-label="Shop ${escapeHtml(p.name)}">
          <img src="${escapeHtml(p.imageUrl)}" alt="${escapeHtml(p.name)}" loading="${i === 0 ? 'eager' : 'lazy'}" />
        </a>
      </div>`).join('')}
    </div>
    ${products.length > 1 ? `<div class="carousel-dots" role="group" aria-label="Choose featured product" hidden>
      ${products.map((_, i) => `<button type="button" class="carousel-dot" aria-label="Go to image ${i + 1} of ${products.length}"${i === 0 ? ' aria-current="true"' : ''}></button>`).join('')}
    </div>` : ''}
  </div>
  <script>
    (() => {
      const carousel = document.querySelector('.hero-carousel');
      const track = carousel.querySelector('.carousel-track');
      const dots = carousel.querySelector('.carousel-dots');
      if (!dots) return;
      const buttons = Array.from(dots.querySelectorAll('button'));
      const count = buttons.length;
      let active = 0;
      const update = index => {
        active = Math.max(0, Math.min(count - 1, index));
        const start = Math.max(0, Math.min(active - 2, count - 5));
        const end = Math.min(count - 1, start + 4);
        buttons.forEach((button, i) => {
          button.hidden = i < start || i > end;
          if (i === active) button.setAttribute('aria-current', 'true');
          else button.removeAttribute('aria-current');
          button.classList.toggle('is-faded', i !== active && ((i === start && start > 0) || (i === end && end < count - 1)));
          button.classList.toggle('is-small', i !== active && ((i === start + 1 && start > 0) || (i === end - 1 && end < count - 1)));
        });
      };
      const move = index => track.scrollTo({ left: Math.max(0, Math.min(count - 1, index)) * track.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      buttons.forEach((button, i) => button.addEventListener('click', () => move(i)));
      track.addEventListener('scroll', () => {
        if (track.clientWidth) update(Math.round(track.scrollLeft / track.clientWidth));
      }, { passive: true });
      track.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          move(active + (event.key === 'ArrowRight' ? 1 : -1));
        }
      });
      new ResizeObserver(() => {
        track.scrollTo({ left: active * track.clientWidth, behavior: 'instant' });
      }).observe(track);
      update(0);
      dots.hidden = false;
      setInterval(() => {
        if (!document.hidden && !matchMedia('(prefers-reduced-motion: reduce)').matches && !carousel.matches(':hover, :focus-within')) {
          move((active + 1) % count);
        }
      }, 1500);
    })();
  </script>`;
}
