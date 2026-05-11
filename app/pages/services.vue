<template>
  <div>
    <section class="page-hero">
      <div class="max-width">
        <h1>Dịch vụ & Bảng giá</h1>
        <p class="page-hero-sub">Khám phá các gói dịch vụ đa dạng phù hợp với mọi nhu cầu — minh bạch, không phát sinh.</p>
      </div>
    </section>

    <!-- ===== SECTION 1: DỊCH VỤ TỔNG QUAN ===== -->
    <section class="section-block">
      <div class="max-width">
        <h2 class="section-title"><i class="fa-solid fa-layer-group"></i> Tổng quan dịch vụ</h2>
        <div class="packages-header">
          <div class="search-bar">
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input type="text" v-model="search" placeholder="Tìm kiếm dịch vụ..." />
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
          <a
            v-for="pkg in filteredPackages" :key="pkg.title"
            href="#pricing-section"
            class="package-card"
            @click.prevent="scrollToPricing"
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
              <span class="package-arrow"><i class="fa-solid fa-arrow-down"></i></span>
            </div>
          </a>
        </div>

        <div v-if="filteredPackages.length === 0" class="empty-state">
          <i class="fa-solid fa-search"></i>
          <p>Không tìm thấy dịch vụ phù hợp. Hãy thử từ khóa khác.</p>
        </div>
      </div>
    </section>

    <!-- ===== SECTION 2: BẢNG GIÁ CHI TIẾT ===== -->
    <section id="pricing-section" class="section-block section-pricing">
      <div class="max-width">
        <h2 class="section-title"><i class="fa-solid fa-tag"></i> Bảng giá chi tiết</h2>

        <!-- Thu âm -->
        <div class="pricing-section">
          <h3 class="pricing-cat"><i class="fa-solid fa-microphone"></i> Thu âm bài hát</h3>
          <div class="pricing-table">
            <div v-for="p in thuAmPlans" :key="p.name" class="pricing-card" :class="{ featured: p.featured }">
              <div v-if="p.badge" class="pricing-badge">{{ p.badge }}</div>
              <h4 class="pricing-name">{{ p.name }}</h4>
              <div class="pricing-price">{{ p.price }}</div>
              <p class="pricing-desc">{{ p.desc }}</p>
              <ul class="pricing-features">
                <li v-for="f in p.features" :key="f">{{ f }}</li>
              </ul>
              <NuxtLink to="/contact" class="btn btn-primary pricing-cta">Đặt lịch ngay</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Mix & Master -->
        <div class="pricing-section">
          <h3 class="pricing-cat"><i class="fa-solid fa-sliders"></i> Mixing &amp; Mastering</h3>
          <div class="pricing-table">
            <div v-for="p in mixPlans" :key="p.name" class="pricing-card" :class="{ featured: p.featured }">
              <div v-if="p.badge" class="pricing-badge">{{ p.badge }}</div>
              <h4 class="pricing-name">{{ p.name }}</h4>
              <div class="pricing-price">{{ p.price }}</div>
              <p class="pricing-desc">{{ p.desc }}</p>
              <ul class="pricing-features">
                <li v-for="f in p.features" :key="f">{{ f }}</li>
              </ul>
              <NuxtLink to="/contact" class="btn btn-primary pricing-cta">Đặt lịch ngay</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Hòa âm phối khí -->
        <div class="pricing-section">
          <h3 class="pricing-cat"><i class="fa-solid fa-keyboard"></i> Hòa âm phối khí</h3>
          <div class="pricing-table">
            <div v-for="p in hoaAmPlans" :key="p.name" class="pricing-card" :class="{ featured: p.featured }">
              <div v-if="p.badge" class="pricing-badge">{{ p.badge }}</div>
              <h4 class="pricing-name">{{ p.name }}</h4>
              <div class="pricing-price">{{ p.price }}</div>
              <p class="pricing-desc">{{ p.desc }}</p>
              <ul class="pricing-features">
                <li v-for="f in p.features" :key="f">{{ f }}</li>
              </ul>
              <NuxtLink to="/contact" class="btn btn-primary pricing-cta">Đặt lịch ngay</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Live Band & Âm thanh Sự kiện -->
        <div class="pricing-section">
          <h3 class="pricing-cat"><i class="fa-solid fa-guitar"></i> Live Band &amp; Âm thanh Sự kiện</h3>
          <div class="pricing-table">
            <div v-for="p in liveBandPlans" :key="p.name" class="pricing-card" :class="{ featured: p.featured }">
              <div v-if="p.badge" class="pricing-badge">{{ p.badge }}</div>
              <h4 class="pricing-name">{{ p.name }}</h4>
              <div class="pricing-price">{{ p.price }}</div>
              <p class="pricing-desc">{{ p.desc }}</p>
              <ul class="pricing-features">
                <li v-for="f in p.features" :key="f">{{ f }}</li>
              </ul>
              <NuxtLink to="/contact" class="btn btn-primary pricing-cta">Nhận báo giá</NuxtLink>
            </div>
          </div>
          <p class="lb-note"><i class="fa-solid fa-circle-info"></i> Giá báo trên là tham khảo — thực tế phụ thuộc địa điểm, số lượng khách và yêu cầu cụ thể. Liên hệ để được tư vấn miễn phí.</p>
        </div>

        <!-- CTA -->
        <div class="pricing-cta-block">
          <h2>Cần báo giá tùy chỉnh?</h2>
          <p>Dự án đặc biệt, album nhiều bài, hay ngân sách cụ thể — hãy liên hệ để được tư vấn trực tiếp.</p>
          <NuxtLink to="/contact" class="btn btn-primary">Tư vấn miễn phí</NuxtLink>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
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
      { name: 'Hoà âm Chuyên nghiệp', price: '3500000', priceCurrency: 'VND', description: 'Phối khí đa thể loại, nhạc cụ thật, revision không giới hạn' }
    ]
  })
])

