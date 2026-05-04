<template>
  <div>
    <section class="page-hero">
      <div class="max-width">
        <div class="hero-badge"><i class="fa-solid fa-graduation-cap"></i> ĐÀO TẠO CHUYÊN NGHIỆP</div>
        <h1>Khoá học Music Producer</h1>
        <p class="page-hero-sub">Nâng tầm kỹ năng hoà âm phối khí, mixing & mastering cùng đội ngũ chuyên gia hàng đầu tại XKStudio.</p>
      </div>
    </section>

    <!-- ===== WHY LEARN ===== -->
    <section class="section-block">
      <div class="max-width">
        <h2 class="section-title"><i class="fa-solid fa-bullseye"></i> Tại sao chọn XKStudio?</h2>
        <div class="why-grid">
          <div v-for="item in whyUs" :key="item.title" class="why-card">
            <div class="why-icon"><i :class="item.icon"></i></div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== COURSES ===== -->
    <section class="section-block section-courses">
      <div class="max-width">
        <h2 class="section-title"><i class="fa-solid fa-book-open"></i> Chương trình đào tạo</h2>

        <div class="courses-grid">
          <div v-for="course in courses" :key="course.title" class="course-card" :class="'accent-' + course.accent">
            <div class="course-header">
              <div class="course-icon"><i :class="course.icon"></i></div>
              <div class="course-meta">
                <span class="course-level">{{ course.level }}</span>
                <span class="course-duration"><i class="fa-regular fa-clock"></i> {{ course.duration }}</span>
              </div>
            </div>
            <h3 class="course-title">{{ course.title }}</h3>
            <p class="course-desc">{{ course.desc }}</p>
            <ul class="course-topics">
              <li v-for="topic in course.topics" :key="topic">{{ topic }}</li>
            </ul>
            <div class="course-footer">
              <div class="course-price">{{ course.price }}</div>
              <NuxtLink to="/contact" class="btn btn-primary course-cta">Đăng ký ngay</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== LEARNING PATH ===== -->
    <section class="section-block">
      <div class="max-width">
        <h2 class="section-title"><i class="fa-solid fa-route"></i> Lộ trình học tập</h2>
        <div class="path-timeline">
          <div v-for="(step, i) in learningPath" :key="i" class="path-step">
            <div class="step-number">{{ i + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FAQ ===== -->
    <section class="section-block section-faq">
      <div class="max-width">
        <h2 class="section-title"><i class="fa-solid fa-circle-question"></i> Câu hỏi thường gặp</h2>
        <div class="faq-list">
          <div
            v-for="(faq, i) in faqs" :key="i"
            class="faq-item"
            :class="{ open: openFaq === i }"
            @click="openFaq = openFaq === i ? -1 : i"
          >
            <div class="faq-question">
              <span>{{ faq.q }}</span>
              <i class="fa-solid" :class="openFaq === i ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
            </div>
            <div class="faq-answer" v-show="openFaq === i">
              <p>{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CTA ===== -->
    <section class="section-block">
      <div class="max-width">
        <div class="cta-block">
          <div class="cta-icon"><i class="fa-solid fa-rocket"></i></div>
          <h2>Sẵn sàng bắt đầu hành trình?</h2>
          <p>Đăng ký tư vấn miễn phí để được định hướng lộ trình học phù hợp nhất với bạn.</p>
          <div class="cta-actions">
            <NuxtLink to="/contact" class="btn btn-primary">Đăng ký tư vấn</NuxtLink>
            <a href="https://zalo.me/0355356294" target="_blank" rel="noopener" class="btn btn-ghost">
              <i class="fa-solid fa-comment"></i> Chat Zalo
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Khoá học Music Producer, Mixing & Mastering - XKProduction',
  description: 'Khoá học đào tạo Music Producer tại XKProduction: Hoà âm phối khí, Mixing, Mastering chuyên nghiệp. Học 1 kèm 1, thực hành trên dự án thật. Từ 3.000.000₫/khoá.',
  ogTitle: 'Khoá học Music Producer & Kỹ thuật viên Thu âm - XKProduction',
  ogDescription: 'Đào tạo Music Producer, hoà âm phối khí, mixing & mastering chuyên nghiệp. Học 1 kèm 1, lớp tối đa 3 người, có chứng nhận. Hotline: 0355.356.294',
  ogImage: 'https://xkproduction.com/images/xk-logo-new.jpg',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Khoá học Music Producer & Mixing Mastering tại XKProduction',
  ogUrl: 'https://xkproduction.com/courses',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/xk-logo-new.jpg',
  keywords: 'khoá học music producer, học mixing mastering, khoá học hoà âm phối khí, đào tạo kỹ thuật viên thu âm, XKProduction, học âm nhạc, music producer hcm'
})

useSchemaOrg([
  defineWebPage({
    name: 'Khoá học Music Producer, Mixing & Mastering Chuyên Nghiệp - XKProduction',
    description: 'Khoá học đào tạo Music Producer chuyên nghiệp — Hoà âm phối khí, mixing & mastering tại XKProduction.'
  }),
  defineCourse({
    name: 'Khoá học Hoà Âm Phối Khí',
    description: 'Nắm vững kiến thức nhạc lý, kỹ thuật phối khí từ đơn giản đến phức tạp với nhiều thể loại âm nhạc.',
    provider: { name: 'XKStudio', url: 'https://xkproduction.com' },
    hasCourseInstance: [{ courseMode: 'onsite', duration: 'P6M', courseWorkload: 'PT10H', price: '5000000', priceCurrency: 'VND' }]
  }),
  defineCourse({
    name: 'Khoá học Mixing',
    description: 'Học kỹ thuật mix vocal, nhạc cụ, balance, EQ, compression và các plugin chuyên nghiệp.',
    provider: { name: 'XKStudio', url: 'https://xkproduction.com' },
    hasCourseInstance: [{ courseMode: 'onsite', duration: 'P4M', courseWorkload: 'PT8H', price: '4000000', priceCurrency: 'VND' }]
  }),
  defineCourse({
    name: 'Khoá học Mastering',
    description: 'Kỹ thuật mastering chuẩn phát hành Spotify, Apple Music, YouTube & Radio.',
    provider: { name: 'XKStudio', url: 'https://xkproduction.com' },
    hasCourseInstance: [{ courseMode: 'onsite', duration: 'P2M', courseWorkload: 'PT6H', price: '3000000', priceCurrency: 'VND' }]
  })
])

const openFaq = ref(-1)

const whyUs = [
  { icon: 'fa-solid fa-user-tie', title: 'Giảng viên thực chiến', desc: 'Đội ngũ producer/engineer với 7+ năm kinh nghiệm, 2000+ dự án thực tế.' },
  { icon: 'fa-solid fa-laptop-code', title: 'Thực hành trên dự án thật', desc: 'Học viên được trực tiếp tham gia sản xuất các dự án thương mại tại studio.' },
  { icon: 'fa-solid fa-people-arrows', title: 'Học 1 kèm 1 hoặc nhóm nhỏ', desc: 'Tối đa 3 học viên/lớp, đảm bảo chất lượng đào tạo cao nhất.' },
  { icon: 'fa-solid fa-certificate', title: 'Chứng nhận hoàn thành', desc: 'Cấp chứng nhận sau khi hoàn thành khoá học và bài tập cuối khoá.' }
]

const courses = [
  {
    icon: 'fa-solid fa-keyboard',
    title: 'Hoà âm Phối khí',
    level: 'Cơ bản → Nâng cao',
    duration: '3 - 6 tháng',
    desc: 'Nắm vững kiến thức nhạc lý, kỹ thuật phối khí từ đơn giản đến phức tạp với nhiều thể loại âm nhạc.',
    topics: [
      'Nhạc lý nền tảng & hợp âm nâng cao',
      'Phối khí Pop, Ballad, R&B, EDM',
      'MIDI programming & Virtual Instruments',
      'Orchestration cơ bản',
      'Arrangement từ demo đến full production',
      'Bài tập thực chiến trên dự án thật'
    ],
    price: 'Từ 5.000.000₫/khoá',
    accent: 'blue'
  },
  {
    icon: 'fa-solid fa-sliders',
    title: 'Mixing',
    level: 'Cơ bản → Chuyên sâu',
    duration: '2 - 4 tháng',
    desc: 'Học kỹ thuật mix vocal, nhạc cụ, balance, EQ, compression và các plugin chuyên nghiệp.',
    topics: [
      'Nguyên lý âm thanh & tín hiệu audio',
      'Gain staging & routing chuyên nghiệp',
      'EQ, Compression, Limiting thực chiến',
      'Reverb, Delay & spatial effects',
      'Vocal mixing & de-essing',
      'Mix Bus processing & automation'
    ],
    price: 'Từ 4.000.000₫/khoá',
    accent: 'green'
  },
  {
    icon: 'fa-solid fa-wand-magic-sparkles',
    title: 'Mastering',
    level: 'Nâng cao → Chuyên gia',
    duration: '1 - 2 tháng',
    desc: 'Kỹ thuật mastering chuẩn phát hành Spotify, Apple Music, YouTube & Radio.',
    topics: [
      'Mastering chain workflow',
      'Loudness standards (LUFS, True Peak)',
      'Multi-band compression & limiting',
      'Stereo imaging & mid-side processing',
      'Mastering cho Streaming vs CD vs Vinyl',
      'Reference track analysis'
    ],
    price: 'Từ 3.000.000₫/khoá',
    accent: 'orange'
  }
]

const learningPath = [
  { title: 'Tư vấn & Đánh giá', desc: 'Trao đổi mục tiêu, đánh giá trình độ hiện tại và xây dựng lộ trình cá nhân hoá.' },
  { title: 'Học lý thuyết nền tảng', desc: 'Nắm vững kiến thức cốt lõi về âm thanh, nhạc lý và quy trình sản xuất.' },
  { title: 'Thực hành chuyên sâu', desc: 'Làm bài tập thực chiến, practice trên các dự án thật tại studio.' },
  { title: 'Dự án tốt nghiệp', desc: 'Hoàn thành một sản phẩm hoàn chỉnh đạt chuẩn phát hành thương mại.' },
  { title: 'Hỗ trợ sau khoá học', desc: 'Tiếp tục được mentoring, review project và hỗ trợ phát hành.' }
]

const faqs = [
  { q: 'Tôi chưa biết gì về âm nhạc, có thể học được không?', a: 'Hoàn toàn được! Khoá Hoà âm Phối khí có level Cơ bản dành cho người mới bắt đầu. Giảng viên sẽ hướng dẫn từ nhạc lý nền tảng.' },
  { q: 'Hình thức học như thế nào?', a: 'Học trực tiếp tại studio hoặc online qua Zoom/Google Meet. Lớp 1 kèm 1 hoặc nhóm nhỏ tối đa 3 người.' },
  { q: 'Cần chuẩn bị gì trước khi học?', a: 'Bạn chỉ cần laptop cá nhân. Studio sẽ hỗ trợ cài đặt DAW (Logic Pro, FL Studio, Ableton) và các plugin cần thiết.' },
  { q: 'Có được thực hành tại studio không?', a: 'Có! Học viên được sử dụng phòng thu và thiết bị chuyên nghiệp tại XKStudio để thực hành.' },
  { q: 'Học phí có thể trả góp không?', a: 'Có hỗ trợ trả góp từ 2-3 đợt. Liên hệ tư vấn để biết thêm chi tiết.' }
]
</script>

<style scoped>
/* ===== PAGE HERO ===== */
.page-hero {
  padding-top: 140px;
  padding-bottom: 4rem;
  background: linear-gradient(135deg, #06080f 0%, #0a0f1a 50%, #0d1117 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.page-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 70%, rgba(26,140,255,0.06) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(0,212,170,0.04) 0%, transparent 50%);
  animation: heroGlow 8s ease-in-out infinite alternate;
}
@keyframes heroGlow {
  0% { transform: scale(1) rotate(0deg); }
  100% { transform: scale(1.1) rotate(2deg); }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.2rem;
  background: rgba(26,140,255,0.1);
  border: 1px solid rgba(26,140,255,0.2);
  border-radius: 20px;
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  margin-bottom: 1.5rem;
  position: relative;
}

.page-hero h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 1rem;
  position: relative;
}
.page-hero-sub {
  font-size: 1.05rem;
  color: var(--text-light);
  max-width: 640px;
  margin: 0 auto;
  position: relative;
}

/* ===== SECTIONS ===== */
.section-block { padding: 5rem 0; }
.section-courses { background: rgba(6, 8, 15, 0.6); }
.section-faq { background: rgba(6, 8, 15, 0.4); }

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

/* ===== WHY US ===== */
.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
.why-card {
  background: var(--bg-surface);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.35s ease;
}
.why-card:hover {
  border-color: rgba(26,140,255,0.2);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.why-icon {
  font-size: 2rem;
  color: var(--primary);
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 8px rgba(26,140,255,0.4));
}
.why-card h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}
.why-card p {
  font-size: 0.85rem;
  color: var(--text-light);
  line-height: 1.6;
}

