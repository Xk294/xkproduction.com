<template>
  <div class="services-page-wrap">
    <!-- INTERACTIVE AMBIENT GLOW BACKDROP -->
    <div class="immersive-ambient-bg" aria-hidden="true">
      <div class="glow-spot spotlight-1"></div>
      <div class="glow-spot spotlight-2"></div>
    </div>

    <!-- ===== HERO SECTION ===== -->
    <section class="page-hero">
      <div class="max-width">
        <span class="hero-badge"><i class="fa-solid fa-layer-group"></i> XKPRODUCTION</span>
        <h1 class="page-hero-title">Dịch Vụ & <span class="text-gradient-animated">Bảng Giá</span></h1>
        <p class="page-hero-sub">Tổng hợp các giải pháp âm nhạc chuyên nghiệp. Mỗi dịch vụ đều được đầu tư bài bản, chỉnh chu với quy trình làm việc chuẩn quốc tế.</p>
        <div class="hero-actions-scroll">
          <button @click="scrollToPricing" class="btn btn-primary btn-pulse">Xem bảng giá chi tiết</button>
        </div>
      </div>
    </section>

    <!-- ===== SECTION 1: DỊCH VỤ TỔNG QUAN ===== -->
    <section class="section-block">
      <div class="max-width">
        <div class="section-header-center text-center">
          <span class="header-tag">HỆ SINH THÁI</span>
          <h2 class="section-heading-heavy text-center">Các Giải Pháp Âm Nhạc</h2>
          <p class="section-subtitle">Tìm kiếm giải pháp phù hợp với định hướng phát triển âm nhạc của bạn</p>
        </div>

        <div class="packages-header glass-card">
          <div class="search-bar">
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input type="text" v-model="search" placeholder="Tìm kiếm dịch vụ..." aria-label="Tìm kiếm dịch vụ" />
          </div>
          <div class="filter-group">
            <button
              v-for="cat in categories" :key="cat"
              class="filter-btn"
              :class="{ active: activeCategory === cat }"
              @click="activeCategory = cat"
            >{{ cat }}</button>
          </div>
        </div>

        <div class="packages-grid">
          <NuxtLink
            v-for="pkg in filteredPackages" :key="pkg.title"
            :to="pkg.link"
            class="package-card glass-card hover-lift"
          >
            <div class="package-card-header">
              <div class="package-icon"><i :class="pkg.faIcon"></i></div>
              <div class="package-title-area">
                <h3>{{ pkg.title }}</h3>
                <span class="package-category">{{ pkg.category }}</span>
              </div>
              <div class="package-badge" v-if="pkg.isPopular"><i class="fa-solid fa-star"></i></div>
            </div>
            <p class="package-desc">{{ pkg.desc }}</p>
            <div class="package-footer">
              <div class="package-price-bar" :class="'bar-' + pkg.color"></div>
              <span class="package-price" :class="'text-' + pkg.color">{{ pkg.price }}</span>
              <span class="package-arrow"><i class="fa-solid fa-arrow-right-long"></i></span>
            </div>
          </NuxtLink>
        </div>

        <div v-if="filteredPackages.length === 0" class="empty-state glass-card">
          <i class="fa-solid fa-magnifying-glass-chart"></i>
          <p>Không tìm thấy dịch vụ phù hợp. Hãy thử từ khóa khác.</p>
        </div>
      </div>
    </section>

    <!-- ===== SECTION: GÓI COMBO TIẾT KIỆM ===== -->
    <PricingBundles />

    <!-- ===== SECTION 2: BẢNG GIÁ CHI TIẾT ===== -->
    <section id="pricing-section" class="section-block section-pricing">
      <div class="max-width">
        <div class="section-header-center text-center" style="margin-bottom: 5rem;">
          <span class="header-tag">BÁO GIÁ MINH BẠCH</span>
          <h2 class="section-heading-heavy text-center">Bảng Giá Chi Tiết</h2>
          <p class="section-subtitle">Cam kết không phát sinh chi phí phụ, hoàn thiện đến khi ưng ý</p>
        </div>

        <!-- Thu âm -->
        <div class="pricing-category-block">
          <h3 class="pricing-cat"><i class="fa-solid fa-microphone"></i> Thu âm bài hát</h3>
          <div class="pricing-table">
            <div v-for="p in thuAmPlans" :key="p.name" class="pricing-card glass-card hover-lift" :class="{ featured: p.featured }">
              <div v-if="p.badge" class="pricing-badge">{{ p.badge }}</div>
              <h4 class="pricing-name">{{ p.name }}</h4>
              <div class="pricing-price">{{ p.price }}</div>
              <p class="pricing-desc">{{ p.desc }}</p>
              <ul class="pricing-features">
                <li v-for="f in p.features" :key="f">{{ f }}</li>
              </ul>
              <NuxtLink to="/contact?service=thu-am" class="btn btn-primary pricing-cta">Đặt lịch ngay</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Mix & Master -->
        <div class="pricing-category-block">
          <h3 class="pricing-cat"><i class="fa-solid fa-sliders"></i> Mixing &amp; Mastering</h3>
          <div class="pricing-table">
            <div v-for="p in mixPlans" :key="p.name" class="pricing-card glass-card hover-lift" :class="{ featured: p.featured }">
              <div v-if="p.badge" class="pricing-badge">{{ p.badge }}</div>
              <h4 class="pricing-name">{{ p.name }}</h4>
              <div class="pricing-price">{{ p.price }}</div>
              <p class="pricing-desc">{{ p.desc }}</p>
              <ul class="pricing-features">
                <li v-for="f in p.features" :key="f">{{ f }}</li>
              </ul>
              <NuxtLink to="/contact?service=mix-master" class="btn btn-primary pricing-cta">Đặt lịch ngay</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Hòa âm phối khí -->
        <div class="pricing-category-block">
          <h3 class="pricing-cat"><i class="fa-solid fa-keyboard"></i> Hòa âm phối khí</h3>
          <div class="pricing-table">
            <div v-for="p in hoaAmPlans" :key="p.name" class="pricing-card glass-card hover-lift" :class="{ featured: p.featured }">
              <div v-if="p.badge" class="pricing-badge">{{ p.badge }}</div>
              <h4 class="pricing-name">{{ p.name }}</h4>
              <div class="pricing-price">{{ p.price }}</div>
              <p class="pricing-desc">{{ p.desc }}</p>
              <ul class="pricing-features">
                <li v-for="f in p.features" :key="f">{{ f }}</li>
              </ul>
              <NuxtLink to="/contact?service=hoa-am" class="btn btn-primary pricing-cta">Đặt lịch ngay</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Kí âm sheet nhạc -->
        <div class="pricing-category-block">
          <h3 class="pricing-cat"><i class="fa-solid fa-file-audio"></i> Kí âm sheet nhạc</h3>
          <div class="pricing-table single-plan">
            <div class="pricing-card glass-card hover-lift">
              <h4 class="pricing-name">Kí âm chuyên nghiệp</h4>
              <div class="pricing-price">200.000₫ – 500.000₫</div>
              <p class="pricing-desc">Kí âm các bản nhạc, tạo sheet nhạc chuyên nghiệp cho ca sĩ, nhạc công, hoặc đăng ký bản quyền.</p>
              <ul class="pricing-features">
                <li>Nghe và chép lại thành bản nhạc (Sheet nhạc)</li>
                <li>Chép hợp âm, giai điệu, lời bài hát chuẩn xác</li>
                <li>Xuất file PDF, MIDI, MusicXML</li>
              </ul>
              <NuxtLink to="/contact?service=other" class="btn btn-primary pricing-cta">Tư vấn ngay</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Live Band & Âm thanh Sự kiện -->
        <div class="pricing-category-block">
          <h3 class="pricing-cat"><i class="fa-solid fa-guitar"></i> Live Band &amp; Âm thanh Sự kiện</h3>
          <div class="pricing-table">
            <div v-for="p in liveBandPlans" :key="p.name" class="pricing-card glass-card hover-lift" :class="{ featured: p.featured }">
              <div v-if="p.badge" class="pricing-badge">{{ p.badge }}</div>
              <h4 class="pricing-name">{{ p.name }}</h4>
              <div class="pricing-price">{{ p.price }}</div>
              <p class="pricing-desc">{{ p.desc }}</p>
              <ul class="pricing-features">
                <li v-for="f in p.features" :key="f">{{ f }}</li>
              </ul>
              <NuxtLink to="/contact?service=live-band" class="btn btn-primary pricing-cta">Nhận báo giá</NuxtLink>
            </div>
          </div>
          <p class="lb-note"><i class="fa-solid fa-circle-info"></i> Giá báo trên là tham khảo — thực tế phụ thuộc địa điểm, quy mô sự kiện và yêu cầu cụ thể. Liên hệ để được tư vấn miễn phí.</p>
        </div>

        <!-- CTA BLOCK -->
        <div class="pricing-cta-block glass-card text-center">
          <div class="cta-glow-spot"></div>
          <h2>Cần giải pháp thiết kế riêng?</h2>
          <p>Dự án đặc biệt, album trọn gói nhiều bài, hay ngân sách giới hạn — hãy trao đổi trực tiếp với chúng tôi để nhận lộ trình tối ưu nhất.</p>
          <NuxtLink to="/contact" class="btn btn-primary btn-pulse btn-large">Liên hệ tư vấn miễn phí</NuxtLink>
        </div>

      </div>
    </section>

    <!-- ===== LEAD MAGNET CHECKLIST DOWNLOAD ===== -->
    <EmailCapture />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'Bảng giá Thu âm, Mix & Master, Hoà âm Phối khí, Live Band & Sự kiện - XKProduction',
  description: 'Bảng giá XKProduction: Thu âm từ 350.000₫, Mixing & Mastering từ 300.000₫, Hoà âm phối khí từ 1.500.000₫, Live Band & Âm thanh sự kiện theo yêu cầu. Minh bạch, không phát sinh. Hotline: 0355.356.294',
  ogTitle: 'Bảng giá Dịch vụ Thu âm, Mix & Master, Live Band & Sự kiện - XKProduction',
  ogDescription: 'Thu âm từ 350k, mix master từ 300k, hoà âm từ 1.5tr, live band & âm thanh sự kiện trọn gói tại XKProduction. Minh bạch, không phát sinh. Hotline: 0355.356.294',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Bảng giá dịch vụ phòng thu âm XKProduction',
  ogUrl: 'https://xkproduction.com/services',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  keywords: 'bảng giá thu âm, giá mix master, giá hoà âm phối khí, live band giá rẻ, cho thuê âm thanh ánh sáng, ban nhạc sự kiện, phòng thu âm chuyên nghiệp, XKProduction, bảng giá mixing mastering, dịch vụ thu âm hcm, báo giá sự kiện'
})

