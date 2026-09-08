<template>
  <div class="service-detail-wrap">
    <!-- INTERACTIVE AMBIENT GLOW BACKDROP -->
    <div class="immersive-ambient-bg" aria-hidden="true">
      <div class="glow-spot spotlight-1"></div>
      <div class="glow-spot spotlight-2"></div>
    </div>

    <!-- ===== HERO SECTION ===== -->
    <section class="page-hero">
      <div class="max-width">
        <span class="hero-badge"><i class="fa-solid fa-sliders"></i> MIXING &amp; MASTERING</span>
        <h1 class="page-hero-title">Dịch Vụ <span class="text-gradient-animated">Mix &amp; Master</span> Chuyên Nghiệp</h1>
        <p class="page-hero-sub">Chuẩn phát hành thương mại số — Giúp ca khúc có chiều sâu không gian tối đa, dải tần sạch sẽ, sắc nét và loudness chuẩn Spotify.</p>
      </div>
    </section>

    <!-- ===== CONTENT & PRICING SECTION ===== -->
    <section class="section-block">
      <div class="max-width grid-layout">
        <!-- Main Info Content -->
        <div class="main-content-area">
          <div class="content-header-area">
            <span class="header-tag">BÁO GIÁ DỊCH VỤ</span>
            <h2>Các Gói Mix &amp; Master</h2>
            <p>XKProduction tiếp nhận từ Stereo mix đơn lẻ cho đến trọn bộ Multi-tracks (Stems) nhạc cụ riêng biệt.</p>
          </div>

          <div class="pricing-grid-detail">
            <div 
              v-for="p in mixPlans" 
              :key="p.name" 
              class="pricing-card-detail glass-card hover-lift" 
              :class="{ featured: p.featured }"
            >
              <div v-if="p.badge" class="pricing-badge-detail">{{ p.badge }}</div>
              <h3>{{ p.name }}</h3>
              <div class="price-tag">{{ p.price }}</div>
              <p class="desc">{{ p.desc }}</p>
              <ul class="features-list">
                <li v-for="f in p.features" :key="f"><i class="fa-solid fa-check"></i> {{ f }}</li>
              </ul>
              <NuxtLink to="/contact?service=mixing-mastering" class="btn btn-primary btn-order">
                <span>Đặt lịch Mix &amp; Master</span> <i class="fa-solid fa-arrow-right-long"></i>
              </NuxtLink>
            </div>
          </div>

          <!-- Before / After Audio Showcase -->
          <div style="margin: 3rem 0;">
            <AudioCompare 
              raw-src="/product-audio-demo/pop-rnb-1-Gm-raw.mp3"
              mixed-src="/product-audio-demo/pop-rnb-1-Gm.102.mp3"
              title="So Sánh Trực Tiếp: Vocal Thô vs Sau Mix &amp; Master"
            />
          </div>

          <!-- Story Rich Text -->
          <div class="details-rich-text">
            <span class="header-tag">KIẾN THỨC NỀN TẢNG</span>
            <h3>Sự Khác Biệt Giữa Mixing &amp; Mastering</h3>
            <p>Rất nhiều nghệ sĩ mới bắt đầu sản xuất âm nhạc nhầm lẫn giữa hai quy trình này. Thực chất, đây là hai khâu xử lý âm thanh độc lập và riêng biệt:</p>

            <div class="text-block-group">
              <div class="sub-text-block glass-card">
                <h4>1. Mixing (Trộn âm)</h4>
                <p>Là quá trình cân bằng âm lượng (Volume Balance), định hình tần số (EQ), kiểm soát độ động (Compression) và thiết kế không gian (Reverb, Delay) cho từng track nhạc cụ lẻ và vocal riêng biệt để gắn kết chúng thành một bản phối tổng thể hài hòa nhất.</p>
              </div>
              
              <div class="sub-text-block glass-card">
                <h4>2. Mastering (Hoàn thiện âm thanh)</h4>
                <p>Là khâu cuối cùng xử lý trên bản mix stereo tổng thể đã xuất ra. Mục tiêu là làm mượt tần số tổng, nén nhẹ độ động, tối ưu hóa độ to (Loudness) và xuất đúng định dạng chuẩn để phát hành mượt mà trên Spotify (-14 LUFS), Apple Music, hay YouTube.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Area -->
        <aside class="sidebar-area">
          <div class="sidebar-card glass-card">
            <h3>Chuẩn bị gì trước khi gửi file?</h3>
            <ul class="why-us-list">
              <li>
                <i class="fa-solid fa-circle-info"></i>
                <div>
                  <strong>Xuất file WAV chất lượng cao:</strong> Gửi file dạng WAV (24-bit/44.1kHz hoặc 48kHz). Vui lòng không gửi file nén MP3.
                </div>
              </li>
              <li>
                <i class="fa-solid fa-circle-info"></i>
                <div>
                  <strong>Bypass các hiệu ứng không gian:</strong> Tắt toàn bộ Reverb, Delay trên track vocal mộc (trừ các hiệu ứng creative bắt buộc).
                </div>
              </li>
              <li>
                <i class="fa-solid fa-circle-info"></i>
                <div>
                  <strong>Gửi kèm Demo &amp; Reference:</strong> Gửi bản demo thu nháp ban đầu kèm 1-2 bài hát tham khảo mà bạn mong muốn hướng tới.
                </div>
              </li>
            </ul>
          </div>

          <div class="sidebar-card glass-card">
            <h3>Dịch vụ Mix Online toàn quốc</h3>
            <p>Hơn 70% dự án của XKProduction được thực hiện online với quy trình chia sẻ file qua Google Drive/Zalo siêu tốc và mượt mà.</p>
            <NuxtLink to="/mix-online" class="btn btn-primary btn-sidebar-contact" style="margin-bottom: 0.75rem; width: 100%;">
              <i class="fa-solid fa-cloud-arrow-up"></i> Đặt Mix Online 48h
            </NuxtLink>
            <a href="https://zalo.me/0355356294" target="_blank" rel="noopener" class="btn btn-secondary btn-sidebar-contact" style="width: 100%;">
              <i class="fa-solid fa-comment"></i> Nhận tư vấn Zalo ngay
            </a>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Dịch vụ Mixing & Mastering Chuẩn Spotify Chuyên Nghiệp | XKProduction',
  description: 'Dịch vụ mixing và mastering bài hát chuyên nghiệp, chuẩn phát hành Spotify, Apple Music. Nhận mix master online multi-track chất lượng cao từ 300k. Đặt lịch tư vấn miễn phí.',
  ogTitle: 'Mixing & Mastering Chuyên Nghiệp - XKProduction',
  ogDescription: 'Biến đổi bản thu của bạn thành tác phẩm thương mại chất lượng cao chuẩn quốc tế. Cân chỉnh vocal, không gian âm thanh, độ động chuyên sâu.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: 'https://xkproduction.com/mix-master',
  twitterCard: 'summary_large_image',
  keywords: 'mix master, mixing mastering, mix master online, mix nhạc, mastering chuẩn spotify, làm master nhạc chuyên nghiệp, xkproduction'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Mixing & Mastering chuyên nghiệp",
        "provider": {
          "@type": "MusicStore",
          "name": "XKProduction",
          "url": "https://xkproduction.com"
        },
        "name": "Dịch vụ Mixing & Mastering",
        "description": "Cân bằng tần số, xử lý dynamics, tạo không gian nhạc cụ và tối ưu âm lượng chuẩn phát hành Spotify/Apple Music.",
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": "300000",
          "highPrice": "500000",
          "priceCurrency": "VND",
          "offerCount": "2"
        }
      })
    }
  ]
})

