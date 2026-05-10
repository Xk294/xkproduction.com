<template>
<div class="home-page">
  <!-- KT2: IMMERSIVE BACKGROUND (CSS thuần - không dùng ảnh AI) -->
  <div class="immersive-bg" aria-hidden="true"></div>

  <!-- TWO-COLUMN DASHBOARD -->
  <div class="dashboard reveal-on-scroll">
    <!-- ========== LEFT COLUMN ========== -->
    <div class="col-left">
      <!-- HERO -->
      <section class="hero-section">
        <div class="hero-text">
          <h1>Recording &<br/>Music Production <br/>Sound & Light<br/><span class="neon-text">Chuyên Nghiệp</span></h1>
          <p class="hero-desc">Chúng tôi không chỉ thu âm, chúng tôi bắt trọn linh hồn của bài hát. Nơi nâng tầm nghệ thuật bằng các tiêu chuẩn khắt khe nhất về Mix, Master & Hòa âm.</p>
          <div class="hero-actions">
            <NuxtLink to="/contact" class="btn-neon">BẮT ĐẦU DỰ ÁN</NuxtLink>
            <NuxtLink to="/products" class="btn-ghost">LẮNG NGHE TÁC PHẨM</NuxtLink>
          </div>
        </div>
        <div class="hero-visual">
          <img src="/images/quocchi-2.jpg" alt="Dịch vụ phòng thu âm, hoà âm phối khí chuyên nghiệp tại XKProduction" />
        </div>
      </section>

      <!-- KT1: GLASS TRUST BAR -->
      <section class="stats-bar glass-card">
        <div v-for="s in stats" :key="s.label" class="stat-cell">
          <span class="stat-icon" v-html="s.svg"></span>
          <div class="stat-body">
            <span class="stat-number" :data-target="s.target">{{ s.value }}</span>
            <span class="stat-label">{{ s.label }}</span>
          </div>
        </div>
      </section>

      <!-- DỰ ÁN TIÊU BIỂU -->
      <section class="featured-section">
        <h2 class="section-heading neon-accent">DỰ ÁN CHẠM ĐẾN KHÁN GIẢ</h2>
        <div class="projects-grid">
          <div
            v-for="(w, i) in works" :key="i"
            class="project-card glass-card"
            @click="openLightbox(w)"
            role="button" tabindex="0"
            :aria-label="'Xem ' + w.title"
            @keydown.enter="openLightbox(w)"
          >
            <div class="project-thumb">
              <img :src="w.thumb" :alt="w.title" loading="lazy" />
              <div class="thumb-overlay">
                <i :class="w.url.includes('tiktok') ? 'fa-brands fa-tiktok fa-2x' : 'fa-brands fa-youtube fa-2x'"></i>
              </div>
            </div>
            <div class="project-info">
              <strong>{{ w.title }}</strong>
              <span>{{ w.artist }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- LIGHTBOX MODAL -->
      <Teleport to="body">
        <div v-if="lightbox.open" class="lightbox-backdrop" @click.self="closeLightbox" aria-modal="true" role="dialog">
          <div class="lightbox-inner">
            <button class="lightbox-close" @click="closeLightbox" aria-label="Đóng">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <template v-if="lightbox.embedId">
              <iframe
                :src="'https://www.youtube.com/embed/' + lightbox.embedId + '?autoplay=1&rel=0'"
                allow="autoplay; encrypted-media"
                allowfullscreen
                class="lightbox-iframe"
                loading="lazy"
              ></iframe>
            </template>
            <template v-else>
              <a :href="lightbox.url" target="_blank" rel="noopener noreferrer" class="lightbox-tiktok-link">
                <i class="fa-brands fa-tiktok"></i>
                <span>Xem trên TikTok</span>
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </template>
            <div class="lightbox-info">
              <strong>{{ lightbox.title }}</strong>
              <span>{{ lightbox.artist }}</span>
            </div>
          </div>
        </div>
      </Teleport>

    </div>

    <!-- ========== RIGHT COLUMN ========== -->
    <div class="col-right">
      <!-- DỊCH VỤ CHÍNH -->
      <section class="services-section">
        <h2 class="section-heading neon-accent">KHỞI NGUỒN CỦA NHỮNG BẢN HIT</h2>
        <div class="services-cards">
          <NuxtLink
            v-for="svc in services" :key="svc.title"
            :to="svc.link"
            class="svc-card glass-card"
          >
            <div class="svc-icon" v-html="svc.svg"></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
            <span class="svc-link neon-text-sm">Xem chi tiết</span>
          </NuxtLink>
        </div>
      </section>

      <!-- VỀ CHÚNG TÔI -->
      <section class="founder-section">
        <h2 class="section-heading neon-accent">FOUNDER</h2>
        <div class="founder-card glass-card">
          <div class="founder-avatar">
            <img src="/images/founder-kiet.jpg" alt="Nguyễn Xuân Kiệt - Music Producer & Founder XKProduction" />
          </div>
          <div class="founder-info">
            <div class="founder-name-row">
              <strong class="founder-name">Nguyễn Xuân Kiệt</strong>
              <span class="founder-title-badge">Music Producer &amp; Founder</span>
            </div>
            <blockquote class="founder-quote">"Âm nhạc không chỉ để nghe, mà là để cảm nhận.<br/>Tạo ra âm thanh là kỹ thuật, chạm đến trái tim mới là nghệ thuật."</blockquote>
            <div class="founder-credentials">
              <span><i class="fa-solid fa-award"></i> 7+ năm kinh nghiệm</span>
              <span><i class="fa-solid fa-compact-disc"></i> 2000+ dự án</span>
              <span><i class="fa-solid fa-graduation-cap"></i> 50+ học viên</span>
            </div>
            <div class="founder-socials">
              <a href="https://www.youtube.com/@Xkstudio29" target="_blank" rel="noopener" aria-label="YouTube XKProduction"><i class="fa-brands fa-youtube"></i></a>
              <a href="https://www.tiktok.com/@xkstudio" target="_blank" rel="noopener" aria-label="TikTok XKProduction"><i class="fa-brands fa-tiktok"></i></a>
              <a href="https://www.facebook.com/ngxkiet" target="_blank" rel="noopener" aria-label="Facebook XKProduction"><i class="fa-brands fa-facebook"></i></a>
            </div>
          </div>
        </div>
      </section>

      <!-- LIÊN HỆ & TƯ VẤN -->
      <section class="contact-section">
        <h2 class="section-heading neon-accent">LIÊN HỆ & TƯ VẤN</h2>
        <div class="contact-info">
          <a href="tel:0355356294" class="contact-item"><span class="ci-icon"><i class="fa-solid fa-phone"></i></span><span>Hotline: 0355.356.294</span></a>
          <a href="mailto:xkstudio29@gmail.com" class="contact-item"><span class="ci-icon"><i class="fa-solid fa-envelope"></i></span><span>Email: xkstudio29@gmail.com</span></a>
          <a href="https://zalo.me/0355356294" target="_blank" rel="noopener" class="contact-item"><span class="ci-icon"><i class="fa-solid fa-comment"></i></span><span>Zalo: 0355.356.294</span></a>
        </div>
        <Transition name="toast">
          <div v-if="formToast" class="form-toast" role="alert">
            <i class="fa-solid fa-circle-check"></i>
            <span>Đã gửi thành công! Chúng tôi sẽ liên hệ bạn sớm.</span>
          </div>
        </Transition>
        <form class="contact-form glass-card" @submit.prevent="submitForm" novalidate>
          <div class="form-group">
            <label for="cf-name">Họ và tên <span class="req">*</span></label>
            <input id="cf-name" v-model="form.name" type="text" placeholder="Nguyễn Văn A" :class="{ error: formErrors.name }" @blur="validateField('name')" />
            <span v-if="formErrors.name" class="field-error">Vui lòng nhập họ và tên</span>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label for="cf-phone">Số điện thoại <span class="req">*</span></label>
              <input id="cf-phone" v-model="form.phone" type="tel" placeholder="09xx.xxx.xxx" :class="{ error: formErrors.phone }" @blur="validateField('phone')" />
              <span v-if="formErrors.phone" class="field-error">{{ formErrors.phone }}</span>
            </div>
            <div class="form-group">
              <label for="cf-type">Loại dự án</label>
              <select id="cf-type" v-model="form.type">
                <option value="">Chọn dịch vụ...</option>
                <option>Thu âm</option>
                <option>Mix &amp; Master</option>
                <option>Hoà âm phối khí</option>
                <option>Quay MV / TVC</option>
                <option>Âm thanh sự kiện</option>
                <option>Khoá học</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="cf-msg">Lời nhắn / Yêu cầu</label>
            <textarea id="cf-msg" v-model="form.message" placeholder="Mô tả ngắn về dự án của bạn..." rows="3"></textarea>
          </div>
          <button type="submit" class="btn-neon btn-full" :disabled="formSubmitting">
            <i v-if="formSubmitting" class="fa-solid fa-spinner fa-spin"></i>
            <span>{{ formSubmitting ? 'Đang gửi...' : 'Gửi thông tin' }}</span>
          </button>
        </form>
      </section>
    </div>
  </div>

  <!-- CẢM NHẬN KHÁCH HÀNG -->
  <section class="testimonials-section full-width">
    <h2 class="section-heading neon-accent text-center" style="text-align: center; margin-bottom: 0.5rem;">CẢM NHẬN TỪ NGHỆ SĨ</h2>
    <p class="testimonials-subtitle">Hơn 2000+ nghệ sĩ đã tin tưởng XKProduction cho dự án âm nhạc của mình</p>
    <div class="testimonials-grid">
      <div
        v-for="(t, i) in testimonials.slice(0, 4)" :key="i"
        class="testimonial-card glass-card"
      >
        <div class="tcard-header">
          <div class="tcard-avatar-img">
            <img :src="t.avatar" :alt="t.name + ' - Khách hàng XKProduction'" loading="lazy" />
          </div>
          <div class="tcard-meta">
            <strong class="tcard-name">{{ t.name }}</strong>
            <span class="tcard-role">{{ t.role }}</span>
            <div class="tcard-stars">
              <i v-for="n in 5" :key="n" class="fa-solid fa-star"></i>
            </div>
          </div>
          <span class="tcard-quote-icon"><i class="fa-solid fa-quote-right"></i></span>
        </div>
        <p class="tcard-body">{{ t.body }}</p>
        <div class="tcard-project" v-if="t.project">
          <i class="fa-solid fa-music"></i>
          <span>Dự án: {{ t.project }}</span>
        </div>
      </div>
    </div>
    <!-- Google Reviews CTA -->
    <div class="reviews-cta">
      <a href="https://g.page/r/xkstudio/review" target="_blank" rel="noopener" class="btn-review">
        <i class="fa-brands fa-google"></i>
        <span>Đánh giá chúng tôi trên Google</span>
        <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.7rem;"></i>
      </a>
    </div>
  </section>
</div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'XKproduction - Phòng Thu Âm Chuyên Nghiệp | Mixing | Mastering | Mv Tvc | Sản Xuất Âm Nhạc',
  description: 'XKProduction — Phòng thu âm chuyên nghiệp tại Bình Phước: Thu âm bài hát từ 350.000₫, hoà âm phối khí, mix & master chuẩn Spotify, quay MV/TVC, cho thuê âm thanh ánh sáng sân khấu sự kiện trọn gói. Hơn 2000 dự án hoàn thiện. Hotline: 0355.356.294',
  ogTitle: 'XKProduction — Phòng Thu Âm Chuyên Nghiệp | Mix Master | Hoà Âm | Sân Khấu',
  ogDescription: 'Phòng thu âm chuyên nghiệp XKProduction: Thu âm bài hát, hoà âm phối khí, mix & master chuẩn quốc tế, quay MV/TVC & cho thuê âm thanh ánh sáng sự kiện. 2000+ dự án thành công. Hotline: 0355.356.294.',
  ogImage: 'https://xkproduction.com/images/Xkpreview.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'XKProduction - Phòng thu âm chuyên nghiệp tại Bình Phước',
  ogType: 'website',
  ogUrl: 'https://xkproduction.com',
  twitterCard: 'summary_large_image',
  twitterTitle: 'XKProduction — Phòng Thu Âm & Mix Master Chuyên Nghiệp',
  twitterDescription: 'Thu âm bài hát từ 350k, hoà âm phối khí, mix master chuẩn Spotify tại XKProduction. Hotline: 0355.356.294',
  twitterImage: 'https://xkproduction.com/images/Xkpreview.png',
  keywords: 'XKProduction, xkproduction.com, phòng thu âm, phòng thu âm chuyên nghiệp, thu âm bài hát, hoà âm phối khí, mix master, mixing mastering, sân khấu sự kiện, âm thanh ánh sáng, quay mv, quay tvc, phòng thu âm bình phước, phòng thu âm uy tín, bảng giá thu âm, studio bình phước, nhạc sĩ, sản xuất âm nhạc',
  author: 'Nguyễn Xuân Kiệt - XKProduction',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  viewport: 'width=device-width, initial-scale=1'
})
useSchemaOrg([
  defineWebPage({
    name: 'XKProduction - Phòng Thu Âm Chuyên Nghiệp | Hoà Âm | Mix Master | Bình Phước',
    description: 'Phòng thu âm chuyên nghiệp XKProduction: Thu âm bài hát, mix & master chuẩn Spotify, hoà âm phối khí, quay MV/TVC tại Bình Phước. 2000+ dự án thành công.'
  }),
  defineLocalBusiness({
    '@id': 'https://xkproduction.com/#localbusiness',
    name: 'XKProduction',
    image: 'https://xkproduction.com/images/xk-logo-new.jpg',
    logo: 'https://xkproduction.com/images/xk-logo-new.jpg',
    telephone: '+84355356294',
    email: 'xkstudio29@gmail.com',
    url: 'https://xkproduction.com',
    description: 'Phòng thu âm chuyên nghiệp — Hoà âm phối khí — Mix & Master chuẩn quốc tế — Sân khấu sự kiện — Đào tạo',
    address: {
      streetAddress: 'QL14 km25 xã Nghĩa Trung, Huyện Bù Đăng',
      addressLocality: 'Bình Phước',
      addressRegion: 'Bình Phước',
      postalCode: '830000',
      addressCountry: 'VN'
    },
    geo: { latitude: '11.71792', longitude: '107.11719' },
    hasMap: 'https://maps.google.com/?q=11.71792,107.11719',
    openingHoursSpecification: [
      { dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:00', closes: '22:00' },
      { dayOfWeek: ['Saturday','Sunday'], opens: '08:00', closes: '20:00' }
    ],
    priceRange: '350.000₫ – 3.500.000₫',
    currenciesAccepted: 'VND',
    paymentAccepted: 'Cash, Bank Transfer, Momo',
    sameAs: [
      'https://www.youtube.com/@Xkstudio29',
      'https://www.tiktok.com/@xkstudio',
      'https://www.facebook.com/ngxkiet'
    ],
    aggregateRating: {
      ratingValue: '4.9',
      ratingCount: 2000,
      bestRating: '5',
      worstRating: '1'
    }
  }),
  {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Trang chủ', 'item': 'https://xkproduction.com' }
    ]
  },
  // Review schema cho SEO
  {
    '@type': 'Review',
    'itemReviewed': { '@type': 'LocalBusiness', 'name': 'XKProduction' },
    'author': { '@type': 'Person', 'name': 'Revan' },
    'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' },
    'reviewBody': 'XKProduction là nơi đầu tiên mình cảm thấy âm nhạc của mình được thực sự lắng nghe. Từ khâu tư vấn concept đến lúc bản mix hoàn thiện, mọi chi tiết đều được chăm chút cẩn thận.'
  },
  {
    '@type': 'Review',
    'itemReviewed': { '@type': 'LocalBusiness', 'name': 'XKProduction' },
    'author': { '@type': 'Person', 'name': 'Howl' },
    'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' },
    'reviewBody': 'Sound rõ ràng, sắc nét, và quan trọng hơn — nó đúng chất. Đội ngũ làm việc chuyên nghiệp, phản hồi nhanh, không có gì phải phàn nàn.'
  },
  {
    '@type': 'Review',
    'itemReviewed': { '@type': 'LocalBusiness', 'name': 'XKProduction' },
    'author': { '@type': 'Person', 'name': 'Cao Thành Lâm' },
    'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' },
    'reviewBody': 'Họ biết cách thu âm để giọng ca được trình bày tự nhiên nhất, không bị xử lý quá tay. Mỗi session ở đây đều thoải mái và hiệu quả.'
  },
  {
    '@type': 'Review',
    'itemReviewed': { '@type': 'LocalBusiness', 'name': 'XKProduction' },
    'author': { '@type': 'Person', 'name': 'Phương Thanh Tuyền' },
    'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' },
    'reviewBody': 'Anh Kiệt tư vấn rất tận tình, giúp mình chọn được tone phù hợp với chất giọng. Bản thu hoàn thành đúng hạn, âm thanh ấm và sạch.'
  }
])

