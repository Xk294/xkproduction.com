<template>
  <div class="courses-page-wrap">
    <!-- INTERACTIVE AMBIENT GLOW BACKDROP -->
    <div class="immersive-ambient-bg" aria-hidden="true">
      <div class="glow-spot spotlight-1"></div>
      <div class="glow-spot spotlight-2"></div>
    </div>

    <!-- ===== HERO SECTION ===== -->
    <section class="page-hero">
      <div class="editorial-container">
        <div class="hero-badge"><i class="fa-solid fa-graduation-cap"></i> ĐÀO TẠO THỰC CHIẾN</div>
        <h1 class="page-hero-title">Khóa Học <span class="text-gradient-animated">Music Producer</span></h1>
        <p class="page-hero-sub">Nâng tầm kỹ năng hoà âm phối khí, mixing &amp; mastering cùng đội ngũ producer/sound engineer giàu kinh nghiệm tại XKProduction.</p>
      </div>
    </section>

    <!-- ===== SECTION 1: WHY CHOOSE US ===== -->
    <section class="section-block">
      <div class="editorial-container">
        <div class="section-header-center text-center">
          <span class="header-tag">TẠI SAO CHỌN CHÚNG TÔI</span>
          <h2 class="section-heading-heavy text-center">Đặc Quyền Học Viên</h2>
          <p class="section-subtitle">Phương pháp đào tạo thực chiến, bám sát thực tế thị trường</p>
        </div>

        <div class="why-grid">
          <div v-for="item in whyUs" :key="item.title" class="why-card glass-card hover-lift">
            <div class="why-icon"><i :class="item.icon"></i></div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SECTION 2: COURSES PROGRAM ===== -->
    <section class="section-block section-courses">
      <div class="editorial-container">
        <div class="section-header-center text-center">
          <span class="header-tag">CHƯƠNG TRÌNH ĐÀO TẠO</span>
          <h2 class="section-heading-heavy text-center">Lộ Trình Học Chuyên Sâu</h2>
          <p class="section-subtitle">Đầy đủ các kỹ năng từ nhạc lý căn bản đến hoàn thiện master thương mại</p>
        </div>

        <div class="courses-grid">
          <div v-for="course in courses" :key="course.title" class="course-card glass-card hover-lift" :class="'accent-' + course.accent">
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
              <NuxtLink to="/contact?service=khoa-hoc" class="btn btn-primary course-cta">Đăng ký ngay</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SECTION 3: LEARNING PATH TIMELINE ===== -->
    <section class="section-block">
      <div class="editorial-container">
        <div class="section-header-center text-center">
          <span class="header-tag">LỘ TRÌNH CHI TIẾT</span>
          <h2 class="section-heading-heavy text-center">Hành Trình Chinh Phục</h2>
          <p class="section-subtitle"> XKProduction đồng hành cùng học viên xuyên suốt từ con số 0</p>
        </div>

        <div class="path-timeline-shell glass-card">
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
      </div>
    </section>

    <!-- ===== SECTION 4: FAQ ACCORDION ===== -->
    <section class="section-block section-faq">
      <div class="editorial-container">
        <div class="section-header-center text-center">
          <span class="header-tag">HỎI &amp; ĐÁP</span>
          <h2 class="section-heading-heavy text-center">Câu Hỏi Thường Gặp</h2>
          <p class="section-subtitle">Giải đáp nhanh các thắc mắc phổ biến của học viên trước khóa học</p>
        </div>

        <div class="faq-list">
          <div
            v-for="(faq, i) in faqs" :key="i"
            class="faq-accordion-item glass-card"
            :class="{ open: openFaq === i }"
            @click="openFaq = openFaq === i ? -1 : i"
          >
            <button class="faq-question-btn" :aria-expanded="openFaq === i">
              <span>{{ faq.q }}</span>
              <span class="faq-icon-wrap">
                <i class="fa-solid" :class="openFaq === i ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
              </span>
            </button>
            <div class="faq-answer-pane" v-show="openFaq === i">
              <p>{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SECTION 5: FINAL CALL TO ACTION ===== -->
    <section class="section-block final-cta">
      <div class="editorial-container">
        <div class="cta-block glass-card text-center">
          <div class="cta-glow-spot"></div>
          <div class="cta-icon"><i class="fa-solid fa-rocket"></i></div>
          <h2>Sẵn sàng bắt đầu hành trình của bạn?</h2>
          <p>Đăng ký tư vấn miễn phí ngay hôm nay để nhận đề xuất lộ trình học và test trình độ nhạc lý ban đầu hoàn toàn miễn phí.</p>
          <div class="cta-actions">
            <NuxtLink to="/contact?service=khoa-hoc" class="btn btn-primary btn-pulse btn-large">Đăng ký tư vấn</NuxtLink>
            <a href="https://zalo.me/0355356294" target="_blank" rel="noopener" class="btn btn-secondary btn-large btn-zalo">
              <i class="fa-solid fa-comment"></i> Nhắn qua Zalo
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useSeoMeta({
  title: 'Khoá học Music Producer, Mixing & Mastering - XKProduction',
  description: 'Khoá học đào tạo Music Producer tại XKProduction: Hoà âm phối khí, Mixing, Mastering chuyên nghiệp. Học 1 kèm 1, thực hành trên dự án thật. Từ 3.000.000₫/khoá.',
  ogTitle: 'Khoá học Music Producer & Kỹ thuật viên Thu âm - XKProduction',
  ogDescription: 'Đào tạo Music Producer, hoà âm phối khí, mixing & mastering chuyên nghiệp. Học 1 kèm 1, lớp tối đa 3 người, có chứng nhận. Hotline: 0355.356.294',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Khoá học Music Producer & Mixing Mastering tại XKProduction',
  ogUrl: 'https://xkproduction.com/courses',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
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
    provider: { name: 'XKProduction', url: 'https://xkproduction.com' },
    hasCourseInstance: [{ courseMode: 'onsite', duration: 'P6M', courseWorkload: 'PT10H', price: '5000000', priceCurrency: 'VND' }]
  }),
  defineCourse({
    name: 'Khoá học Mixing',
    description: 'Học kỹ thuật mix vocal, nhạc cụ, balance, EQ, compression và các plugin chuyên nghiệp.',
    provider: { name: 'XKProduction', url: 'https://xkproduction.com' },
    hasCourseInstance: [{ courseMode: 'onsite', duration: 'P4M', courseWorkload: 'PT8H', price: '4000000', priceCurrency: 'VND' }]
  }),
  defineCourse({
    name: 'Khoá học Mastering',
    description: 'Kỹ thuật mastering chuẩn phát hành Spotify, Apple Music, YouTube & Radio.',
    provider: { name: 'XKProduction', url: 'https://xkproduction.com' },
    hasCourseInstance: [{ courseMode: 'onsite', duration: 'P2M', courseWorkload: 'PT6H', price: '3000000', priceCurrency: 'VND' }]
  })
])

