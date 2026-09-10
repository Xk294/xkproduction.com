<template>
  <div class="service-detail-wrap">
    <!-- INTERACTIVE AMBIENT GLOW BACKDROP -->
    <div class="immersive-ambient-bg" aria-hidden="true">
      <div class="glow-spot spotlight-1"></div>
      <div class="glow-spot spotlight-2"></div>
    </div>

    <!-- ===== HERO SECTION ===== -->
    <section class="page-hero">
      <div class="editorial-container">
        <span class="hero-badge"><i class="fa-solid fa-film"></i> VIDEO &amp; MEDIA</span>
        <h1 class="page-hero-title">Quay MV &amp; <span class="text-gradient-animated">TVC Quảng Cáo</span></h1>
        <p class="page-hero-sub">Sản xuất hình ảnh chất lượng cao — Phục vụ nghệ sĩ quay MV ca nhạc chuyên nghiệp, studio session, live session và doanh nghiệp sản xuất TVC quảng cáo tại TP. Hồ Chí Minh.</p>
      </div>
    </section>

    <!-- ===== CONTENT & PRICING SECTION ===== -->
    <section class="section-block">
      <div class="max-width grid-layout">
        <!-- Main Info Content -->
        <div class="main-content-area">
          <div class="content-header-area">
            <span class="header-tag">BÁO GIÁ DỊCH VỤ</span>
            <h2>Các Gói Sản Xuất Video</h2>
            <p>Chúng tôi sở hữu ekip media chuyên nghiệp, thiết bị hiện đại cùng quy trình sản xuất trọn gói giúp sản phẩm của bạn thu hút người xem.</p>
          </div>

          <div class="pricing-grid-detail">
            <div 
              v-for="p in videoPlans" 
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
              <NuxtLink to="/build-project?service=quay-mv" class="btn btn-primary btn-order">
                <span>Dự toán &amp; Tư vấn ngay</span> <i class="fa-solid fa-arrow-right-long"></i>
              </NuxtLink>
            </div>
          </div>

          <!-- Story Workflow Steps -->
          <div class="details-rich-text">
            <span class="header-tag">QUY TRÌNH SẢN XUẤT</span>
            <h3>Quy Trình Hoạt Động Trọn Gói</h3>
            <p>Từ ý tưởng thô sơ đến sản phẩm hoàn thiện sẵn sàng phát hành trên YouTube, TikTok, Facebook hoặc truyền hình:</p>

            <div class="text-block-group">
              <div class="sub-text-block glass-card">
                <h4>1. Kịch bản &amp; Storyboard</h4>
                <p>Lên ý tưởng, viết kịch bản chi tiết, lựa chọn địa điểm quay, lên moodboard hình ảnh và xây dựng storyboard góc máy phù hợp với nội dung bài hát hoặc thương hiệu.</p>
              </div>
              
              <div class="sub-text-block glass-card">
                <h4>2. Tiền kỳ &amp; Quay phim</h4>
                <p>Ekip bấm máy chuyên nghiệp sử dụng hệ thống máy quay chất lượng cao (Sony/Blackmagic), hệ thống gimbal, slider, flycam, đèn studio và setup bối cảnh tỉ mỉ.</p>
              </div>
              
              <div class="sub-text-block glass-card">
                <h4>3. Hậu kỳ &amp; Phân màu</h4>
                <p>Dựng phim, cắt ghép nhịp nhàng theo giai điệu, hiệu ứng hình ảnh (VFX), chỉnh màu điện ảnh chuyên nghiệp (color grading) giúp hình ảnh sang trọng, bắt mắt.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Area -->
        <aside class="sidebar-area">
          <div class="sidebar-card glass-card">
            <h3>Tại sao chọn XKProduction?</h3>
            <ul class="why-us-list">
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Ekip đồng bộ:</strong> Sự kết hợp chặt chẽ giữa phòng thu âm và ekip quay phim giúp âm thanh và hình ảnh của MV đạt độ ăn khớp tối đa.
                </div>
              </li>
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Thiết bị hiện đại:</strong> Máy quay chuẩn 4K/6K, hệ thống ánh sáng chuyên dụng, flycam thế hệ mới ghi lại mọi khoảnh khắc đắt giá.
                </div>
              </li>
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Tối ưu chi phí:</strong> Quy trình sản xuất khép kín từ thu âm, mix master đến quay dựng giúp tiết kiệm tối đa ngân sách của bạn.
                </div>
              </li>
            </ul>
          </div>

          <div class="sidebar-card glass-card">
            <h3>Cần báo giá chi tiết?</h3>
            <p>Hãy chia sẻ ý tưởng của bạn, ekip media của XKProduction sẽ liên hệ tư vấn bối cảnh, trang phục và lập bảng chi phí chi tiết.</p>
            <a href="https://zalo.me/0355356294" target="_blank" rel="noopener" class="btn btn-primary btn-sidebar-contact">
              <i class="fa-solid fa-comment"></i> Nhận tư vấn trực tiếp
            </a>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Quay MV & TVC Chuyên Nghiệp tại TP. Hồ Chí Minh — XKProduction',
  description: 'Dịch vụ sản xuất MV ca nhạc, quay Live Session, TVC quảng cáo doanh nghiệp trọn gói tại TP. Hồ Chí Minh. Ekip chuyên nghiệp, 5 góc máy, màu điện ảnh. Tư vấn miễn phí.',
  ogTitle: 'Quay MV & TVC Chuyên Nghiệp tại TP. Hồ Chí Minh - XKProduction',
  ogDescription: 'Sản xuất hình ảnh chất lượng cao chuẩn điện ảnh. Quay phim ca nhạc, TVC quảng cáo, live session trọn gói tại TP. Hồ Chí Minh với ekip media chuyên nghiệp.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: 'https://xkproduction.com/quay-mv-tvc',
  twitterCard: 'summary_large_image',
  keywords: 'quay mv, quay tvc, quay mv hcm, quay mv thu duc, quay phim ca nhac, san xuat video, live session, video podcast, xkproduction'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Quay MV & TVC",
        "provider": {
          "@type": "MusicStore",
          "name": "XKProduction",
          "url": "https://xkproduction.com"
        },
        "name": "Dịch vụ Quay MV & TVC chuyên nghiệp",
        "description": "Quay MV 5 góc máy, bao gồm Studio và Ngoại cảnh, ekip media chuyên nghiệp đầy đủ trọn gói.",
        "offers": {
          "@type": "Offer",
          "price": "1500000",
          "priceCurrency": "VND"
        }
      })
    }
  ]
})

