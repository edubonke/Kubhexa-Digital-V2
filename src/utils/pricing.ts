export interface PackageTier {
  id: string;
  number: string;
  name: string;
  price: number;
  priceFormatted: string;
  priceLabel: string;
  audience: string;
  scope: string;
  features: string[];
  deliveryTime: string;
  recommended?: boolean;
}

export const WEBSITE_PACKAGES: PackageTier[] = [
  {
    id: 'start',
    number: '01',
    name: 'Start',
    price: 2990,
    priceFormatted: 'R2,990',
    priceLabel: 'once-off',
    audience: 'Sole proprietors & startups establishing a professional first footprint.',
    scope: 'Single-page or 3-section high-converting landing structure.',
    features: [
      'Responsive mobile-first layout',
      'Fast-loading technical setup',
      'Contact & WhatsApp conversion routing',
      '3–5 day turnaround delivery'
    ],
    deliveryTime: '3–5 days',
    recommended: true
  },
  {
    id: 'business',
    number: '02',
    name: 'Business',
    price: 5990,
    priceFormatted: 'R5,990',
    priceLabel: 'once-off',
    audience: 'Growing businesses needing structured services, team, and credibility proof.',
    scope: 'Multi-section multi-page architecture with clear service hierarchy.',
    features: [
      'Up to 5 custom-designed pages',
      'Service catalog & proof case studies',
      'On-page technical SEO & analytics',
      'Interactive quote or inquiry capture'
    ],
    deliveryTime: '7–10 days'
  },
  {
    id: 'showcase',
    number: '03',
    name: 'Showcase',
    price: 8990,
    priceFormatted: 'R8,990',
    priceLabel: 'once-off',
    audience: 'Premium studios, construction, architecture, and luxury portfolios.',
    scope: 'Editorial high-impact gallery, rich media framing, and case study depth.',
    features: [
      'Editorial media & project layouts',
      'Filterable portfolio & visual concepts',
      'Refined micro-interactions & kinetic polish',
      'Custom branding alignment & typography'
    ],
    deliveryTime: '10–14 days'
  },
  {
    id: 'bookings',
    number: '04',
    name: 'Bookings',
    price: 11990,
    priceFormatted: 'R11,990',
    priceLabel: 'once-off',
    audience: 'Clinics, consultants, wellness studios, and appointment-driven companies.',
    scope: 'Integrated calendar scheduling, automated reminders, and client intake.',
    features: [
      'Real-time automated calendar booking',
      'SMS / WhatsApp booking confirmations',
      'Staff availability & time slot rules',
      'Deposit or prepayment integration'
    ],
    deliveryTime: '14–18 days'
  },
  {
    id: 'shop',
    number: '05',
    name: 'Shop',
    price: 17990,
    priceFormatted: 'R17,990',
    priceLabel: 'once-off',
    audience: 'Direct-to-consumer brands and merchant stores seeking frictionless checkout.',
    scope: 'Full e-commerce catalog, payment gateway (PayFast/Ozow/Yoco), order emails.',
    features: [
      'Catalog & inventory architecture',
      'Secure SA payment gateway integration',
      'Automated transactional emails & orders',
      'Customer account & purchase history'
    ],
    deliveryTime: '18–24 days'
  }
];

export function formatZAR(amount: number): string {
  return `R${amount.toLocaleString('en-ZA')}`;
}

export function calculateCustomQuote(packageId: string, addOns: { expedited?: boolean; copywriting?: boolean; customDomainEmail?: boolean } = {}): {
  basePrice: number;
  totalPrice: number;
  addOnsTotal: number;
  deliveryDays: string;
} {
  const tier = WEBSITE_PACKAGES.find(p => p.id === packageId) || WEBSITE_PACKAGES[0];
  let addOnsTotal = 0;

  if (addOns.expedited) addOnsTotal += 1200;
  if (addOns.copywriting) addOnsTotal += 1500;
  if (addOns.customDomainEmail) addOnsTotal += 850;

  return {
    basePrice: tier.price,
    totalPrice: tier.price + addOnsTotal,
    addOnsTotal,
    deliveryDays: addOns.expedited ? '2–3 days express' : tier.deliveryTime
  };
}

export function validateProjectInquiry(data: {
  fullName: string;
  email: string;
  phone?: string;
  packageId: string;
  projectDescription?: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name or company name.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.packageId || !WEBSITE_PACKAGES.some(p => p.id === data.packageId)) {
    errors.packageId = 'Please select a valid project package.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
