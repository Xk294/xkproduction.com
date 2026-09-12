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
        <span class="hero-badge"><i class="fa-solid fa-sliders"></i> HẬU KỲ ÂM THANH</span>
        <h1 class="page-hero-title">Dịch Vụ <span class="text-gradient-animated">Mix &amp; Master</span> Cảm Xúc</h1>
        <p class="page-hero-sub">Trau chuốt giọng hát êm ái, sáng rõ trên nền nhạc — Tôn trọng chất giọng riêng, tự nhiên không robot và nghe tròn đầy trên mọi chiếc điện thoại, tai nghe.</p>
      </div>
    </section>

    <!-- ===== CONTENT & PRICING SECTION ===== -->
    <section class="section-block">
      <div class="max-width grid-layout">
        <!-- Main Info Content -->
        <div class="main-content-area">
          <div class="content-header-area">
            <span class="header-tag">BÁO GIÁ MINH BẠCH</span>
            <h2>Các Gói Trau Chuốt &amp; Hoàn Thiện Bài Hát</h2>
            <p>Dành cho bạn muốn có một bản thu kỷ niệm chỉn chu, êm tai và tự hào chia sẻ cùng người thân.</p>
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
              <NuxtLink to="/build-project?service=mix-master" class="btn btn-primary btn-order">
                <span>Dự toán chi phí &amp; Đặt hàng</span> <i class="fa-solid fa-arrow-right-long"></i>
              </NuxtLink>
            </div>
          </div>

          <!-- Before / After Audio Showcase -->
          <div style="margin: 3rem 0;">
            <XKAudioCompare />
          </div>

          <!-- Story Rich Text -->
          <div class="details-rich-text">
            <span class="header-tag">ĐIỂM TỰA CẢM XÚC</span>
            <h3>Hai Bước Giúp Giọng Hát Của Bạn Tỏa Sáng Mà Vẫn Là Chính Mình</h3>
            <p>Nhiều bạn e ngại đi mix bài vì sợ giọng bị chỉnh méo mó thành robot, hoặc bị chìm nghỉm trong tiếng nhạc. Tại XKProduction, quy trình được thực hiện tỉ mỉ bằng sự thấu cảm và đôi tai kiên nhẫn:</p>

            <div class="text-block-group">
              <div class="sub-text-block glass-card">
                <h4>1. Hòa Quyện Cảm Xúc (Mixing — Đặt Giọng Hát Ở Vị Trí Trung Tâm)</h4>
                <p>Chúng tôi lắng nghe chất giọng của bạn để tìm ra nét đẹp tự nhiên nhất. Từng nốt phô nhẹ được nắn nót thủ công bằng tai, vuốt êm tiếng lấy hơi nặng nề và giữ trọn độ rung ngân mộc mạc. Giọng hát của bạn được đặt êm ái, nổi bật trên nền nhạc chứ không bị nhạc đè lấn át.</p>
              </div>
              
              <div class="sub-text-block glass-card">
                <h4>2. Hoàn Thiện Êm Ái (Mastering — Nghe Hay Trên Mọi Thiết Bị)</h4>
                <p>Khâu chăm chút cuối cùng để bài hát của bạn nghe to tròn, dày dặn và ấm áp. Dù bạn nghe bằng tai nghe nhỏ, loa ngoài điện thoại hay trên xe hơi, âm thanh vẫn cân bằng êm dịu, không bị chói tai, không bị rè khi mở lớn, mang lại cảm giác dễ chịu và tự hào khi gửi tặng mọi người.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Area -->
        <aside class="sidebar-area">
          <div class="sidebar-card glass-card">
            <h3>Gửi file đến Studio thật dễ dàng:</h3>
            <ul class="why-us-list">
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Gửi file ghi âm bạn có sẵn:</strong> Có thể là file thu tại phòng thu, hoặc bạn tự thu bằng điện thoại, tai nghe ở nhà. Studio luôn hỗ trợ nghe thử và tư vấn trước cho bạn.
                </div>
              </li>
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Gửi kèm bản beat nhạc bạn đã dùng:</strong> Để studio dễ dàng bắt đúng nhịp điệu và hòa quyện giọng hát của bạn vào bài hát một cách mượt mà nhất.
                </div>
              </li>
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Chia sẻ mong muốn của bạn:</strong> Bạn thích giọng hát nghe mộc mạc, ấm áp hay bay bổng nhiều tiếng vang? Hãy cứ thoải mái nhắn cho studio.
                </div>
              </li>
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Cùng nghe thử và chỉnh sửa:</strong> Bạn nghe bản demo và thoải mái góp ý chỉnh sửa cho đến khi bài hát đúng theo cảm nhận bạn ưng ý nhất.
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
  title: 'Dịch vụ Mix & Master Bài Hát Tự Nhiên, Cảm Xúc | XKProduction',
  description: 'Dịch vụ mixing và mastering bài hát giữ trọn cảm xúc thật, giọng hát sáng rõ tự nhiên không robot. Nhận mix online toàn quốc từ 350k. Tư vấn tận tâm.',
  ogTitle: 'Mix & Master Cảm Xúc, Tự Nhiên - XKProduction',
  ogDescription: 'Trau chuốt bản thu của bạn thành tác phẩm êm ái, nâng đỡ giọng hát sáng rõ và giữ trọn hồn giọng thật trên mọi thiết bị.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: 'https://xkproduction.com/mix-master',
  twitterCard: 'summary_large_image',
  keywords: 'mix master, mixing mastering, mix master online, mix nhạc, làm nhạc kỷ niệm, xkproduction'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Trau chuốt & Hoàn thiện âm thanh bài hát",
        "provider": {
          "@type": "MusicStore",
          "name": "XKProduction",
          "url": "https://xkproduction.com"
        },
        "name": "Dịch vụ Mix & Master Bài Hát",
        "description": "Nâng đỡ giọng hát sáng rõ, tự nhiên không robot, âm thanh êm tai trên mọi thiết bị nghe nhạc.",
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": "350000",
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
    name: 'Dịch vụ Mix & Master Bài Hát Tự Nhiên - XKProduction',
    description: 'Bảng giá dịch vụ Mix & Master từ 350.000₫ đến 500.000₫, giữ trọn cảm xúc chân thật.'
  }),
  defineProduct({
    name: 'Dịch vụ Mix & Master Bài Hát XKProduction',
    description: 'Trau chuốt âm thanh êm ái, giữ trọn vẹn chất giọng riêng, tự nhiên không méo tiếng robot.',
    image: 'https://xkproduction.com/logo.png',
    offers: [
      { name: 'Trau Chuốt Ca Khúc Cơ Bản (Vocal + Beat)', price: '350000', priceCurrency: 'VND' },
      { name: 'Trau Chuốt Tác Phẩm Chuyên Sâu (Đa Nhạc Cụ)', price: '500000', priceCurrency: 'VND' }
    ]
  })
])