useSchemaOrg([
  defineWebPage({
    name: 'Quay MV & TVC Chuyên Nghiệp tại TP. Hồ Chí Minh — XKProduction',
    description: 'Chi tiết dịch vụ sản xuất MV ca nhạc, TVC quảng cáo doanh nghiệp chuyên nghiệp trọn gói.'
  })
])

const videoPlans = [
  {
    name: 'Quay MV chuyên nghiệp',
    price: 'Từ 1.500.000₫',
    desc: 'Phù hợp làm MV cover, MV phòng thu, live studio session của ca sĩ.',
    features: ['Quay phim tại studio hoặc 1 ngoại cảnh', 'Setup ánh sáng chuyên nghiệp', 'Quay 5 góc máy đa dạng', 'Dựng hậu kỳ & Phân màu', 'Hỗ trợ lên kịch bản cơ bản'],
    featured: true, badge: 'Phổ biến nhất'
  },
  {
    name: 'Sản xuất TVC & Quảng cáo',
    price: 'Liên hệ báo giá',
    desc: 'Phù hợp quảng bá thương hiệu, TVC doanh nghiệp, giới thiệu cửa hàng, sản phẩm.',
    features: ['Biên kịch & Lên ý tưởng kịch bản', 'Flycam chất lượng cao', 'Kỹ thuật viên ánh sáng chuyên dụng', 'Thu âm voice-over chuyên nghiệp', 'Dựng phim, kỹ xảo, phân màu', 'Bàn giao video chuẩn phát sóng'],
    featured: false, badge: ''
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