useSchemaOrg([
  defineWebPage({
    name: 'Bảng giá Thu âm, Mix & Master, Hoà âm Phối khí - XKProduction',
    description: 'Bảng giá chi tiết dịch vụ phòng thu âm, mixing mastering, hoà âm phối khí, quay MV/TVC mới nhất tại XKProduction.'
  }),
  {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Trang chủ', 'item': 'https://xkproduction.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Dịch vụ & Bảng giá', 'item': 'https://xkproduction.com/services' }
    ]
  },
  defineProduct({
    name: 'Dịch vụ Thu âm Bài Hát Chuyên Nghiệp',
    description: 'Thu âm bài hát chuyên nghiệp tại XKProduction — Cơ Bản, Nâng Cao, Pro và Cao Cấp.',
    provider: { name: 'XKProduction', url: 'https://xkproduction.com' },
    offers: [
      { name: 'Gói Thu âm Cơ Bản', price: '350000', priceCurrency: 'VND', description: 'Thu âm 1-2 tiếng, chỉnh sửa cơ bản, xuất file WAV/MP3, 1 lần revision' },
      { name: 'Gói Thu âm Nâng Cao', price: '550000', priceCurrency: 'VND', description: 'Thu âm 2-3 tiếng, vocal production đầy đủ, 2 lần revision' },
      { name: 'Gói Thu âm Pro', price: '1000000', priceCurrency: 'VND', description: 'Thu âm không giới hạn session, vocal coaching, xuất multi-track, 3 lần revision' },
      { name: 'Gói Thu âm Cao Cấp', price: '1800000', priceCurrency: 'VND', description: 'Thu âm không giới hạn, storytelling coaching, revision không giới hạn' }
    ]
  }),
  defineProduct({
    name: 'Dịch vụ Mixing & Mastering Chuyên Nghiệp',
    description: 'Mixing & mastering chuẩn phát hành Spotify, Apple Music, YouTube, Radio tại XKProduction.',
    provider: { name: 'XKProduction', url: 'https://xkproduction.com' },
    offers: [
      { name: 'Mix & Master Cơ Bản', price: '300000', priceCurrency: 'VND', description: 'Mixing stereo track + mastering chuẩn streaming, xuất WAV + MP3' },
      { name: 'Mix & Master Chuyên Nghiệp', price: '500000', priceCurrency: 'VND', description: 'Xử lý multi-track, chuẩn phát hành quốc tế, 2 lần revision' }
    ]
  }),
  defineProduct({
    name: 'Dịch vụ Hoà Âm Phối Khí',
    description: 'Hoà âm phối khí chuyên nghiệp cho mọi thể loại âm nhạc tại XKProduction.',
    provider: { name: 'XKProduction', url: 'https://xkproduction.com' },
    offers: [
      { name: 'Hoà âm Cơ bản', price: '1500000', priceCurrency: 'VND', description: 'Phối khí 1 thể loại, MIDI programming cơ bản, stem xuất riêng' },
      { name: 'Hoà âm Nâng cao', price: '2500000', priceCurrency: 'VND', description: 'Phối khí đa thể loại, nhạc cụ thật, revision không giới hạn' }
    ]
  })
])

