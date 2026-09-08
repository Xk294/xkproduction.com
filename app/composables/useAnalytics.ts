// Composable tiện ích ghi nhận sự kiện tương tác Studio (Audio plays, CTA clicks)
export function useAnalytics() {
  const route = useRoute()

  function trackEvent(action: string, label?: string) {
    if (!import.meta.client || navigator.webdriver) return

    $fetch('/api/analytics/event', {
      method: 'POST',
      body: {
        action: action.trim(),
        label: label ? label.trim().slice(0, 200) : undefined,
        page: route.path,
      },
      ignoreResponseError: true,
    }).catch(() => {
      // Silent error — never disrupt user experience
    })
  }

  function trackAudioPlay(trackTitle: string) {
    trackEvent('audio_play', trackTitle)
  }

  function trackCta(buttonName: string) {
    trackEvent('cta_click', buttonName)
  }

  return {
    trackEvent,
    trackAudioPlay,
    trackCta,
  }
}