const mixPlans = [
  {
    name: 'Trau Chuốt Ca Khúc Cơ Bản (Vocal + Beat)',
    price: 'Từ 350.000₫',
    desc: 'Phù hợp cho các bản thu âm cover, hát kỷ niệm với 1 track giọng hát và 1 bản beat nhạc nền.',
    features: [
      'Nâng đỡ giọng hát sáng rõ, nổi bật ở trung tâm bài hát',
      'Vuốt êm các nốt hơi chênh, nắn nót nhẹ nhàng giữ trọn giọng thật',
      'Lọc sạch tạp âm và tiếng thở nặng nề, giữ cảm giác mộc mạc',
      'Không gian âm thanh ấm áp, êm tai, không bị chói gắt',
      'Âm lượng to tròn, nghe dễ chịu trên tai nghe và loa điện thoại',
      'Xuất đầy đủ file chất lượng cao để nghe và tự tin chia sẻ'
    ],
    featured: false, badge: ''
  },
  {
    name: 'Trau Chuốt Tác Phẩm Chuyên Sâu (Đa Nhạc Cụ & Bè)',
    price: 'Từ 500.000₫',
    desc: 'Dành cho bài hát sáng tác mới hoặc bản phối có nhiều bè phụ, nhiều nhạc cụ cần hòa quyện tinh tế.',
    features: [
      'Tiếp nhận toàn bộ bè chính, bè phụ và các lớp nhạc cụ riêng biệt',
      'Trau chuốt tỉ mỉ từng câu chữ, nâng niu độ rung ngân tự nhiên',
      'Căn chỉnh các giọng bè ăn khớp nhịp nhàng, tạo chiều sâu cuốn hút',
      'Hòa quyện tinh tế để nhạc nền nâng đỡ tiếng hát, không lấn át lời ca',
      'Tối ưu âm thanh nghe to rõ, đầy đặn trên mọi dòng điện thoại, loa xe hơi',
      'Bàn giao đầy đủ bản hát chính, bản beat không lời và bản beat có bè',
      'Lắng nghe và chỉnh sửa cùng bạn đến khi bạn thật sự ưng ý'
    ],
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
