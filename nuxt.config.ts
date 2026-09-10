// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-04-17',
  devtools: { enabled: true },

  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-schema-org'],


  site: {
    url: 'https://xkproduction.com',
    name: 'XKProduction — Phòng Thu Âm Chuyên Nghiệp',
    description: 'XKProduction — Music production cho nghệ sĩ muốn bản phối nghe đắt tiền, rõ, và đúng chất. Hoà âm phối khí, Mix & Master chuẩn Spotify, thu âm chuyên nghiệp. 7+ năm kinh nghiệm, 2000+ dự án thành công.',
    defaultLocale: 'vi',
    trailingSlash: false,
    indexable: true,
  },

  // === SEO MODULE CONFIG ===
  robots: {
    disallow: ['/admin', '/admin/*'],
  },
  sitemap: {
    strictNuxtContentPaths: false,
    zeroRuntime: true,
    exclude: ['/admin', '/admin/**'],
    urls: [
      {
        loc: '/',
        priority: 1,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [
          { loc: 'https://xkproduction.com/images/logo-xkproduction.png', title: 'XKProduction - Phòng Thu Âm Chuyên Nghiệp Bình Phước', caption: 'Logo phòng thu âm chuyên nghiệp XKProduction' },
          { loc: 'https://xkproduction.com/images/founder-kiet.jpg', title: 'Nguyễn Xuân Kiệt - Founder XKProduction', caption: 'Founder & Music Producer XKProduction' }
        ]
      },
      {
        loc: '/services',
        priority: 0.8,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [{ loc: 'https://xkproduction.com/images/logo-xkproduction.png', title: 'Bảng giá dịch vụ thu âm XKProduction', caption: 'Bảng giá thu âm, mix master, hoà âm phối khí' }]
      },
      {
        loc: '/thu-am',
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [{ loc: 'https://xkproduction.com/images/Xkpreviewnew.png', title: 'Dịch vụ thu âm bài hát chuyên nghiệp', caption: 'Phòng thu âm chuyên nghiệp Bình Phước' }]
      },
      {
        loc: '/mix-master',
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [{ loc: 'https://xkproduction.com/images/Xkpreviewnew.png', title: 'Dịch vụ Mixing & Mastering', caption: 'Mixing và Mastering chuyên nghiệp chuẩn Spotify' }]
      },
      {
        loc: '/hoa-am-phoi-khi',
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [{ loc: 'https://xkproduction.com/images/Xkpreviewnew.png', title: 'Dịch vụ Hoà âm phối khí', caption: 'Hoà âm phối khí online chuyên nghiệp' }]
      },
      {
        loc: '/quay-mv-tvc',
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [{ loc: 'https://xkproduction.com/images/Xkpreviewnew.png', title: 'Dịch vụ Quay MV & TVC Chuyên Nghiệp', caption: 'Sản xuất MV và TVC quảng cáo trọn gói tại Bình Phước' }]
      },
      {
        loc: '/courses',
        priority: 0.9,
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [{ loc: 'https://xkproduction.com/images/logo-xkproduction.png', title: 'Khoá học Music Producer tại XKProduction', caption: 'Đào tạo Music Producer, Mixing & Mastering' }]
      },
      {
        loc: '/live-band',
        priority: 0.8,
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [
          { loc: 'https://xkproduction.com/images/kiet-live-sound-wide.jpg', title: 'Kỹ sư âm thanh Nguyễn Xuân Kiệt bàn mixer Midas M32R', caption: 'Vận hành âm thanh sự kiện chuyên nghiệp XKProduction' },
          { loc: 'https://xkproduction.com/images/quocchi-2.jpg', title: 'Âm thanh ánh sáng sự kiện XKProduction', caption: 'Cho thuê âm thanh ánh sáng sân khấu chuyên nghiệp' }
        ]
      },
      {
        loc: '/about',
        priority: 0.7,
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0],
        images: [{ loc: 'https://xkproduction.com/images/founder-kiet.jpg', title: 'Nguyễn Xuân Kiệt - Founder XKProduction', caption: 'Founder & Music Producer XKProduction' }]
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
      {
        loc: '/b2b',
        priority: 0.8,
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0],
      },
      {
        loc: '/mix-online',
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
      },
      {
        loc: '/presets',
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
      },
      { loc: '/privacy', priority: 0.3, changefreq: 'yearly', lastmod: '2025-01-01' },
      // Blog detail pages
      { loc: '/blog/san-xuat-nhat-ki-cua-me-mai-linh', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/blog/thu-am-gia-2026', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/blog/phong-thu-am-binh-phuoc', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/blog/mix-master-huong-dan', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/blog/hoa-am-phoi-khi-online', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/blog/vocal-tuning-va-vocal-production-la-gi', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/blog/chuan-bi-truoc-khi-den-phong-thu-am', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/blog/thu-am-binh-phuoc-dia-chi-uy-tin', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/blog/ky-am-bai-hat-va-soan-sheet-nhac-chuyen-nghiep', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/blog/mix-vocal-cover-nghe-sang-hon', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/blog/live-sound-cho-su-kien-nho', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      // === V2 CORE ROUTES ===
      { loc: '/work', priority: 0.9, changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/work/nhat-ki-cua-me', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/work/love-du-phong', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/work/chang-muon-noi-nhieu-loi', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/work/ly-do-bat-dau', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/work/kiep-sau', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/work/viet-tiep-cau-chuyen-hoa-binh', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/work/ao-cu-tinh-moi', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/work/tet-xa-cover', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/services/music-production', priority: 0.9, changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/services/creative-sound', priority: 0.9, changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/services/live-production', priority: 0.8, changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/services/project-production', priority: 0.9, changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/production', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/releases', priority: 0.8, changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/journal', priority: 0.8, changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/journal/san-xuat-nhat-ki-cua-me-mai-linh', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/journal/thu-am-gia-2026', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/journal/phong-thu-am-binh-phuoc', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/journal/mix-master-huong-dan', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/journal/hoa-am-phoi-khi-online', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/journal/vocal-tuning-va-vocal-production-la-gi', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/journal/chuan-bi-truoc-khi-den-phong-thu-am', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/journal/thu-am-binh-phuoc-dia-chi-uy-tin', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/journal/ky-am-bai-hat-va-soan-sheet-nhac-chuyen-nghiep', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/journal/mix-vocal-cover-nghe-sang-hon', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/journal/live-sound-cho-su-kien-nho', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/build-project', priority: 0.9, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/start-a-project', priority: 0.9, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
    ],
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
        { name: 'twitter:site', content: '@xkproduction' },
        { name: 'twitter:creator', content: '@xkproduction' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'XKProduction' },
        { name: 'application-name', content: 'XKProduction' },
        { name: 'msapplication-TileColor', content: '#06080f' },
        { name: 'msapplication-TileImage', content: '/favicon/ms-icon-144x144.png' },
        { name: 'msapplication-config', content: '/favicon/browserconfig.xml' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/android-icon-192x192.png' },
        // Apple Touch Icons
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-icon-180x180.png' },
        // Manifest
        { rel: 'manifest', href: '/favicon/manifest.json' },
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
        // Preload GA4 connection early
        { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
        { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
      ],
      // === TRACKING: Google Analytics 4 (only activated when a valid GA ID is configured) ===
      script: process.env.NUXT_PUBLIC_GA_ID && process.env.NUXT_PUBLIC_GA_ID !== 'G-XXXXXXXXXX' ? [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${process.env.NUXT_PUBLIC_GA_ID}`,
          async: true,
        },
        {
          innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NUXT_PUBLIC_GA_ID}',{send_page_view:true});`,
          type: 'text/javascript',
        },
      ] : []
    }
  },

  // === CSS ===
  css: ['~/assets/css/style.css'],

  // === COMPONENTS (flat, no subdirectory prefix) ===
  components: [{ path: '~/components', pathPrefix: false }],

  // === NITRO: static output for Cloudflare Pages ===
  nitro: {
    preset: 'cloudflare-pages',
    hooks: {
      'close': async () => {
        const fs = await import('node:fs')
        const path = await import('node:path')
        const redirectFile = path.resolve('dist/_redirects')
        if (fs.existsSync(path.dirname(redirectFile))) {
          const content = '/products/*\t/work/:splat\t301\n/products\t/work\t301\n'
          fs.writeFileSync(redirectFile, content, 'utf-8')
        }
      }
    },
    prerender: {
      crawlLinks: true,
      routes: [
        '/', '/about', '/services', '/live-band', '/courses',
        '/contact', '/faq', '/blog', '/privacy', '/b2b', '/mix-online', '/presets', '/sitemap.xml', '/robots.txt',
        '/thu-am', '/mix-master', '/hoa-am-phoi-khi', '/quay-mv-tvc',
        // Blog detail pages — must be explicit for SSG (crawlLinks can't follow Vue client-side links)
        '/blog/san-xuat-nhat-ki-cua-me-mai-linh',
        '/blog/thu-am-gia-2026',
        '/blog/phong-thu-am-binh-phuoc',
        '/blog/mix-master-huong-dan',
        '/blog/hoa-am-phoi-khi-online',
        '/blog/vocal-tuning-va-vocal-production-la-gi',
        '/blog/chuan-bi-truoc-khi-den-phong-thu-am',
        '/blog/thu-am-binh-phuoc-dia-chi-uy-tin',
        '/blog/ky-am-bai-hat-va-soan-sheet-nhac-chuyen-nghiep',
        '/blog/mix-vocal-cover-nghe-sang-hon',
        '/blog/live-sound-cho-su-kien-nho',
        // === V2 CORE SSG ROUTES ===
        '/work',
        '/work/nhat-ki-cua-me',
        '/work/love-du-phong',
        '/work/chang-muon-noi-nhieu-loi',
        '/work/ly-do-bat-dau',
        '/work/kiep-sau',
        '/work/viet-tiep-cau-chuyen-hoa-binh',
        '/work/ao-cu-tinh-moi',
        '/work/tet-xa-cover',
        '/services/music-production',
        '/services/creative-sound',
        '/services/live-production',
        '/services/project-production',
        '/production',
        '/releases',
        '/journal',
        '/journal/san-xuat-nhat-ki-cua-me-mai-linh',
        '/journal/thu-am-gia-2026',
        '/journal/phong-thu-am-binh-phuoc',
        '/journal/mix-master-huong-dan',
        '/journal/hoa-am-phoi-khi-online',
        '/journal/vocal-tuning-va-vocal-production-la-gi',
        '/journal/chuan-bi-truoc-khi-den-phong-thu-am',
        '/journal/thu-am-binh-phuoc-dia-chi-uy-tin',
        '/journal/ky-am-bai-hat-va-soan-sheet-nhac-chuyen-nghiep',
        '/journal/mix-vocal-cover-nghe-sang-hon',
        '/journal/live-sound-cho-su-kien-nho',
        '/build-project',
        '/start-a-project',
      ],
    },
    routeRules: {
      '/admin/**': { ssr: false },
      '/**': {
        headers: {
          'Cache-Control': process.env.NODE_ENV === 'development' ? 'no-cache, no-store, must-revalidate' : 'public, max-age=3600, s-maxage=86400',
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

  // === RUNTIME CONFIG ===
  runtimeConfig: {
    // Private — set via Cloudflare secrets or .env with NUXT_ prefix
    adminEmails: '',         // NUXT_ADMIN_EMAILS=email1@gmail.com,email2@gmail.com
    telegramBotToken: '',    // NUXT_TELEGRAM_BOT_TOKEN
    telegramChatId: '',      // NUXT_TELEGRAM_CHAT_ID
    public: {
      formspreeEndpoint: 'https://formspree.io/f/mojybjvk',
      crispWebsiteId: '',    // NUXT_PUBLIC_CRISP_WEBSITE_ID
      firebase: {
        apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBYvC9vy4ZOyMzFBGqiXCQQa3J1yzSLmwE',
        authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'xkproduction-d6fce.firebaseapp.com',
        projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID || 'xkproduction-d6fce',
        storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'xkproduction-d6fce.firebasestorage.app',
        messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '613539816477',
        appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID || '1:613539816477:web:fcdd9f1775e2c9cad592f4',
      },
    },
  },
})
