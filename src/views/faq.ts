import { brandText } from '../lib/html';
export interface FaqItem {
  question: string;
  answer: string;
}

export const handbagFaqItems: FaqItem[] = [
  {
    question: 'How do I choose handbags for women?',
    answer: 'Start with your daily essentials and check the dimensions, empty weight, strap length, pockets and closure. Compare materials and care needs as well as appearance. For handbags for girls, look for a comfortable fit and a lightweight design that suits the intended use.',
  },
  {
    question: 'How do I compare top branded handbags for ladies?',
    answer: 'There is no single best brand for everyone. When comparing branded handbags for women, consider your budget, materials, construction, comfort and aftercare. Read the specific product details and seller return policy before deciding; a higher price alone does not guarantee a better fit for your needs.',
  },
  {
    question: 'Does MyMyGirl sell designer handbags, Coach handbags or YSL handbags?',
    answer: 'MyMyGirl curates product links and does not sell bags directly. Brand mentions here are for shopping guidance and do not mean a brand is currently listed. For Coach handbags, YSL handbags or other designer handbags, check the current catalog and verify the exact brand, seller, authenticity information and availability on the retailer page before purchasing.',
  },
  {
    question: 'How do I clean handbags at home?',
    answer: 'Empty the bag, remove loose debris and check its material and care label. Start with a soft, dry cloth. Use a damp cloth or cleaning product only if the manufacturer permits it for that material, and test a hidden spot first. Do not soak or machine-wash a bag unless its care label allows it. Let it dry naturally away from direct heat; delicate finishes and stubborn stains may need professional care.',
  },
  {
    question: 'How do I care for leather handbags?',
    answer: "Use the maker's instructions for your leather finish. Gently remove surface dust with a soft cloth, and use leather cleaner or conditioner only if it is suitable for that bag, testing a hidden area first. Suede, nubuck and specialty finishes may need different care from smooth leather. Avoid soaking the bag and consult the manufacturer or a leather specialist for difficult stains.",
  },
  {
    question: 'How should I store handbags?',
    answer: 'Empty the bag before storing it and make sure it is dry. Lightly fill it with clean, unprinted tissue to support its shape, then place it upright in a breathable dust bag in a dry space away from sunlight and heat. Avoid overcrowding shelves or hanging a heavy bag by its handles for long periods. Follow any storage instructions supplied by the maker.',
  },
  {
    question: 'Where can I sell used designer handbags?',
    answer: 'Options include specialist luxury consignment businesses, resale marketplaces and local consignment shops. Before choosing one, check its current brand acceptance rules, authentication process, fees, payout timing and shipping cover. Keep receipts if available, photograph the bag clearly and disclose wear or damage. MyMyGirl does not buy, authenticate or accept bags for resale.',
  },
  {
    question: 'What is What Goes Around Comes Around, and does it sell handbags?',
    answer: 'What Goes Around Comes Around is a retailer of pre-owned luxury fashion and accessories, including handbags. It is a separate business from MyMyGirl. Visit its official website to check current inventory, item condition and purchase policies.',
  },
  {
    question: "What can you find in a woman's handbag?",
    answer: "Everyday contents might include a phone, wallet, keys, tissues, lip balm and a small pouch for personal items. Some people also carry a notebook, sunglasses or a charger. Use your own essentials as a sizing checklist and compare them with the bag's internal dimensions before buying.",
  },
];

const shoppingFaqItems: FaqItem[] = [
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

export const faqItems = [...handbagFaqItems, ...shoppingFaqItems];

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
      <h1>Handbag care &amp; shopping FAQ</h1>
      <p>Choosing, cleaning and storing handbags, plus product codes, links and how ${brandText()} works.</p>
    </div>
  </div>
  <section class="section wrap">
    <div class="faq-list" style="max-width: 760px;">
      ${faqItems
        .map(
          (item, index) => `${index === 0 ? '<h2 id="handbag-faq">Handbag questions</h2>' : index === handbagFaqItems.length ? '<h2>Shopping with MyMyGirl</h2>' : ''}<details class="faq-item">
        <summary>${item.question}</summary>
        <p>${brandText(item.answer)}</p>
      </details>`,
        )
        .join('\n')}
      <p>Further reading: <a href="https://www.coach.com/stories/guides/leather-care">Coach leather care guidance</a> and <a href="https://www.whatgoesaroundnyc.com/en-us/about-wgaca.html">About What Goes Around Comes Around</a>.</p>
      <p><a href="/products">Browse our current product picks</a>.</p>
    </div>
  </section>
  `;
}