useSchemaOrg([
  defineWebPage({
    name: 'Dịch vụ Mixing & Mastering Chuyên Nghiệp - XKProduction',
    description: 'Bảng giá dịch vụ Mixing & Mastering chất lượng cao từ 300.000₫ đến 500.000₫ chuẩn phát hành quốc tế.'
  }),
  defineProduct({
    name: 'Dịch vụ Mixing & Mastering Chuyên Nghiệp XKProduction',
    description: 'Mixing & mastering chuyên nghiệp chuẩn streaming cho ca sĩ, nghệ sĩ tự do.',
    image: 'https://xkproduction.com/images/logo-xkproduction.png',
    offers: [
      { name: 'Mix & Master Cơ Bản', price: '300000', priceCurrency: 'VND' },
      { name: 'Mix & Master Chuyên Nghiệp', price: '500000', priceCurrency: 'VND' }
    ]
  })
])

const mixPlans = [
  {
    name: 'Mix & Master Cơ Bản',
    price: 'Từ 300.000₫',
    desc: 'Phù hợp với ca khúc thu âm dạng cover chỉ gồm 1 track vocal và 1 track beat nhạc nền stereo.',
    features: ['Nhận stereo mix từ khách', 'Cân chỉnh tần số (EQ) tổng thể', 'Mastering chuẩn loudness phát hành số', 'Xuất file WAV + MP3 chất lượng cao', '1 lần revision chi tiết'],
    featured: false, badge: ''
  },
  {
    name: 'Mix & Master Chuyên Nghiệp',
    price: 'Từ 500.000₫',
    desc: 'Xử lý multi-track (stems) riêng biệt, tối ưu hoá chi tiết mọi nhạc cụ và bè phối vocal.',
    features: ['Nhận full stems nhạc cụ lẻ', 'Tuning & timing vocal chuyên nghiệp thủ công', 'Xử lý reverb/delay không gian đa chiều', 'Master chuẩn phát hành Spotify/Apple Music', '2 lần revision linh hoạt', 'Xuất multi-tracks gốc'],
    featured: true, badge: 'Phổ biến'
  }
]
</script>

