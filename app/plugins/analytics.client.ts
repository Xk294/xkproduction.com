// Tự động ghi nhận lượt xem trang vào D1 khi navigate
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    if (!import.meta.client) return
    const route = useRoute()
    if (!route.path || route.path.startsWith('/admin')) return
    if (navigator.webdriver) return

    $fetch('/api/analytics/visit', {
      method: 'POST',
      body: { path: route.path },
      ignoreResponseError: true,
    }).catch(() => { /* silent — không block UI */ })
  })
})