onMounted(() => {
  if (!import.meta.client) return
  
  /* === STAT COUNTER ANIMATION === */
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return
      const el = e.target as HTMLElement
      const target = parseInt(el.dataset.target || '0')
      if (!target) return
      let current = 0
      const step = Math.max(1, Math.floor(target / 60))
      const timer = setInterval(() => {
        current += step
        if (current >= target) { current = target; clearInterval(timer) }
        el.textContent = current + (el.textContent?.includes('+') ? '+' : '')
      }, 25)
      statsObserver.unobserve(el)
    })
  }, { threshold: 0.5 })
  document.querySelectorAll('.stat-number[data-target]').forEach(el => statsObserver.observe(el))
  
  /* === SCROLL REVEAL ANIMATION === */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return
      const el = e.target as HTMLElement
      el.classList.add('revealed')
      revealObserver.unobserve(el)
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' })
  
  document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el))
  
  /* === PARALLAX SCROLL EFFECT - removed (no bg image) === */
})

const stats = [
  { svg: '<i class="fa-solid fa-download fa-lg"></i>', value: '2000+', target: 2000, label: 'DỰ ÁN HOÀN THIỆN' },
  { svg: '<i class="fa-solid fa-graduation-cap fa-lg"></i>', value: '50+', target: 50, label: 'HỌC VIÊN ĐÀO TẠO' },
  { svg: '<i class="fa-solid fa-handshake fa-lg"></i>', value: '30+', target: 30, label: 'ĐỐI TÁC CHIẾN LƯỢC' },
  { svg: '<i class="fa-solid fa-clock fa-lg"></i>', value: '7', target: 7, label: 'NĂM KINH NGHIỆM' }
]