/* ===== COURSES ===== */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}
.course-card {
  background: var(--bg-surface);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: all 0.35s ease;
  position: relative;
  overflow: hidden;
}
.course-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 16px 16px 0 0;
}
.course-card.accent-blue::before { background: linear-gradient(90deg, #3b82f6, #1a8cff); }
.course-card.accent-green::before { background: linear-gradient(90deg, #10b981, #00d4aa); }
.course-card.accent-orange::before { background: linear-gradient(90deg, #f59e0b, #ff8c00); }

.course-card:hover {
  border-color: rgba(255,255,255,0.15);
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.35);
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}
.course-icon {
  width: 48px;
  height: 48px;
  background: rgba(26,140,255,0.08);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: var(--primary);
}
.course-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.3rem;
}
.course-level {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--primary);
  background: rgba(26,140,255,0.08);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}
.course-duration {
  font-size: 0.72rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.course-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}
.course-desc {
  font-size: 0.85rem;
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.course-topics {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  flex-grow: 1;
}
.course-topics li {
  padding: 0.4rem 0;
  color: var(--text-light);
  font-size: 0.82rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  padding-left: 1.4rem;
  position: relative;
}
.course-topics li::before {
  font-family: 'Font Awesome 6 Free';
  content: '\f00c';
  font-weight: 900;
  position: absolute;
  left: 0;
  color: var(--primary);
  font-size: 0.7rem;
}

.course-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.course-price {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--primary);
}
.course-cta {
  flex-shrink: 0;
}

/* ===== LEARNING PATH ===== */
.path-timeline {
  position: relative;
  padding-left: 3rem;
}
.path-timeline::before {
  content: '';
  position: absolute;
  left: 18px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--primary), rgba(26,140,255,0.1));
}
.path-step {
  position: relative;
  margin-bottom: 2.5rem;
  padding-left: 1.5rem;
}
.path-step:last-child { margin-bottom: 0; }
.step-number {
  position: absolute;
  left: -3rem;
  top: 0;
  width: 36px;
  height: 36px;
  background: var(--bg-surface);
  border: 2px solid var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.85rem;
  color: var(--primary);
  box-shadow: 0 0 12px rgba(26,140,255,0.2);
}
.step-content h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.3rem;
}
.step-content p {
  font-size: 0.85rem;
  color: var(--text-light);
  line-height: 1.6;
}

