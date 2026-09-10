/**
 * Tách Nhạc — Attribution Utilities
 * Handles safe extraction, sanitization, referrer extraction, and normalization.
 */

import type { AttributionRecord, RawUtmParams } from '../types/attribution'

export const KNOWN_PARTNER_SOURCES = ['xkproduction'] as const

/**
 * Sanitizes an untrusted query parameter string.
 * Prevents HTML injection, strips control chars, and caps max length.
 */
export function sanitizeParam(value: unknown, maxLength = 120): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed) return null
  // Strip control characters and HTML tags
  const sanitized = trimmed.replace(/[\x00-\x1F\x7F<>]/g, '').slice(0, maxLength)
  return sanitized.length > 0 ? sanitized : null
}

/**
 * Extracts and sanitizes UTM parameters from a URL query object or search string.
 */
export function parseUtmParams(query: Record<string, unknown> | URLSearchParams): RawUtmParams | null {
  const get = (key: string): string | null => {
    if (query instanceof URLSearchParams) {
      return sanitizeParam(query.get(key))
    }
    const val = query[key]
    // If array (duplicate keys in query), take the first entry
    if (Array.isArray(val)) {
      return sanitizeParam(val[0])
    }
    return sanitizeParam(val)
  }

  const source = get('utm_source')
  const medium = get('utm_medium')
  const campaign = get('utm_campaign')
  const content = get('utm_content')
  const term = get('utm_term')

  // A valid campaign requires at least utm_source
  if (!source) return null

  return {
    utm_source: source.toLowerCase(),
    utm_medium: medium ? medium.toLowerCase() : 'unknown',
    utm_campaign: campaign ? campaign.toLowerCase() : 'unknown',
    utm_content: content ? content.toLowerCase() : null,
    utm_term: term,
  }
}

/**
 * Creates a normalized AttributionRecord from parsed UTM and context.
 */
export function createAttributionRecord(
  utm: RawUtmParams,
  landingPath: string,
  referrer: string | null = null,
  rawQuery?: string
): AttributionRecord {
  return {
    source: utm.utm_source || 'direct',
    medium: utm.utm_medium || 'none',
    campaign: utm.utm_campaign || 'none',
    content: utm.utm_content || null,
    term: utm.utm_term || null,
    landingPath: landingPath.startsWith('/') ? landingPath : `/${landingPath}`,
    capturedAt: new Date().toISOString(),
    referrer: sanitizeParam(referrer, 500),
    rawQuery: rawQuery ? rawQuery.slice(0, 500) : undefined,
  }
}

/**
 * Safely extracts document.referrer on client side.
 */
export function getClientReferrer(): string | null {
  if (typeof document === 'undefined') return null
  return sanitizeParam(document.referrer, 500)
}

/**
 * Checks if a given attribution record is from an official partner (e.g. xkproduction).
 */
export function isPartnerAttribution(record: AttributionRecord | null, partner: 'xkproduction' = 'xkproduction'): boolean {
  if (!record) return false
  return record.source === partner && record.medium === 'referral'
}
