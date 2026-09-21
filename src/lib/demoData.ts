import type { Product } from '../types';

// Shown only when the KV cache is empty (i.e. /api/resync has never been
// run successfully). Placehold.co generates the images, so this works
// with zero external credentials — purely so the site is never blank.
function placeholder(label: string): string {
  return `https://placehold.co/600x600/F6C9DD/4A2C2A?text=${encodeURIComponent(label)}&font=montserrat`;
}

export const demoProducts: Product[] = [
  {
    code: 'MG001',
    name: 'Quilted Chain Shoulder Bag',
    category: 'Handbags',
    imageUrl: placeholder('Chain Bag'),
    affiliateLink: 'https://www.amazon.in',
    price: '₹2,499',
    description: 'A soft quilted shoulder bag with a gold-tone chain strap — goes from desk to dinner.',
    status: 'Active',
  },
  {
    code: 'MG002',
    name: 'Rose Gold Structured Tote',
    category: 'Handbags',
    imageUrl: placeholder('Tote Bag'),
    affiliateLink: 'https://www.amazon.in',
    price: '₹1,899',
    description: 'Roomy structured tote in a warm rose-gold tone, built for everyday carry.',
    status: 'Active',
  },
  {
    code: 'MG003',
    name: 'Velvet Musk Eau de Parfum',
    category: 'Perfume',
    imageUrl: placeholder('Perfume'),
    affiliateLink: 'https://www.amazon.in',
    price: '₹1,299',
    description: 'A warm, musky signature scent that lingers softly through the day.',
    status: 'Active',
  },
  {
    code: 'MG004',
    name: 'Blush Rose Body Mist',
    category: 'Perfume',
    imageUrl: placeholder('Body Mist'),
    affiliateLink: 'https://www.amazon.in',
    price: '₹499',
    description: 'A light, everyday rose mist — perfect for layering under your main fragrance.',
    status: 'Active',
  },
  {
    code: 'MG005',
    name: 'Matte Liquid Lipstick Set',
    category: 'Makeup',
    imageUrl: placeholder('Lipstick Set'),
    affiliateLink: 'https://www.amazon.in',
    price: '₹899',
    description: 'Four long-wear matte shades, from your everyday nude to a bold night-out red.',
    status: 'Active',
  },
  {
    code: 'MG006',
    name: 'Shimmer Highlighter Palette',
    category: 'Makeup',
    imageUrl: placeholder('Highlighter'),
    affiliateLink: 'https://www.amazon.in',
    price: '₹749',
    description: 'Buildable, finely-milled shimmer shades for a lit-from-within glow.',
    status: 'Active',
  },
  {
    code: 'MG007',
    name: 'Pearl Drop Earrings',
    category: 'Jewelry',
    imageUrl: placeholder('Earrings'),
    affiliateLink: 'https://www.amazon.in',
    price: '₹599',
    description: 'Dainty pearl drops that dress up a plain kurta or a little black dress alike.',
    status: 'Active',
  },
  {
    code: 'MG008',
    name: 'Layered Gold-Tone Necklace',
    category: 'Jewelry',
    imageUrl: placeholder('Necklace'),
    affiliateLink: 'https://www.amazon.in',
    price: '₹1,099',
    description: 'Three delicate layered chains in one clasp — wear together or separately.',
    status: 'Active',
  },
];
