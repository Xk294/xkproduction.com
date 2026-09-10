import { computed } from 'vue'

export type Locale = 'vi' | 'en'

let legacyMigrated = false

export function useLocale() {
  const cookieLocale = useCookie<Locale>('xk_locale', {
    default: () => 'vi',
    watch: true,
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  })

  // Global reactive state across Nuxt SSR & Client
  const currentLocale = useState<Locale>('xk_site_locale', () => cookieLocale.value || 'vi')

  // Smooth migration for existing users with legacy localStorage (run at most once on client)
  if (import.meta.client && !legacyMigrated && (!cookieLocale.value || cookieLocale.value === 'vi')) {
    legacyMigrated = true
    try {
      const saved = localStorage.getItem('xk_locale') as Locale | null
      if ((saved === 'vi' || saved === 'en') && saved !== currentLocale.value) {
        currentLocale.value = saved
        cookieLocale.value = saved
        document.documentElement.lang = saved
      }
    } catch {
      // Ignore storage restrictions
    }
  }

  const isVi = computed(() => currentLocale.value === 'vi')
  const isEn = computed(() => currentLocale.value === 'en')

  const setLocale = (locale: Locale) => {
    currentLocale.value = locale
    cookieLocale.value = locale
    if (import.meta.client) {
      try {
        localStorage.setItem('xk_locale', locale)
        document.documentElement.lang = locale
      } catch {
        // Safe fallback
      }
    }
  }

  const toggleLocale = () => {
    setLocale(currentLocale.value === 'vi' ? 'en' : 'vi')
  }

  const pick = <T>(viVal: T, enVal: T): T => {
    return currentLocale.value === 'vi' ? viVal : enVal
  }

  const t = (key: string, fallback?: string): string => {
    return fallback || key
  }

  return {
    currentLocale,
    isVi,
    isEn,
    setLocale,
    toggleLocale,
    t,
    pick
  }
}