const search = ref('')
const activeCategory = ref('Tất cả')

const packages = [
  { faIcon: 'fa-solid fa-microphone', title: 'Gói Cơ Bản (Basic)', category: 'THU ÂM', desc: 'Phù hợp với người mới bắt đầu, thu demo, cover, học viên thanh nhạc.', price: 'TỪ 350.000₫', isPopular: false, color: 'blue', link: '/thu-am' },
  { faIcon: 'fa-solid fa-music', title: 'Gói Nâng Cao (Advanced)', category: 'THU ÂM', desc: 'Phù hợp với ca sĩ bán chuyên, dự án cá nhân, phát hành trên YouTube hoặc các nền tảng số.', price: 'TỪ 550.000₫', isPopular: false, color: 'blue', link: '/thu-am' },
  { faIcon: 'fa-solid fa-trophy', title: 'Gói Chuyên Sâu (Pro)', category: 'THU ÂM', desc: 'Phù hợp với ca sĩ chuyên nghiệp, phát hành thương mại, MV, Spotify, Apple Music...', price: 'TỪ 1.000.000₫', isPopular: true, color: 'green', link: '/thu-am' },
  { faIcon: 'fa-solid fa-star', title: 'Gói Cao cấp (Ultimate)', category: 'THU ÂM', desc: 'Dành cho nghệ sĩ thực thụ và dự án đòi hỏi sự chỉn chu tuyệt đối về kỹ thuật lẫn tư duy nghệ thuật.', price: 'TỪ 1.800.000₫', isPopular: true, color: 'green', link: '/thu-am' },
  { faIcon: 'fa-solid fa-keyboard', title: 'Hoà âm Cơ bản', category: 'HÒA ÂM', desc: 'Demo, bài hát acoustic đơn giản, nhạc trẻ, pop-ballad cơ bản.', price: 'TỪ 1.500.000₫', isPopular: false, color: 'green', link: '/hoa-am-phoi-khi' },
  { faIcon: 'fa-solid fa-keyboard', title: 'Hoà âm Nâng cao', category: 'HÒA ÂM', desc: 'Phối khí đa thể loại, nhạc cụ thật, revision không giới hạn.', price: 'TỪ 2.500.000₫', isPopular: true, color: 'orange', link: '/hoa-am-phoi-khi' },
  { faIcon: 'fa-solid fa-file-audio', title: 'Kí âm sheet nhạc', category: 'KÍ ÂM', desc: 'Kí âm các bản nhạc, tạo sheet nhạc chuyên nghiệp cho ca sĩ và nhạc công.', price: '200.000₫ – 500.000₫', isPopular: false, color: 'blue', link: '#pricing-section' },
  { faIcon: 'fa-solid fa-sliders', title: 'Mix & Mastering Chuyên nghiệp', category: 'MIX & MASTER', desc: 'Xử lý multi-track, EQ, Compressor, Reverb, Delay, chuẩn phát hành Spotify, Apple Music...', price: 'TỪ 500.000₫', isPopular: false, color: 'blue', link: '/mix-master' },
  { faIcon: 'fa-solid fa-film', title: 'Quay MV chuyên nghiệp', category: 'VIDEO', desc: 'Quay MV 5 góc máy, bao gồm Studio và Ngoại cảnh, ekip đầy đủ.', price: 'TỪ 1.500.000₫', isPopular: false, color: 'green', link: '/quay-mv-tvc' },
  { faIcon: 'fa-solid fa-guitar', title: 'Gói Tiệc & Đám cưới', category: 'LIVE BAND', desc: '50–300 khách. Loa active, ánh sáng LED, acoustic duo hoặc DJ chuyên nghiệp.', price: 'LIÊN HỆ BÁO GIÁ', isPopular: false, color: 'orange', link: '/live-band' },
  { faIcon: 'fa-solid fa-volume-high', title: 'Gói Gala & Doanh nghiệp', category: 'LIVE BAND', desc: '300–1000 khách. Line array + full light show + full band 5–7 thành viên.', price: 'LIÊN HỆ BÁO GIÁ', isPopular: true, color: 'green', link: '/live-band' },
  { faIcon: 'fa-solid fa-tower-broadcast', title: 'Gói Festival & Ngoài trời', category: 'LIVE BAND', desc: '1000–5000+ khách. Line array đôi, laser show, sân khấu modular, đội kỹ thuật đầy đủ.', price: 'LIÊN HỆ BÁO GIÁ', isPopular: false, color: 'blue', link: '/live-band' }
]

