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
        <span class="hero-badge"><i class="fa-solid fa-keyboard"></i> HOÀ ÂM PHỐI KHÍ</span>
        <h1 class="page-hero-title">Hoà Âm <span class="text-gradient-animated">Phối Khí</span> Chuyên Nghiệp</h1>
        <p class="page-hero-sub">Đánh thức linh hồn ca khúc — Biến ý tưởng thô sơ thành bản phối hoàn thiện, chuyên nghiệp, nhiều lớp nhạc cụ chuẩn phát hành.</p>
      </div>
    </section>

    <!-- ===== CONTENT & PRICING SECTION ===== -->
    <section class="section-block">
      <div class="max-width grid-layout">
        <!-- Main Info Content -->
        <div class="main-content-area">
          <div class="content-header-area">
            <span class="header-tag">BÁO GIÁ DỊCH VỤ</span>
            <h2>Các Gói Hoà Âm Phối Khí</h2>
            <p>Mỗi gói sản xuất được thiết kế tối ưu cho từng mức độ hoàn thiện sản phẩm thương mại của nghệ sĩ.</p>
          </div>

          <div class="pricing-grid-detail">
            <div 
              v-for="p in hoaAmPlans" 
              :key="p.name" 
              class="pricing-card-detail glass-card hover-lift" 
              :class="{ featured: p.featured, premium: p.premium }"
            >
              <div v-if="p.badge" class="pricing-badge-detail">{{ p.badge }}</div>
              <div class="plan-level">0{{ p.level }}</div>
              <h3>{{ p.name }}</h3>
              <div class="price-tag" :class="{ consult: p.premium }">{{ p.price }}</div>
              <p class="desc">{{ p.desc }}</p>
              <ul class="features-list">
                <li v-for="f in p.features" :key="f"><i class="fa-solid fa-check"></i> {{ f }}</li>
              </ul>
              <button type="button" class="btn btn-primary btn-order" @click="goToContact(p.premium)">
                <span>{{ p.cta }}</span> <i class="fa-solid fa-arrow-right-long"></i>
              </button>
            </div>
          </div>

          <!-- Story Workflow Steps -->
          <div class="details-rich-text">
            <span class="header-tag">QUY TRÌNH SẢN XUẤT</span>
            <h3>Quy Trình Hoạt Động Bản Phối Online</h3>
            <p>Dù ở bất kỳ đâu, quy trình làm việc từ xa của XKProduction vẫn đảm bảo tiến độ và độ ưng ý cao nhất:</p>

            <ol class="workflow-steps">
              <li>
                <strong>Trao đổi Concept & Demo:</strong>
                <span>Bạn gửi demo thu giọng hát mộc hoặc bản ký âm. Chúng tôi cùng thống nhất về thể loại âm nhạc, tiết tấu và nhạc cụ phối tham khảo.</span>
              </li>
              <li>
                <strong>Phê duyệt Draft 1 (Bản phác thảo):</strong>
                <span>Producer gửi bản phối khung (Piano/Guitar + Trống) để xác nhận tone giọng hát, nhịp độ BPM và cấu trúc bài.</span>
              </li>
              <li>
                <strong>Sản xuất chi tiết & Layering:</strong>
                <span>Tiến hành phối đầy đủ các dải nhạc cụ, thu âm nhạc cụ thật (nếu có yêu cầu) và thiết kế sound design.</span>
              </li>
              <li>
                <strong>Chỉnh sửa & Bàn giao:</strong>
                <span>Nghệ sĩ nghe toàn bộ bản phối đầy đủ và phản hồi chỉnh sửa chi tiết. XKProduction bàn giao file WAV stereo và Stem nhạc cụ lẻ.</span>
              </li>
            </ol>
          </div>
        </div>

        <!-- Sidebar Area -->
        <aside class="sidebar-area">
          <div class="sidebar-card glass-card">
            <h3>Đa dạng dòng nhạc</h3>
            <p>Chúng tôi có kinh nghiệm thực chiến dày dặn trong sản xuất hầu hết các thể loại nhạc hiện đại:</p>
            <ul class="genre-list">
              <li><i class="fa-solid fa-music"></i> Pop / Ballad / R&B</li>
              <li><i class="fa-solid fa-music"></i> Rap / Hip-hop / Lo-fi</li>
              <li><i class="fa-solid fa-music"></i> Acoustic / Pop-rock</li>
              <li><i class="fa-solid fa-music"></i> EDM / Vinahouse / Dance</li>
              <li><i class="fa-solid fa-music"></i> Nhạc phim / TVC quảng cáo</li>
            </ul>
          </div>

          <div class="sidebar-card glass-card">
            <h3>Lộ trình sản xuất đồng bộ</h3>
            <p>Kết hợp trọn gói <strong>Hoà âm → Thu âm → Mix & Master</strong> để giữ màu sắc âm nhạc nhất quán từ bản phối đến bản master cuối cùng.</p>
            <NuxtLink to="/services" class="btn btn-secondary btn-sidebar-link">Xem tất cả dịch vụ</NuxtLink>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const goToContact = (isPremium = false) => {
  navigateTo(isPremium ? '/contact?service=hoa-am-cao-cap' : '/contact?service=hoa-am')
}

