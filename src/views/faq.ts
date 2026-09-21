import { brandText } from '../lib/html';
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'What is a product code, and where do I find one?',
    answer:
      "Every product we feature on Instagram, Facebook or YouTube is tagged with a short code like MG001, shown right on the image or in the caption. Type that code into the search bar on our home page or shop page to jump straight to that product.",
  },
  {
    question: "I can't find the code from a post — what do I do?",
    answer:
      "Double-check the caption or image for the code, or browse the matching category on our shop page instead — most posts mention the category too. You can also message us on Instagram and we'll point you to the right link.",
  },
  {
    question: 'Do you sell these products directly?',
    answer:
      "No — MyMyGirl is a curation site. When you tap \"Shop now\" you're taken to the retailer (usually Amazon) to complete your purchase, so payment, shipping and returns are all handled by them, under their own policies.",
  },
  {
    question: 'How do you make money from this site?',
    answer:
      "We earn a small commission when you buy through our links, at no extra cost to you. It's how we keep finding and posting new pieces. Full details are on our affiliate disclosure page.",
  },
  {
    question: 'A link took me somewhere unexpected — what happened?',
    answer:
      "Retailers sometimes update or discontinue listings after we've posted them. If a link looks off, let us know via the contact page and we'll fix or remove it.",
  },
  {
    question: 'Can I request a product or category?',
    answer:
      "Yes — send us a message through the contact page with what you're after, and we'll try to feature it in a future post.",
  },
];

export function faqStructuredData(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  });
}

export function faqView(): string {
  return `
  <div class="page-header">
    <div class="wrap">
      <h1>Frequently asked questions</h1>
      <p>Everything about product codes, links and how ${brandText()} works.</p>
    </div>
  </div>
  <section class="section wrap">
    <div class="faq-list" style="max-width: 760px;">
      ${faqItems
        .map(
          (item) => `<details class="faq-item">
        <summary>${item.question}</summary>
        <p>${brandText(item.answer)}</p>
      </details>`,
        )
        .join('\n')}
    </div>
  </section>
  `;
}
