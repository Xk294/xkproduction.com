export interface DeviceInfo {
  device: 'mobile' | 'desktop' | 'tablet' | 'bot'
  os: string
  browser: string
  isBot: boolean
}

export function parseUserAgent(ua: string | null | undefined): DeviceInfo {
  if (!ua) {
    return { device: 'desktop', os: 'Unknown', browser: 'Unknown', isBot: false }
  }

  const isBot = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|bingbot|googlebot|yandex|bytespider/i.test(ua)
  if (isBot) {
    return { device: 'bot', os: 'Bot', browser: 'Bot', isBot: true }
  }

  let device: 'mobile' | 'desktop' | 'tablet' = 'desktop'
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    device = 'tablet'
  } else if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
    device = 'mobile'
  }

  let os = 'Other'
  if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS'
  else if (/android/i.test(ua)) os = 'Android'
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS'
  else if (/windows/i.test(ua)) os = 'Windows'
  else if (/linux/i.test(ua)) os = 'Linux'

  let browser = 'Other'
  if (/fbav|fban/i.test(ua)) browser = 'Facebook App'
  else if (/zalo/i.test(ua)) browser = 'Zalo App'
  else if (/tiktok/i.test(ua)) browser = 'TikTok App'
  else if (/edg/i.test(ua)) browser = 'Edge'
  else if (/coccoc/i.test(ua)) browser = 'Cốc Cốc'
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome'
  else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) browser = 'Safari'
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox'

  return { device, os, browser, isBot: false }
}

export function cleanGeoLocation(cityRaw: string | null | undefined, countryRaw: string | null | undefined): {
  city: string | null
  country: string | null
} {
  let country = countryRaw?.trim()?.toUpperCase() || null
  let city: string | null = null

  if (cityRaw) {
    try {
      city = decodeURIComponent(cityRaw).trim()
    } catch {
      city = cityRaw.trim()
    }
  }

  if (city) {
    // Normalise common Vietnamese city representations from Cloudflare
    if (/ho chi minh|saigon|sai gon/i.test(city)) city = 'TP. Hồ Chí Minh'
    else if (/ha noi|hanoi/i.test(city)) city = 'Hà Nội'
    else if (/da nang|danang/i.test(city)) city = 'Đà Nẵng'
    else if (/can tho|cantho/i.test(city)) city = 'Cần Thơ'
    else if (/hai phong|haiphong/i.test(city)) city = 'Hải Phòng'
    else if (/binh duong/i.test(city)) city = 'Bình Dương'
    else if (/dong nai/i.test(city)) city = 'Đồng Nai'
    else if (/vung tau/i.test(city)) city = 'Bà Rịa - Vũng Tàu'
    else if (/nha trang/i.test(city)) city = 'Nha Trang'
    else if (/hue/i.test(city)) city = 'Huế'
  }

  return { city: city ? city.slice(0, 100) : null, country: country ? country.slice(0, 10) : null }
}
