<template>
  <div class="xk-home-v2">
    <!-- 01 & 02: HERO CINEMATIC -->
    <XKHeroCinematic />

    <!-- 03: SELECTED WORK (EDITORIAL ASYMMETRIC GRID) -->
    <section class="section-block work-section">
      <div class="editorial-container">
        <div class="section-title-header">
          <div>
            <span class="badge-v2 amber">{{ isVi ? 'SẢN PHẨM NỔI BẬT' : 'FEATURED WORKS' }}</span>
            <h2 class="editorial-heading">{{ isVi ? 'Các Tác Phẩm & Dự Án Đã Thực Hiện' : 'Featured Releases & Productions' }}</h2>
          </div>
          <NuxtLink to="/work" class="link-arrow-v2">
            <span>{{ isVi ? 'Xem Tất Cả Bài Hát' : 'All Projects' }}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>

        <XKProjectGrid :projects="projects" :limit="3" />
      </div>
    </section>

    <!-- 04: THE PRODUCTION HOUSE MOMENT (MANIFESTO - UNBOXED EDITORIAL STATEMENT) -->
    <section class="section-block manifesto-section">
      <div class="editorial-container">
        <div class="manifesto-editorial-wrap">
          <div class="manifesto-top">
            <span class="badge-v2 amber">{{ isVi ? 'CÁCH CHÚNG TÔI LÀM VIỆC' : 'OUR APPROACH' }}</span>
            <span class="manifesto-divider" aria-hidden="true"></span>
            <span class="text-meta-mono manifesto-meta">{{ isVi ? 'SẢN XUẤT ÂM NHẠC · HOÀ ÂM PHỐI KHÍ · SOUND & LIGHT' : 'MUSIC PRODUCTION · ARRANGEMENT · SOUND & LIGHT' }}</span>
          </div>
          <blockquote class="manifesto-quote font-display">
            <span class="manifesto-quote-line">{{ isVi ? '“Từ bản phối khí độc bản, sản xuất âm nhạc trọn vẹn' : '“From bespoke arrangement and full music production' }}</span>
            <span class="manifesto-quote-line">{{ isVi ? 'đến không gian bùng nổ của ' : 'to dynamic ' }}<span class="text-gold-gradient">{{ isVi ? 'Sound & Light trên sân khấu.”' : 'Sound & Light on stage.”' }}</span></span>
          </blockquote>
          <p class="manifesto-body">
            {{ isVi
              ? 'Tại XKProduction, chúng tôi tập trung vào 3 giá trị cốt lõi: Sản xuất âm nhạc bài bản từ ý tưởng đến master hoàn chỉnh, Hoà âm phối khí độc bản theo từng chất giọng và phong cách, cùng Giải pháp Sound & Light biểu diễn chuyên nghiệp cho sự kiện và sân khấu.'
              : 'At XKProduction, we focus on 3 core pillars: end-to-end Music Production from concept to release-ready master, bespoke Music Arrangement tailored to each artist identity, and professional Sound & Light staging solutions for live events.'
            }}
          </p>

          <div class="manifesto-pillars-grid">
            <div class="m-pillar">
              <span class="m-pillar-num font-mono">01</span>
              <strong class="m-pillar-title">{{ isVi ? 'SẢN XUẤT ÂM NHẠC' : 'MUSIC PRODUCTION' }}</strong>
              <p>{{ isVi ? 'Quy trình sản xuất bài bản, định hình cấu trúc, phong cách âm nhạc và hoàn thiện master chuẩn Spotify quốc tế.' : 'End-to-end track production, songwriting development, and streaming-standard mastering.' }}</p>
            </div>
            <div class="m-pillar">
              <span class="m-pillar-num font-mono">02</span>
              <strong class="m-pillar-title">{{ isVi ? 'HOÀ ÂM PHỐI KHÍ' : 'BESPOKE ARRANGEMENT' }}</strong>
              <p>{{ isVi ? 'Phối khí riêng biệt từ giai điệu mộc, không dùng beat rập khuôn, hài hoà giữa nhạc cụ acoustic và hiện đại.' : '100% original arrangement tailored to vocal range, combining organic acoustic and modern synthesis.' }}</p>
            </div>
            <div class="m-pillar">
              <span class="m-pillar-num font-mono">03</span>
              <strong class="m-pillar-title">{{ isVi ? 'SOUND & LIGHT SỰ KIỆN' : 'SOUND & LIGHT' }}</strong>
              <p>{{ isVi ? 'Hệ thống âm thanh mixer Midas M32R chống hú rít kết hợp ánh sáng sân khấu chuyên nghiệp cho sự kiện, tiệc cưới.' : 'Midas M32R digital audio engineering and synchronized stage lighting for events and live concerts.' }}</p>
            </div>
            <div class="m-pillar">
              <span class="m-pillar-num font-mono">04</span>
              <strong class="m-pillar-title">{{ isVi ? 'MINH BẠCH & BẢO MẬT' : 'CLEAR COMMITMENT' }}</strong>
              <p>{{ isVi ? 'Tặng 2 lần sửa bài miễn phí, không chi phí ẩn và cam kết bảo mật 100% bản quyền bài hát của bạn.' : '2 free revision rounds, transparent pricing, and 100% intellectual property privacy.' }}</p>
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
            <span class="badge-v2 amber">{{ isVi ? 'NĂNG LỰC CỐT LÕI' : 'CORE SERVICES' }}</span>
            <h2 class="editorial-heading">{{ isVi ? 'Dịch Vụ Sản Xuất Âm Nhạc, Phối Khí & Sound Light' : 'Music Production, Arrangement & Sound Light Services' }}</h2>
          </div>
          <NuxtLink to="/services" class="link-arrow-v2">
            <span>{{ isVi ? 'Xem Bảng Giá & Dịch Vụ' : 'View All Services' }}</span>
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
                  v-if="isSpotlightVideoActive"
                  src="https://www.youtube.com/embed/F5tPTow1xkE?autoplay=1&rel=0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowfullscreen
                  class="spotlight-iframe"
                  title="Nhật Kí Của Mẹ - Mai Linh"
                ></iframe>
                <div
                  v-else
                  class="youtube-facade"
                  @click="startSpotlightVideo"
                  role="button"
                  tabindex="0"
                  aria-label="Phát video Nhật Kí Của Mẹ"
                  @keydown.enter="startSpotlightVideo"
                >
                  <img
                    src="https://img.youtube.com/vi/F5tPTow1xkE/maxresdefault.jpg"
                    alt="Nhật Kí Của Mẹ - Mai Linh"
                    class="facade-thumb"
                    loading="lazy"
                    width="1280"
                    height="720"
                  />
                  <div class="facade-scrim"></div>
                  <div class="facade-play-badge">
                    <div class="facade-play-icon">
                      <i class="fa-solid fa-play"></i>
                    </div>
                    <span class="facade-kicker font-mono">
                      <i class="fa-brands fa-youtube"></i>
                      <span>{{ isVi ? '4K STUDIO SESSION · NHẤN ĐỂ XEM' : '4K STUDIO SESSION · CLICK TO WATCH' }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT STORYTELLING -->
            <div class="case-content-wrap">
              <span class="badge-v2 amber">{{ isVi ? 'BÀI THU TIÊU BIỂU' : 'FEATURED PRODUCTION' }}</span>
              <h3 class="case-title">Nhật Kí Của Mẹ — Mai Linh (Cover)</h3>
              <p class="case-artist text-meta-mono">{{ isVi ? 'HOÀ ÂM: XKPROD FT LACANH · THU ÂM & MIX MASTER: XKPRODUCTION' : 'ARRANGEMENT: XKPROD FT LACANH · RECORDING & MIX MASTER: XKPRODUCTION' }}</p>
              <p class="case-desc">
                {{ isVi
                  ? 'Bản cover giàu cảm xúc về mẹ với phần đệm đàn piano mộc mạc và dàn dây ấm áp. Giọng hát của ca sĩ Mai Linh được thu âm và xử lý tự nhiên, giữ trọn sự mộc mạc và tình cảm chân thành gửi đến người nghe.'
                  : 'An emotional cover featuring intimate acoustic grand piano and warm orchestral strings. Vocals were tracked and processed naturally to preserve raw, authentic maternal emotion.'
                }}
              </p>

              <div class="case-metrics">
                <div class="metric-box">
                  <strong>Piano</strong>
                  <span>{{ isVi ? 'Phối khí mộc' : 'Acoustic Piano' }}</span>
                </div>
                <div class="metric-box">
                  <strong>-14 LUFS</strong>
                  <span>{{ isVi ? 'Chuẩn phát hành số' : 'Streaming Standard' }}</span>
                </div>
                <div class="metric-box">
                  <strong>Tube Pre-amp</strong>
                  <span>{{ isVi ? 'Giọng ấm áp' : 'Warm Vocal Tone' }}</span>
                </div>
              </div>

              <NuxtLink to="/work/nhat-ki-cua-me" class="btn-read-case">
                <span>{{ isVi ? 'Xem Chi Tiết Bài Thu Này' : 'Read Production Journal' }}</span>
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
          <span class="badge-v2 teal">{{ isVi ? 'SO SÁNH TRỰC TIẾP' : 'DIRECT COMPARISON' }}</span>
          <h2 class="editorial-heading">{{ isVi ? 'Nghe Thử: Giọng Thu Mộc & Bản Sau Khi Mix Master' : 'Listen: Raw Vocal vs. Mastered Track' }}</h2>
          <p class="section-subtitle">
            {{ isVi
              ? 'Kéo thanh trượt qua lại để nghe sự khác biệt rõ rệt giữa bản thu thô ban đầu và bài hát sau khi được cân chỉnh, hoà âm và hậu kỳ chuyên nghiệp.'
              : 'Drag the fader back and forth to hear the difference between raw microphone takes and the final polished master.'
            }}
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
            <span class="badge-v2 amber">{{ isVi ? 'QUY TRÌNH LÀM VIỆC' : 'OUR WORKFLOW' }}</span>
            <h2 class="editorial-heading">{{ isVi ? '8 Bước Hoàn Thiện Bài Hát Cùng Bạn' : '8 Steps to Completing Your Song' }}</h2>
          </div>
          <NuxtLink to="/production" class="link-arrow-v2">
            <span>{{ isVi ? 'Xem Chi Tiết Từng Bước' : 'Process Details' }}</span>
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
            <span class="badge-v2 amber">{{ isVi ? 'BÀI HÁT ĐÃ PHÁT HÀNH' : 'RELEASED TRACKS' }}</span>
            <h2 class="editorial-heading">{{ isVi ? 'Các Sản Phẩm Đã Lên Sóng Nền Tảng Số' : 'Streamed Tracks & Digital Releases' }}</h2>
          </div>
          <NuxtLink to="/work" class="link-arrow-v2">
            <span>{{ isVi ? 'Xem Tất Cả Tác Phẩm' : 'All Works' }}</span>
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
                <span class="text-meta-mono">{{ isVi ? 'SẢN XUẤT ÂM NHẠC & SOUND LIGHT' : 'FOUNDER & MUSIC PRODUCER' }}</span>
              </div>
            </div>

            <div class="founder-text-col">
              <span class="badge-v2 amber">{{ isVi ? 'NGƯỜI ĐỨNG SAU CÁC TÁC PHẨM' : 'MEET THE PRODUCER' }}</span>
              <h3 class="founder-title">{{ isVi ? 'Người Thổi Hồn Vào Từng Bản Phối & Sân Khấu' : 'Dedicated Partner for Your Music & Stage' }}</h3>
              <p class="founder-quote">
                {{ isVi
                  ? '"Một tác phẩm hay cần sự hoà quyện giữa cảm xúc chân thật, bản phối khí tinh tế và chất lượng âm thanh chuẩn xác. Dù là sản xuất âm nhạc, hoà âm phối khí hay vận hành sound & light sân khấu, chúng tôi luôn chăm chút tỉ mỉ cho đến khi bạn thực sự hài lòng."'
                  : '"A great record requires authentic emotion, bespoke arrangement, and pristine acoustic engineering. Whether in music production, arranging, or stage sound & light, we refine every detail until you are genuinely proud of it."'
                }}
              </p>
              <p class="founder-bio">
                {{ isVi
                  ? 'Hơn 7 năm chuyên sâu sản xuất âm nhạc, hoà âm phối khí và vận hành hệ thống âm thanh ánh sáng (Sound & Light) cho sự kiện, sân khấu trực tiếp cũng như nhận sản xuất bài hát online toàn quốc.'
                  : 'Over 7 years specializing in music production, custom arrangement, and live sound & light engineering for concerts, events, and artists nationwide.'
                }}
              </p>

              <div class="founder-stats-row">
                <div>
                  <strong class="stat-number">2,000+</strong>
                  <span class="stat-label text-meta-mono">{{ isVi ? 'Dự Án Sản Xuất' : 'Projects Produced' }}</span>
                </div>
                <div>
                  <strong class="stat-number">7+ Năm</strong>
                  <span class="stat-label text-meta-mono">{{ isVi ? 'Kinh Nghiệm Làm Nghề' : 'Years Experience' }}</span>
                </div>
                <div>
                  <strong class="stat-number">Tận Tâm</strong>
                  <span class="stat-label text-meta-mono">{{ isVi ? 'Với Từng Khách Hàng' : 'Dedicated Support' }}</span>
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
            <span class="badge-v2 teal">{{ isVi ? 'CHIA SẺ KINH NGHIỆM' : 'STUDIO TIPS' }}</span>
            <h2 class="editorial-heading">{{ isVi ? 'Kinh Nghiệm Thu Âm & Làm Nhạc Thực Tế' : 'Practical Recording & Music Production Tips' }}</h2>
          </div>
          <NuxtLink to="/journal" class="link-arrow-v2">
            <span>{{ isVi ? 'Tất Cả Bài Viết' : 'All Articles' }}</span>
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
          <span class="badge-v2 amber">{{ isVi ? 'CẢM NHẬN KHÁCH HÀNG' : 'CLIENT FEEDBACK' }}</span>
          <h2 class="editorial-heading">{{ isVi ? 'Chia Sẻ Từ Các Nghệ Sĩ & Đối Tác Đã Đồng Hành' : 'Feedback from Artists & Partners We Worked With' }}</h2>
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
          <span class="badge-v2 amber">{{ isVi ? 'BẮT ĐẦU DỰ ÁN' : 'READY TO CREATE?' }}</span>
          <h2 class="start-cta-title">{{ isVi ? 'Bạn Cần Sản Xuất Âm Nhạc, Phối Khí Hay Setup Sound & Light?' : 'Need Music Production, Arranging or Sound & Light Staging?' }}</h2>
          <p class="start-cta-desc">
            {{ isVi
              ? 'Dù bạn cần sản xuất bài hát trọn gói, phối khí cho sáng tác mới, hay setup hệ thống âm thanh ánh sáng chuyên nghiệp cho sự kiện, hãy nhắn ngay cho chúng tôi để được tư vấn phương án tối ưu nhất.'
              : 'Whether you need full-service music production, bespoke arranging for your track, or professional sound & light staging for your event, contact us today for the best solution.'
            }}
          </p>

          <div class="start-cta-buttons">
            <NuxtLink to="/start-a-project" class="btn-cta-main">
              <span>{{ isVi ? 'NHẮN TIN TƯ VẤN NGAY' : 'MESSAGE US FOR CONSULTATION' }}</span>
              <i class="fa-solid fa-arrow-right"></i>
            </NuxtLink>

            <NuxtLink to="/build-project" class="btn-cta-sub">
              <i class="fa-solid fa-sliders"></i>
              <span>{{ isVi ? 'Dự Toán Chi Phí Nhanh' : 'Calculate Estimate' }}</span>
            </NuxtLink>

            <a href="https://zalo.me/0355356294" target="_blank" rel="noopener noreferrer" class="btn-cta-zalo">
              <i class="fa-solid fa-comment-dots"></i>
              <span>{{ isVi ? 'Chat Zalo Với Kiệt' : 'Chat via Zalo' }}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale } from '~/composables/useLocale'
