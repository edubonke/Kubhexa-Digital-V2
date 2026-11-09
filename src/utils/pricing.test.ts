import test from 'node:test';
import assert from 'node:assert/strict';
import { WEBSITE_PACKAGES, CARE_PLANS, TEMPLATE_CATALOG, estimateWebsite, packageEnquiry, calculateCustomQuote, validateProjectInquiry } from './pricing';

test('WEBSITE_PACKAGES includes the 5 specified tiers with authentic pricing and scope', () => {
  assert.equal(WEBSITE_PACKAGES.length, 5);
  
  const startTier = WEBSITE_PACKAGES.find(p => p.id === 'start');
  assert.ok(startTier);
  assert.equal(startTier.price, 2990);
  assert.equal(startTier.priceFormatted, 'R2,990');
  assert.equal(startTier.scope, '1-page responsive layout');

  const businessTier = WEBSITE_PACKAGES.find(p => p.id === 'business');
  assert.ok(businessTier);
  assert.equal(businessTier.price, 5990);
  assert.equal(businessTier.recommended, true);

  const showcaseTier = WEBSITE_PACKAGES.find(p => p.id === 'showcase');
  assert.ok(showcaseTier);
  assert.equal(showcaseTier.price, 8990);

  const bookingsTier = WEBSITE_PACKAGES.find(p => p.id === 'bookings');
  assert.ok(bookingsTier);
  assert.equal(bookingsTier.price, 11990);

  const shopTier = WEBSITE_PACKAGES.find(p => p.id === 'shop');
  assert.ok(shopTier);
  assert.equal(shopTier.price, 17990);
});

test('CARE_PLANS and TEMPLATE_CATALOG match Kubhexa specifications', () => {
  assert.equal(CARE_PLANS.length, 3);
  assert.equal(TEMPLATE_CATALOG.length, 6);
  assert.ok(CARE_PLANS.some(c => c.id === 'essential' && c.price === 349));
  assert.ok(CARE_PLANS.some(c => c.id === 'business' && c.price === 749));
  assert.ok(CARE_PLANS.some(c => c.id === 'commerce' && c.price === 1499));
});

test('estimateWebsite calculates onceOff, monthly care, and first-year fees', () => {
  const estimate = estimateWebsite({
    packageId: 'business',
    careId: 'essential',
    extraPages: 2,
    copywriting: true
  });

  assert.equal(estimate.plan.price, 5990);
  // extraPages: 2 * 750 = 1500; copywriting: 2000 => addOnTotal = 3500
  assert.equal(estimate.addOnTotal, 3500);
  assert.equal(estimate.onceOff, 5990 + 3500); // 9490
  assert.equal(estimate.monthly, 349);
  assert.equal(estimate.firstYearFees, 9490 + 349 * 12); // 13678

  const inquiry = packageEnquiry({
    packageId: 'business',
    careId: 'essential',
    extraPages: 2,
    copywriting: true
  });
  assert.ok(inquiry.summary.includes('Kubhexa Business'));
  assert.equal(inquiry.budget, 'Under R15,000');
});

test('validateProjectInquiry catches missing or invalid data', () => {
  const invalidResult = validateProjectInquiry({
    fullName: '',
    email: 'bad-email',
    packageId: 'unknown'
  });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.packageId);

  const validResult = validateProjectInquiry({
    fullName: 'Lethabo Ndlovu',
    email: 'lethabo@example.co.za',
    packageId: 'start'
  });
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