<style scoped>
.service-detail-wrap {
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
  filter: blur(150px);
  opacity: 0.16;
}

.spotlight-1 {
  width: 550px;
  height: 550px;
  top: -10%;
  left: -10%;
  background: rgba(125, 211, 252, 0.35);
}

.spotlight-2 {
  width: 650px;
  height: 650px;
  bottom: -10%;
  right: -10%;
  background: rgba(56, 189, 248, 0.22);
}

/* ==============================================
   PAGE HERO
   ============================================== */
.page-hero {
  padding-top: 190px;
  padding-bottom: 5rem;
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
  margin-bottom: 1.6rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.page-hero-title {
  font-size: clamp(2.3rem, 5vw, 3.6rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-main);
  margin-bottom: 1.2rem;
  line-height: 1.15;
}

.page-hero-sub {
  font-size: clamp(0.95rem, 1.4vw, 1.08rem);
  color: var(--text-light);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ==============================================
   CONTENT & PRICING
   ============================================== */
.section-block {
  padding: 80px 0 140px;
  position: relative;
  z-index: 1;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 3.5rem;
  align-items: start;
}

.content-header-area {
  margin-bottom: 3.5rem;
}

.header-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 3px;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.main-content-area h2 {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0.5rem;
  letter-spacing: -0.015em;
}

.main-content-area p {
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.7;
}

.pricing-grid-detail {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.8rem;
  margin-bottom: 5rem;
}

/* Pricing Card style */
.pricing-card-detail {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.pricing-card-detail.featured {
  border-color: rgba(125, 211, 252, 0.25);
  background: rgba(255, 255, 255, 0.05);
}

.pricing-badge-detail {
  position: absolute;
  top: 1.1rem;
  right: 1.1rem;
  background: var(--gradient-primary);
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.pricing-card-detail h3 {
  font-size: 1.15rem;
  font-weight: 750;
  color: var(--text-main);
  margin-bottom: 0.5rem;
  line-height: 1.35;
}

.price-tag {
  font-size: 1.7rem;
  font-weight: 850;
  color: var(--accent);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.desc {
  font-size: 0.84rem;
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1.8rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2.2rem 0;
  flex-grow: 1;
}

.features-list li {
  padding: 0.55rem 0;
  font-size: 0.82rem;
  color: var(--text-light);
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  line-height: 1.5;
}

.features-list li i {
  color: #34d399;
  font-size: 0.8rem;
  margin-top: 0.2rem;
}

.btn-order {
  width: 100%;
}

/* Rich text comparisons */
.details-rich-text h3 {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 1.5rem;
}

.text-block-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.sub-text-block {
  padding: 2.2rem;
  border-left: 3px solid var(--accent);
}

.sub-text-block h4 {
  font-size: 1.08rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0.65rem;
}

.sub-text-block p {
  margin-bottom: 0;
  font-size: 0.9rem;
  color: var(--text-light);
  line-height: 1.7;
}

/* Sidebar styles */
.sidebar-area {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-card {
  padding: 2rem 1.8rem;
}

.sidebar-card h3 {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 1.25rem;
}

.why-us-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.why-us-list li {
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
  font-size: 0.84rem;
  color: var(--text-light);
  line-height: 1.6;
}

.why-us-list li i {
  color: var(--accent);
  font-size: 1rem;
  margin-top: 0.15rem;
}

.why-us-list li strong {
  display: block;
  color: var(--text-main);
  margin-bottom: 0.2rem;
}

.sidebar-card p {
  color: var(--text-light);
  font-size: 0.84rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.btn-sidebar-contact {
  width: 100%;
}

/* Responsive */
@media (max-width: 1024px) {
  .grid-layout { grid-template-columns: 1fr; gap: 3rem; }
  .sidebar-area { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
}

@media (max-width: 768px) {
  .page-hero { padding-top: 150px; padding-bottom: 3.5rem; }
  .section-block { padding: 40px 0 80px; }
  .pricing-grid-detail { grid-template-columns: 1fr; }
  .sidebar-area { grid-template-columns: 1fr; }
}
</style>
