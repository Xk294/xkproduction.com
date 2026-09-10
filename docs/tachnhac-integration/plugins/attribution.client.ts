/**
 * Nuxt 4 Client Plugin for Tách Nhạc
 * Place in: app/plugins/attribution.client.ts
 *
 * Automatically captures incoming partner attribution on first page load,
 * persists it across the entire user journey, and makes it available to analytics.
 */

import { useAttribution } from '../composables/useAttribution'

export default defineNuxtPlugin((nuxtApp) => {
  const attribution = useAttribution()
  let hasCapturedInitial = false

  nuxtApp.hook('page:finish', () => {
    if (!import.meta.client) return

    const route = useRoute()

    // 1. Capture incoming UTM attribution from query parameters
    const captured = attribution.captureIncomingAttribution(
      route.query as Record<string, unknown>,
      route.path
    )

    // 2. On first landing with UTM, cleanly remove UTM from address bar (optional UX enhancement)
    // This avoids URL clutter during subsequent sharing while keeping attribution safely stored.
    if (captured && !hasCapturedInitial) {
      hasCapturedInitial = true
      // Optional: uncomment below to keep browser address bar clean
      // attribution.cleanTrackingParamsFromUrl()
    }

    // 3. Forward attribution context to existing analytics if present
    const analyticsPayload = attribution.getAttributionForAnalytics('first-touch')

    // Example GA4 integration:
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('set', 'user_properties', {
        acquisition_source: analyticsPayload.source,
        acquisition_medium: analyticsPayload.medium,
        acquisition_campaign: analyticsPayload.campaign,
        acquisition_content: analyticsPayload.content || '',
        is_partner: analyticsPayload.is_partner,
      })
    }

    // Development diagnostic log (only visible in dev mode)
    if (import.meta.dev && captured) {
      console.log('[TáchNhạc Attribution] Captured partner attribution:', captured)
    }
  })
})