const categories = computed(() => ['Tất cả', ...new Set(packages.map(p => p.category))])

const filteredPackages = computed(() => {
  return packages.filter(p => {
    const matchCat = activeCategory.value === 'Tất cả' || p.category === activeCategory.value
    const matchSearch = !search.value || p.title.toLowerCase().includes(search.value.toLowerCase()) || p.desc.toLowerCase().includes(search.value.toLowerCase())
    return matchCat && matchSearch
  })
})

function scrollToPricing() {
  const el = document.getElementById('pricing-section')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Pricing data
const thuAmPlans = [
  {
    name: 'Gói Cơ Bản',
    price: 'Từ 350.000₫',
    desc: 'Phù hợp với người mới bắt đầu, thu cover hoặc học viên thanh nhạc.',
    features: ['Thu âm 1-2 tiếng', 'Chỉnh sửa cơ bản (tuning, timing)', 'Xuất file WAV/MP3', '1 lần revision'],
    featured: false, badge: ''
  },
  {
    name: 'Gói Nâng Cao',
    price: 'Từ 550.000₫',
    desc: 'Ca sĩ bán chuyên, dự án cá nhân, phát hành YouTube & MXH.',
    features: ['Thu âm 2-3 tiếng', 'Vocal production đầy đủ', 'Xuất file đa định dạng', '2 lần revision', 'Tư vấn kỹ thuật'],
    featured: false, badge: ''
  },
  {
    name: 'Gói Chuyên Sâu (Pro)',
    price: 'Từ 1.000.000₫',
    desc: 'Ca sĩ chuyên nghiệp, phát hành thương mại, MV, Spotify, Apple Music.',
    features: ['Thu âm không giới hạn session', 'Vocal coaching & direction', 'Vocal production nâng cao', 'Xuất multi-track', '3 lần revision', 'Hỗ trợ phát hành'],
    featured: true, badge: 'Phổ biến nhất'
  },
  {
    name: 'Gói Cao Cấp (Ultimate)',
    price: 'Từ 1.800.000₫',
    desc: 'Dự án đòi hỏi sự chỉn chu tuyệt đối về kỹ thuật lẫn nghệ thuật.',
    features: ['Thu âm không giới hạn', 'Storytelling & emotional coaching', 'Xử lý âm thanh cao cấp', 'Revision không giới hạn', 'Chiến lược phát hành', 'Priority booking'],
    featured: false, badge: ''
  }
]

const mixPlans = [
  {
    name: 'Mix & Master Cơ Bản',
    price: 'Từ 300.000₫',
    desc: 'Mixing stereo track + mastering chuẩn streaming.',
    features: ['Nhận stereo mix từ khách', 'EQ, Compression tổng thể', 'Mastering chuẩn Spotify/YouTube', 'Xuất WAV + MP3'],
    featured: false, badge: ''
  },
  {
    name: 'Mix & Master Chuyên nghiệp',
    price: 'Từ 500.000₫',
    desc: 'Xử lý multi-track, chuẩn phát hành quốc tế.',
    features: ['Nhận multi-track (stems)', 'EQ, Compressor, Reverb, Delay', 'Vocal treatment riêng', 'Master chuẩn Spotify/Apple Music', '2 lần revision', 'Delivery đa định dạng'],
    featured: true, badge: 'Khuyên dùng'
  }
]

const hoaAmPlans = [
  {
    name: 'Hòa âm Cơ bản',
    price: 'Từ 1.500.000₫',
    desc: 'Demo, bài hát acoustic đơn giản, nhạc trẻ, pop-ballad cơ bản.',
    features: ['Phối khí 1 thể loại', 'MIDI programming cơ bản', 'Stem xuất riêng', '1 lần revision'],
    featured: false, badge: ''
  },
  {
    name: 'Hòa âm Nâng cao',
    price: 'Từ 2.500.000₫',
    desc: 'Phối khí đa thể loại, nhạc cụ thật, revision không giới hạn.',
    features: ['Phối khí đa thể loại, đa lớp', 'Nhạc cụ thật (nếu cần)', 'Orchestration nếu yêu cầu', 'Full stem delivery', 'Unlimited revision', 'Hỗ trợ phát hành'],
    featured: true, badge: 'Chuyên nghiệp'
  }
]

const liveBandPlans = [
  {
    name: 'Gói Tiệc & Đám cưới',
    price: 'Liên hệ báo giá',
    desc: 'Giải pháp âm thanh, ánh sáng & ban nhạc cho tiệc cưới, sinh nhật từ 50–300 khách.',
    features: ['Hệ thống loa active 2–4 top + sub', 'Ánh sáng LED par + moving head cơ bản', 'Micro không dây 2–4 cây', 'Acoustic duo hoặc DJ chuyên nghiệp', 'Kỹ thuật viên vận hành', 'Setup & teardown included'],
    featured: false, badge: ''
  },
  {
    name: 'Gói Gala & Doanh nghiệp',
    price: 'Liên hệ báo giá',
    desc: 'Âm thanh, ánh sáng & ban nhạc cho gala dinner, hội nghị 300–1000 khách.',
    features: ['Loa line array 8–12 top + sub', 'Full light show (beam, wash, LED)', 'Mixer digital + micro premium', 'Full band 5–7 thành viên', 'FOH + Monitor engineer', 'Màn hình LED sân khấu', 'Stage manager'],
    featured: true, badge: 'Phổ biến nhất'
  },
  {
    name: 'Gói Festival & Ngoài trời',
    price: 'Liên hệ báo giá',
    desc: 'Giải pháp tổng thể cho festival, concert ngoài trời quy mô 1000–5000+ khách.',
    features: ['Line array đôi + delay tower', 'Light show + laser chuyên nghiệp', 'Sân khấu modular lớn + truss', 'Multiple band & DJ set', 'Đội kỹ thuật đầy đủ (FOH, monitor, light)', 'Stage manager + giám sát toàn chương trình'],
    featured: false, badge: ''
  }
]
</script>

<style scoped>
.services-page-wrap {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-dark);
}

