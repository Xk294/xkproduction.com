declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const config = useRuntimeConfig()
    const websiteId = config.public.crispWebsiteId

    if (websiteId) {
      window.$crisp = window.$crisp || []
      window.CRISP_WEBSITE_ID = websiteId

      const d = document
      const s = d.createElement('script')
      s.src = 'https://client.crisp.chat/l.js'
      s.async = true
      d.head?.appendChild(s)
    }
  }
})
