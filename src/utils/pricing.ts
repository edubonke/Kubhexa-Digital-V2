export interface PackageTier {
  id: 'start' | 'business' | 'showcase' | 'bookings' | 'shop';
  number: string;
  name: string;
  price: number;
  priceFormatted: string;
  priceLabel: string;
  purpose: string;
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
    purpose: 'A clean, modern starting point for a new business.',
    audience: 'Sole traders, new ventures and focused offers.',
    scope: '1-page responsive layout',
    features: [
      'Logo, colours and content applied',
      'Contact enquiry form',
      'WhatsApp click-to-chat',
      'Basic analytics and search setup'
    ],
    deliveryTime: '3–5 working days',
    recommended: false
  },
  {
    id: 'business',
    number: '02',
    name: 'Business',
    price: 5990,
    priceFormatted: 'R5,990',
    priceLabel: 'once-off',
    purpose: 'Everything a growing service business needs.',
    audience: 'Contractors, consultants, medical practices and professional services.',
    scope: 'Up to 5 pages',
    features: [
      'Service pages and about section',
      'Multi-step enquiry form',
      'Google Business Profile optimisation',
      '30-day post-launch support'
    ],
    deliveryTime: '7–10 working days',
    recommended: true
  },
  {
    id: 'showcase',
    number: '03',
    name: 'Showcase',
    price: 8990,
    priceFormatted: 'R8,990',
    priceLabel: 'once-off',
    purpose: 'For businesses with work that speaks for itself.',
    audience: 'Architects, designers, photographers, builders and event planners.',
    scope: 'Up to 7 pages + gallery',
    features: [
      'Menu, portfolio or enquiry catalogue',
      'An editor for your 20 entries',
      '30-minute training session'
    ],
    deliveryTime: '10–12 working days'
  },
  {
    id: 'bookings',
    number: '04',
    name: 'Bookings',
    price: 11990,
    priceFormatted: 'R11,990',
    priceLabel: 'once-off',
    purpose: 'Make it easier to book you.',
    audience: 'Salons, barbers, tutors, trainers and appointment-based businesses.',
    scope: 'Up to 5 pages + booking integration',
    features: [
      'One location, up to 3 staff and 10 services',
      'Supported third-party booking platform',
      'Availability, confirmations and cancellation settings',
      'One-hour handover'
    ],
    deliveryTime: '10–15 working days'
  },
  {
    id: 'shop',
    number: '05',
    name: 'Shop',
    price: 17990,
    priceFormatted: 'R17,990',
    priceLabel: 'once-off',
    purpose: 'Open your online shop.',
    audience: 'Boutiques, beauty brands, craftspeople and small retailers.',
    scope: '5 content pages + store pages',
    features: [
      'Upload of 30 products, up to 60 variants/SKUs',
      'One supported payment gateway and stock management',
      'Collection and up to 3 simple delivery zones',
      'Order emails, checkout tests and one-hour training'
    ],
    deliveryTime: '15–20 working days'
  }
];

export type PackageId = 'start' | 'business' | 'showcase' | 'bookings' | 'shop';

export interface CarePlan {
  id: 'essential' | 'business' | 'commerce';
  name: string;
  price: number;
  priceFormatted: string;
  for: string;
  packages: PackageId[];
  features: string[];
}

export const CARE_PLANS: CarePlan[] = [
  {
    id: 'essential',
    name: 'Essential Care',
    price: 349,
    priceFormatted: 'R349',
    for: 'For low-change brochure websites',
    packages: ['start', 'business', 'showcase'],
    features: [
      'Standard hosting and SSL',
      'Uptime monitoring and daily backups',
      'Routine technical maintenance',
      'Content changes quoted separately'
    ]
  },
  {
    id: 'business',
    name: 'Business Care',
    price: 749,
    priceFormatted: 'R749',
    for: 'For content and booking websites',
    packages: ['start', 'business', 'showcase', 'bookings'],
    features: [
      'Essential hosting and monitoring',
      'CMS and plugin maintenance where applicable',
      '30 minutes of content changes each month'
    ]
  },
  {
    id: 'commerce',
    name: 'Commerce Care',
    price: 1499,
    priceFormatted: 'R1,499',
    for: 'For online stores and active websites',
    packages: ['start', 'business', 'showcase', 'bookings', 'shop'],
    features: [
      'Hosting suited to the agreed store size',
      'Backups and routine maintenance',
      'A monthly checkout check for stores',
      '1 hour of product or content changes monthly'
    ]
  }
];

export interface TemplateFamily {
  id: string;
  name: string;
  examples: string;
  packageId: PackageId;
}

