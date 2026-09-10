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
        <span class="hero-badge"><i class="fa-solid fa-microphone"></i> DỊCH VỤ PHÒNG THU</span>
        <h1 class="page-hero-title">Dịch Vụ <span class="text-gradient-animated">Thu Âm</span> Chuyên Nghiệp</h1>
        <p class="page-hero-sub">Phòng thu tiêu chuẩn cao tại Thủ Đức, TP. Hồ Chí Minh — Nơi thăng hoa giọng hát của bạn với trang thiết bị chuẩn quốc tế và hỗ trợ vocal coaching tận tình.</p>
      </div>
    </section>

    <!-- ===== CONTENT & PRICING SECTION ===== -->
    <section class="section-block">
      <div class="max-width grid-layout">
        <!-- Main Info Content -->
        <div class="main-content-area">
          <div class="content-header-area">
            <span class="header-tag">BÁO GIÁ DỊCH VỤ</span>
            <h2>Các Gói Thu Âm Bài Hát</h2>
            <p>Mỗi gói thu âm được thiết kế tối ưu, minh bạch tuyệt đối, cam kết không có chi phí ẩn.</p>
          </div>

          <div class="pricing-grid-detail">
            <div 
              v-for="p in thuAmPlans" 
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
              <NuxtLink to="/build-project?service=thu-am" class="btn btn-primary btn-order">
                <span>Dự toán &amp; Đặt lịch ngay</span> <i class="fa-solid fa-arrow-right-long"></i>
              </NuxtLink>
            </div>
          </div>

          <!-- Story Workflow Steps -->
          <div class="details-rich-text">
            <span class="header-tag">QUY TRÌNH THU ÂM</span>
            <h3>Quy Trình Hoạt Động Tại Phòng Thu</h3>
            <p>XKProduction hỗ trợ coaching chuyên sâu, giúp bạn gỡ bỏ sự tự ti và đạt cảm xúc trọn vẹn nhất:</p>

            <ol class="workflow-steps">
              <li>
                <strong>Đặt lịch &amp; Chuẩn bị:</strong>
                <span>Đăng ký lịch thu trước tối thiểu 24 giờ. Chúng tôi gửi bạn checklist chuẩn bị giọng hát và lời bài hát.</span>
              </li>
              <li>
                <strong>Vocal Direction &amp; Coaching:</strong>
                <span>Trong suốt buổi thu, Xuân Kiệt trực tiếp đồng hành hướng dẫn bạn cách lấy hơi, nhả chữ và truyền tải cảm xúc tốt nhất.</span>
              </li>
              <li>
                <strong>Hậu kỳ Vocal Editing:</strong>
                <span>Kỹ sư âm thanh tiến hành làm sạch dải tần, chỉnh phô (Vocal Tuning) và sửa nhịp (Vocal Timing) thủ công tỉ mỉ.</span>
              </li>
              <li>
                <strong>Bàn giao master thương mại:</strong>
                <span>Nghệ sĩ nghe thử bản demo, gửi phản hồi chỉnh sửa và nhận file master WAV/MP3 chất lượng cao hoàn thiện.</span>
              </li>
            </ol>
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
                  <strong>Trang thiết bị chuyên sâu:</strong> Sử dụng microphone condenser Neumann, preamp SSL phần cứng cao cấp đạt chuẩn studio.
                </div>
              </li>
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <div>
                  <strong>7+ năm thực chiến:</strong> Sound Engineer Nguyễn Xuân Kiệt đã đồng hành cùng 2000+ dự án đa dạng của nghệ sĩ.
                </div>
              </li>
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Hỗ trợ bè phối tận tâm:</strong> Không chỉ bấm nút ghi âm, chúng tôi hỗ trợ bè phối, dựng câu từ đầu đến cuối bài hát.
                </div>
              </li>
            </ul>
          </div>

          <div class="sidebar-card glass-card">
            <h3>Cần tư vấn trực tiếp gói thu?</h3>
            <p>Liên hệ Hotline hoặc nhắn tin trực tiếp qua Zalo để chúng tôi đề xuất gói thu âm tối ưu nhất cho chất giọng của bạn.</p>
            <a href="https://zalo.me/0355356294" target="_blank" rel="noopener" class="btn btn-primary btn-sidebar-contact">
              <i class="fa-solid fa-comment"></i> Nhắn Zalo ngay
            </a>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Dịch vụ Thu Âm Bài Hát Chuyên Nghiệp TP. Hồ Chí Minh | XKProduction',
  description: 'Bảng giá dịch vụ thu âm bài hát chuyên nghiệp từ 499k tại TP. Hồ Chí Minh. Phòng thu âm đạt chuẩn cách âm, microphone Neumann, preamp SSL cao cấp. Đặt lịch thu âm ngay.',
  ogTitle: 'Dịch Vụ Thu Âm Bài Hát Chuyên Nghiệp - XKProduction',
  ogDescription: 'Thu âm bài hát chất lượng cao từ 499k tại TP. Hồ Chí Minh. Đội ngũ kỹ sư âm thanh 7 năm kinh nghiệm hỗ trợ bè phối, vocal coaching tận tình.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: 'https://xkproduction.com/thu-am',
  twitterCard: 'summary_large_image',
  keywords: 'thu âm bài hát, dịch vụ thu âm, phòng thu âm Thủ Đức, phòng thu âm TP.HCM, giá thu âm bao nhiêu, studio thu âm uy tín, thu âm bài hát giá bao nhiêu, phòng thu âm chuyên nghiệp'
})