const openFaq = ref(-1)

const whyUs = [
  { icon: 'fa-solid fa-user-tie', title: 'Giảng viên thực chiến', desc: 'Đội ngũ Sound Engineer/Producer giàu kinh nghiệm, cọ xát thực tế hơn 2000+ sản phẩm.' },
  { icon: 'fa-solid fa-laptop-code', title: 'Thực hành dự án thật', desc: 'Học viên trực tiếp tham gia hoàn thiện các sản phẩm thương mại thực tế tại studio.' },
  { icon: 'fa-solid fa-people-arrows', title: 'Kèm sát 1-1 tối thiểu', desc: 'Lớp tối đa 3 học viên để bảo đảm chất lượng theo sát, giải đáp khúc mắc ngay tại chỗ.' },
  { icon: 'fa-solid fa-certificate', title: 'Hỗ trợ trọn đời', desc: 'Review project, nâng cấp kiến thức mới liên tục và hỗ trợ phát hành nhạc số sau khoá học.' }
]

const courses = [
  {
    icon: 'fa-solid fa-keyboard',
    title: 'Hoà âm Phối khí',
    level: 'Cơ bản → Nâng cao',
    duration: '3 - 6 tháng',
    desc: 'Làm chủ nhạc lý hiện đại, thiết lập cấu trúc bài hát, sáng tạo beat phối khí nhiều thể loại từ cơ bản đến phức tạp.',
    topics: [
      'Nhạc lý nền tảng & Vòng hợp âm nâng cao',
      'Phối khí Pop, Ballad, R&B, EDM, Hip-hop',
      'MIDI programming & Nhạc cụ ảo (VSTis)',
      'Dynamics, Sound Design & Kỹ xảo bài phối',
      'Cách build Arrangement từ demo mộc sơ khai',
      'Thực hành phối khí trên sản phẩm thương mại'
    ],
    price: 'Từ 5.000.000₫/khoá',
    accent: 'blue'
  },
  {
    icon: 'fa-solid fa-sliders',
    title: 'Mixing Vocal & Nhạc cụ',
    level: 'Cơ bản → Chuyên sâu',
    duration: '2 - 4 tháng',
    desc: 'Kỹ thuật trộn âm thanh, căn chỉnh giọng hát chuyên sâu, định hình không gian nhạc cụ mượt mà rộng mở.',
    topics: [
      'Lý thuyết sóng âm, tần số & Signal routing',
      'Gain Staging & Gain Structure chuẩn',
      'Xử lý EQ & Compressor chuyên sâu',
      'Không gian Reverb, Delay & Modulation',
      'Vocal Tuning & Vocal Timing thủ công',
      'Mix Bus processing & Automation đỉnh cao'
    ],
    price: 'Từ 4.000.000₫/khoá',
    accent: 'green'
  },
  {
    icon: 'fa-solid fa-wand-magic-sparkles',
    title: 'Mastering hoàn thiện',
    level: 'Nâng cao → Chuyên gia',
    duration: '1 - 2 tháng',
    desc: 'Làm mượt dải tần tổng thể, tối ưu độ to (Loudness) và xuất file chuẩn phát hành toàn cầu.',
    topics: [
      'Quy trình Mastering chain tiêu chuẩn',
      'Loudness standards (LUFS, True Peak, RMS)',
      'Multi-band Compression & Stereo Limiting',
      'Mid-Side (M/S) EQing & Spatial Processing',
      'Mastering cho các nền tảng Streaming số',
      'Đọc biểu đồ tần số & So sánh track tham khảo'
    ],
    price: 'Từ 3.000.000₫/khoá',
    accent: 'orange'
  }
]