const search = ref('')
const activeCategory = ref('Tất cả')

const packages = [
  { faIcon: 'fa-solid fa-microphone', title: 'Gói Cơ Bản (Basic)', category: 'THU ÂM', desc: 'Phù hợp với người mới bắt đầu, thu demo, cover, học viên thanh nhạc.', price: 'TỪ 350.000₫', isPopular: false, color: 'blue' },
  { faIcon: 'fa-solid fa-music', title: 'Gói Nâng Cao (Advanced)', category: 'THU ÂM', desc: 'Phù hợp với ca sĩ bán chuyên, dự án cá nhân, phát hành trên YouTube hoặc các nền tảng số.', price: 'TỪ 550.000₫', isPopular: false, color: 'blue' },
  { faIcon: 'fa-solid fa-trophy', title: 'Gói Chuyên Sâu (Pro)', category: 'THU ÂM', desc: 'Phù hợp với ca sĩ chuyên nghiệp, phát hành thương mại, MV, Spotify, Apple Music...', price: 'TỪ 1.000.000₫', isPopular: true, color: 'green' },
  { faIcon: 'fa-solid fa-star', title: 'Gói Cao cấp (Ultimated)', category: 'THU ÂM', desc: 'Dành cho nghệ sĩ thực thụ và dự án đòi hỏi sự chỉn chu tuyệt đối về kỹ thuật lẫn tư duy nghệ thuật.', price: 'TỪ 1.800.000₫', isPopular: true, color: 'green' },
  { faIcon: 'fa-solid fa-keyboard', title: 'Hoà âm Cơ bản', category: 'HÒA ÂM', desc: 'Demo, bài hát acoustic đơn giản, nhạc trẻ, pop-ballad cơ bản.', price: 'TỪ 1.500.000₫', isPopular: false, color: 'green' },
  { faIcon: 'fa-solid fa-keyboard', title: 'Hoà âm Chuyên nghiệp', category: 'HÒA ÂM', desc: 'Dự án chuyên nghiệp, MV ca nhạc, nhạc TVC doanh nghiệp hoặc phối khí phức tạp.', price: 'TỪ 3.500.000₫', isPopular: false, color: 'orange' },
  { faIcon: 'fa-solid fa-sliders', title: 'Mix & Mastering Chuyên nghiệp', category: 'MIX & MASTER', desc: 'Xử lý multi-track, EQ, Compressor, Reverb, Delay, chuẩn phát hành Spotify, Apple Music...', price: 'TỪ 500.000₫', isPopular: false, color: 'blue' },
  { faIcon: 'fa-solid fa-film', title: 'Quay MV chuyên nghiệp', category: 'VIDEO', desc: 'Quay MV 5 góc máy, bao gồm Studio và Ngoại cảnh, ekip đầy đủ.', price: 'TỪ 1.500.000₫', isPopular: false, color: 'green' },
  { faIcon: 'fa-solid fa-guitar', title: 'Gói Tiệc & Đám cưới', category: 'LIVE BAND', desc: '50–300 khách. Loa active, ánh sáng LED, acoustic duo hoặc DJ chuyên nghiệp.', price: 'LIÊN HỆ BÁO GIÁ', isPopular: false, color: 'orange' },
  { faIcon: 'fa-solid fa-volume-high', title: 'Gói Gala & Doanh nghiệp', category: 'LIVE BAND', desc: '300–1000 khách. Line array + full light show + full band 5–7 thành viên.', price: 'LIÊN HỆ BÁO GIÁ', isPopular: true, color: 'green' },
  { faIcon: 'fa-solid fa-tower-broadcast', title: 'Gói Festival & Ngoài trời', category: 'LIVE BAND', desc: '1000–5000+ khách. Line array đôi, laser show, sân khấu modular, đội kỹ thuật đầy đủ.', price: 'LIÊN HỆ BÁO GIÁ', isPopular: false, color: 'blue' }
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
    desc: 'Phù hợp với người mới bắt đầu, thu demo, cover, học viên thanh nhạc.',
    features: ['Thu âm 1-2 tiếng', 'Chỉnh sửa cơ bản (tuning, timing)', 'Xuất file WAV/MP3', '1 lần revision'],
    featured: false, badge: ''
  },
  {
    name: 'Gói Nâng Cao',
    price: 'Từ 550.000₫',
    desc: 'Ca sĩ bán chuyên, dự án cá nhân, phát hành YouTube hoặc các nền tảng số.',
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
    name: 'Gói Cao Cấp (Ultimated)',
    price: 'Từ 1.800.000₫',
    desc: 'Nghệ sĩ thực thụ, dự án đòi hỏi sự chỉn chu tuyệt đối về kỹ thuật lẫn nghệ thuật.',
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
    features: ['Nhận multi-track (stems)', 'EQ, Compressor, Reverb, Delay', 'Vocal treatment riêng', 'Master chuẩn Spotify, Apple Music, Radio', '2 lần revision', 'Delivery đa định dạng'],
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
    name: 'Hòa âm Chuyên nghiệp',
    price: 'Từ 3.500.000₫',
    desc: 'Dự án MV, TVC, nhạc phim hoặc phối khí phức tạp nhiều lớp.',
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
    desc: 'Trọn gói âm thanh, ánh sáng & ban nhạc cho gala dinner, hội nghị, sự kiện doanh nghiệp 300–1000 khách.',
    features: ['Loa line array 8–12 top + sub', 'Full light show (beam, wash, LED)', 'Mixer digital + micro premium', 'Full band 5–7 thành viên', 'FOH + Monitor engineer', 'Màn hình LED sân khấu', 'Stage manager'],
    featured: true, badge: 'Phổ biến nhất'
  },
  {
    name: 'Gói Festival & Ngoài trời',
    price: 'Liên hệ báo giá',
    desc: 'Giải pháp tổng thể cho festival, concert, sự kiện ngoài trời quy mô 1000–5000+ khách.',
    features: ['Line array đôi + delay tower', 'Light show + laser chuyên nghiệp', 'Sân khấu modular lớn + truss', 'Multiple band & DJ set', 'Đội kỹ thuật đầy đủ (FOH, monitor, light)', 'Stage manager + giám sát toàn chương trình'],
    featured: false, badge: ''
  }
]
</script>

