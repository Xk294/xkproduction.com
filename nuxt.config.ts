// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-04-17',
  devtools: { enabled: true },

  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-schema-org'],

  // === SITE CONFIG — giữ nguyên ===
  site: {
    url: 'https://xkproduction.com',
    name: 'XKProduction — Phòng Thu Âm Chuyên Nghiệp',
    description: 'XKProduction — Phòng thu âm chuyên nghiệp tại Bình Phước & Đồng Nai. Hoà âm phối khí chuẩn quốc tế, Mix & Master Spotify-compliant, Thu âm chuyên nghiệp từ 350K, Quay MV/TVC, Cho thuê Sound & Lighting sự kiện. 7+ năm kinh nghiệm, 2000+ dự án thành công.',
    defaultLocale: 'vi',
    trailingSlash: false,
    indexable: true,
  },

  // === SEO MODULE CONFIG ===
  sitemap: {
    strictNuxtContentPaths: false,
    zeroRuntime: true,
    urls: [
      {
        loc: '/',
        priority: 1,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [
          { loc: 'https://xkproduction.com/images/xk-logo-new.jpg', title: 'XKStudio - Phòng Thu Âm Chuyên Nghiệp Bình Phước', caption: 'Logo phòng thu âm chuyên nghiệp XKStudio' },
          { loc: 'https://xkproduction.com/images/founder-kiet.jpg', title: 'Nguyễn Xuân Kiệt - Founder XKStudio', caption: 'Founder & Music Producer XKStudio' }
        ]
      },
      {
        loc: '/services',
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [{ loc: 'https://xkproduction.com/images/xk-logo-new.jpg', title: 'Bảng giá dịch vụ thu âm XKStudio', caption: 'Bảng giá thu âm, mix master, hoà âm phối khí' }]
      },
      {
        loc: '/courses',
        priority: 0.9,
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [{ loc: 'https://xkproduction.com/images/xk-logo-new.jpg', title: 'Khoá học Music Producer tại XKStudio', caption: 'Đào tạo Music Producer, Mixing & Mastering' }]
      },
      {
        loc: '/live-band',
        priority: 0.8,
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [{ loc: 'https://xkproduction.com/images/quocchi-2.jpg', title: 'Âm thanh ánh sáng sự kiện XKStudio', caption: 'Cho thuê âm thanh ánh sáng sân khấu chuyên nghiệp' }]
      },
      {
        loc: '/products',
        priority: 0.8,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [
          { loc: 'https://xkproduction.com/images/revan.jpg', title: 'Revan - Tác phẩm XKStudio', caption: 'Sản phẩm âm nhạc tiêu biểu của XKStudio' },
          { loc: 'https://xkproduction.com/images/howl.jpg', title: 'Howl - Tác phẩm XKStudio', caption: 'Portfolio sản phẩm âm nhạc XKStudio' }
        ]
      },
      {
        loc: '/about',
        priority: 0.7,
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [{ loc: 'https://xkproduction.com/images/founder-kiet.jpg', title: 'Nguyễn Xuân Kiệt - Founder XKStudio', caption: 'Founder & Music Producer XKStudio' }]
      },
      {
        loc: '/contact',
        priority: 0.8,
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: '/faq',
        priority: 0.7,
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: '/blog',
        priority: 0.8,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [
          { loc: 'https://xkproduction.com/images/blog-thu-am-gia.jpg', title: 'Thu Âm Bài Hát Giá Bao Nhiêu 2026', caption: 'Bảng giá thu âm chuyên nghiệp' },
          { loc: 'https://xkproduction.com/images/blog-mix-master.jpg', title: 'Mix Master là gì', caption: 'Hướng dẫn mixing và mastering' }
        ]
      },
      { loc: '/privacy', priority: 0.3, changefreq: 'yearly', lastmod: '2025-01-01' },
    ],
  },
  robots: {
    disallow: ['/cdn-cgi/', '/_nuxt/'],
    allow: ['/$', '/*.html$'],
  },

  // === APP HEAD — giữ nguyên ===
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'vi' },
      meta: [
        { name: 'theme-color', content: '#06080f' },
        { name: 'color-scheme', content: 'dark' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:locale', content: 'vi_VN' },
        { property: 'og:locale:alternate', content: 'en_US' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'XKProduction' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@xkstudio29' },
        { name: 'twitter:creator', content: '@xkstudio29' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'XKProduction' },
        { name: 'application-name', content: 'XKProduction' },
        { name: 'msapplication-TileColor', content: '#06080f' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon_ultimate_dark.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/xk-logo-new.jpg' },
        // Canonical được handle động ở từng page
        // Preconnect — tăng tốc font và CDN
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://cdnjs.cloudflare.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://img.youtube.com', crossorigin: '' },
        // DNS prefetch for social
        { rel: 'dns-prefetch', href: 'https://www.facebook.com' },
        { rel: 'dns-prefetch', href: 'https://www.youtube.com' },
        { rel: 'dns-prefetch', href: 'https://formspree.io' },
        // Google Fonts
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap',
          crossorigin: 'anonymous'
        },
        // Font Awesome
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
          crossorigin: 'anonymous',
          integrity: 'sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=='
        },
      ]
    }
  },

  // === CSS ===
  css: ['~/assets/css/style.css'],

  // === COMPONENTS (flat, no subdirectory prefix) ===
  components: [{ path: '~/components', pathPrefix: false }],

  // === NITRO: static output for Cloudflare Pages ===
  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about', '/services', '/products', '/live-band', '/courses', '/contact', '/faq', '/blog', '/privacy', '/sitemap.xml', '/robots.txt'],
    },
    routeRules: {
      '/**': {
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'SAMEORIGIN',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
          'X-Robots-Tag': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        }
      },
      '/privacy': {
        headers: {
          'X-Robots-Tag': 'noindex, follow'
        }
      }
    }
  },

  // === TYPESCRIPT ===
  typescript: { strict: true },
})
