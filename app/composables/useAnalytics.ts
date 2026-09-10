// Composable tiện ích ghi nhận sự kiện tương tác Studio (Audio plays, CTA clicks)
export function useAnalytics() {
  const route = useRoute()

  function trackEvent(action: string, label?: string) {
    if (!import.meta.client || navigator.webdriver) return

    const path = route.path || (typeof window !== 'undefined' ? window.location.pathname : '/')

    try {
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: action.trim(),
          label: label ? label.trim().slice(0, 200) : undefined,
          page: path,
        }),
        keepalive: true,
      }).catch(() => {})
    } catch {
      // Silent error — never disrupt user experience
    }
  }

  function trackAudioPlay(trackTitle: string) {
    trackEvent('audio_play', trackTitle)
  }

  function trackCta(buttonName: string) {
    trackEvent('cta_click', buttonName)
  }

  function getTrackingPayload() {
    if (!import.meta.client) return {}
    try {
      const stored = sessionStorage.getItem('xk_utm')
      if (stored) {
        const parsed = JSON.parse(stored)
        return {
          utm_source: parsed.source || null,
          utm_medium: parsed.medium || null,
          utm_campaign: parsed.campaign || null,
          utm_content: parsed.content || null,
          landing_page: window.location.pathname,
        }
      }
    } catch {
      // Ignore
    }
    return {
      landing_page: typeof window !== 'undefined' ? window.location.pathname : null,
    }
  }

  return {
    trackEvent,
    trackAudioPlay,
    trackCta,
    getTrackingPayload,
  }
}
