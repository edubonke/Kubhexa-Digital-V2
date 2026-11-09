import test from 'node:test';
import assert from 'node:assert/strict';
import { WEBSITE_PACKAGES, formatZAR, calculateCustomQuote, validateProjectInquiry } from './pricing';

test('WEBSITE_PACKAGES includes the 5 specified tiers with correct pricing', () => {
  assert.equal(WEBSITE_PACKAGES.length, 5);
  
  const startTier = WEBSITE_PACKAGES.find(p => p.id === 'start');
  assert.ok(startTier);
  assert.equal(startTier.price, 2990);
  assert.equal(startTier.priceFormatted, 'R2,990');
  assert.equal(startTier.recommended, true);

  const businessTier = WEBSITE_PACKAGES.find(p => p.id === 'business');
  assert.ok(businessTier);
  assert.equal(businessTier.price, 5990);

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

test('calculateCustomQuote calculates base and addon totals accurately', () => {
  const quote = calculateCustomQuote('start', { expedited: true, copywriting: true });
  assert.equal(quote.basePrice, 2990);
  assert.equal(quote.addOnsTotal, 2700);
  assert.equal(quote.totalPrice, 5690);
  assert.equal(quote.deliveryDays, '2–3 days express');
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
