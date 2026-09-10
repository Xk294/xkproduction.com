/**
 * Canonical Partner Attribution Configuration: XKProduction -> Tách Nhạc
 *
 * Official Attribution Standard:
 * - utm_source=xkproduction
 * - utm_medium=referral
 * - utm_campaign=xkproduction_v2
 * - utm_content=<placement>
 * - utm_term=<term> (optional)
 *
 * Values must remain lowercase and canonical.
 */

export const TACHNHAC_PARTNER_CONFIG = {
  baseUrl: 'https://tachnhac.com',
  source: 'xkproduction',
  medium: 'referral',
  campaign: 'xkproduction_v2',
} as const

/** Canonical placements across XKProduction */
export type TachnhacCanonicalPlacement =
  | 'navbar_tachnhac'
  | 'mobile_nav_tachnhac'
  | 'footer_tachnhac'
  | 'services_banner_tachnhac'
  | 'presets_companion_tachnhac'
  | 'mix_online_callout_tachnhac'

/** Supported placements with autocompletion + arbitrary string extension */
export type TachnhacPlacement = TachnhacCanonicalPlacement | (string & {})

export interface TachnhacUrlOptions {
  /** Target path or URL (e.g. '/vocal-remover', '/tach-giong', or full url). Defaults to '/' */
  destination?: string
  /** Optional campaign term / keyword */
  term?: string
  /** Custom query parameters to preserve or pass */
  customParams?: Record<string, string | number | boolean | null | undefined>
}

/**
 * Creates a canonically attributed URL for referring users from XKProduction to Tách Nhạc.
 *
 * Features:
 * - Guarantees lowercase canonical UTM standard (xkproduction / referral / xkproduction_v2)
 * - Assigns exact placement identifier to utm_content
 * - Preserves existing target paths, existing query parameters, and hash fragments
 * - Correctly encodes parameters and never generates malformed URLs (e.g., '??' or '&&')
 *
 * @param placement Placement identifier in XKProduction UI
 * @param optionsOrDestination Optional target path/URL or options object
 * @returns Fully qualified, attributed URL
 */
export function createTachnhacReferralUrl(
  placement: TachnhacPlacement,
  optionsOrDestination?: string | TachnhacUrlOptions
): string {
  const options: TachnhacUrlOptions =
    typeof optionsOrDestination === 'string'
      ? { destination: optionsOrDestination }
      : optionsOrDestination || {}

  const rawDestination = options.destination?.trim() || TACHNHAC_PARTNER_CONFIG.baseUrl

  let parsedUrl: URL
  try {
    if (rawDestination.startsWith('http://') || rawDestination.startsWith('https://')) {
      parsedUrl = new URL(rawDestination)
    } else {
      const normalizedPath = rawDestination.startsWith('/') ? rawDestination : `/${rawDestination}`
      parsedUrl = new URL(normalizedPath, TACHNHAC_PARTNER_CONFIG.baseUrl)
    }
  } catch {
    parsedUrl = new URL(TACHNHAC_PARTNER_CONFIG.baseUrl)
  }

  // Canonical required UTM fields (enforced lowercase)
  parsedUrl.searchParams.set('utm_source', TACHNHAC_PARTNER_CONFIG.source)
  parsedUrl.searchParams.set('utm_medium', TACHNHAC_PARTNER_CONFIG.medium)
  parsedUrl.searchParams.set('utm_campaign', TACHNHAC_PARTNER_CONFIG.campaign)

  // Placement identification via utm_content
  if (placement && placement.trim()) {
    parsedUrl.searchParams.set('utm_content', placement.trim().toLowerCase())
  }

  // Optional campaign term
  if (options.term && options.term.trim()) {
    parsedUrl.searchParams.set('utm_term', options.term.trim())
  }

  // Preserve & append any additional non-UTM custom parameters
  if (options.customParams) {
    for (const [key, val] of Object.entries(options.customParams)) {
      if (val !== undefined && val !== null && !key.toLowerCase().startsWith('utm_')) {
        parsedUrl.searchParams.set(key, String(val))
      }
    }
  }

  return parsedUrl.toString()
}