/* ==============================================
   INTERACTIVE AMBIENT GLOW BACKDROP
   ============================================== */
.immersive-ambient-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-color: var(--bg-dark);
}

.glow-spot {
  position: absolute;
  border-radius: 50%;
  filter: blur(160px);
  opacity: 0.18;
  background: rgba(125, 211, 252, 0.3);
}

.spotlight-1 {
  width: 600px;
  height: 600px;
  top: -15%;
  left: -15%;
  background: rgba(125, 211, 252, 0.35);
}

.spotlight-2 {
  width: 700px;
  height: 700px;
  bottom: -15%;
  right: -15%;
  background: rgba(56, 189, 248, 0.22);
}

/* ==============================================
   PAGE HERO
   ============================================== */
.page-hero {
  padding-top: 200px;
  padding-bottom: 6rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 1.8rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.page-hero-title {
  font-size: clamp(2.5rem, 5vw, 3.8rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-main);
  margin-bottom: 1.5rem;
  line-height: 1.15;
}

.page-hero-sub {
  font-size: clamp(1rem, 1.5vw, 1.12rem);
  color: var(--text-light);
  max-width: 680px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
}

.hero-actions-scroll {
  display: flex;
  justify-content: center;
}

/* ==============================================
   SECTIONS
   ============================================== */
.section-block {
  padding: 140px 0;
  position: relative;
  z-index: 1;
}

.section-heading-heavy {
  font-size: clamp(2rem, 3.5vw, 2.6rem);
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.02em;
  margin-bottom: 0.8rem;
}

.header-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 3px;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 1.2rem;
}