<style scoped>
/* ===== PAGE HERO ===== */
.page-hero {
  padding-top: 140px;
  padding-bottom: 4rem;
  background: linear-gradient(135deg, #06080f 0%, #0d1117 100%);
  text-align: center;
}
.page-hero h1 { font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
.page-hero-sub { font-size: 1.05rem; color: var(--text-light); max-width: 640px; margin: 0 auto; }

/* ===== SECTIONS ===== */
.section-block { padding: 5rem 0; }
.section-pricing { background: rgba(6, 8, 15, 0.6); }

.section-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.section-title i { color: var(--primary); font-size: 1.3rem; }

/* ===== PACKAGES OVERVIEW ===== */
.packages-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem; }

.search-bar {
  position: relative;
}
.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 0.85rem;
  pointer-events: none;
}
.search-bar input {
  width: 300px; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.08); background: rgba(20,24,45,0.8);
  color: var(--text-main); font-size: 0.9rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.search-bar input:focus { outline: none; border-color: rgba(26,140,255,0.4); box-shadow: 0 0 12px rgba(26,140,255,0.1); }

.filter-group { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.filter-btn {
  padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);
  background: transparent; color: var(--text-light); font-size: 0.8rem; cursor: pointer;
  transition: all 0.2s ease;
}
.filter-btn.active, .filter-btn:hover { background: var(--primary); color: var(--bg-dark); border-color: var(--primary); }