useSchemaOrg([
  defineWebPage({
    name: 'Dịch vụ Thu Âm Bài Hát Chuyên Nghiệp - XKProduction',
    description: 'Bảng giá dịch vụ thu âm bài hát chuyên nghiệp mới nhất từ 499.000₫ đến 1.800.000₫ tại XKProduction.'
  }),
  defineProduct({
    name: 'Dịch vụ Thu Âm Bài Hát Chuyên Nghiệp XKProduction',
    description: 'Thu âm bài hát chuyên nghiệp với trang thiết bị chuẩn quốc tế và hỗ trợ vocal coaching tận tình.',
    image: 'https://xkproduction.com/logo.png',
    offers: [
      { name: 'Gói Thu Âm Cơ Bản', price: '499000', priceCurrency: 'VND' },
      { name: 'Gói Thu Âm Nâng Cao', price: '550000', priceCurrency: 'VND' },
      { name: 'Gói Thu Âm Pro', price: '1000000', priceCurrency: 'VND' },
      { name: 'Gói Thu Âm Cao Cấp', price: '1800000', priceCurrency: 'VND' }
    ]
  })
])

const thuAmPlans = [
  {
    name: 'Gói Cơ Bản',
    price: 'Từ 499.000₫',
    desc: 'Phù hợp với người mới bắt đầu thu âm, thu âm bài hát cover hoặc học viên thanh nhạc.',
    features: ['Thu âm trong 1-2 tiếng', 'Chỉnh sửa vocal cơ bản (tuning, timing)', 'Xuất file WAV + MP3 chất lượng tốt', '1 lần chỉnh sửa chi tiết'],
    featured: false, badge: ''
  },
  {
    name: 'Gói Nâng Cao',
    price: 'Từ 550.000₫',
    desc: 'Dành cho ca sĩ bán chuyên, làm sản phẩm phát hành YouTube, TikTok cá nhân chỉnh chu.',
    features: ['Thu âm trong 2-3 tiếng', 'Vocal production chi tiết chuyên nghiệp', 'Xuất file đa định dạng stems', '2 lần chỉnh sửa chi tiết', 'Tư vấn kỹ thuật thu'],
    featured: false, badge: ''
  },
  {
    name: 'Gói Chuyên Sâu (Pro)',
    price: 'Từ 1.000.000₫',
    desc: 'Dành cho ca sĩ chuyên nghiệp, phát hành thương mại số Spotify, Apple Music.',
    features: ['Thu âm không giới hạn buổi', 'Vocal direction & coaching trực tiếp', 'Vocal production nâng cao đa lớp bè', 'Xuất stems multi-tracks', '3 lần revision', 'Hỗ trợ chiến lược phát hành'],
    featured: true, badge: 'Phổ biến'
  },
  {
    name: 'Gói Cao Cấp (Ultimate)',
    price: 'Từ 1.800.000₫',
    desc: 'Dành cho dự án nghệ thuật chuyên sâu đòi hỏi độ chỉnh chu và cảm xúc hoàn hảo nhất.',
    features: ['Thu âm không giới hạn', 'Coaching cảm xúc và cách kể chuyện', 'Xử lý âm thanh cao cấp analog', 'Revision không giới hạn', 'Priority booking lịch thu'],
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
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
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
