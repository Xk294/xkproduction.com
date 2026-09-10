import { computed, onMounted } from 'vue'

export type Locale = 'vi' | 'en'

const translations: Record<string, Record<Locale, string>> = {
  // Brand
  'brand.sub': {
    vi: 'PHÒNG THU & SẢN XUẤT ÂM NHẠC',
    en: 'CREATIVE PRODUCTION HOUSE'
  },
  // Navigation
  'nav.work': {
    vi: 'TÁC PHẨM',
    en: 'WORK'
  },
  'nav.services': {
    vi: 'DỊCH VỤ',
    en: 'SERVICES'
  },
  'nav.production': {
    vi: 'SẢN XUẤT',
    en: 'PRODUCTION'
  },
  'nav.releases': {
    vi: 'PHÁT HÀNH',
    en: 'RELEASES'
  },
  'nav.about': {
    vi: 'GIỚI THIỆU',
    en: 'ABOUT'
  },
  'nav.journal': {
    vi: 'BÀI VIẾT',
    en: 'JOURNAL'
  },
  'nav.buildProject': {
    vi: 'Dự Toán Chi Phí',
    en: 'Build Project'
  },
  'nav.startProject': {
    vi: 'BẮT ĐẦU DỰ ÁN',
    en: 'START A PROJECT'
  },

  // Flyouts
  'flyout.featuredWork': {
    vi: 'TÁC PHẨM NỔI BẬT',
    en: 'FEATURED WORK'
  },
  'flyout.viewAll': {
    vi: 'Xem tất cả',
    en: 'View all'
  },
  'flyout.corePillars': {
    vi: '4 TRỤ CỘT NĂNG LỰC CỐT LÕI',
    en: '4 CORE CAPABILITIES'
  },
  'flyout.servicesOverview': {
    vi: 'Tổng quan dịch vụ',
    en: 'All services'
  },

  // Services page
  'services.badge': {
    vi: 'HỆ SINH THÁI GIẢI PHÁP ÂM NHẠC',
    en: 'CAPABILITIES MATRIX'
  },
  'services.title': {
    vi: 'DỊCH VỤ & GIẢI PHÁP ÂM NHẠC',
    en: 'SERVICES & SOLUTIONS'
  },
  'services.subtitle': {
    vi: 'Từ sáng tác hoà âm độc bản, mixing mastering chuẩn Spotify/Apple Music đến vận hành âm thanh ban nhạc live sân khấu. 2000+ dự án hoàn thành trọn vẹn từng mắt xích nghệ thuật.',
    en: 'From bespoke music arrangement and Spotify-grade mastering to live acoustic band and concert sound. Over 2,000 released tracks crafted with zero generic templates.'
  },
  'services.filterAll': {
    vi: 'Tất Cả Dịch Vụ',
    en: 'All Services'
  },
  'services.filterMusic': {
    vi: 'Sản Xuất Âm Nhạc',
    en: 'Music Production'
  },
  'services.filterSound': {
    vi: 'Mix & Master Chuẩn',
    en: 'Mix & Master'
  },
  'services.filterLive': {
    vi: 'Âm Thanh & Live Band',
    en: 'Live Sound & Band'
  },
  'services.filterStudio': {
    vi: 'Thu Âm & MV Trọn Gói',
    en: 'Recording & Full MV'
  },

  // Work page (screenshot 1)
  'work.badge': {
    vi: 'KHO TÁC PHẨM NGHỆ THUẬT',
    en: 'EDITORIAL ARCHIVE'
  },
  'work.title': {
    vi: 'DANH MỤC TÁC PHẨM',
    en: 'SELECTED WORK'
  },
  'work.subtitle': {
    vi: 'Khám phá danh mục các tác phẩm âm nhạc được sản xuất, hoà âm phối khí, thu âm và hoàn thiện tại XKProduction. Mỗi dự án là một câu chuyện độc bản đồng hành cùng người nghệ sĩ.',
    en: 'Explore curated music productions, arrangements, vocal recordings, and master releases by XKProduction. Every single project is an authentic story engineered for the artist.'
  },
  'work.filterAll': {
    vi: 'Tất Cả Dự Án',
    en: 'All Projects'
  },
  'work.filterArrangement': {
    vi: 'Hoà Âm Phối Khí',
    en: 'Arrangement'
  },
  'work.filterMixMaster': {
    vi: 'Mixing & Mastering',
    en: 'Mix & Master'
  },
  'work.filterProduction': {
    vi: 'Sản Xuất Âm Nhạc',
    en: 'Music Production'
  },
  'work.filterRecording': {
    vi: 'Thu Âm Phòng Thu',
    en: 'Vocal Recording'
  },

  // Common CTAs
  'cta.consultation': {
    vi: 'TƯ VẤN TRỰC TIẾP QUA ZALO',
    en: 'DIRECT ZALO CONSULT'
  },
  'cta.openBuilder': {
    vi: 'MỞ PROJECT BUILDER',
    en: 'OPEN PROJECT BUILDER'
  },
  'cta.submitBrief': {
    vi: 'NỘP BRIEF DỰ ÁN TRỰC TIẾP',
    en: 'SUBMIT PROJECT BRIEF'
  },
  'cta.viewDetails': {
    vi: 'Chi tiết dịch vụ',
    en: 'View details'
  },
  'cta.pricingStarting': {
    vi: 'MỨC ĐẦU TƯ TỪ:',
    en: 'STARTING INVESTMENT:'
  },
  'cta.timelineEst': {
    vi: 'TIẾN ĐỘ THỰC HIỆN:',
    en: 'ESTIMATED TIMELINE:'
  }
}

export function useLocale() {
  const currentLocale = useState<Locale>('xk_site_locale', () => 'vi')

  onMounted(() => {
    if (import.meta.client) {
      const saved = localStorage.getItem('xk_locale') as Locale | null
      if (saved === 'vi' || saved === 'en') {
        currentLocale.value = saved
      }
    }
  })

  const isVi = computed(() => currentLocale.value === 'vi')
  const isEn = computed(() => currentLocale.value === 'en')

  const setLocale = (locale: Locale) => {
    currentLocale.value = locale
    if (import.meta.client) {
      localStorage.setItem('xk_locale', locale)
    }
  }

  const toggleLocale = () => {
    setLocale(currentLocale.value === 'vi' ? 'en' : 'vi')
  }

  const t = (key: string, fallback?: string): string => {
    const entry = translations[key]
    if (entry && entry[currentLocale.value]) {
      return entry[currentLocale.value]
    }
    return fallback || key
  }

  const pick = <T>(viVal: T, enVal: T): T => {
    return currentLocale.value === 'vi' ? viVal : enVal
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
