import { ref, computed } from 'vue'
import type { AttributionRecord, AttributionStore, AnalyticsAttributionPayload, AttributionModel } from '../types/attribution'
import { parseUtmParams, createAttributionRecord, getClientReferrer, isPartnerAttribution } from '../utils/attribution'

const STORAGE_KEY = 'tn_attribution_v1'

/**
 * Composable for Tách Nhạc to capture, persist, and query acquisition attribution.
 *
 * Designed for Nuxt 4 / Vue 3:
 * - SSR Safe: Never touches window, localStorage, or document during SSR
 * - Dual Attribution Model: Maintains both First-Touch (acquisition) and Last-Touch (recent campaign)
 * - Persistent: Survives page reloads, route transitions, and deep links
 * - Clean URL: Supports optional query stripping without triggering navigation loops
 */
export function useAttribution() {
  // Shared reactive state across components in the current session
  const attributionStore = useState<AttributionStore>('app_attribution_store', () => ({
    firstTouch: null,
    lastTouch: null,
    touchCount: 0,
  }))

  /**
   * Loads persisted attribution from localStorage (client only).
   */
  function loadPersistedStore(): void {
    if (!import.meta.client) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as AttributionStore
        if (parsed && typeof parsed === 'object') {
          attributionStore.value.firstTouch = parsed.firstTouch || null
          attributionStore.value.lastTouch = parsed.lastTouch || null
          attributionStore.value.touchCount = Number(parsed.touchCount) || 0
        }
      }
    } catch {
      // Storage unavailable or quota exceeded — fall back to in-memory state
    }
  }

  /**
   * Persists current store to localStorage (client only).
   */
  function saveStore(): void {
    if (!import.meta.client) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(attributionStore.value))
    } catch {
      // Storage unavailable
    }
  }

  /**
   * Captures incoming attribution from current route query and referrer.
   * Call this on initial app load / page finish.
   *
   * @param query Current route query object
   * @param currentPath Current route pathname
   */
  function captureIncomingAttribution(
    query: Record<string, unknown>,
    currentPath: string
  ): AttributionRecord | null {
    if (!import.meta.client) return null

    // Ensure state is rehydrated from storage first
    if (!attributionStore.value.firstTouch && !attributionStore.value.lastTouch) {
      loadPersistedStore()
    }

    const utm = parseUtmParams(query)
    if (!utm) {
      // No UTM parameters on this request. Internal navigation or direct arrival.
      return null
    }

    const referrer = getClientReferrer()
    const newRecord = createAttributionRecord(utm, currentPath, referrer)

    // 1. FIRST-TOUCH: preserve the very first campaign that brought this user
    if (!attributionStore.value.firstTouch) {
      attributionStore.value.firstTouch = newRecord
    }

    // 2. LAST-TOUCH: update latest campaign touch
    attributionStore.value.lastTouch = newRecord
    attributionStore.value.touchCount += 1

    saveStore()
    return newRecord
  }

  /**
   * Returns acquisition attribution according to requested model (default: first-touch).
   */
  function getAttribution(model: AttributionModel = 'first-touch'): AttributionRecord | null {
    if (import.meta.client && !attributionStore.value.firstTouch && !attributionStore.value.lastTouch) {
      loadPersistedStore()
    }
    return model === 'first-touch'
      ? attributionStore.value.firstTouch
      : (attributionStore.value.lastTouch || attributionStore.value.firstTouch)
  }

  /**
   * Checks whether the user was referred by XKProduction.
   */
  const isFromXKProduction = computed(() => {
    return isPartnerAttribution(getAttribution('first-touch'), 'xkproduction')
  })

  /**
   * Prepares analytics-safe attribution payload for event tracking.
   */
  function getAttributionForAnalytics(model: AttributionModel = 'first-touch'): AnalyticsAttributionPayload {
    const attr = getAttribution(model)
    if (!attr) {
      return {
        source: 'direct',
        medium: 'none',
        campaign: 'none',
        is_partner: false,
      }
    }
    return {
      source: attr.source,
      medium: attr.medium,
      campaign: attr.campaign,
      content: attr.content,
      term: attr.term,
      is_partner: attr.source === 'xkproduction',
      partner_name: attr.source === 'xkproduction' ? 'xkproduction' : null,
    }
  }

  /**
   * Optionally strips UTM parameters from the visible browser URL
   * without triggering a router refresh or duplicate pageview.
   */
  function cleanTrackingParamsFromUrl(): void {
    if (!import.meta.client || typeof window === 'undefined' || !window.history) return

    const url = new URL(window.location.href)
    let changed = false

    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    for (const key of utmKeys) {
      if (url.searchParams.has(key)) {
        url.searchParams.delete(key)
        changed = true
      }
    }

    if (changed) {
      const cleanUrl = url.pathname + (url.search ? url.search : '') + url.hash
      window.history.replaceState(window.history.state, '', cleanUrl)
    }
  }

  return {
    store: attributionStore,
    captureIncomingAttribution,
    getAttribution,
    isFromXKProduction,
    getAttributionForAnalytics,
    cleanTrackingParamsFromUrl,
    loadPersistedStore,
  }
}
