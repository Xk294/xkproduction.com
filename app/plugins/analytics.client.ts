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
        const utmObj = {
          source: utmSource,
          medium: utmMedium,
          campaign: utmCampaign,
          content: utmContent,
        }
        const serialized = JSON.stringify(utmObj)
        sessionStorage.setItem('xk_utm', serialized)
        // Store cookie for 30 days so form post requests inherit attribution
        document.cookie = `xk_utm=${encodeURIComponent(serialized)}; path=/; max-age=${30 * 86400}; SameSite=Lax`
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

  // 2. Global Outbound & Conversion Click Auto-Capture (Delegated Listener)
  if (import.meta.client && typeof document !== 'undefined') {
    let listenerAttached = (window as any).__xk_analytics_click_listener
    if (!listenerAttached) {
      (window as any).__xk_analytics_click_listener = true

      document.addEventListener('click', (ev) => {
        const target = (ev.target as HTMLElement)?.closest('a')
        if (!target) return
        const href = target.getAttribute('href') || ''
        if (!href) return

        let action = ''
        let label = ''

        if (href.startsWith('tel:')) {
          action = 'call_click'
          label = href.replace('tel:', '').trim()
        } else if (href.includes('zalo.me')) {
          action = 'zalo_click'
          label = href.slice(0, 200)
        } else if (href.includes('m.me') || href.includes('facebook.com/xkproduction')) {
          action = 'messenger_click'
          label = href.slice(0, 200)
        }

        if (action) {
          const path = window.location.pathname
          try {
            fetch('/api/analytics/event', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action, label, page: path }),
              keepalive: true,
            }).catch(() => {})
          } catch {
            // silent
          }
        }
      }, { passive: true })
    }
  }
})