const works = [
  {
    title: 'Chẳng Muốn Nói Nhiều Lời',
    artist: 'Revan',
    url: 'https://www.youtube.com/watch?v=IxlFvQQP_4c',
    thumb: `https://img.youtube.com/vi/IxlFvQQP_4c/hqdefault.jpg`,
    embedId: 'IxlFvQQP_4c'
  },
  {
    title: 'Lý Do Bắt Đầu',
    artist: 'Revan',
    url: 'https://www.youtube.com/watch?v=vzfr1ddayYY',
    thumb: `https://img.youtube.com/vi/vzfr1ddayYY/hqdefault.jpg`,
    embedId: 'vzfr1ddayYY'
  },
  {
    title: 'Love Dự Phòng',
    artist: 'Howl',
    url: 'https://www.youtube.com/watch?v=OCnKTCslJUU',
    thumb: `https://img.youtube.com/vi/OCnKTCslJUU/hqdefault.jpg`,
    embedId: 'OCnKTCslJUU'
  },
  {
    title: 'Áo Cũ Tình Mới',
    artist: 'Remake Remix',
    url: 'https://www.youtube.com/watch?v=hlvg9YBxRqY',
    thumb: `https://img.youtube.com/vi/hlvg9YBxRqY/hqdefault.jpg`,
    embedId: 'hlvg9YBxRqY'
  },
  {
    title: 'Kiếp Sau',
    artist: 'Phương Thanh Tuyển (Cover)',
    url: 'https://www.youtube.com/watch?v=z4GB-X1OiPg',
    thumb: `https://img.youtube.com/vi/z4GB-X1OiPg/hqdefault.jpg`,
    embedId: 'z4GB-X1OiPg'
  },
  {
    title: 'Viết Tiếp Câu Chuyện Hoà Bình',
    artist: 'Mai Linh (Cover)',
    url: 'https://www.youtube.com/watch?v=P8FPXHJe_go',
    thumb: `https://img.youtube.com/vi/P8FPXHJe_go/hqdefault.jpg`,
    embedId: 'P8FPXHJe_go'
  },
  {
    title: 'Tết Xa (Cover)',
    artist: 'Khánh Linh',
    url: 'https://www.tiktok.com/@xkstudio/video/7589982843418266901?lang=vi-VN',
    thumb: '/images/quocchi-3.jpg',
    embedId: ''
  }
]