export const TEMPLATE_FAMILIES: TemplateFamily[] = [
  { id: 'services', name: 'Services & Trades', examples: 'Plumbers, electricians, cleaners, security and local services', packageId: 'business' },
  { id: 'professional', name: 'Professional Services', examples: 'Consultants, accountants, agencies and advisers', packageId: 'business' },
  { id: 'wellness', name: 'Beauty & Wellness', examples: 'Salons, barbers, personal trainers and appointment businesses', packageId: 'bookings' },
  { id: 'hospitality', name: 'Food & Hospitality', examples: 'Restaurant menus, catering enquiries, venues and guesthouses', packageId: 'showcase' },
  { id: 'creative', name: 'Creative & Portfolio', examples: 'Photographers, designers, makers and project portfolios', packageId: 'showcase' },
  { id: 'retail', name: 'Retail', examples: 'Fashion, cosmetics, gifts, crafts and small online shops', packageId: 'shop' }
];

export interface TemplateItem {
  id: string;
  name: string;
  brand: string;
  familyId: string;
  packageId: PackageId;
  category: string;
  description: string;
  headline: string;
  action: string;
  interactions: string[];
}

export const TEMPLATE_CATALOG: TemplateItem[] = [
  {
    id: 'neighbour',
    name: 'Neighbour',
    brand: 'Neighbour Home Care',
    familyId: 'services',
    packageId: 'start',
    category: 'Local services',
    description: 'A welcoming one-page website for trades, cleaning and home services.',
    headline: 'Good care. Close to home.',
    action: 'Try a quote enquiry',
    interactions: ['Browse service options', 'Open FAQs', 'Try a validated enquiry form']
  },
  {
    id: 'northline',
    name: 'Northline',
    brand: 'Northline Advisory',
    familyId: 'professional',
    packageId: 'business',
    category: 'Professional services',
    description: 'A confident five-view business website for consultants and service firms.',
    headline: 'A clearer direction for your business.',
    action: 'Explore the business site',
    interactions: ['Navigate five sample pages', 'Filter services', 'Read sample insights', 'Try the contact form']
  },
  {
    id: 'luma',
    name: 'Luma',
    brand: 'Luma Studio',
    familyId: 'wellness',
    packageId: 'bookings',
    category: 'Beauty & wellness',
    description: 'A calm, editorial website with a complete sample appointment journey.',
    headline: 'A little time. Just for you.',
    action: 'Try the booking journey',
    interactions: ['Choose a service', 'Pick a sample day and time', 'Review a simulated booking']
  },
  {
    id: 'fieldform',
    name: 'Fieldform',
    brand: 'Field & Form',
    familyId: 'creative',
    packageId: 'showcase',
    category: 'Creative portfolio',
    description: 'An expressive portfolio for studios, photographers and creative businesses.',
    headline: 'Thoughtful work. Distinctive by design.',
    action: 'Explore the project gallery',
    interactions: ['Filter sample projects', 'Open project stories', 'Try a project enquiry']
  },
  {
    id: 'table-thyme',
    name: 'Table & Thyme',
    brand: 'Table & Thyme',
    familyId: 'hospitality',
    packageId: 'showcase',
    category: 'Food & hospitality',
    description: 'A warm restaurant and catering website with an interactive sample menu.',
    headline: 'Good food. Better company.',
    action: 'Browse the sample menu',
    interactions: ['Filter the menu', 'Show vegetarian dishes', 'Open dish details', 'Try a catering enquiry']
  },
  {
    id: 'morrow',
    name: 'Morrow',
    brand: 'Morrow Goods',
    familyId: 'retail',
    packageId: 'shop',
    category: 'Retail & online shops',
    description: 'A considered storefront with product browsing, a cart and simulated checkout.',
    headline: 'Everyday objects. A little extraordinary.',
    action: 'Try shopping the collection',
    interactions: ['Filter and search products', 'Choose a colour', 'Add and edit cart items', 'Try a demo discount and checkout']
  }
];

export interface AddOnItem {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
}

export const ADD_ONS: AddOnItem[] = [
  { id: 'extraPages', name: 'Additional page', description: 'Uses an existing layout', price: 750, unit: '/ page' },
  { id: 'copywriting', name: 'Website copywriting', description: 'Up to 5 pages, maximum 400 words per page', price: 2000, unit: '' },
  { id: 'brandKit', name: 'Starter logo kit', description: '2 concepts, 2 revision rounds, final logo files and colour palette', price: 2500, unit: '' },
  { id: 'productBatches', name: '10 extra simple products', description: 'Shop only; complete product information supplied', price: 750, unit: '/ batch' },
  { id: 'blog', name: 'Blog setup', description: 'Includes formatting and publishing 1 supplied article', price: 1500, unit: '' }
];

