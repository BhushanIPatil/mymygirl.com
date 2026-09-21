export function notFoundView(): string {
  return `
  <section class="section wrap" style="padding: 90px 0;">
    <div class="empty-state">
      <h3>We couldn't find that page</h3>
      <p>The link might be old, or the code might not match anything we've listed.</p>
      <p><a class="btn btn-primary" href="/products">Browse all products</a></p>
    </div>
  </section>
  `;
}