const services = [
  { svg: '<i class="fa-solid fa-music fa-lg"></i>', title: 'HOÀ ÂM PHỐI KHÍ', desc: 'Đánh thức linh hồn của bài hát. Từ ý tưởng thô sơ đến bản phối lộng lẫy, chuẩn quốc tế trên mọi nền tảng.', link: '/services' },
  { svg: '<i class="fa-solid fa-graduation-cap fa-lg"></i>', title: 'KHOÁ HỌC', desc: 'Chuyển giao đam mê. Nơi nuôi dưỡng và đào tạo những thế hệ Music Producer & Vocalist thực thụ.', link: '/courses' },
  { svg: '<i class="fa-solid fa-guitar fa-lg"></i>', title: 'LIVE BAND', desc: 'Bùng nổ cảm xúc trên sân khấu. Mang âm nhạc sống động hòa vào từng nhịp đập của khán giả.', link: '/live-band' }
]

/* === LIGHTBOX STATE === */
const lightbox = reactive({
  open: false,
  title: '',
  artist: '',
  url: '',
  embedId: ''
})

function openLightbox(w: { title: string; artist: string; url: string; embedId: string }) {
  lightbox.title = w.title
  lightbox.artist = w.artist
  lightbox.url = w.url
  lightbox.embedId = w.embedId
  lightbox.open = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightbox.open = false
  document.body.style.overflow = ''
}

if (import.meta.client) {
  const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox() }
  onMounted(() => window.addEventListener('keydown', handler))
  onUnmounted(() => window.removeEventListener('keydown', handler))
}

/* === FORM STATE === */
const form = reactive({ name: '', phone: '', type: '', message: '' })
const formErrors = reactive({ name: '', phone: '' })
const formToast = ref(false)
const formSubmitting = ref(false)

function validateField(field: 'name' | 'phone') {
  if (field === 'name') {
    formErrors.name = form.name.trim().length < 2 ? 'Vui lòng nhập họ và tên' : ''
  }
  if (field === 'phone') {
    const p = form.phone.replace(/[.\s-]/g, '')
    formErrors.phone = !/^(0[3-9]\d{8})$/.test(p) ? 'Số điện thoại không hợp lệ' : ''
  }
}

async function submitForm() {
  validateField('name')
  validateField('phone')
  if (formErrors.name || formErrors.phone) return
  formSubmitting.value = true
  try {
    const res = await fetch('https://formspree.io/f/mojybjvk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        type: form.type || 'Không chọn',
        message: form.message || '(không có lời nhắn)',
        _subject: `[XKProduction] Liên hệ nhanh từ ${form.name}`
      })
    })
    formSubmitting.value = false
    formToast.value = true
    if (res.ok) {
      Object.assign(form, { name: '', phone: '', type: '', message: '' })
    }
  } catch {
    formSubmitting.value = false
    formToast.value = true
  }
  setTimeout(() => { formToast.value = false }, 4000)
}

/* === AVATAR GRADIENTS === */
const avatarGradients = [
  'linear-gradient(135deg, #1a8cff 0%, #00d4aa 100%)',
  'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
]