export function formatZAR(amount: number): string {
  return `R${amount.toLocaleString('en-ZA')}`;
}

export function supportsCare(packageId: PackageId, careId: string): boolean {
  if (careId === 'none') return true;
  const plan = CARE_PLANS.find(p => p.id === careId);
  return Boolean(plan?.packages.includes(packageId));
}

export interface EstimateOptions {
  packageId: PackageId;
  careId: 'none' | 'essential' | 'business' | 'commerce';
  familyId?: string;
  templateId?: string;
  extraPages?: number;
  productBatches?: number;
  copywriting?: boolean;
  brandKit?: boolean;
  blog?: boolean;
}

export function estimateWebsite(options: EstimateOptions) {
  const plan = WEBSITE_PACKAGES.find(p => p.id === options.packageId) || WEBSITE_PACKAGES[1];
  const care = CARE_PLANS.find(c => c.id === options.careId);
  const family = TEMPLATE_FAMILIES.find(f => f.id === options.familyId);
  const template = TEMPLATE_CATALOG.find(t => t.id === options.templateId);

  const extraPages = Math.max(0, Math.min(10, options.extraPages || 0));
  const productBatches = plan.id === 'shop' ? Math.max(0, Math.min(10, options.productBatches || 0)) : 0;
  const copywriting = options.copywriting ? 1 : 0;
  const brandKit = options.brandKit ? 1 : 0;
  const blog = options.blog ? 1 : 0;

  const extras: Array<{ id: string; name: string; quantity: number; price: number }> = [];

  if (extraPages > 0) {
    extras.push({ id: 'extraPages', name: 'Additional page', quantity: extraPages, price: extraPages * 750 });
  }
  if (productBatches > 0) {
    extras.push({ id: 'productBatches', name: '10 extra simple products', quantity: productBatches, price: productBatches * 750 });
  }
  if (copywriting) {
    extras.push({ id: 'copywriting', name: 'Website copywriting', quantity: 1, price: 2000 });
  }
  if (brandKit) {
    extras.push({ id: 'brandKit', name: 'Starter logo kit', quantity: 1, price: 2500 });
  }
  if (blog) {
    extras.push({ id: 'blog', name: 'Blog setup', quantity: 1, price: 1500 });
  }

  const addOnTotal = extras.reduce((sum, item) => sum + item.price, 0);
  const onceOff = plan.price + addOnTotal;
  const monthly = care?.price ?? 0;
  const firstYearFees = onceOff + monthly * 12;

  return {
    plan,
    care,
    family,
    template,
    extras,
    addOnTotal,
    onceOff,
    monthly,
    firstYearFees
  };
}

export function packageEnquiry(options: EstimateOptions) {
  const estimate = estimateWebsite(options);
  const { plan, care, family, template, extras, onceOff, monthly, firstYearFees } = estimate;

  const summary = [
    'Selected small-business website estimate',
    `Package: Kubhexa ${plan.name} — ${formatZAR(plan.price)} once-off`,
    ...(family ? [`Business type: ${family.name}`] : []),
    ...(template ? [`Template: ${template.name} (${template.id})`] : []),
    `Add-ons: ${extras.length ? extras.map(item => `${item.quantity} × ${item.name} (${formatZAR(item.price)})`).join('; ') : 'None'}`,
    `Once-off estimate: ${formatZAR(onceOff)}`,
    `Care: ${care ? `${care.name} — ${formatZAR(monthly)}/month` : 'No Kubhexa care plan; arrange hosting separately'}`,
    `First-year Kubhexa fees: ${formatZAR(firstYearFees)} (build plus 12 months of selected care)`,
    'Estimate excludes domains, third-party fees and VAT if applicable. Scope and final quote to be confirmed before a deposit.'
  ].join('\n');

  const budget = onceOff < 15000 ? 'Under R15,000' : onceOff <= 40000 ? 'R15,000 to R40,000' : onceOff <= 100000 ? 'R40,000 to R100,000' : 'R100,000+';

  return {
    title: `Kubhexa ${plan.name}`,
    templateName: template?.name ?? '',
    onceOff,
    monthly,
    summary,
    budget
  };
}

export function calculateCustomQuote(
  packageId: string,
  addOns: { expedited?: boolean; copywriting?: boolean; customDomainEmail?: boolean } = {}
): {
  basePrice: number;
  totalPrice: number;
  addOnsTotal: number;
  deliveryDays: string;
} {
  const tier = WEBSITE_PACKAGES.find(p => p.id === packageId) || WEBSITE_PACKAGES[0];
  let addOnsTotal = 0;

  if (addOns.expedited) addOnsTotal += 1200;
  if (addOns.copywriting) addOnsTotal += 2000;
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