.packages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }

.package-card {
  display: flex; flex-direction: column; background: rgba(20,24,45,0.5);
  border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 1.5rem;
  text-decoration: none; transition: all 0.3s ease; cursor: pointer;
}
.package-card:hover { transform: translateY(-5px); background: rgba(26,31,58,0.8); border-color: rgba(255,255,255,0.15); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }

.package-card-header { display: flex; align-items: flex-start; margin-bottom: 1rem; gap: 1rem; }
.package-icon { width: 42px; height: 42px; background: rgba(255,255,255,0.03); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
.package-title-area { flex-grow: 1; }
.package-title-area h3 { color: var(--text-main); font-size: 1rem; font-weight: 700; margin-bottom: 0.2rem; line-height: 1.3; }
.package-category { color: var(--text-muted); font-size: 0.7rem; letter-spacing: 1px; text-transform: uppercase; }
.package-badge { background: rgba(255,165,0,0.15); color: #ffaa00; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0; }

.package-desc { color: var(--text-light); font-size: 0.85rem; line-height: 1.6; flex-grow: 1; margin-bottom: 1.5rem; }

.package-footer { display: flex; align-items: center; margin-top: auto; }
.package-price-bar { height: 4px; width: 40px; border-radius: 2px; margin-right: 0.75rem; }
.bar-green { background: linear-gradient(90deg, #10b981, transparent); }
.bar-blue { background: linear-gradient(90deg, #3b82f6, transparent); }
.bar-orange { background: linear-gradient(90deg, #f59e0b, transparent); }
.package-price { font-weight: 700; font-size: 0.9rem; flex-grow: 1; }
.text-green { color: #10b981; }
.text-blue { color: #3b82f6; }
.text-orange { color: #f59e0b; }
.package-arrow { color: var(--text-muted); font-size: 1.2rem; transition: all 0.3s ease; }
.package-card:hover .package-arrow { color: var(--primary); transform: translateY(3px); }

.empty-state {
  text-align: center; padding: 4rem; color: var(--text-muted);
  display: flex; flex-direction: column; align-items: center; gap: 1rem;
}
.empty-state i { font-size: 2rem; opacity: 0.5; }

/* ===== PRICING TABLES ===== */
.pricing-section { margin-bottom: 5rem; }
.pricing-cat {
  font-size: 1.5rem; font-weight: 700; color: var(--text-main); margin-bottom: 2rem;
  display: flex; align-items: center; gap: 0.6rem;
}
.pricing-cat i { color: var(--primary); }

.pricing-table {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.pricing-card {
  background: var(--bg-surface);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}
.pricing-card:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-4px); }
.pricing-card.featured { border-color: var(--primary); box-shadow: 0 0 30px rgba(0,212,255,0.12); }

.pricing-badge {
  position: absolute; top: -12px; left: 1.5rem;
  background: var(--primary); color: var(--bg-dark);
  padding: 0.3rem 1rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700;
}

.pricing-name { font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem; }
.pricing-price { font-size: 1.6rem; font-weight: 800; color: var(--primary); margin-bottom: 0.75rem; }
.pricing-desc { font-size: 0.85rem; color: var(--text-light); line-height: 1.6; margin-bottom: 1.5rem; }

.pricing-features { list-style: none; padding: 0; margin: 0 0 1.5rem 0; flex-grow: 1; }
.pricing-features li {
  padding: 0.45rem 0;
  color: var(--text-light);
  font-size: 0.85rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  padding-left: 1.2rem;
  position: relative;
}
.pricing-features li::before { font-family: 'Font Awesome 6 Free'; content: '\f00c'; font-weight: 900; position: absolute; left: 0; color: var(--primary); }

.pricing-cta { width: 100%; text-align: center; margin-top: auto; }

.pricing-cta-block {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--bg-surface);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.05);
}
.pricing-cta-block h2 { font-size: 2rem; color: var(--text-main); margin-bottom: 1rem; }
.pricing-cta-block p { color: var(--text-light); margin-bottom: 2rem; max-width: 520px; margin-left: auto; margin-right: auto; }

.lb-note {
  margin-top: 1.5rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.lb-note i { color: var(--primary); flex-shrink: 0; }

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .page-hero h1 { font-size: 1.9rem; }
  .packages-header { flex-direction: column; align-items: flex-start; }
  .search-bar input { width: 100%; }
  .section-title { font-size: 1.3rem; }
}
</style>