const testimonials = [
  {
    name: 'Revan',
    role: 'Nghệ Sĩ / Rapper',
    avatar: '/images/revan.jpg',
    project: 'Chẳng Muốn Nói Nhiều Lời',
    body: 'Mình đã trải qua không ít phòng thu, nhưng XKProduction là nơi đầu tiên mình cảm thấy âm nhạc của mình được thực sự lắng nghe. Từ khâu tư vấn concept đến lúc bản mix hoàn thiện, mọi chi tiết đều được chăm chút cẩn thận. Kiet và team không chỉ làm đúng yêu cầu — họ còn biết cách đẩy bản nhạc lên một tầng cao hơn mà mình chưa nghĩ tới. Hài lòng, có tâm và thực sự có tầm.'
  },
  {
    name: 'Howl',
    role: 'Nghệ Sĩ / Rapper',
    avatar: '/images/howl.jpg',
    project: 'Love Dự Phòng',
    body: 'Đến XKProduction lần đầu mình không kỳ vọng nhiều, nhưng kết quả cuối cùng vượt xa những gì mình tưởng tượng. Sound rõ ràng, sắc nét, và quan trọng hơn — nó đúng chất. Đội ngũ làm việc chuyên nghiệp, phản hồi nhanh, không có gì phải phàn nàn.'
  },
  {
    name: 'Cao Thành Lâm',
    role: 'Singer',
    avatar: '/images/cao-thanh-lam.jpg',
    project: '',
    body: 'Với mình, giọng hát là tất cả. XKProduction hiểu điều đó. Họ biết cách thu âm để giọng ca được trình bày tự nhiên nhất, không bị xử lý quá tay. Mỗi session ở đây đều thoải mái và hiệu quả. Chắc chắn sẽ quay lại cho những dự án tiếp theo.'
  },
  {
    name: 'Fesu',
    role: 'Singer',
    avatar: '/images/fesu.jpg',
    project: '',
    body: 'XKProduction có một điều mà không phải studio nào cũng có — sự kiên nhẫn. Họ không rush, không qua loa. Ngồi làm việc cùng team ở đây mình học được rất nhiều về cách xây dựng âm thanh. Sản phẩm ra lò chất lượng, mình tự hào khi chia sẻ lên mạng.'
  },
  {
    name: 'Phương Thanh Tuyền',
    role: 'Singer',
    avatar: '/images/quocchi-3.jpg',
    project: 'Kiếp Sau (Cover)',
    body: 'Lần đầu vào studio mình khá hồi hộp, nhưng không khí ở XKProduction rất thân thiện và chuyên nghiệp. Anh Kiệt tư vấn rất tận tình, giúp mình chọn được tone phù hợp với chất giọng. Bản thu hoàn thành đúng hạn, âm thanh ấm và sạch — đúng những gì mình cần.'
  }
]
</script>

<style scoped>
/* ==============================================
   GLASSMORPHISM SYSTEM — Apple iOS / macOS
   ============================================== */

.home-page {
  position: relative;
  min-height: 100vh;
  padding-top: 72px;
}

/* === IMMERSIVE BG (CSS gradient - no image) === */
.immersive-bg {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 80% 60% at 20% 30%, rgba(26,140,255,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 80% 70%, rgba(0,229,192,0.06) 0%, transparent 60%),
    radial-gradient(ellipse 100% 100% at 50% 0%, rgba(139,92,246,0.05) 0%, transparent 50%),
    linear-gradient(180deg, #06080f 0%, #080b14 100%);
  animation: bgDrift 18s ease-in-out infinite alternate;
}
@keyframes bgDrift {
  0%   { opacity: 0.85; }
  100% { opacity: 1; }
}

/* === GLASS CARD BASE === */
.glass-card {
  position: relative;
  backdrop-filter: blur(28px) saturate(2);
  -webkit-backdrop-filter: blur(28px) saturate(2);
  background: rgba(255, 255, 255, 0.055);
  border: 1.5px solid rgba(26, 140, 255, 0.08);
  border-radius: 22px;
  box-shadow:
    0 10px 40px rgba(0,0,0,0.35),
    0 0 60px rgba(26,140,255,0.06),
    inset 0 1px 0 rgba(255,255,255,0.1),
    inset 0 -1px 0 rgba(0,0,0,0.16);
  transition: all 0.42s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
}
/* Top-left glint */
.glass-card::before {
  content: '';
  position: absolute; inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.05) 0%,
    transparent 45%,
    rgba(26,140,255,0.02) 100%
  );
  pointer-events: none;
  z-index: 0;
}
/* Glare sweep on hover */
.glass-card::after {
  content: '';
  position: absolute;
  top: -100%; left: -100%;
  width: 55%; height: 280%;
  background: linear-gradient(
    108deg,
    transparent 20%,
    rgba(255,255,255,0.042) 50%,
    transparent 80%
  );
  transition: left 0.62s ease, top 0.62s ease;
  pointer-events: none;
  transform: skewX(-14deg);
  z-index: 1;
}
.glass-card:hover::after {
  left: 155%;
}
.glass-card:hover {
  background: rgba(255,255,255,0.09);
  border-color: rgba(26,140,255,0.28);
  box-shadow:
    0 20px 60px rgba(0,0,0,0.45),
    0 0 50px rgba(26,140,255,0.12),
    inset 0 1px 0 rgba(255,255,255,0.12);
  transform: translateY(-3px);
}