.section-subtitle {
  color: var(--text-light);
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  margin-bottom: 3.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* ==============================================
   PACKAGES GRID OVERVIEW
   ============================================== */
.packages-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.5rem;
  padding: 1.5rem 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.search-bar {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 0.85rem;
  pointer-events: none;
  transition: color 0.3s ease;
}

.search-bar input {
  width: 320px;
  padding: 0.85rem 1.25rem 0.85rem 2.75rem;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-main);
  font-size: 0.88rem;
  letter-spacing: 0.3px;
  transition: all 0.3s var(--ease-out-expo);
  backdrop-filter: blur(8px);
}

.search-bar input:focus {
  outline: none;
  border-color: rgba(125, 211, 252, 0.4);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 4px 20px rgba(125, 211, 252, 0.06);
}

.search-bar input:focus + .search-icon {
  color: var(--accent);
}

.filter-group {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.6rem 1.25rem;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-light);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s var(--ease-out-expo);
}

.filter-btn:hover {
  color: var(--text-main);
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
}

.filter-btn.active {
  background: var(--gradient-primary);
  color: #fff;
  border-color: transparent;
  box-shadow: var(--shadow-glow);
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
}

/* Package Card style */
.package-card {
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.package-card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1.25rem;
}

.package-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  color: var(--accent);
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.4s var(--ease-out-expo);
}

