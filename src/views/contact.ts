export function contactView(): string {
  return `
  <div class="page-header">
    <div class="wrap">
      <h1>Get in touch</h1>
      <p>Missing link, product request, or just want to say hi — we read everything.</p>
    </div>
  </div>
  <section class="section wrap">
    <form class="contact-form" action="mailto:hello@mymygirl.com" method="post" enctype="text/plain">
      <div>
        <label for="name">Name</label>
        <input id="name" name="name" type="text" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div>
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>
      </div>
      <button class="btn btn-primary" type="submit">Send message</button>
      <p style="font-size:0.85rem;color:var(--chocolate-soft);">
        Prefer social? Message us on Instagram or Facebook — we're usually faster there.
      </p>
    </form>
  </section>
  `;
}