/* ===== FAQ ===== */
.faq-list {
  max-width: 800px;
}
.faq-item {
  background: var(--bg-surface);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 10px;
  margin-bottom: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}
.faq-item:hover { border-color: rgba(255,255,255,0.12); }
.faq-item.open { border-color: rgba(26,140,255,0.2); }

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-main);
}
.faq-question i {
  color: var(--primary);
  font-size: 0.8rem;
  flex-shrink: 0;
  margin-left: 1rem;
  transition: transform 0.3s ease;
}
.faq-answer {
  padding: 0 1.5rem 1.25rem;
}
.faq-answer p {
  font-size: 0.85rem;
  color: var(--text-light);
  line-height: 1.7;
}

/* ===== CTA BLOCK ===== */
.cta-block {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--bg-surface);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.05);
  position: relative;
  overflow: hidden;
}
.cta-block::before {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: radial-gradient(circle at center, rgba(26,140,255,0.04) 0%, transparent 50%);
  pointer-events: none;
}
.cta-icon {
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 12px rgba(26,140,255,0.4));
  position: relative;
}
.cta-block h2 { font-size: 2rem; color: var(--text-main); margin-bottom: 1rem; position: relative; }
.cta-block p { color: var(--text-light); margin-bottom: 2rem; max-width: 520px; margin-left: auto; margin-right: auto; position: relative; }
.cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; position: relative; }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255,255,255,0.04);
  color: var(--text-main);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
}
.btn-ghost:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(26,140,255,0.3);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .page-hero h1 { font-size: 1.9rem; }
  .section-title { font-size: 1.3rem; }
  .courses-grid { grid-template-columns: 1fr; }
  .course-footer { flex-direction: column; gap: 1rem; align-items: flex-start; }
  .course-cta { width: 100%; text-align: center; }
  .path-timeline { padding-left: 2.5rem; }
  .step-number { left: -2.5rem; width: 30px; height: 30px; font-size: 0.75rem; }
  .path-timeline::before { left: 14px; }
}
</style>
