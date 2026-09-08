<template>
  <div class="site-wrapper" :class="{ 'is-admin-mode': isAdminRoute }">
    <Navbar v-if="!isAdminRoute" />
    <main class="main-content">
      <NuxtPage />
    </main>
    <Footer v-if="!isAdminRoute" />
    <StickyContact v-if="!isAdminRoute" />
    <StudioAudioDock v-if="!isAdminRoute" />
  </div>
</template>

<script setup lang="ts">
// Global styles are loaded via nuxt.config.ts css array

// Global Default SEO Configuration with Open Graph, Twitter Cards & Social Previews
const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
const BASE_URL = 'https://xkproduction.com'


// Initialize global Open Graph configuration
useOpenGraph({
  title: 'XKProduction - Phòng Thu Âm Chuyên Nghiệp Bình Phước | Hoà Âm Phối Khí | Mix Master',
  description: 'XKProduction — Music production cho nghệ sĩ muốn bản phối nghe đắt tiền, rõ, và đúng chất. 2000+ dự án. Bắt đầu tư vấn miễn phí.',
  image: 'https://xkproduction.com/images/Xkpreviewnew.png',
  type: 'website',
  locale: 'vi_VN',
  twitterHandle: '@xkproduction',
})

// Global SEO Meta Tags
useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}` : 'XKProduction - Phòng Thu Âm Chuyên Nghiệp | Mixing | Mastering | Quay MV/TVC | Sản Xuất Âm Nhạc';
  },
  description: 'XKProduction — Music production cho nghệ sĩ muốn bản phối nghe đắt tiền, rõ, và đúng chất. Hoà âm phối khí, mix & master chuẩn Spotify, thu âm chuyên nghiệp. 2000+ dự án. Hotline: 0355.356.294',
  keywords: 'XKProduction, xkproduction.com, phòng thu âm, phòng thu âm chuyên nghiệp, phòng thu âm Bình Phước, thu âm bài hát, thu âm bài hát giá bao nhiêu, hoà âm phối khí, hoà âm phối khí online, mix master, mix master giá rẻ, mixing mastering, sản xuất âm nhạc, quay mv, quay tvc, sân khấu sự kiện, âm thanh ánh sáng, cho thuê âm thanh, cho thuê ánh sáng, live band, sound light, studio bình phước, phòng thu uy tín, bảng giá thu âm, nhạc sĩ, music producer',
  author: 'XKProduction - Nguyễn Xuân Kiệt',
})

// Add canonical URL + hreflang per page (page-level JSON-LD handled by each page)
useHead(() => {
  const cleanPath = route.path.replace(/\/$/, '')
  const currentUrl = `${BASE_URL}${cleanPath}`

  return {
    link: [
      { rel: 'canonical', href: currentUrl },
      { rel: 'alternate', hreflang: 'vi-VN', href: currentUrl },
      { rel: 'alternate', hreflang: 'x-default', href: currentUrl },
    ],
    meta: [
      { name: 'msvalidate.01', content: 'F3F91F78FD04BB3AA39A2E05D8E3A6A3' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'apple-mobile-web-app-title', content: 'XKProduction' },
      { name: 'application-name', content: 'XKProduction' },
      { name: 'msapplication-config', content: '/favicon/browserconfig.xml' },
      { name: 'theme-color', content: '#06080f' },
    ],
  }
})

// Global JSON-LD Schema — Organization + Website (LocalBusiness schema managed by individual pages)
useSchemaOrg([
  defineOrganization({
    name: 'XKProduction',
    url: 'https://xkproduction.com',
    logo: 'https://xkproduction.com/images/logo-xkproduction.png',
    image: 'https://xkproduction.com/images/Xkpreviewnew.png',
    description: 'Phòng thu âm & media production chuyên nghiệp tại Bình Phước | Hoà âm phối khí | Mix & Master | Sound & Light | Đào tạo Music Producer.',
    telephone: '+84355356294',
    email: 'nguyenxuankiet294@gmail.com',
    foundingDate: '2018',
    legalName: 'XKProduction - Nguyễn Xuân Kiệt',
    address: {
      streetAddress: 'QL14 km25 xã Nghĩa Trung, Huyện Bù Đăng',
      addressLocality: 'Bù Đăng',
      addressRegion: 'Bình Phước',
      postalCode: '830000',
      addressCountry: 'VN'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+84355356294',
      contactType: 'customer service',
      availableLanguage: 'Vietnamese',
      areaServed: 'VN'
    },
    // Consistent social links across all schemas
    sameAs: [
      'https://www.facebook.com/ngxkiet',
      'https://www.youtube.com/@Xkstudio29',
      'https://www.tiktok.com/@xkstudio',
      'https://zalo.me/0355356294'
    ]
  }),
  defineWebSite({
    name: 'XKProduction',
    url: 'https://xkproduction.com',
    description: 'Phòng thu âm & media production chuyên nghiệp tại Bình Phước | Sound & Light | Đào tạo Music Producer.',
    inLanguage: 'vi-VN',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://xkproduction.com/faq?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  })
]);
</script>

<style>
.site-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  width: 100%;
}
</style>