.package-card:hover .package-icon {
  color: #fff;
  border-color: var(--accent);
  background: var(--gradient-primary);
  transform: scale(1.05);
  box-shadow: var(--shadow-glow);
}

.package-title-area {
  flex-grow: 1;
}

.package-title-area h3 {
  color: var(--text-main);
  font-size: 1.12rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  line-height: 1.3;
}

.package-category {
  color: var(--accent);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.package-badge {
  background: rgba(125, 211, 252, 0.1);
  border: 1px solid rgba(125, 211, 252, 0.2);
  color: var(--accent);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  flex-shrink: 0;
}

.package-desc {
  color: var(--text-light);
  font-size: 0.88rem;
  line-height: 1.7;
  flex-grow: 1;
  margin-bottom: 2.2rem;
}

.package-footer {
  display: flex;
  align-items: center;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1.25rem;
}

.package-price-bar {
  height: 1px;
  width: 20px;
  margin-right: 0.75rem;
  transition: width 0.4s ease;
}

.package-card:hover .package-price-bar {
  width: 32px;
}

.bar-green { background: #34d399; }
.bar-blue { background: #38bdf8; }
.bar-orange { background: #fbbf24; }

.package-price {
  font-weight: 750;
  font-size: 0.85rem;
  letter-spacing: 1px;
  flex-grow: 1;
  text-transform: uppercase;
}

.text-green { color: #34d399; }
.text-blue { color: #38bdf8; }
.text-orange { color: #fbbf24; }

.package-arrow {
  color: var(--text-muted);
  font-size: 0.95rem;
  transition: all 0.4s var(--ease-out-expo);
}

.package-card:hover .package-arrow {
  color: var(--text-main);
  transform: translateX(4px);
}

.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--text-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-state i {
  font-size: 2.5rem;
  color: var(--accent);
  opacity: 0.6;
}

/* ==============================================
   PRICING TABLES
   ============================================== */
.section-pricing {
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

.pricing-category-block {
  margin-bottom: 6rem;
}

.pricing-category-block:last-of-type {
  margin-bottom: 0;
}

.pricing-cat {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-left: 3px solid var(--accent);
  padding-left: 1rem;
}

.pricing-cat i {
  color: var(--accent);
}

.pricing-table {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.8rem;
}

.pricing-table.single-plan {
  grid-template-columns: minmax(280px, 420px);
}

.pricing-card {
  padding: 40px 32px;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.pricing-card.featured {
  border-color: rgba(125, 211, 252, 0.25);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: var(--shadow-hover);
}

.pricing-badge {
  position: absolute;
  top: -12px;
  left: 2rem;
  background: var(--gradient-primary);
  color: #fff;
  padding: 0.35rem 1.1rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
  text-transform: uppercase;
}

.pricing-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.6rem;
}

.pricing-price {
  font-size: 1.8rem;
  font-weight: 850;
  color: var(--accent);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.pricing-desc {
  font-size: 0.85rem;
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.pricing-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2.2rem 0;
  flex-grow: 1;
}

.pricing-features li {
  padding: 0.6rem 0;
  color: var(--text-light);
  font-size: 0.85rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.5;
}

.pricing-features li::before {
  font-family: 'Font Awesome 6 Free';
  content: '\f00c';
  font-weight: 900;
  position: absolute;
  left: 0;
  top: 0.6rem;
  color: #34d399;
}

.pricing-cta {
  width: 100%;
  padding: 0.85rem 1.5rem;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 10px;
  text-align: center;
}

.lb-note {
  margin-top: 2rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lb-note i {
  color: var(--accent);
}

/* ==============================================
   CTA BLOCK — Premium Redesign
   ============================================== */
.pricing-cta-block {
  margin-top: 6rem;
  padding: 5rem 2.5rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(125, 211, 252, 0.12);
  background: radial-gradient(circle at top left, rgba(125, 211, 252, 0.05), transparent 30%),
              var(--glass-bg);
}

.pricing-cta-block h2 {
  font-size: clamp(1.8rem, 3vw, 2.3rem);
  color: var(--text-main);
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.pricing-cta-block p {
  color: var(--text-light);
  margin-bottom: 2.2rem;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}

.btn-large {
  padding: 0.95rem 2.2rem;
  font-size: 0.92rem;
  border-radius: 12px;
}

/* ==============================================
   RESPONSIVE
   ============================================== */
@media (max-width: 768px) {
  .page-hero { padding-top: 150px; padding-bottom: 4rem; }
  .packages-header { padding: 1.25rem; flex-direction: column; align-items: stretch; }
  .search-bar input { width: 100%; }
  .section-block { padding: 80px 0; }
  .pricing-category-block { margin-bottom: 4rem; }
  .pricing-cta-block { padding: 3.5rem 1.5rem; }
}
</style>
