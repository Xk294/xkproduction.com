/**
 * Tách Nhạc Attribution Engine Tests
 * Run with: node --experimental-strip-types docs/tachnhac-integration/tests/attribution.test.ts
 */

import assert from 'node:assert/strict'
import {
  parseUtmParams,
  createAttributionRecord,
  sanitizeParam,
  isPartnerAttribution,
} from '../utils/attribution.ts'
import type { AttributionStore } from '../types/attribution.ts'

console.log('=== RUNNING TÁCH NHẠC ATTRIBUTION TESTS ===')

// 1. CANONICAL XKPRODUCTION PARTNER ARRIVAL
const xkQuery = {
  utm_source: 'xkproduction',
  utm_medium: 'referral',
  utm_campaign: 'xkproduction_v2',
  utm_content: 'navbar_tachnhac',
}
const parsedXk = parseUtmParams(xkQuery)
assert.ok(parsedXk !== null)
assert.equal(parsedXk.utm_source, 'xkproduction')
assert.equal(parsedXk.utm_medium, 'referral')
assert.equal(parsedXk.utm_campaign, 'xkproduction_v2')
assert.equal(parsedXk.utm_content, 'navbar_tachnhac')

const recordXk = createAttributionRecord(parsedXk, '/', 'https://xkproduction.com/')
assert.equal(recordXk.source, 'xkproduction')
assert.equal(recordXk.medium, 'referral')
assert.equal(recordXk.campaign, 'xkproduction_v2')
assert.equal(recordXk.content, 'navbar_tachnhac')
assert.equal(recordXk.landingPath, '/')
assert.equal(recordXk.referrer, 'https://xkproduction.com/')
assert.ok(isPartnerAttribution(recordXk, 'xkproduction'))
console.log('✔ TEST 1: Canonical XKProduction attribution captured successfully')

// 2. DIRECT TRAFFIC (No UTMs)
const directQuery = {}
const parsedDirect = parseUtmParams(directQuery)
assert.equal(parsedDirect, null)
console.log('✔ TEST 2: Direct traffic produces no false attribution')

// 3. OTHER SOURCE / CAMPAIGN (TikTok Social)
const tiktokQuery = {
  utm_source: 'tiktok',
  utm_medium: 'social',
  utm_campaign: 'spring_dance_2026',
}
const parsedTiktok = parseUtmParams(tiktokQuery)
assert.ok(parsedTiktok !== null)
assert.equal(parsedTiktok.utm_source, 'tiktok')
const recordTiktok = createAttributionRecord(parsedTiktok, '/vocal-remover')
assert.equal(isPartnerAttribution(recordTiktok, 'xkproduction'), false)
console.log('✔ TEST 3: Non-partner source is NOT attributed to XKProduction')

// 4. CASE INSENSITIVITY & NORMALIZATION
const uppercaseQuery = {
  utm_source: 'XKProduction',
  utm_medium: 'REFERRAL',
  utm_campaign: 'XKPRODUCTION_V2',
  utm_content: 'NAVBAR_TACHNHAC',
}
const parsedUpper = parseUtmParams(uppercaseQuery)
assert.ok(parsedUpper !== null)
assert.equal(parsedUpper.utm_source, 'xkproduction')
assert.equal(parsedUpper.utm_medium, 'referral')
assert.equal(parsedUpper.utm_campaign, 'xkproduction_v2')
assert.equal(parsedUpper.utm_content, 'navbar_tachnhac')
console.log('✔ TEST 4: Case normalization to lowercase works correctly')

// 5. FIRST-TOUCH VS LAST-TOUCH SIMULATION
const store: AttributionStore = {
  firstTouch: null,
  lastTouch: null,
  touchCount: 0,
}

function simulateArrival(query: Record<string, unknown>, path: string, ref: string | null) {
  const utm = parseUtmParams(query)
  if (!utm) return
  const record = createAttributionRecord(utm, path, ref)
  if (!store.firstTouch) {
    store.firstTouch = record
  }
  store.lastTouch = record
  store.touchCount += 1
}

// User arrives from XKProduction
simulateArrival(xkQuery, '/', 'https://xkproduction.com/')
assert.equal(store.firstTouch?.source, 'xkproduction')
assert.equal(store.lastTouch?.source, 'xkproduction')
assert.equal(store.touchCount, 1)

// User navigates internally (no UTMs)
simulateArrival({}, '/tools', null)
// Attribution remains XKProduction
assert.equal(store.firstTouch?.source, 'xkproduction')
assert.equal(store.lastTouch?.source, 'xkproduction')
assert.equal(store.touchCount, 1)

// User later enters via Google Ads (search campaign)
simulateArrival(
  { utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'brand_search' },
  '/vocal-remover',
  'https://www.google.com/'
)
// First touch MUST remain XKProduction (acquisition source preserved!)
assert.equal(store.firstTouch?.source, 'xkproduction')
// Last touch updates to Google
assert.equal(store.lastTouch?.source, 'google')
assert.equal(store.touchCount, 2)
console.log('✔ TEST 5: First-touch acquisition preserved; last-touch updated on explicit new campaign')

// 6. SANITIZATION & MALFORMED PARAMETERS
assert.equal(sanitizeParam(''), null)
assert.equal(sanitizeParam('   '), null)
assert.equal(sanitizeParam(null), null)
assert.equal(sanitizeParam(undefined), null)
assert.equal(sanitizeParam('<script>alert(1)</script>'), 'scriptalert(1)/script')
const longString = 'a'.repeat(300)
assert.equal(sanitizeParam(longString, 50)?.length, 50)
console.log('✔ TEST 6: Parameter sanitization and XSS prevention verified')

// 7. DUPLICATE KEYS IN QUERY STRING (Array values)
const duplicateQuery = {
  utm_source: ['xkproduction', 'fake_source'],
  utm_medium: 'referral',
}
const parsedDuplicate = parseUtmParams(duplicateQuery)
assert.ok(parsedDuplicate !== null)
assert.equal(parsedDuplicate.utm_source, 'xkproduction')
console.log('✔ TEST 7: Duplicate query array handles first valid item')

console.log('\n🎉 ALL 7 TÁCH NHẠC ATTRIBUTION TESTS PASSED SUCCESSFULLY!')
