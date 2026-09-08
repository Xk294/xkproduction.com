// Tự động ghi nhận lượt xem trang vào D1 khi navigate kèm UTM & Referrer
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    if (!import.meta.client) return
    const route = useRoute()
    if (!route.path || route.path.startsWith('/admin')) return
    if (navigator.webdriver) return

    // 1. Extract UTM parameters from current URL if present
    let utmSource = (route.query.utm_source as string)?.trim() || null
    let utmMedium = (route.query.utm_medium as string)?.trim() || null
    let utmCampaign = (route.query.utm_campaign as string)?.trim() || null
    let utmContent = (route.query.utm_content as string)?.trim() || null

    try {
      if (utmSource) {
        // Save initial session UTM
        sessionStorage.setItem('xk_utm', JSON.stringify({
          source: utmSource,
          medium: utmMedium,
          campaign: utmCampaign,
          content: utmContent,
        }))
      } else {
        // Fallback to session UTM if navigating internally
        const stored = sessionStorage.getItem('xk_utm')
        if (stored) {
          const parsed = JSON.parse(stored)
          utmSource = parsed.source || null
          utmMedium = parsed.medium || null
          utmCampaign = parsed.campaign || null
          utmContent = parsed.content || null
        }
      }
    } catch {
      // Ignore storage errors (private mode, etc.)
    }

    const referrer = document.referrer ? document.referrer.slice(0, 500) : null

    $fetch('/api/analytics/visit', {
      method: 'POST',
      body: {
        path: route.path,
        referrer,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
      },
      ignoreResponseError: true,
    }).catch(() => { /* silent — không block UI */ })
  })
})