/* === TEXT === */
.neon-text {
  background: linear-gradient(135deg, #5bbfff 0%, #00e5c0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 24px rgba(26,140,255,0.6)) drop-shadow(0 0 12px rgba(0,229,192,0.4));
}
.neon-text-sm { 
  color: #5bbfff; 
  text-shadow: 0 0 16px rgba(26,140,255,0.65), 0 0 8px rgba(0,229,192,0.35); 
  font-weight: 700;
}
.neon-accent  { text-shadow: 0 0 18px rgba(26,140,255,0.25), 0 0 8px rgba(0,229,192,0.1); }

/* === BUTTONS === */
.btn-neon {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.76rem 1.7rem;
  background: linear-gradient(135deg, #1a8cff 0%, #005fcc 100%);
  color: #fff; font-weight: 700; font-size: 0.78rem;
  letter-spacing: 1.2px; border: none; border-radius: 12px;
  cursor: pointer; text-decoration: none;
  box-shadow: 0 0 30px rgba(26,140,255,0.45), 0 4px 20px rgba(0,0,0,0.35);
  transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
  position: relative; overflow: hidden;
  animation: ctaPulse 2.6s ease-in-out infinite;
}
@keyframes ctaPulse {
  0%, 100% { box-shadow: 0 0 30px rgba(26,140,255,0.45), 0 4px 20px rgba(0,0,0,0.35); }
  50%       { box-shadow: 0 0 50px rgba(26,140,255,0.75), 0 4px 25px rgba(0,0,0,0.45); }
}
.btn-neon::after {
  content: ''; position: absolute; top: -50%; left: -60%;
  width: 200%; height: 200%;
  background: linear-gradient(45deg, transparent 38%, rgba(255,255,255,0.15) 50%, transparent 62%);
  transition: left 0.52s ease;
}
.btn-neon:hover {
  box-shadow: 0 0 60px rgba(26,140,255,0.85), 0 8px 30px rgba(0,0,0,0.5);
  transform: translateY(-4px);
  color: #fff;
  animation: none;
}
.btn-neon:hover::after { left: 100%; }

.btn-ghost {
  display: inline-flex; align-items: center;
  padding: 0.76rem 1.7rem;
  backdrop-filter: blur(14px);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.9);
  border: 1.5px solid rgba(26,140,255,0.22);
  border-radius: 12px; font-weight: 700;
  font-size: 0.78rem; letter-spacing: 1.2px;
  cursor: pointer; text-decoration: none; transition: all 0.35s;
}
.btn-ghost:hover {
  background: rgba(26,140,255,0.12);
  border-color: rgba(26,140,255,0.55);
  box-shadow: 0 0 30px rgba(26,140,255,0.2), inset 0 0 20px rgba(26,140,255,0.05);
  transform: translateY(-3px);
  color: #fff;
}

/* === LAYOUT === */
.dashboard {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1.55fr 1fr;
  gap: 2rem; max-width: 1300px;
  margin: 0 auto; padding: 2rem 2rem 5rem;
}
.col-left, .col-right {
  display: flex; flex-direction: column; gap: 1.75rem; min-width: 0;
}
.section-heading {
  font-size: 0.82rem; font-weight: 800;
  letter-spacing: 3.5px; color: rgba(255,255,255,0.95);
  margin-bottom: 1.2rem; text-transform: uppercase;
  animation: headingGlow 2s ease-in-out infinite;
}
@keyframes headingGlow {
  0%, 100% { text-shadow: 0 0 18px rgba(26,140,255,0.25); }
  50% { text-shadow: 0 0 28px rgba(26,140,255,0.4); }
}

/* === HERO === */
.hero-section {
  display: grid; grid-template-columns: 1fr 1.15fr;
  gap: 2.5rem; align-items: center;
}
.hero-text h1 {
  font-size: 1.95rem; font-weight: 800; line-height: 1.22;
  color: var(--text-main); margin-bottom: 1rem; letter-spacing: -0.01em;
  animation: titleReveal 0.8s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes titleReveal {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.hero-text h1 .neon-text { font-size: 2.35rem; display: inline-block; margin-top: 0.1rem; }
.hero-desc {
  color: rgba(156,175,207,0.9); font-size: 0.88rem;
  line-height: 1.75; margin-bottom: 1.6rem; max-width: 370px;
  font-weight: 500;
}
.hero-actions { display: flex; gap: 0.8rem; flex-wrap: wrap; }
.hero-visual {
  position: relative; border-radius: 20px; overflow: hidden;
  border: 2px solid rgba(26,140,255,0.15);
  box-shadow: 0 25px 70px rgba(0,0,0,0.55), 0 0 50px rgba(26,140,255,0.1);
}
.hero-visual img { width: 100%; aspect-ratio: 16/10; object-fit: cover; display: block; }

/* === STATS BAR === */
.stats-bar {
  display: grid; grid-template-columns: repeat(4,1fr);
  gap: 0.75rem; padding: 1.4rem 1.6rem;
  transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
}
.stats-bar:hover {
  background: rgba(255,255,255,0.08);
  box-shadow: 0 0 40px rgba(26,140,255,0.12);
}
.stat-cell { 
  display: flex; align-items: center; gap: 0.7rem; padding: 0.4rem;
  transition: all 0.35s;
}
.stat-cell:hover {
  transform: translateY(-2px);
}
.stat-icon {
  color: #5bbfff; flex-shrink: 0; display: flex;
  filter: drop-shadow(0 0 12px rgba(26,140,255,0.65));
  font-size: 1.3rem;
}
.stat-body { display: flex; flex-direction: column; }
.stat-number {
  font-size: 1.6rem; font-weight: 800; color: #fff; line-height: 1;
  text-shadow: 0 0 16px rgba(26,140,255,0.25);
}
.stat-label {
  font-size: 0.6rem; font-weight: 700; letter-spacing: 1px;
  color: rgba(156,175,207,0.7); text-transform: uppercase; margin-top: 0.25rem;
}

/* === PROJECTS === */
.projects-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.9rem; }
.project-card {
  cursor: pointer; transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
  text-decoration: none; display: block;
  border: 1px solid rgba(26,140,255,0.12);
}
.project-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(26,140,255,0.55);
  box-shadow: 0 25px 55px rgba(0,0,0,0.5), 0 0 40px rgba(26,140,255,0.2), inset 0 0 20px rgba(26,140,255,0.05);
}
.project-thumb { position: relative; aspect-ratio: 16/10; overflow: hidden; border-radius: 18px; }
.project-thumb img {
  width: 100%; height: 100%; object-fit: cover;
  display: block; transition: transform 0.65s cubic-bezier(0.23,1,0.32,1);
}
.project-card:hover .project-thumb img { transform: scale(1.15); }
.thumb-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%);
  display: flex; align-items: center; justify-content: center;
  color: #fff; opacity: 0; transition: opacity 0.42s cubic-bezier(0.23,1,0.32,1);
}
.project-card:hover .thumb-overlay { opacity: 1; }
.thumb-overlay i { 
  font-size: 2.2rem; 
  filter: drop-shadow(0 0 16px rgba(26,140,255,0.85)); 
  animation: iconPulse 1.5s ease-in-out infinite;
}
@keyframes iconPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
.project-info { padding: 0.75rem 0.85rem; }
.project-info strong { 
  display: block; font-size: 0.8rem; color: #e6edf3; margin-bottom: 0.15rem;
  font-weight: 700; letter-spacing: 0.3px;
}
.project-info span  { 
  font-size: 0.7rem; color: rgba(156,175,207,0.75);
  font-weight: 500;
}

