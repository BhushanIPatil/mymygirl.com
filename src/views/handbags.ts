import { categoryToSlug } from '../lib/products';

export function isHandbagCategory(category?: string | null): boolean {
  return ['handbag', 'handbags', 'women-handbags', 'womens-handbags', 'handbags-for-women', 'ladies-handbags'].includes(categoryToSlug(category || ''));
}

export const handbagDescription = 'Browse curated handbags for women, from everyday totes to shoulder bags. Compare ladies handbags and read tips on choosing, cleaning and storing your bag.';

export function handbagGuide(): string {
  return `<section class="section wrap prose" aria-labelledby="handbag-guide">
    <h2 id="handbag-guide">Choosing handbags for women</h2>
    <p>The right handbag starts with what you carry. For work, check that a tote fits your daily essentials and has comfortable handles. For outings, compare shoulder bags and crossbody styles by strap length, closure and pocket space. Check each retailer's dimensions and material details before choosing.</p>
    <h3>Ladies handbags for everyday use</h3>
    <p>Look for an easy-to-reach phone pocket, a secure closure and a weight you can carry comfortably. When choosing handbags for girls, consider a lightweight design with an adjustable strap and enough room for the essentials.</p>
    <h3>Comparing branded and designer handbags</h3>
    <p>When shopping for branded handbags for women, compare materials, stitching, hardware, care instructions and the seller's return policy. A brand name alone does not tell you whether a bag suits your routine. For designer handbags, also check the seller's authenticity information and keep your receipt.</p>
    <p>Visit our <a href="/faq#handbag-faq">handbag FAQ</a> for answers about brands, resale, and how to clean and store handbags.</p>
  </section>`;
}
