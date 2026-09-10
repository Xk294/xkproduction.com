<template>
  <div class="xk-home-v2">
    <!-- 01 & 02: HERO CINEMATIC -->
    <XKHeroCinematic />

    <!-- 03: SELECTED WORK (EDITORIAL ASYMMETRIC GRID) -->
    <section class="section-block work-section">
      <div class="editorial-container">
        <div class="section-title-header">
          <div>
            <span class="badge-v2 amber">SELECTED WORKS · 2024 — 2026</span>
            <h2 class="editorial-heading">Những Tác Phẩm Chạm Đến Triệu Người Nghe</h2>
          </div>
          <NuxtLink to="/work" class="link-arrow-v2">
            <span>Toàn Bộ Dự Án</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>

        <XKProjectGrid :projects="projects" :limit="3" />
      </div>
    </section>

    <!-- 04: THE PRODUCTION HOUSE MOMENT (MANIFESTO) -->
    <section class="section-block manifesto-section">
      <div class="editorial-container">
        <div class="manifesto-card matte-card">
          <div class="manifesto-top">
            <span class="badge-v2 teal">TRIẾT LÝ VẬN HÀNH</span>
            <span class="text-meta-mono">BEYOND A RECORDING STUDIO</span>
          </div>
          <h2 class="manifesto-quote">
            "Chúng tôi không chỉ thu âm. Chúng tôi kiến tạo toàn bộ tác phẩm."
          </h2>
          <p class="manifesto-body">
            Khác với việc thuê một giờ thu âm thông thường, tại XKProduction chúng tôi đóng vai trò người đồng hành sáng tạo: cùng bạn gọt giũa từng nốt nhạc, kiên nhẫn phân tích từng câu nhả chữ và thiết kế không gian âm thanh chuẩn quốc tế để tác phẩm của bạn tự tin xuất hiện trên mọi bảng xếp hạng.
          </p>

          <div class="manifesto-pillars-grid">
            <div class="m-pillar">
              <div class="m-pillar-num">01</div>
              <strong>PEOPLE</strong>
              <p>Nhạc sĩ, ca sĩ và kỹ sư âm thanh cùng ngồi lại để tìm ra chất riêng độc bản.</p>
            </div>
            <div class="m-pillar">
              <div class="m-pillar-num">02</div>
              <strong>PROCESS</strong>
              <p>Quy trình 8 bước chuẩn hoá từ ý tưởng voice memo đến bàn giao master.</p>
            </div>
            <div class="m-pillar">
              <div class="m-pillar-num">03</div>
              <strong>SOUND</strong>
              <p>Kỹ thuật mixing & mastering chuẩn -14 LUFS, tối ưu không gian 3D.</p>
            </div>
            <div class="m-pillar">
              <div class="m-pillar-num">04</div>
              <strong>CRAFT</strong>
              <p>Sự kiên nhẫn và đôi tai tinh tế đặt trên từng miligiây âm thanh.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 05: 4 STRATEGIC CAPABILITIES -->
    <section class="section-block capabilities-section">
      <div class="editorial-container">
        <div class="section-title-header">
          <div>
            <span class="badge-v2 amber">CORE CAPABILITIES</span>
            <h2 class="editorial-heading">4 Trụ Cột Năng Lực Sản Xuất Cốt Lõi</h2>
          </div>
          <NuxtLink to="/services" class="link-arrow-v2">
            <span>Chi Tiết Dịch Vụ</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>

        <XKCapabilityMatrix :capabilities="capabilities" />
      </div>
    </section>

    <!-- 06: FEATURED CASE STUDY SPOTLIGHT -->
    <section class="section-block case-spotlight-section">
      <div class="editorial-container">
        <div class="case-spotlight-card matte-card">
          <div class="case-split-grid">
            <!-- LEFT VIDEO / EMBED -->
            <div class="case-media-wrap">
              <div class="video-aspect">
                <iframe
                  src="https://www.youtube.com/embed/F5tPTow1xkE?rel=0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowfullscreen
                  class="spotlight-iframe"
                  loading="lazy"
                  title="Nhật Kí Của Mẹ - Mai Linh"
                ></iframe>
              </div>
            </div>

            <!-- RIGHT STORYTELLING -->
            <div class="case-content-wrap">
              <span class="badge-v2 amber">CASE STUDY TIÊU BIỂU</span>
              <h3 class="case-title">Nhật Kí Của Mẹ — Mai Linh (Cover)</h3>
              <p class="case-artist text-meta-mono">HOÀ ÂM: XKPROD FT LACANH · THU ÂM & MIX MASTER: XKPRODUCTION</p>
              <p class="case-desc">
                Tái hiện tuyệt phẩm tình mẫu tử bất hủ bằng tiếng Grand Piano mộc mạc và dàn dây sâu thẳm. Bản phối nhịp 3/4 ở tempo 82 BPM bảo toàn từng nhịp thở chân phương của ca sĩ Mai Linh, không lạm dụng tuning, chạm đến cảm xúc hàng trăm ngàn thính giả.
              </p>

              <div class="case-metrics">
                <div class="metric-box">
                  <strong>3/4</strong>
                  <span>Tempo 82 BPM</span>
                </div>
                <div class="metric-box">
                  <strong>-14 LUFS</strong>
                  <span>Spotify Standard</span>
                </div>
                <div class="metric-box">
                  <strong>Analog</strong>
                  <span>Tube Pre-amp Warmth</span>
                </div>
              </div>

              <NuxtLink to="/work/nhat-ki-cua-me" class="btn-read-case">
                <span>Đọc Nhật Ký Sản Xuất</span>
                <i class="fa-solid fa-arrow-right"></i>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 07: HEAR THE DIFFERENCE (SIGNATURE A/B SLIDER) -->
    <section class="section-block ab-section">
      <div class="editorial-container">
        <div class="section-title-centered text-center">
          <span class="badge-v2 teal">SIGNATURE EXPERIENCE</span>
          <h2 class="editorial-heading">Hear The Difference: Thô vs Master</h2>
          <p class="section-subtitle">
            Kéo fader điều khiển để đôi tai tự cảm nhận sự khác biệt đẳng cấp giữa bản thu mộc microphone và tác phẩm sau khi được xử lý chuyên sâu tại XKProduction.
          </p>
        </div>

        <XKAudioCompare />
      </div>
    </section>

    <!-- 08: PRODUCTION MAP (8-STAGE JOURNEY) -->
    <section class="section-block map-section">
      <div class="editorial-container">
        <div class="section-title-header">
          <div>
            <span class="badge-v2 amber">THE PRODUCTION MAP</span>
            <h2 class="editorial-heading">Hành Trình 8 Bước: Từ Voice Memo Đến Đĩa Master</h2>
          </div>
          <NuxtLink to="/production" class="link-arrow-v2">
            <span>Chi Tiết Quy Trình</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>

        <XKProductionMap />
      </div>
    </section>

    <!-- 09: RELEASE WALL (DISCOGRAPHY) -->
    <section class="section-block releases-section">
      <div class="editorial-container">
        <div class="section-title-header">
          <div>
            <span class="badge-v2 amber">LIVING ARCHIVE</span>
            <h2 class="editorial-heading">Kho Đĩa Phát Hành &amp; Nền Tảng Số</h2>
          </div>
          <NuxtLink to="/releases" class="link-arrow-v2">
            <span>Tất Cả Phát Hành</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>

        <XKReleaseWall :releases="releases" />
      </div>
    </section>

    <!-- 10: PEOPLE & NETWORK (FOUNDER KIỆT) -->
    <section class="section-block people-section">
      <div class="editorial-container">
        <div class="founder-card matte-card">
          <div class="founder-grid">
            <div class="founder-img-col">
              <img
                src="/images/kiet-live-sound-wide.jpg"
                alt="Nguyễn Xuân Kiệt - Founder & Music Producer tại XKProduction"
                class="founder-photo"
                loading="lazy"
                width="600"
                height="450"
              />
              <div class="founder-badge">
                <strong>Nguyễn Xuân Kiệt</strong>
                <span class="text-meta-mono">FOUNDER & LEAD MUSIC PRODUCER</span>
              </div>
            </div>

            <div class="founder-text-col">
              <span class="badge-v2 amber">CON NGƯỜI & BẢN SẮC</span>
              <h3 class="founder-title">Đôi Tai Tinh Tế & Sự Kiên Nhẫn Tối Thượng</h3>
              <p class="founder-quote">
                "Một bản thu đắt tiền không đến từ việc lạm dụng hàng chục plugins phức tạp — nó đến từ sự thấu cảm của người làm sản xuất với câu chuyện của nghệ sĩ. Chúng tôi kiên nhẫn với từng hơi thở nhỏ nhất để tạo nên bản thu khiến bạn tự hào."
              </p>
              <p class="founder-bio">
                Hơn 7 năm thực chiến phòng thu và sân khấu trực tiếp, vận hành bàn mixer kỹ thuật số Midas M32R, sản xuất hơn 2,000 bài hát cho các nghệ sĩ độc lập và thương hiệu tại Bình Phước và trên toàn quốc.
              </p>

              <div class="founder-stats-row">
                <div>
                  <strong class="stat-number">2,000+</strong>
                  <span class="stat-label text-meta-mono">Dự Án</span>
                </div>
                <div>
                  <strong class="stat-number">7+ Năm</strong>
                  <span class="stat-label text-meta-mono">Kinh Nghiệm</span>
                </div>
                <div>
                  <strong class="stat-number">100%</strong>
                  <span class="stat-label text-meta-mono">Tâm Huyết</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 11: PRODUCTION NOTES (JOURNAL) -->
    <section class="section-block journal-section">
      <div class="editorial-container">
        <div class="section-title-header">
          <div>
            <span class="badge-v2 teal">JOURNAL & PRODUCTION NOTES</span>
            <h2 class="editorial-heading">Ghi Chú Hậu Trường Từ Bàn Điều Khiển</h2>
          </div>
          <NuxtLink to="/journal" class="link-arrow-v2">
            <span>Tất Cả Bài Viết</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>

        <div class="journal-preview-grid">
          <NuxtLink
            v-for="post in journalPosts"
            :key="post.slug"
            :to="`/journal/${post.slug}`"
            class="journal-preview-card matte-card"
          >
            <div class="jp-thumb-wrap">
              <img :src="post.thumb" :alt="post.title" class="jp-thumb-img" loading="lazy" />
              <span class="jp-category text-meta-mono">{{ post.category }}</span>
            </div>
            <div class="jp-body">
              <span class="text-meta-mono jp-meta">{{ post.date }} · {{ post.readTime }}</span>
              <strong class="jp-title">{{ post.title }}</strong>
              <p class="jp-excerpt">{{ post.excerpt }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 12: THE PROOF (VERIFIED TESTIMONIALS) -->
    <section class="section-block trust-section">
      <div class="editorial-container">
        <div class="section-title-centered text-center">
          <span class="badge-v2 amber">ARTIST VOICES</span>
          <h2 class="editorial-heading">Đồng Hành Cùng Những Nghệ Sĩ Thật</h2>
        </div>

        <div class="testimonials-editorial-grid">
          <div v-for="t in testimonials" :key="t.name" class="t-card matte-card">
            <div class="t-top">
              <img :src="t.avatar" :alt="t.name" class="t-avatar" loading="lazy" width="52" height="52" />
              <div>
                <strong class="t-name">{{ t.name }}</strong>
                <span class="t-role text-meta-mono">{{ t.role }}</span>
              </div>
            </div>
            <p class="t-body">“{{ t.body }}”</p>
            <span v-if="t.project" class="t-project text-meta-mono">
              <i class="fa-solid fa-music"></i> {{ t.project }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 13: START A PROJECT (FINAL CONVERSION CALL) -->
    <section class="section-block start-cta-section">
      <div class="editorial-container">
        <div class="start-cta-card matte-card text-center">
          <span class="badge-v2 amber">BẮT ĐẦU NGAY HÔM NAY</span>
          <h2 class="start-cta-title">Mỗi Bản Hit Đều Bắt Đầu Bằng Một Ý Niệm.</h2>
          <p class="start-cta-desc">
            Dù bạn mới chỉ có một đoạn voice memo hay đã sẵn sàng thu âm bản phối, hãy gửi brief cho chúng tôi. Đội ngũ sản xuất sẽ phản hồi giải pháp tối ưu trong vòng 2 giờ.
          </p>

          <div class="start-cta-buttons">
            <NuxtLink to="/start-a-project" class="btn-cta-main">
              <span>GỬI PROJECT BRIEF</span>
              <i class="fa-solid fa-arrow-right"></i>
            </NuxtLink>

            <NuxtLink to="/build-project" class="btn-cta-sub">
              <i class="fa-solid fa-sliders"></i>
              <span>Hoạch Định Ngân Sách</span>
            </NuxtLink>

            <a href="https://zalo.me/0355356294" target="_blank" rel="noopener noreferrer" class="btn-cta-zalo">
              <i class="fa-solid fa-comment-dots"></i>
              <span>Chat Zalo Trực Tiếp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { projects, releases, capabilities } = useProductionProjects()
const { allBlogPosts } = useBlog()

const journalPosts = computed(() => allBlogPosts.slice(0, 3))

const testimonials = [
  {
    name: 'Revan',
    role: 'Nghệ Sĩ / Rapper',
    avatar: '/images/revan.jpg',
    project: 'Chẳng Muốn Nói Nhiều Lời',
    body: 'Mình đã làm qua không ít phòng thu, nhưng XKProduction là nơi đầu tiên mình cảm thấy âm nhạc của mình được thực sự lắng nghe. Kiệt và team biết cách đẩy bản nhạc lên một tầm vóc khác biệt.'
  },
  {
    name: 'Howl',
    role: 'Nghệ Sĩ / Rapper',
    avatar: '/images/howl.jpg',
    project: 'Love Dự Phòng',
    body: 'Đến XKProduction lần đầu mình không kỳ vọng nhiều, nhưng kết quả cuối cùng vượt xa những gì mình tưởng tượng. Sound rõ ràng, sắc nét và đúng chất nghệ sĩ.'
  },
  {
    name: 'Cao Thành Lâm',
    role: 'Ca Sĩ Tự Do',
    avatar: '/images/cao-thanh-lam.jpg',
    project: 'Vocal Production Session',
    body: 'Với mình, giọng hát là tất cả. XKProduction biết cách thu âm để giọng ca tự nhiên nhất, không bị xử lý quá tay. Mỗi session ở đây đều rất thoải mái và hiệu quả.'
  }
]

useSeoMeta({
  title: 'XKProduction — Creative Music Production House & Recording Studio',
  description: 'Từ ý niệm ban đầu đến tác phẩm hoàn chỉnh. Phòng thu âm chuyên nghiệp, hoà âm phối khí độc bản, vocal coaching và mix & master chuẩn quốc tế tại Bình Phước.',
  ogTitle: 'XKProduction — Creative Music Production House',
  ogDescription: 'Từ ý niệm ban đầu đến tác phẩm hoàn chỉnh. Hoà âm phối khí, Mix & Master chuẩn Spotify -14 LUFS, thu âm chuyên nghiệp. Hotline: 0355.356.294',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogType: 'website',
  ogUrl: 'https://xkproduction.com'
})

useSchemaOrg([
  defineWebPage({
    name: 'XKProduction - Creative Music Production House & Recording Studio',
    description: 'Phòng thu âm & sản xuất âm nhạc chuyên nghiệp tại Bình Phước. Hoà âm phối khí, Mix Master, Sân khấu Live Band.'
  }),
  defineLocalBusiness({
    '@id': 'https://xkproduction.com/#localbusiness',
    name: 'XKProduction',
    image: 'https://xkproduction.com/images/Xkpreviewnew.png',
    logo: 'https://xkproduction.com/images/logo-xkproduction.png',
    telephone: '+84355356294',
    email: 'nguyenxuankiet294@gmail.com',
    url: 'https://xkproduction.com',
    priceRange: '350.000₫ – 5.000.000₫'
  })
])
</script>

<style scoped>
.xk-home-v2 {
  background-color: var(--bg-canvas);
  color: var(--text-primary);
  overflow-x: hidden;
}

.section-block {
  padding: 6rem 0;
  border-top: 1px solid var(--border-subtle);
}

.section-title-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 3rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.section-title-centered {
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.editorial-heading {
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  line-height: 1.15;
  margin-top: 0.75rem;
}

.section-subtitle {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  max-width: 680px;
  line-height: 1.6;
}

.link-arrow-v2 {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #fbbf24;
  text-decoration: none;
  transition: transform 0.15s ease;
}

.link-arrow-v2:hover {
  transform: translateX(4px);
}

/* MANIFESTO SECTION */
.manifesto-card {
  padding: clamp(2rem, 5vw, 4.5rem);
  background: linear-gradient(180deg, rgba(15, 17, 21, 0.95) 0%, rgba(9, 11, 16, 0.95) 100%);
}

.manifesto-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.manifesto-quote {
  font-size: clamp(1.8rem, 4vw, 3.2rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.manifesto-body {
  font-size: clamp(1.05rem, 1.8vw, 1.25rem);
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 960px;
  margin-bottom: 3rem;
}

.manifesto-pillars-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--border-subtle);
}

.m-pillar {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.m-pillar-num {
  font-family: ui-monospace, monospace;
  font-size: 0.75rem;
  color: #d97706;
  font-weight: 800;
}

.m-pillar strong {
  font-size: 1.05rem;
  color: var(--text-primary);
}

.m-pillar p {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* CASE STUDY SPOTLIGHT */
.case-spotlight-card {
  overflow: hidden;
}

.case-split-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
}

.case-media-wrap {
  background: #090b10;
  position: relative;
}

.video-aspect {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 380px;
}

.spotlight-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.case-content-wrap {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.case-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.case-artist {
  font-size: 0.75rem;
  color: #fbbf24;
  margin-bottom: 1.25rem;
}

.case-desc {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 2rem;
}

.case-metrics {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.metric-box {
  display: flex;
  flex-direction: column;
}

.metric-box strong {
  font-size: 1.125rem;
  color: var(--text-primary);
}

.metric-box span {
  font-size: 0.6875rem;
  color: var(--text-subtle);
}

.btn-read-case {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.6rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-weight: 800;
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  border-radius: 6px;
  text-decoration: none;
  align-self: flex-start;
  transition: all 0.2s ease;
}

.btn-read-case:hover {
  background: #ffffff;
  transform: translateY(-2px);
}

/* FOUNDER SECTION */
.founder-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
}

.founder-img-col {
  position: relative;
  background: #090b10;
}

.founder-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 440px;
}

.founder-badge {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(7, 8, 10, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.founder-badge strong {
  font-size: 1rem;
  color: var(--text-primary);
}

.founder-text-col {
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.founder-title {
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-top: 1rem;
  margin-bottom: 1.25rem;
}

.founder-quote {
  font-size: 1.125rem;
  color: var(--text-primary);
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 1.25rem;
  border-left: 3px solid #d97706;
  padding-left: 1.25rem;
}

.founder-bio {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.founder-stats-row {
  display: flex;
  gap: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-subtle);
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--text-primary);
  display: block;
}

.stat-label {
  font-size: 0.6875rem;
}

/* JOURNAL PREVIEWS */
.journal-preview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.journal-preview-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.journal-preview-card:hover {
  transform: translateY(-4px);
  border-color: rgba(217, 119, 6, 0.4);
}

.jp-thumb-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: #090b10;
}

.jp-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.jp-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  background: rgba(7, 8, 10, 0.8);
  backdrop-filter: blur(6px);
  color: #fbbf24;
  font-size: 0.6875rem;
  border: 1px solid var(--border-subtle);
}

.jp-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.jp-meta {
  font-size: 0.6875rem;
  color: var(--text-subtle);
}

.jp-title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.jp-excerpt {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* TESTIMONIALS */
.testimonials-editorial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.t-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.t-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.t-avatar {
  border-radius: 50%;
  border: 2px solid var(--border-subtle);
}

.t-name {
  display: block;
  font-size: 1rem;
  color: var(--text-primary);
}

.t-role {
  font-size: 0.6875rem;
  color: var(--text-subtle);
}

.t-body {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 1.25rem;
  flex: 1;
}

.t-project {
  font-size: 0.6875rem;
  color: #fbbf24;
}

/* START CTA */
.start-cta-card {
  padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem);
  background: radial-gradient(circle at 50% 0%, rgba(217, 119, 6, 0.12), transparent 70%), #0f1115;
}

.start-cta-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 900;
  color: var(--text-primary);
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.start-cta-desc {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  max-width: 640px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}

.start-cta-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.btn-cta-main {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 2.25rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-weight: 800;
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-cta-main:hover {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 0 24px rgba(255, 255, 255, 0.3);
}

.btn-cta-sub {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-cta-sub:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--border-hover);
}

.btn-cta-zalo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.75rem;
  background: rgba(13, 148, 136, 0.15);
  border: 1px solid rgba(13, 148, 136, 0.3);
  color: #2dd4bf;
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-cta-zalo:hover {
  background: rgba(13, 148, 136, 0.25);
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .manifesto-pillars-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .case-split-grid {
    grid-template-columns: 1fr;
  }
  .founder-grid {
    grid-template-columns: 1fr;
  }
  .journal-preview-grid {
    grid-template-columns: 1fr;
  }
  .testimonials-editorial-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .case-content-wrap,
  .founder-text-col {
    padding: 1.75rem;
  }
  .manifesto-pillars-grid {
    grid-template-columns: 1fr;
  }
}
</style>
