export function disclosureView(siteName: string): string {
  return `
  <div class="page-header">
    <div class="wrap">
      <h1>Affiliate disclosure</h1>
      <p>How ${siteName} makes money, in plain terms.</p>
    </div>
  </div>
  <section class="section wrap prose">
    <p>${siteName} participates in affiliate marketing programs, including the Amazon Associates Program, which means we may earn a commission when you click a link on this site and make a qualifying purchase — at no additional cost to you.</p>
    <h2>What this means for you</h2>
    <ul>
      <li>Prices you pay are the same whether or not you use our link.</li>
      <li>We only feature products we'd genuinely recommend — commission doesn't decide what gets posted.</li>
      <li>All purchases, payments, shipping and returns are handled entirely by the retailer (e.g. Amazon), not by ${siteName}.</li>
    </ul>
    <h2>Why we do this</h2>
    <p>Affiliate commissions are how we keep finding and posting new products without charging you anything to browse. If you have questions about a specific link or product, reach out via our <a href="/contact">contact page</a>.</p>
  </section>
  `;
}