const learningPath = [
  { title: 'Tư vấn & Test đầu vào', desc: 'XKProduction gặp gỡ định hướng phong cách âm nhạc, test nhạc lý cơ bản ban đầu.' },
  { title: 'Lý thuyết & Thao tác DAW', desc: 'Làm quen phần mềm làm nhạc chuyên nghiệp, tư duy sắp xếp dải tần số âm thanh.' },
  { title: 'Thực hành chuyên sâu', desc: 'Tự lên concept, phối beat nhạc và xử lý vocal thực tế ngay tại studio.' },
  { title: 'Dự án tốt nghiệp', desc: 'Tự tay hoàn thiện 1 bản phối thương mại đạt tiêu chuẩn phát hành số chất lượng cao.' },
  { title: 'Mentoring & Mentorship', desc: 'Đồng hành hỗ trợ review dự án cá nhân sau khi tốt nghiệp vô thời hạn.' }
]

const faqs = [
  { q: 'Tôi chưa biết gì về nhạc lý có học được không?', a: 'Hoàn toàn được! Lộ trình khoá Hoà âm phối khí tại XKProduction có modul cơ bản hướng dẫn từ con số 0, giúp bạn xây dựng nhạc lý hiện đại và tư duy giai điệu nhanh chóng.' },
  { q: 'Hình thức học như thế nào?', a: 'Học trực tiếp tại phòng thu XKProduction (Thủ Đức, TP. Hồ Chí Minh) hoặc học trực tuyến Online tương tác trực tiếp qua Google Meet/Zoom 1 kèm 1 kèm review file kỹ lưỡng.' },
  { q: 'Cần chuẩn bị thiết bị gì trước khi học?', a: 'Học viên chỉ cần chuẩn bị 1 laptop cá nhân. Studio sẽ hỗ trợ cài đặt DAW chuyên dụng (Logic Pro, FL Studio...) và cung cấp bộ sample, plugin cần thiết.' },
  { q: 'Có được sử dụng phòng thu để thực hành không?', a: 'Có! Học viên tại XKProduction được đăng ký sử dụng phòng thu âm và toàn bộ thiết bị phần cứng cao cấp để tự tập luyện hoàn toàn miễn phí.' },
  { q: 'Học phí có được chia đợt đóng không?', a: 'XKProduction hỗ trợ học viên đóng học phí linh hoạt chia làm 2 đợt hoặc trả góp theo tháng để giảm bớt gánh nặng tài chính.' }
]
</script>