import { useStudioAudio } from '~/composables/useStudioAudio'

const { isVi } = useLocale()
const { projects, releases, capabilities } = useProductionProjects()
const { allBlogPosts } = useBlog()
const { pauseTrack: pauseGlobalAudio } = useStudioAudio()

const isSpotlightVideoActive = ref(false)
function startSpotlightVideo() {
  pauseGlobalAudio()
  isSpotlightVideoActive.value = true
}

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
  title: 'XKProduction — Sản Xuất Âm Nhạc, Hoà Âm Phối Khí & Sound Light Chuyên Nghiệp',
  description: 'XKProduction — Đơn vị sản xuất âm nhạc chuyên nghiệp, hoà âm phối khí sáng tạo độc bản và cung cấp giải pháp Sound & Light sân khấu, sự kiện chuyên nghiệp tại TP.HCM & toàn quốc.',
  ogTitle: 'XKProduction — Music Production, Arrangement & Sound Light',
  ogDescription: 'Sản xuất âm nhạc, Hoà âm phối khí độc bản, Mix & Master chuẩn Spotify và giải pháp Sound & Light sự kiện chuyên nghiệp. Hotline: 0355.356.294',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogType: 'website',
  ogUrl: 'https://xkproduction.com'
})

useSchemaOrg([
  defineWebPage({
    name: 'XKProduction - Music Production, Arrangement & Sound Light',
    description: 'Sản xuất âm nhạc, Hoà âm phối khí, Mix & Master và hệ thống Sound & Light biểu diễn, sự kiện chuyên nghiệp tại TP. Hồ Chí Minh và toàn quốc.'
  }),
  defineLocalBusiness({
    '@id': 'https://xkproduction.com/#localbusiness',
    name: 'XKProduction',
    image: 'https://xkproduction.com/images/Xkpreviewnew.png',
    logo: 'https://xkproduction.com/logo.png',
    telephone: '+84355356294',
    email: 'nguyenxuankiet294@gmail.com',
    url: 'https://xkproduction.com',
    priceRange: '350.000₫ – 5.000.000₫',
    address: {
      streetAddress: 'Thủ Đức',
      addressLocality: 'Thủ Đức',
      addressRegion: 'Thành phố Hồ Chí Minh',
      postalCode: '700000',
      addressCountry: 'VN'
    }
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

/* MANIFESTO SECTION — UNBOXED EDITORIAL MONOGRAPH */
.manifesto-editorial-wrap {
  padding: clamp(3rem, 6vw, 5rem) 0;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.manifesto-top {
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  margin-bottom: 2.25rem;
  flex-wrap: wrap;
}

.manifesto-divider {
  width: 1px;
  height: 12px;
  background-color: var(--border-medium, rgba(255, 255, 255, 0.18));
}

.manifesto-meta {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--text-tertiary, #94a3b8);
}

.manifesto-quote {
  font-size: clamp(1.75rem, 2.6vw, 2.45rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  line-height: 1.32;
  margin-bottom: 2rem;
  max-width: 1200px;
  text-wrap: balance;
  hanging-punctuation: first;
}

.manifesto-quote-line {
  display: inline;
}

@media (min-width: 1024px) {
  .manifesto-quote-line {
    display: block;
  }
}

.quote-mark {
  color: #fbbf24;
}

.manifesto-body {
  font-size: clamp(1.05rem, 1.6vw, 1.2rem);
  color: var(--text-secondary);
  line-height: 1.8;
  max-width: 820px;
  margin-bottom: 4rem;
  text-wrap: pretty;
}

.manifesto-pillars-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border-subtle);
}

.m-pillar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s ease;
}

.m-pillar:hover {
  transform: translateY(-2px);
}

.m-pillar-num {
  font-size: 0.75rem;
  color: #fbbf24;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.m-pillar-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: 0.04em;
}

.m-pillar p {
  font-size: 0.84rem;
  color: var(--text-secondary);
  line-height: 1.6;
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
  background: #060D1C;
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

/* YOUTUBE FACADE (HIGH-PERFORMANCE LAZY LOAD) */
.youtube-facade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.facade-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.youtube-facade:hover .facade-thumb {
  transform: scale(1.04);
}

.facade-scrim {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(5, 11, 20, 0.2) 0%, rgba(5, 11, 20, 0.75) 100%);
  transition: background 0.3s ease;
}

.youtube-facade:hover .facade-scrim {
  background: radial-gradient(circle at center, rgba(5, 11, 20, 0.1) 0%, rgba(5, 11, 20, 0.6) 100%);
}

.facade-play-badge {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  z-index: 2;
}

.facade-play-icon {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: #d97706;
  color: #050b14;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding-left: 4px;
  box-shadow: 0 0 30px rgba(217, 119, 6, 0.5);
  transition: all 0.25s ease;
}

.youtube-facade:hover .facade-play-icon {
  transform: scale(1.12);
  background: #fbbf24;
  box-shadow: 0 0 45px rgba(251, 191, 36, 0.7);
}

.facade-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #ffffff;
  background: rgba(10, 20, 36, 0.85);
  border: 1px solid rgba(251, 191, 36, 0.3);
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  backdrop-filter: blur(8px);
}

.facade-kicker i {
  color: #ef4444;
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

.founder-text-col .badge-v2 {
  align-self: flex-start;
  width: fit-content;
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
  border-left: 3px solid #1677FF;
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
  border-color: rgba(22, 119, 255, 0.35);
}

.jp-thumb-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: #060D1C;
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
  background: rgba(5, 11, 20, 0.85);
  backdrop-filter: blur(8px);
  color: #60CFFF;
  font-size: 0.6875rem;
  border: 1px solid rgba(22, 119, 255, 0.25);
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
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.jp-excerpt {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
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
  background:
    radial-gradient(ellipse 80% 70% at 50% -10%, rgba(22, 119, 255, 0.18) 0%, transparent 65%),
    radial-gradient(ellipse at 85% 100%, rgba(11, 42, 91, 0.5) 0%, transparent 50%),
    #071428;
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
  background: linear-gradient(135deg, #1677FF 0%, #00B8FF 100%);
  color: #ffffff;
  font-weight: 800;
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  border-radius: 6px;
  border: 1px solid rgba(22, 119, 255, 0.5);
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 18px rgba(22, 119, 255, 0.35);
}

.btn-cta-main:hover {
  background: linear-gradient(135deg, #2488FF 0%, #22c5ff 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(22, 119, 255, 0.5);
}

.btn-cta-sub {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.75rem;
  background: rgba(22, 119, 255, 0.08);
  border: 1px solid rgba(22, 119, 255, 0.22);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-cta-sub:hover {
  background: rgba(22, 119, 255, 0.14);
  border-color: rgba(22, 119, 255, 0.4);
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