useSeoMeta({
  title: 'Dịch vụ Hoà Âm Phối Khí Online Chuyên Nghiệp | XKProduction',
  description: 'Nhận hoà âm phối khí chuyên nghiệp cho ca khúc mới, cover, remake. Đa dạng thể loại: Pop, R&B, Rap, Acoustic. Bảng giá từ 1.5tr. Nhận file Stem đầy đủ. Tư vấn ngay.',
  ogTitle: 'Hoà Âm Phối Khí Chuyên Nghiệp - XKProduction',
  ogDescription: 'Biến giai điệu thô thành tác phẩm âm nhạc hoàn chỉnh. Phối nhạc online chất lượng cao, nhạc cụ thật, tư vấn concept âm nhạc tận tâm.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: 'https://xkproduction.com/hoa-am-phoi-khi',
  twitterCard: 'summary_large_image',
  keywords: 'hoà âm phối khí, phối nhạc online, làm beat nhạc, dịch vụ hoà âm, làm nhạc chuyên nghiệp, hoà âm phối khí online, xkproduction'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Hoà âm phối khí",
        "provider": {
          "@type": "MusicStore",
          "name": "XKProduction",
          "url": "https://xkproduction.com"
        },
        "name": "Dịch vụ Hoà âm phối khí",
        "description": "Sản xuất beat, tạo arrangement nhạc cụ đầy đặn, thiết kế sound design phù hợp với tone giọng nghệ sĩ.",
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": "1500000",
          "highPrice": "3000000",
          "priceCurrency": "VND",
          "offerCount": "2"
        }
      })
    }
  ]
})

useSchemaOrg([
  defineWebPage({
    name: 'Dịch vụ Hoà Âm Phối Khí - XKProduction',
    description: 'Ba gói hòa âm phối khí từ cơ bản đến cao cấp cho demo, phát hành và dự án thương mại chuyên nghiệp.'
  }),
  defineProduct({
    name: 'Dịch vụ Hoà Âm Phối Khí XKProduction',
    description: 'Sản xuất âm nhạc, hòa âm phối khí theo định hướng nghệ thuật riêng cho từng dự án.',
    image: 'https://xkproduction.com/images/logo-xkproduction.png',
    offers: [
      { name: 'Hoà Âm Phối Khí Cơ Bản', price: '1500000', priceCurrency: 'VND' },
      { name: 'Hoà Âm Phối Khí Nâng Cao', price: '3000000', priceCurrency: 'VND' }
    ]
  })
])

const hoaAmPlans = [
  {
    level: '1',
    name: 'Hòa âm phối khí Cơ Bản',
    price: '1.500.000₫',
    desc: 'Phù hợp với ca khúc demo, cover acoustic hoặc pop-ballad mộc mạc, bố cục tinh gọn rõ cảm xúc.',
    features: [
      'Arrangement gọn gàng, tinh tế',
      'Tối ưu cảm xúc nền tảng ca khúc',
      'Phù hợp người mới hoặc dự án nhỏ',
      '1 lần revision theo brief ban đầu'
    ],
    featured: false,
    premium: false,
    badge: '',
    cta: 'Đăng ký gói Cơ Bản'
  },
  {
    level: '2',
    name: 'Hòa âm phối khí Nâng Cao',
    price: 'Từ 2.500.000₫',
    desc: 'Phối khí nhiều dải âm sắc phức tạp hơn cho dự án single hoặc MV phát hành thương mại số.',
    features: [
      'Build arrangement đa tầng lớp nhạc cụ',
      'Xử lý dynamics và sound design sâu',
      'Phù hợp phát hành Spotify, Apple Music',
      'Revision linh hoạt đến khi ưng ý'
    ],
    featured: true,
    premium: false,
    badge: 'Phổ biến',
    cta: 'Chọn gói Nâng Cao'
  },
  {
    level: '3',
    name: 'Hòa âm phối khí Cao Cấp',
    price: 'Liên hệ tư vấn',
    desc: 'Thiết kế riêng cho nghệ sĩ thực thụ hoặc dự án quảng cáo thương mại lớn đòi hỏi chất liệu đặc biệt.',
    features: [
      'Custom beat theo màu sắc định danh',
      'Nhạc cụ thật, dàn dây orchestral',
      'Phù hợp dự án lớn, TVC thương mại',
      'Coaching và sản xuất sâu cùng producer'
    ],
    featured: false,
    premium: true,
    badge: '',
    cta: 'Liên hệ trao đổi'
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
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
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

.pricing-card-detail.premium {
  border-color: rgba(56, 189, 248, 0.25);
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

.plan-level {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
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

.price-tag.consult {
  font-size: 1.45rem;
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

/* Workflow Steps */
.details-rich-text h3 {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 1.25rem;
}

.workflow-steps {
  list-style: none;
  padding: 0;
  margin: 2.2rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.workflow-steps li {
  position: relative;
  padding-left: 3rem;
  font-size: 0.92rem;
  color: var(--text-light);
  line-height: 1.7;
}

.workflow-steps li::before {
  content: counter(step-counter, decimal);
  counter-increment: step-counter;
  position: absolute;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  background: rgba(125, 211, 252, 0.08);
  border: 1px solid rgba(125, 211, 252, 0.2);
  color: var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.8rem;
}

.workflow-steps {
  counter-reset: step-counter;
}

.workflow-steps li strong {
  display: block;
  color: var(--text-main);
  margin-bottom: 0.25rem;
  font-size: 0.98rem;
  font-weight: 750;
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

.genre-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.genre-list li {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.84rem;
  color: var(--text-light);
}

.genre-list li i {
  color: var(--accent);
  font-size: 0.85rem;
}

.sidebar-card p {
  color: var(--text-light);
  font-size: 0.84rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.btn-sidebar-link {
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
