/**
 * Tách Nhạc — Attribution System Types
 * Standard: Cross-Site Partner Attribution (XKProduction -> Tách Nhạc)
 */

export interface RawUtmParams {
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_content?: string | null
  utm_term?: string | null
}

export interface AttributionRecord {
  /** Acquisition source (e.g. 'xkproduction', 'google', 'direct') */
  source: string
  /** Campaign medium (e.g. 'referral', 'cpc', 'social') */
  medium: string
  /** Campaign name (e.g. 'xkproduction_v2') */
  campaign: string
  /** Placement or ad identifier (e.g. 'navbar_tachnhac', 'footer_tachnhac') */
  content: string | null
  /** Optional keyword/term */
  term: string | null
  /** Initial landing path where user arrived (e.g. '/vocal-remover') */
  landingPath: string
  /** ISO timestamp of when attribution was captured */
  capturedAt: string
  /** Browser document.referrer context (captured independently) */
  referrer: string | null
  /** Raw query string (for auditing/debugging) */
  rawQuery?: string
}

export interface AttributionStore {
  /** First touch attribution (original acquisition, immutable across session) */
  firstTouch: AttributionRecord | null
  /** Last touch attribution (updated if user re-enters via another campaign) */
  lastTouch: AttributionRecord | null
  /** Total campaigns recorded in user journey */
  touchCount: number
}

export type AttributionModel = 'first-touch' | 'last-touch'

export interface AnalyticsAttributionPayload {
  source: string
  medium: string
  campaign: string
  content?: string | null
  term?: string | null
  is_partner: boolean
  partner_name?: string | null
}