/* === SERVICE CARDS === */
.services-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.85rem; }
.svc-card {
  padding: 1.5rem 0.9rem; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 0.55rem;
  cursor: pointer; text-decoration: none;
  transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
  position: relative;
}
.svc-card::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(circle at 30% 30%, rgba(26,140,255,0.1) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.42s;
  border-radius: 22px;
}
.svc-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 40px rgba(26,140,255,0.15);
}
.svc-card:hover::before {
  opacity: 1;
}
.svc-icon {
  color: #5bbfff; margin-bottom: 0.25rem;
  filter: drop-shadow(0 0 14px rgba(26,140,255,0.65));
  transition: all 0.35s;
  font-size: 2rem;
}
.svc-card:hover .svc-icon {
  transform: scale(1.15);
  filter: drop-shadow(0 0 20px rgba(26,140,255,0.85));
}
.svc-card h3 { font-size: 0.68rem; font-weight: 700; letter-spacing: 1.2px; color: #e6edf3; }
.svc-card p  { font-size: 0.7rem; color: rgba(156,175,207,0.75); line-height: 1.55; flex: 1; }
.svc-link    { font-size: 0.7rem; font-weight: 700; text-decoration: none; transition: all 0.25s; }
.svc-link:hover { text-shadow: 0 0 20px rgba(26,140,255,0.9); color: #fff; }

/* === FOUNDER === */
.founder-card { 
  display: flex; gap: 1.5rem; align-items: center; padding: 1.5rem;
  transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
}
.founder-card:hover {
  background: rgba(255,255,255,0.08);
  box-shadow: 0 0 40px rgba(26,140,255,0.12);
  transform: translateY(-2px);
}
.founder-avatar {
  width: 96px; height: 96px; flex-shrink: 0;
  border-radius: 16px; overflow: hidden;
  border: 2px solid rgba(26,140,255,0.25);
  box-shadow: 0 0 30px rgba(26,140,255,0.2);
  transition: all 0.35s;
}
.founder-card:hover .founder-avatar {
  transform: scale(1.08);
  box-shadow: 0 0 45px rgba(26,140,255,0.35);
  border-color: rgba(26,140,255,0.4);
}
.founder-avatar img { width: 100%; height: 100%; object-fit: cover; }
.founder-quote blockquote {
  font-size: 0.88rem; font-weight: 500; font-style: italic;
  color: rgba(230,237,243,0.95); line-height: 1.7;
  margin: 0 0 0.6rem; border: none; padding: 0;
}
.founder-quote cite {
  font-style: normal; font-weight: 700;
  font-size: 0.8rem; color: #5bbfff;
  text-shadow: 0 0 12px rgba(26,140,255,0.4);
}

/* === CONTACT === */
.contact-info { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.15rem; }
.contact-item {
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.83rem; color: rgba(156,175,207,0.85);
  transition: all 0.3s;
  padding: 0.35rem 0;
}
.contact-item:hover {
  color: rgba(230,237,243,0.95);
  transform: translateX(4px);
}
.ci-icon { font-size: 0.95rem; flex-shrink: 0; color: #5bbfff; filter: drop-shadow(0 0 8px rgba(26,140,255,0.5)); }
.contact-form { display: flex; flex-direction: column; gap: 0.65rem; padding: 1.35rem; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; }
.contact-form input,
.contact-form select,
.contact-form textarea {
  width: 100%;
  background: rgba(255,255,255,0.055);
  backdrop-filter: blur(10px);
  border: 1.5px solid rgba(26,140,255,0.12);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  color: #e6edf3; font-family: inherit; font-size: 0.83rem;
  transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
  font-weight: 500;
}
.contact-form input::placeholder,
.contact-form textarea::placeholder { color: rgba(156,175,207,0.48); }
.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: rgba(26,140,255,0.65);
  background: rgba(26,140,255,0.08);
  box-shadow: 0 0 0 4px rgba(26,140,255,0.12), 0 0 20px rgba(26,140,255,0.15);
  background-clip: padding-box;
}
.contact-form select { appearance: none; cursor: pointer; padding-right: 2.5rem; }
.contact-form textarea { resize: vertical; min-height: 70px; }

/* === TESTIMONIALS === */
.testimonials-section.full-width {
  position: relative; z-index: 1;
  max-width: 1300px; margin: 0 auto;
  padding: 0 2rem 5rem;
}
.testimonials-subtitle {
  text-align: center;
  color: rgba(156,175,207,0.7);
  font-size: 0.85rem;
  margin-bottom: 2rem;
  font-weight: 500;
}
.testimonials-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.25rem; }
.testimonial-card {
  padding: 1.35rem 1.2rem;
  display: flex; flex-direction: column; gap: 0.8rem; cursor: default;
  transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
}
.testimonial-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 50px rgba(0,0,0,0.45), 0 0 35px rgba(26,140,255,0.15);
  border-color: rgba(26,140,255,0.25);
}
.tcard-header { display: flex; align-items: flex-start; gap: 0.8rem; }
/* Avatar with real image */
.tcard-avatar-img {
  width: 52px; height: 52px; flex-shrink: 0; border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(26,140,255,0.3);
  box-shadow: 0 0 20px rgba(26,140,255,0.4);
  transition: all 0.35s;
}
.tcard-avatar-img img {
  width: 100%; height: 100%; object-fit: cover;
}
.testimonial-card:hover .tcard-avatar-img {
  transform: scale(1.1);
  box-shadow: 0 0 30px rgba(26,140,255,0.65);
  border-color: rgba(26,140,255,0.55);
}
.tcard-meta { flex: 1; display: flex; flex-direction: column; gap: 0.1rem; }
.tcard-name { font-size: 0.86rem; font-weight: 700; color: #e6edf3; letter-spacing: 0.3px; }
.tcard-role { font-size: 0.7rem; color: rgba(156,175,207,0.75); letter-spacing: 0.5px; font-weight: 600; }
.tcard-stars { display: flex; gap: 2px; margin-top: 0.2rem; }
.tcard-stars i { font-size: 0.62rem; color: #f5c542; filter: drop-shadow(0 0 6px rgba(245,197,66,0.7)); }
.tcard-quote-icon { color: rgba(26,140,255,0.25); font-size: 1.5rem; flex-shrink: 0; margin-top: -0.1rem; }
.tcard-body {
  font-size: 0.78rem; color: rgba(156,175,207,0.85);
  line-height: 1.75; font-style: italic; margin: 0; flex: 1;
}
/* Project tag */
.tcard-project {
  display: flex; align-items: center; gap: 0.4rem;
  font-size: 0.7rem; font-weight: 600;
  color: rgba(91,191,255,0.8);
  padding-top: 0.4rem;
  border-top: 1px solid rgba(26,140,255,0.1);
}
.tcard-project i { font-size: 0.65rem; }
/* Google Reviews CTA */
.reviews-cta {
  text-align: center;
  margin-top: 2rem;
}
.btn-review {
  display: inline-flex; align-items: center; gap: 0.55rem;
  padding: 0.7rem 1.5rem;
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(26,140,255,0.15);
  border-radius: 50px;
  color: rgba(230,237,243,0.85);
  font-size: 0.82rem; font-weight: 700;
  text-decoration: none;
  transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
}
.btn-review:hover {
  background: rgba(26,140,255,0.1);
  border-color: rgba(26,140,255,0.45);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 0 25px rgba(26,140,255,0.2);
}
.btn-review i:first-child { font-size: 1rem; color: #4285f4; }

/* === REVEAL ON SCROLL ANIMATION === */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  animation: revealFadeIn 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
.revealed {
  opacity: 1;
  transform: translateY(0);
}
@keyframes revealFadeIn {
  0% { opacity: 0; transform: translateY(30px); filter: blur(4px); }
  100% { opacity: 1; transform: translateY(0); filter: blur(0); }
}

/* === RESPONSIVE === */
@media (max-width: 1024px) {
  .dashboard { grid-template-columns: 1fr; gap: 1.75rem; }
  .hero-section { grid-template-columns: 1fr 1fr; }
  .testimonials-grid { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 768px) {
  .dashboard { padding: 1.25rem; }
  .testimonials-section.full-width { padding: 0 1.25rem 3rem; }
  .hero-section { grid-template-columns: 1fr; gap: 1.5rem; }
  .hero-text h1 { font-size: 1.6rem; }
  .hero-text h1 .neon-text { font-size: 1.95rem; }
  .stats-bar { grid-template-columns: repeat(2,1fr); }
  .projects-grid { grid-template-columns: repeat(2,1fr); }
  .services-cards { grid-template-columns: 1fr; }
  .founder-card { flex-direction: column; text-align: center; }
  .testimonials-grid { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 480px) {
  .home-page { padding-top: 56px; }
  .hero-text h1 { font-size: 1.4rem; }
  .hero-text h1 .neon-text { font-size: 1.7rem; }
  .stats-bar { grid-template-columns: 1fr 1fr; padding: 1rem; }
  .projects-grid { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
  .testimonials-grid { grid-template-columns: 1fr; }
}

/* === LIGHTBOX === */
.lightbox-backdrop {
  position: fixed; inset: 0; z-index: 9000;
  background: rgba(0,0,0,0.88);
  backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem;
  animation: fadeIn 0.22s ease;
}
@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
.lightbox-inner {
  position: relative;
  width: 100%; max-width: 860px;
  background: rgba(8,12,24,0.92);
  border: 1.5px solid rgba(26,140,255,0.2);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(26,140,255,0.12);
  animation: slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes slideUp { from { transform: translateY(30px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
.lightbox-close {
  position: absolute; top: 0.85rem; right: 0.85rem; z-index: 10;
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);
  color: #fff; font-size: 1rem; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.lightbox-close:hover { background: rgba(255,80,80,0.3); border-color: rgba(255,80,80,0.5); }
.lightbox-iframe {
  width: 100%; aspect-ratio: 16/9; display: block; border: none;
  background: #000;
}
.lightbox-tiktok-link {
  display: flex; align-items: center; justify-content: center;
  gap: 0.8rem; padding: 3rem 2rem;
  font-size: 1.1rem; font-weight: 700; color: #fff;
  text-decoration: none; background: linear-gradient(135deg, #010101 0%, #1a1a2e 100%);
  transition: all 0.3s;
}
.lightbox-tiktok-link:hover { color: #00e5c0; }
.lightbox-tiktok-link i { font-size: 2rem; }
.lightbox-info {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.9rem 1.2rem;
  background: rgba(255,255,255,0.03);
  border-top: 1px solid rgba(255,255,255,0.06);
}
.lightbox-info strong { font-size: 0.88rem; color: #e6edf3; }
.lightbox-info span { font-size: 0.75rem; color: rgba(156,175,207,0.7); }

/* === PROJECT CARD cursor fix === */
.project-card { cursor: pointer; }

/* === FORM LABELS & VALIDATION === */
.form-group { display: flex; flex-direction: column; gap: 0.35rem; }
.form-group label {
  font-size: 0.73rem; font-weight: 700; letter-spacing: 0.6px;
  color: rgba(156,175,207,0.85); text-transform: uppercase;
}
.req { color: #ff6b6b; }
.field-error {
  font-size: 0.7rem; color: #ff6b6b;
  display: flex; align-items: center; gap: 0.3rem;
}
.contact-form input.error,
.contact-form select.error {
  border-color: rgba(255,107,107,0.6) !important;
  background: rgba(255,107,107,0.06) !important;
}
.btn-neon:disabled {
  opacity: 0.65; cursor: not-allowed; animation: none;
  transform: none !important;
}

/* === FORM TOAST === */
.form-toast {
  display: flex; align-items: center; gap: 0.7rem;
  padding: 0.9rem 1.2rem; border-radius: 14px; margin-bottom: 0.75rem;
  background: rgba(0,229,192,0.1);
  border: 1.5px solid rgba(0,229,192,0.3);
  color: #00e5c0; font-size: 0.83rem; font-weight: 600;
}
.form-toast i { font-size: 1.1rem; flex-shrink: 0; }
.toast-enter-active, .toast-leave-active { transition: all 0.35s cubic-bezier(0.23,1,0.32,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-10px); }

/* === CONTACT ITEMS as links === */
a.contact-item { text-decoration: none; color: inherit; cursor: pointer; }
a.contact-item:hover { color: rgba(230,237,243,0.95); transform: translateX(4px); }

/* === FOUNDER EXPANDED === */
.founder-info { flex: 1; display: flex; flex-direction: column; gap: 0.7rem; }
.founder-name-row { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
.founder-name { font-size: 1rem; font-weight: 800; color: #e6edf3; }
.founder-title-badge {
  font-size: 0.65rem; font-weight: 700; letter-spacing: 1px;
  padding: 0.2rem 0.65rem; border-radius: 20px;
  background: rgba(26,140,255,0.15); border: 1px solid rgba(26,140,255,0.28);
  color: #5bbfff; text-transform: uppercase;
}
.founder-quote {
  font-size: 0.85rem; font-weight: 500; font-style: italic;
  color: rgba(230,237,243,0.9); line-height: 1.7;
  margin: 0; padding: 0; border: none;
}
.founder-credentials {
  display: flex; gap: 1rem; flex-wrap: wrap;
}
.founder-credentials span {
  font-size: 0.72rem; font-weight: 600;
  color: rgba(156,175,207,0.8); display: flex; align-items: center; gap: 0.35rem;
}
.founder-credentials i { color: #5bbfff; font-size: 0.8rem; }
.founder-socials { display: flex; gap: 0.6rem; }
.founder-socials a {
  width: 32px; height: 32px; border-radius: 8px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(26,140,255,0.15);
  display: flex; align-items: center; justify-content: center;
  color: rgba(156,175,207,0.8); font-size: 0.85rem;
  text-decoration: none; transition: all 0.28s;
}
.founder-socials a:hover {
  background: rgba(26,140,255,0.15); border-color: rgba(26,140,255,0.45);
  color: #5bbfff; transform: translateY(-2px);
}
</style>