<style scoped>
.courses-page-wrap {
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
   SECTIONS
   ============================================== */
.section-block {
  padding: 140px 0;
  position: relative;
  z-index: 1;
}

.section-courses {
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

.section-faq {
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

.section-heading-heavy {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
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
   WHY CHOOSE US GRID
   ============================================== */
.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
}

.why-card {
  padding: 2.5rem 2rem;
  text-align: center;
}

.why-icon {
  font-size: 2.2rem;
  color: var(--accent);
  margin-bottom: 1.25rem;
  filter: drop-shadow(0 0 10px rgba(125, 211, 252, 0.35));
}

.why-card h3 {
  font-size: 1.1rem;
  font-weight: 750;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.why-card p {
  font-size: 0.86rem;
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 0;
}

/* ==============================================
   COURSES GRID
   ============================================== */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.course-card {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.course-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
}

.course-card.accent-blue::before { background: var(--gradient-primary); }
.course-card.accent-green::before { background: linear-gradient(90deg, #10b981, #00d4aa); }
.course-card.accent-orange::before { background: linear-gradient(90deg, #f59e0b, #ff8c00); }

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.course-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--accent);
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.course-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.35rem;
}

.course-level {
  font-size: 0.68rem;
  font-weight: 800;
  color: var(--accent);
  background: rgba(125, 211, 252, 0.1);
  border: 1px solid rgba(125, 211, 252, 0.15);
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.course-duration {
  font-size: 0.72rem;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 600;
}

.course-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0.6rem;
  letter-spacing: -0.015em;
}

.course-desc {
  font-size: 0.88rem;
  color: var(--text-light);
  line-height: 1.65;
  margin-bottom: 1.8rem;
}

.course-topics {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  flex-grow: 1;
}

.course-topics li {
  padding: 0.55rem 0;
  color: var(--text-light);
  font-size: 0.84rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.45;
}

.course-topics li::before {
  font-family: 'Font Awesome 6 Free';
  content: '\f00c';
  font-weight: 900;
  position: absolute;
  left: 0;
  top: 0.55rem;
  color: #34d399;
  font-size: 0.72rem;
}

.course-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1.25rem;
  margin-top: auto;
}

.course-price {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--accent);
}

/* ==============================================
   LEARNING PATH TIMELINE
   ============================================== */
.path-timeline-shell {
  padding: 4rem 3rem;
}

.path-timeline {
  position: relative;
  padding-left: 3rem;
}

.path-timeline::before {
  content: '';
  position: absolute;
  left: 17px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent), rgba(125, 211, 252, 0.05));
}

.path-step {
  position: relative;
  margin-bottom: 2.5rem;
}

.path-step:last-child {
  margin-bottom: 0;
}

.step-number {
  position: absolute;
  left: -3rem;
  top: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--accent);
  background: var(--bg-surface);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.85rem;
  box-shadow: 0 0 12px rgba(125, 211, 252, 0.2);
}

.step-content h3 {
  font-size: 1.1rem;
  font-weight: 750;
  color: var(--text-main);
  margin-bottom: 0.35rem;
}

.step-content p {
  font-size: 0.88rem;
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 0;
}

/* ==============================================
   FAQ LIST ACCORDION
   ============================================== */
.faq-list {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.faq-accordion-item {
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s var(--ease-out-expo);
}

.faq-accordion-item:hover {
  border-color: rgba(255, 255, 255, 0.15);
}

.faq-accordion-item.open {
  border-color: rgba(125, 211, 252, 0.3);
  box-shadow: var(--shadow-hover);
}

.faq-question-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  background: none;
  border: none;
  color: var(--text-main);
  text-align: left;
  font-size: 0.96rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
}

.faq-icon-wrap {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.faq-accordion-item.open .faq-icon-wrap {
  color: var(--accent);
  border-color: rgba(125, 211, 252, 0.25);
  background: rgba(125, 211, 252, 0.08);
}

.faq-answer-pane {
  padding: 0 2rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.faq-answer-pane p {
  color: var(--text-light);
  font-size: 0.88rem;
  line-height: 1.7;
  margin-top: 1rem;
  margin-bottom: 0;
}

/* ==============================================
   FINAL CTA
   ============================================== */
.final-cta {
  padding-bottom: 140px;
}

.cta-block {
  padding: 5rem 2.5rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(125, 211, 252, 0.12);
  background: radial-gradient(circle at top left, rgba(125, 211, 252, 0.05), transparent 30%),
              var(--glass-bg);
}

.cta-icon {
  font-size: 2.2rem;
  color: var(--accent);
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(125, 211, 252, 0.35));
}

.cta-block h2 {
  font-size: clamp(1.8rem, 3vw, 2.3rem);
  color: var(--text-main);
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.cta-block p {
  color: var(--text-light);
  margin-bottom: 2.2rem;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
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
  .page-hero { padding-top: 150px; padding-bottom: 3.5rem; }
  .section-block { padding: 80px 0; }
  .why-grid, .courses-grid { grid-template-columns: 1fr; }
  .course-footer { flex-direction: column; gap: 1rem; align-items: stretch; }
  .course-cta { width: 100%; text-align: center; }
  .path-timeline-shell { padding: 2.5rem 1.25rem; }
  .path-timeline { padding-left: 2.5rem; }
  .step-number { left: -2.5rem; width: 30px; height: 30px; font-size: 0.75rem; }
  .path-timeline::before { left: 14px; }
  .faq-question-btn { padding: 1.25rem 1rem; font-size: 0.9rem; }
  .faq-answer-pane { padding: 0 1rem 1.25rem; }
  .final-cta { padding-bottom: 80px; }
  .cta-block { padding: 3.5rem 1.5rem; }
}
</style>
