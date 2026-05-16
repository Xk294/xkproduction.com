<template>
  <div class="site-wrapper">
    <Navbar />
    <main class="main-content">
      <NuxtPage />
    </main>
    <Footer />
    <ScrollToTopButton />
    <StickyContact />
  </div>
</template>

<script setup lang="ts">
import { useOpenGraph } from '~/composables/useOpenGraph'

// Global styles are loaded via nuxt.config.ts css array

// Global Default SEO Configuration with Open Graph, Twitter Cards & Social Previews
const route = useRoute()
const BASE_URL = 'https://xkproduction.com'

// Initialize global Open Graph configuration
useOpenGraph({
  title: 'XKProduction - Phòng Thu Âm Chuyên Nghiệp Bình Phước | Hoà Âm Phối Khí | Mix Master',
  description: 'Phòng thu âm chuyên nghiệp XKProduction tại Bình Phước: Thu âm bài hát từ 350.000₫, hoà âm phối khí, mix & master chuẩn Spotify, quay MV/TVC, cho thuê âm thanh ánh sáng sân khấu sự kiện. 2000+ dự án thành công.',
  image: 'https://xkproduction.com/images/xk-studio-production.jpg',
  type: 'business.business',
  locale: 'vi_VN',
  twitterHandle: '@xkproduction',
})

// Global SEO Meta Tags
useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}` : 'XKProduction - Phòng Thu Âm Chuyên Nghiệp | Mixing | Mastering | Quay MV/TVC | Sản Xuất Âm Nhạc';
  },
  description: 'XKProduction — Phòng thu âm chuyên nghiệp tại Bình Phước. Thu âm bài hát giá rẻ từ 350.000₫, hoà âm phối khí online, mix master chuẩn Spotify, quay MV/TVC, sân khấu sự kiện & âm thanh ánh sáng trọn gói. Hotline: 0355.356.294',
  keywords: 'XKProduction, xkproduction.com, phòng thu âm, phòng thu âm chuyên nghiệp, phòng thu âm Bình Phước, thu âm bài hát, thu âm bài hát giá bao nhiêu, hoà âm phối khí, hoà âm phối khí online, mix master, mix master giá rẻ, mixing mastering, sản xuất âm nhạc, quay mv, quay tvc, sân khấu sự kiện, âm thanh ánh sáng, cho thuê âm thanh, cho thuê ánh sáng, live band, sound light, studio bình phước, phòng thu uy tín, bảng giá thu âm, nhạc sĩ, music producer',
  author: 'XKProduction - Nguyễn Xuân Kiệt',
})

// Add JSON-LD Structured Data for better social sharing & search results
useHead(() => {
  const currentUrl = `${BASE_URL}${route.path}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://xkproduction.com',
    name: 'XKProduction',
    description: 'Phòng thu âm chuyên nghiệp, hoà âm phối khí, mix & master, quay MV/TVC, cho thuê âm thanh ánh sáng sự kiện',
    url: 'https://xkproduction.com',
    logo: 'https://xkproduction.com/images/Logoxkfix.png',
    image: 'https://xkproduction.com/images/Xkpreviewnew.png',
    telephone: '+84355356294',
    email: 'contact@xkproduction.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bình Phước, Đồng Nai',
      addressCountry: 'VN',
    },
    sameAs: [
      'https://www.facebook.com/xkproduction',
      'https://www.youtube.com/@xkproduction',
      'https://www.instagram.com/xkproduction',
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '22:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150+',
    },
  }

  return {
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(jsonLd),
      },
    ],
    link: [
      { rel: 'canonical', href: currentUrl },
      { rel: 'alternate', hreflang: 'vi-VN', href: currentUrl },
      { rel: 'alternate', hreflang: 'x-default', href: currentUrl },
      // Preload critical social images
      { rel: 'preload', as: 'image', href: 'https://xkproduction.com/images/Xkpreviewnew.png' },
      // Twitter / X Card Verification
      { rel: 'me', href: 'https://twitter.com/xkproduction' },
      // Facebook Domain Verification
      { rel: 'me', href: 'https://www.facebook.com/xkproduction' },
    ],
    meta: [
      // Social meta tags for better sharing
      { property: 'og:app_id', content: '123456789' },
      { name: 'msvalidate.01', content: 'F3F91F78FD04BB3AA39A2E05D8E3A6A3' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'apple-mobile-web-app-title', content: 'XKProduction' },
      { name: 'application-name', content: 'XKProduction' },
      { name: 'msapplication-config', content: '/favicon/browserconfig.xml' },
      { name: 'theme-color', content: '#000000' },
    ],
  }
})

// Global Default JSON-LD Schema
useSchemaOrg([
  defineOrganization({
    name: 'XKProduction',
    url: 'https://xkproduction.com',
    logo: 'https://xkproduction.com/images/Logoxkfix.png',
    image: 'https://xkproduction.com/images/Logoxkfix.png',
    description: 'Phòng thu âm & media production chuyên nghiệp tại Bình Phước | Sound & Light | Đào tạo Music Producer.',
    telephone: '+84355356294',
    email: 'xkstudio29@gmail.com',
    foundingDate: '2018',
    legalName: 'XKProduction - Nguyễn Xuân Kiệt',
    address: {
      streetAddress: 'QL14 km25 xã Nghĩa Trung, Huyện Bù Đăng',
      addressLocality: 'Bình Phước',
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
    sameAs: [
      'https://www.youtube.com/@Xkstudio29',
      'https://www.tiktok.com/@xkstudio',
      'https://www.facebook.com/ngxkiet',
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
