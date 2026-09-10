import { createTachnhacReferralUrl, TACHNHAC_PARTNER_CONFIG, type TachnhacPlacement, type TachnhacUrlOptions } from '../utils/partnerAttribution'

/**
 * Composable for partner attribution and outbound link tracking.
 */
export function usePartnerAttribution() {
  const analytics = useAnalytics()

  function getTachnhacUrl(placement: TachnhacPlacement, options?: TachnhacUrlOptions): string {
    return createTachnhacReferralUrl(placement, options)
  }

  function trackPartnerClick(placement: TachnhacPlacement) {
    analytics.trackEvent('partner_referral_click', placement)
  }

  return {
    config: TACHNHAC_PARTNER_CONFIG,
    getTachnhacUrl,
    createTachnhacReferralUrl,
    trackPartnerClick,
  }
}
