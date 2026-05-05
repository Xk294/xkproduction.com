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
// Global styles are loaded via nuxt.config.ts css array

// Global Default SEO Configuration
useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}` : 'XKproduction - Phòng Thu Âm Chuyên Nghiệp | Mixing | Mastering | Mv Tvc | Sản Xuất Âm Nhạc';
  },
  ogType: 'website',
  ogSiteName: 'XKProduction',
  ogTitle: 'XKProduction - Phòng Thu Âm Chuyên Nghiệp Bình Phước | Hoà Âm Phối Khí | Mix Master',
  ogDescription: 'Phòng thu âm chuyên nghiệp XKProduction tại Bình Phước: Thu âm bài hát từ 350.000₫, hoà âm phối khí, mix & master chuẩn Spotify, quay MV/TVC, cho thuê âm thanh ánh sáng sân khấu sự kiện. 2000+ dự án.',
  description: 'XKProduction — Phòng thu âm chuyên nghiệp tại Bình Phước. Thu âm bài hát giá rẻ từ 350.000₫, hoà âm phối khí online, mix master chuẩn Spotify, quay MV/TVC, sân khấu sự kiện & âm thanh ánh sáng trọn gói. Hotline: 0355.356.294',
  keywords: 'XKProduction, xkproduction.com, phòng thu âm, phòng thu âm chuyên nghiệp, phòng thu âm Bình Phước, thu âm bài hát, thu âm bài hát giá bao nhiêu, hoà âm phối khí, hoà âm phối khí online, mix master, mix master giá rẻ, mixing mastering, sản xuất âm nhạc, quay mv, quay tvc, sân khấu sự kiện, âm thanh ánh sáng, cho thuê âm thanh, cho thuê ánh sáng, live band, sound light, studio bình phước, phòng thu uy tín, bảng giá thu âm, nhạc sĩ, music producer'
});

// === CANONICAL & HREFLANG ĐỘNG THEO ROUTE (chuẩn Oscar Family) ===
const BASE_URL = 'https://xkproduction.com'
const route = useRoute()

useHead(() => {
  const currentUrl = `${BASE_URL}${route.path}`
  return {
    link: [
      { rel: 'canonical', href: currentUrl },
      { rel: 'alternate', hreflang: 'vi-VN', href: currentUrl },
      { rel: 'alternate', hreflang: 'x-default', href: currentUrl }
    ]
  }
})

// Global Default JSON-LD Schema
useSchemaOrg([
  defineOrganization({
    name: 'XKProduction',
    url: 'https://xkproduction.com',
    logo: 'https://xkproduction.com/images/xk-logo-new.jpg',
    image: 'https://xkproduction.com/images/xk-logo-new.jpg',
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
