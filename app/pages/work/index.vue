<template>
  <div class="work-archive-page">
    <!-- AMBIENT BACKGROUND GLOWS -->
    <div class="work-ambient-glow glow-top-left" aria-hidden="true"></div>
    <div class="work-ambient-glow glow-center-right" aria-hidden="true"></div>

    <div class="editorial-container relative-content">
      <!-- 01: HERO SECTION -->
      <section class="page-hero-section">
        <div class="hero-badge-row">
          <span class="badge-v2 amber">
            <span class="pulsing-dot"></span>
            {{ isVi ? 'XKPRODUCTION ARCHIVE · TIÊU CHUẨN PHÒNG THU QUỐC TẾ' : 'XKPRODUCTION ARCHIVE · STUDIO MASTER GRADE' }}
          </span>
          <span class="hero-edition-tag font-mono text-meta-mono">{{ isVi ? 'PHIÊN BẢN 2026' : 'CATALOG 2026' }}</span>
        </div>

        <h1 class="archive-title">
          {{ isVi ? 'KHO TÁC PHẨM &' : 'SELECTED WORK &' }}
          <span class="gold-gradient-text">{{ isVi ? 'BẢN GHI MASTER' : 'MASTER RELEASES' }}</span>
        </h1>

        <p class="archive-subtitle">
          {{ isVi
            ? 'Tuyển tập những tác phẩm âm nhạc độc bản, bản hoà âm phối khí chuyên nghiệp và sản phẩm phát hành số hoàn thiện tại XKProduction. Nơi chuẩn mực âm học -14 LUFS giao hoà cùng cảm xúc chân thật nhất của người nghệ sĩ.'
            : 'A curated anthology of bespoke arrangements, commercial music productions, and master records engineered at XKProduction. Where precision acoustics meet the authentic soul of every artist.'
          }}
        </p>

        <!-- CREDENTIALS & METRICS BAR -->
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-icon"><i class="fa-solid fa-award"></i></div>
            <div class="metric-data">
              <strong class="metric-value">2.000+</strong>
              <span class="metric-label">{{ isVi ? 'Dự án đã hoàn tất' : 'Projects Completed' }}</span>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon"><i class="fa-solid fa-sliders"></i></div>
            <div class="metric-data">
              <strong class="metric-value">-14 LUFS</strong>
              <span class="metric-label">{{ isVi ? 'Chuẩn Spotify & Apple Music' : 'Streaming Standard' }}</span>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon"><i class="fa-solid fa-music"></i></div>
            <div class="metric-data">
              <strong class="metric-value">100%</strong>
              <span class="metric-label">{{ isVi ? 'Hoà âm phối khí độc bản' : 'Custom Arrangements' }}</span>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon"><i class="fa-solid fa-globe"></i></div>
            <div class="metric-data">
              <strong class="metric-value">ISRC &amp; UPC</strong>
              <span class="metric-label">{{ isVi ? 'Hỗ trợ phát hành toàn cầu' : 'Global Distribution Ready' }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 02: MASTERPIECE SPOTLIGHT (FLAGSHIP PRODUCTION) -->
      <section v-if="spotlightProject" class="spotlight-section">
        <div class="spotlight-card">
          <div class="spotlight-media-wrap">
            <img
              :src="spotlightProject.coverImage"
              :alt="spotlightProject.title"
              class="spotlight-img"
              width="800"
              height="480"
            />
            <div class="spotlight-media-scrim"></div>

            <!-- VINYL ACCENT EMBLEM -->
            <div class="spotlight-vinyl-badge" :class="{ 'is-spinning': isSpotlightPlaying }">
              <i class="fa-solid fa-compact-disc"></i>
            </div>

            <!-- INSTANT QUICK PLAY ON SPOTLIGHT -->
            <button
              type="button"
              class="spotlight-play-btn"
              :class="{ 'is-active': isSpotlightPlaying }"
              @click="toggleSpotlightPlay"
              :aria-label="isSpotlightPlaying ? 'Tạm dừng bản master' : 'Phát thử bản master'"
            >
              <i :class="isSpotlightPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
              <span class="font-mono">{{ isSpotlightPlaying ? (isVi ? 'ĐANG PHÁT MASTER' : 'PLAYING MASTER') : (isVi ? 'NGHE MASTER AUDIO' : 'PLAY MASTER AUDIO') }}</span>
              <!-- LIVE AUDIO WAVE ANIMATION -->
              <span v-if="isSpotlightPlaying" class="live-wave-bars" aria-hidden="true">
                <span class="bar bar-1"></span>
                <span class="bar bar-2"></span>
                <span class="bar bar-3"></span>
                <span class="bar bar-4"></span>
              </span>
            </button>
          </div>

          <div class="spotlight-content">
            <div class="spotlight-kicker-row">
              <span class="badge-v2 amber">{{ isVi ? 'TÁC PHẨM TIÊU BIỂU · SPOTLIGHT' : 'FLAGSHIP MASTERPIECE' }}</span>
              <span class="text-meta-mono font-mono">{{ spotlightProject.year }} · {{ spotlightProject.categoryLabel }}</span>
            </div>

            <h2 class="spotlight-title">
              <NuxtLink :to="`/work/${spotlightProject.slug}`" class="spotlight-title-link">
                {{ spotlightProject.title }}
              </NuxtLink>
            </h2>

            <p class="spotlight-artist text-meta-mono">
              <span>{{ isVi ? 'NGHỆ SĨ THỂ HIỆN:' : 'PERFORMED BY:' }}</span>
              <strong class="artist-highlight">{{ spotlightProject.artist }}</strong>
            </p>

            <p class="spotlight-story-desc">
              {{ spotlightProject.subtitle || spotlightProject.story?.origin }}
            </p>

            <!-- SOUND DESIGN SPECS CHIPS -->
            <div class="spotlight-specs-chips">
              <div class="spec-chip">
                <i class="fa-solid fa-wave-square"></i>
                <span>Grand Piano Mộc &amp; Strings 3D</span>
              </div>
              <div class="spec-chip">
                <i class="fa-solid fa-stopwatch"></i>
                <span>Tempo 82 BPM · Key C</span>
              </div>
              <div class="spec-chip">
                <i class="fa-solid fa-headphones"></i>
                <span>-14.0 LUFS Master</span>
              </div>
            </div>

            <div class="spotlight-actions-row">
              <NuxtLink :to="`/work/${spotlightProject.slug}`" class="btn-spotlight-primary">
                <span>{{ isVi ? 'KHÁM PHÁ CASE STUDY' : 'VIEW CASE STUDY' }}</span>
                <i class="fa-solid fa-arrow-right"></i>
              </NuxtLink>

              <a
                v-if="spotlightProject.videoUrl"
                :href="spotlightProject.videoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-spotlight-ghost"
              >
                <i class="fa-brands fa-youtube"></i>
                <span>{{ isVi ? 'Xem Video 4K Trên YouTube' : 'Watch on YouTube' }}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 03: FILTER SUITE & VIEW SWITCHER -->
      <section class="controls-toolbar-section">
        <div class="toolbar-left">
          <span class="toolbar-label text-meta-mono">{{ isVi ? 'LỌC THEO THỂ LOẠI / DỊCH VỤ' : 'FILTER BY DISCIPLINE' }}</span>
          <div class="category-tabs" role="tablist">
            <button
              v-for="cat in categories"
              :key="cat.value"
              class="tab-btn"
              :class="{ active: selectedCat === cat.value }"
              @click="selectedCat = cat.value"
            >
              <span>{{ isVi ? cat.viLabel : cat.enLabel }}</span>
              <span class="tab-count font-mono">{{ getCategoryCount(cat.value) }}</span>
            </button>
          </div>
        </div>

        <div class="toolbar-right">
          <span class="toolbar-label text-meta-mono">{{ isVi ? 'CHẾ ĐỘ XEM' : 'VIEW MODE' }}</span>
          <div class="view-mode-toggle" role="group" :aria-label="isVi ? 'Chuyển chế độ xem' : 'Switch view mode'">
            <button
              type="button"
              class="mode-btn"
              :class="{ active: viewMode === 'grid' }"
              @click="viewMode = 'grid'"
              :title="isVi ? 'Xem dạng thẻ điện ảnh' : 'Cinematic Grid view'"
            >
              <i class="fa-solid fa-grip"></i>
              <span>{{ isVi ? 'Điện Ảnh' : 'Cinematic' }}</span>
            </button>
            <button
              type="button"
              class="mode-btn"
              :class="{ active: viewMode === 'discography' }"
              @click="viewMode = 'discography'"
              :title="isVi ? 'Xem kho đĩa phát hành số' : 'Discography & Streaming Wall'"
            >
              <i class="fa-solid fa-record-vinyl"></i>
              <span>{{ isVi ? 'Kho Đĩa & Streaming' : 'Discography' }}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- 04: MAIN ARCHIVE DISPLAY -->
      <section class="archive-display-section">
        <!-- VIEW MODE A: CINEMATIC CARDS GRID -->
        <div v-if="viewMode === 'grid'" class="archive-grid">
          <XKProjectCard
            v-for="p in filteredProjects"
            :key="p.slug"
            :project="p"
          />
        </div>

        <!-- VIEW MODE B: DISCOGRAPHY & STREAMING WALL -->
        <div v-else class="discography-container">
          <div class="disco-header-box">
            <div class="disco-title-group">
              <span class="badge-v2 teal">{{ isVi ? 'DANH MỤC PHÁT HÀNH SỐ' : 'DIGITAL DISCOGRAPHY' }}</span>
              <h2 class="disco-heading">{{ isVi ? 'Đĩa Nhạc & Ca Khúc Phát Hành Thương Mại' : 'Streamed Tracks & Public Catalog' }}</h2>
            </div>
            <p class="disco-desc">
              {{ isVi
                ? 'Các bản ghi do XKProduction thu âm, hoà âm và mix master đang có mặt trên các nền tảng streaming âm nhạc toàn cầu.'
                : 'Selected tracks engineered, arranged, and mastered by XKProduction streaming globally on official platforms.'
              }}
            </p>
          </div>

          <XKReleaseWall :releases="releases" />
        </div>
      </section>

      <!-- 05: GLOBAL DISTRIBUTION & STREAMING ECOSYSTEM (HỢP NHẤT GIÁ TRỊ TRANG PHÁT HÀNH) -->
      <section class="streaming-ecosystem-section">
        <div class="ecosystem-card matte-card">
          <div class="eco-header text-center">
            <span class="badge-v2 teal">
              <i class="fa-solid fa-satellite-dish"></i>
              {{ isVi ? 'KẾT NỐI TOÀN CẦU' : 'GLOBAL REACH' }}
            </span>
            <h2 class="eco-title">
              {{ isVi ? 'Tiêu Chuẩn Phát Hành Quốc Tế & Mạng Lưới Streaming' : 'International Distribution & Streaming Readiness' }}
            </h2>
            <p class="eco-subtitle">
              {{ isVi
                ? 'Mỗi tác phẩm sản xuất tại XKProduction đều được thiết kế để phát huy chất lượng tốt nhất trên các hệ thống phát nhạc chất lượng cao nhất.'
                : 'Every project engineered at XKProduction is optimized for maximum fidelity across high-resolution streaming networks.'
              }}
            </p>
          </div>

          <!-- 3 PILLARS OF RELEASE EXCELLENCE -->
          <div class="eco-pillars-grid">
            <div class="eco-pillar">
              <div class="pillar-number font-mono">01</div>
              <h3 class="pillar-title">{{ isVi ? 'Mastering Đạt Chuẩn -14 LUFS' : '-14 LUFS True-Peak Master' }}</h3>
              <p class="pillar-text">
                {{ isVi
                  ? 'Kiểm soát dynamic range khắt khe, giúp ca khúc của bạn giữ nguyên độ nảy, không bị thuật toán của Spotify hay Apple Music nén dập âm sắc.'
                  : 'Rigorous dynamic range control ensuring your track preserves headroom and punch without destructive normalization compression.'
                }}
              </p>
            </div>

            <div class="eco-pillar">
              <div class="pillar-number font-mono">02</div>
              <h3 class="pillar-title">{{ isVi ? 'Bảo Trợ ISRC &amp; Mã Vạch UPC' : 'ISRC & UPC Rights Metadata' }}</h3>
              <p class="pillar-text">
                {{ isVi
                  ? 'Tư vấn đăng ký mã nhận dạng bản quyền số quốc tế, hỗ trợ bảo vệ quyền tác giả và tối ưu hoá doanh thu phân phối streaming.'
                  : 'Full guidance on digital audio encoding, ISRC registration, and metadata tagging to safeguard ownership and royalties.'
                }}
              </p>
            </div>

            <div class="eco-pillar">
              <div class="pillar-number font-mono">03</div>
              <h3 class="pillar-title">{{ isVi ? 'Xuất File Đa Định Dạng (Stems)' : 'Multi-format Stem Delivery' }}</h3>
              <p class="pillar-text">
                {{ isVi
                  ? 'Cung cấp trọn bộ file Master 24-bit/48kHz, Beat Instrumental, Vocal Stems riêng biệt và phiên bản tối ưu riêng cho TikTok Sound & Reels.'
                  : 'Delivered in lossless 24-bit/48kHz WAV, instrumental playback tracks, isolated vocal stems, and social-first short audio snippets.'
                }}
              </p>
            </div>
          </div>

          <!-- PLATFORM BADGES -->
          <div class="platforms-showcase">
            <span class="plat-kicker text-meta-mono">{{ isVi ? 'PHÂN PHỐI ĐA NỀN TẢNG:' : 'READY FOR DISTRIBUTION:' }}</span>
            <div class="plat-badges-wrap">
              <div class="plat-item"><i class="fa-brands fa-spotify"></i> Spotify</div>
              <div class="plat-item"><i class="fa-brands fa-apple"></i> Apple Music</div>
              <div class="plat-item"><i class="fa-brands fa-youtube"></i> YouTube Music</div>
              <div class="plat-item"><i class="fa-brands fa-tiktok"></i> TikTok Sound</div>
              <div class="plat-item"><i class="fa-solid fa-compact-disc"></i> Zing MP3</div>
              <div class="plat-item"><i class="fa-solid fa-headphones"></i> NhacCuaTui</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 06: PRODUCER'S CREED & STUDIO PHILOSOPHY -->
      <section class="philosophy-quote-section">
        <div class="quote-card">
          <div class="quote-mark" aria-hidden="true">“</div>
          <blockquote class="quote-body">
            {{ isVi
              ? 'Tại XKProduction, chúng tôi không xem hoà âm hay thu âm chỉ là một dịch vụ kỹ thuật thuần tuý. Đó là sự thấu cảm. Một tác phẩm hoàn hảo không phải là bản phối nhồi nhét nhiều nhạc cụ nhất, mà là bản phối biết lùi lại đúng lúc để giọng hát và câu chuyện của người nghệ sĩ toả sáng nhất.'
              : 'At XKProduction, we never view arrangement or studio engineering as mere technical routine. It is deep empathy. A masterpiece is not the arrangement packed with the most instruments, but the one that knows precisely when to step back so the artist’s soul and lyric take center stage.'
            }}
          </blockquote>
          <div class="quote-author-row">
            <img
              src="/images/founder-kiet.jpg"
              alt="Nguyễn Xuân Kiệt - Founder & Music Producer"
              class="author-avatar"
              width="52"
              height="52"
              loading="lazy"
            />
            <div class="author-info">
              <strong class="author-name">Nguyễn Xuân Kiệt (Xkprod)</strong>
              <span class="author-role text-meta-mono">{{ isVi ? 'FOUNDER & MUSIC PRODUCER TẠI XKPRODUCTION' : 'FOUNDER & LEAD MUSIC PRODUCER' }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 07: BOTTOM CALL-TO-ACTION BANNER -->
      <section class="work-cta-section">
        <div class="work-cta-banner">
          <div class="cta-glow-circle" aria-hidden="true"></div>
          <div class="cta-content">
            <span class="badge-v2 amber">{{ isVi ? 'BẮT ĐẦU TÁC PHẨM CỦA BẠN' : 'START YOUR MASTERPIECE' }}</span>
            <h2 class="banner-title">
              {{ isVi ? 'Bạn Có Bản Demo Muốn Trở Thành Tác Phẩm Độc Bản?' : 'Ready To Turn Your Rough Demo Into A Master Record?' }}
            </h2>
            <p class="banner-desc">
              {{ isVi
                ? 'Đừng để giai điệu của bạn nằm yên trong bản ghi âm điện thoại. Hãy cùng đội ngũ producer XKProduction hiện thực hoá tác phẩm với chuẩn mực phòng thu hàng đầu.'
                : 'Do not let your melodies remain hidden in phone voice memos. Partner with XKProduction to shape your next release with world-class studio fidelity.'
              }}
            </p>

            <div class="cta-actions-group">
              <NuxtLink to="/start-a-project" class="btn-cta-primary">
                <span>{{ isVi ? 'GỬI PROJECT BRIEF & DEMO' : 'SUBMIT PROJECT BRIEF' }}</span>
                <i class="fa-solid fa-arrow-right"></i>
              </NuxtLink>

              <NuxtLink to="/build-project" class="btn-cta-secondary">
                <i class="fa-solid fa-sliders"></i>
                <span>{{ isVi ? 'Dự Toán Chi Phí Tự Động' : 'Interactive Project Builder' }}</span>
              </NuxtLink>

              <a
                href="https://zalo.me/0355356294"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-cta-zalo"
                :title="isVi ? 'Tư vấn trực tiếp qua Zalo' : 'Direct Zalo consultation'"
              >
                <i class="fa-solid fa-comment-dots"></i>
                <span>{{ isVi ? 'Chat Zalo Studio' : 'Studio Zalo' }}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale } from '~/composables/useLocale'
import { useProductionProjects } from '~/composables/useProductionProjects'
import { useStudioAudio } from '~/composables/useStudioAudio'

const { isVi } = useLocale()
const { projects, releases } = useProductionProjects()
const { playTrackById, togglePlay, currentTrack, isPlaying } = useStudioAudio()

const selectedCat = ref('all')
const viewMode = ref<'grid' | 'discography'>('grid')

// Featured Spotlight Project
const spotlightProject = computed(() => {
  return projects.find(p => p.slug === 'nhat-ki-cua-me') || projects[0]
})

const isSpotlightPlaying = computed(() => {
  if (!spotlightProject.value) return false
  return isPlaying.value && (currentTrack.value?.id === spotlightProject.value.slug || currentTrack.value?.id === spotlightProject.value.id)
})

function toggleSpotlightPlay() {
  if (!spotlightProject.value) return
  if (isSpotlightPlaying.value) {
    togglePlay()
  } else {
    playTrackById(spotlightProject.value.slug)
  }
}

const categories = [
  { viLabel: 'Tất Cả Tác Phẩm', enLabel: 'All Works', value: 'all' },
  { viLabel: 'Hoà Âm Phối Khí', enLabel: 'Arrangement', value: 'Arrangement' },
  { viLabel: 'Mix & Master', enLabel: 'Mix & Master', value: 'Mix & Master' },
  { viLabel: 'Sản Xuất Ca Khúc', enLabel: 'Music Production', value: 'Music Production' },
  { viLabel: 'Thu Âm Studio', enLabel: 'Vocal Recording', value: 'Thu âm' },
  { viLabel: 'Sound Design & MV', enLabel: 'Sound Design', value: 'Sound Design' }
]

function getCategoryCount(catValue: string): number {
  if (catValue === 'all') return projects.length
  return projects.filter(p => p.category === catValue).length
}

const filteredProjects = computed(() => {
  if (selectedCat.value === 'all') return projects
  return projects.filter(p => p.category === selectedCat.value)
})

useSeoMeta({
  title: () => isVi.value
    ? 'Tác Phẩm & Master Recordings — Kho Dự Án Sản Xuất Âm Nhạc | XKProduction'
    : 'Selected Work & Master Recordings | XKProduction Studio',
  description: () => isVi.value
    ? 'Khám phá kho tác phẩm âm nhạc độc bản, bản hoà âm phối khí chuyên nghiệp và bản thu âm mix master chuẩn Spotify tại XKProduction. 2000+ dự án hoàn tất.'
    : 'Curated archive of bespoke music arrangements, studio recordings, and master releases by XKProduction. Over 2000+ completed projects.',
  ogTitle: () => isVi.value
    ? 'Tác Phẩm & Master Recordings — XKProduction Studio'
    : 'Selected Works & Master Recordings | XKProduction',
  ogDescription: () => isVi.value
    ? 'Kho tác phẩm âm nhạc tinh tuyển sản xuất tại XKProduction. Hoà âm độc bản, thu âm & mix master chuẩn streaming quốc tế.'
    : 'High-fidelity commercial releases and bespoke music productions from XKProduction.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: 'https://xkproduction.com/work'
})
</script>

<style scoped>
.work-archive-page {
  position: relative;
  padding-top: clamp(7.5rem, 13vw, 10.5rem);
  padding-bottom: 7rem;
  background-color: var(--bg-canvas, #050b14);
  color: var(--text-primary, #f3f4f6);
  min-height: 100vh;
  overflow: hidden;
}

.relative-content {
  position: relative;
  z-index: 2;
}

/* AMBIENT GLOWS */
.work-ambient-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(120px);
  z-index: 1;
}

.glow-top-left {
  top: 5%;
  left: -10%;
  width: 55vw;
  height: 55vw;
  background: radial-gradient(circle, rgba(22, 119, 255, 0.12) 0%, rgba(217, 119, 6, 0.05) 50%, transparent 70%);
}

.glow-center-right {
  top: 40%;
  right: -10%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(217, 119, 6, 0.08) 0%, rgba(20, 184, 166, 0.05) 50%, transparent 70%);
}

/* 01: HERO SECTION */
.page-hero-section {
  margin-bottom: 4rem;
}

.hero-badge-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.pulsing-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #fbbf24;
  box-shadow: 0 0 10px #fbbf24;
  margin-right: 0.35rem;
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.9); opacity: 0.8; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(0.9); opacity: 0.8; }
}

.hero-edition-tag {
  color: var(--text-subtle, #64748b);
  letter-spacing: 0.12em;
}

.archive-title {
  font-size: clamp(2.5rem, 5.5vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.025em;
  line-height: 1.05;
  color: var(--text-primary, #f3f4f6);
  margin-bottom: 1.25rem;
  text-wrap: balance;
}

.gold-gradient-text {
  background: linear-gradient(135deg, #fbbf24 0%, #fef08a 50%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.archive-subtitle {
  font-size: clamp(1.05rem, 1.35vw, 1.2rem);
  color: var(--text-secondary, #94a3b8);
  max-width: 820px;
  line-height: 1.68;
  margin-bottom: 2.75rem;
}

/* METRICS BAR */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: rgba(10, 20, 36, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(22, 119, 255, 0.12);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.metric-card {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.metric-icon {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.25);
  color: #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  flex-shrink: 0;
}

.metric-data {
  display: flex;
  flex-direction: column;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary, #f3f4f6);
  letter-spacing: -0.01em;
}

.metric-label {
  font-size: 0.75rem;
  color: var(--text-secondary, #94a3b8);
  margin-top: 0.15rem;
}

/* 02: SPOTLIGHT SECTION */
.spotlight-section {
  margin-bottom: 4.5rem;
}

.spotlight-card {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(15, 29, 50, 0.85) 0%, rgba(10, 20, 36, 0.95) 100%);
  border: 1px solid rgba(251, 191, 36, 0.22);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.65), 0 0 35px rgba(217, 119, 6, 0.08);
  overflow: hidden;
  position: relative;
}

.spotlight-media-wrap {
  position: relative;
  min-height: 380px;
  overflow: hidden;
  background: #000;
}

.spotlight-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.spotlight-card:hover .spotlight-img {
  transform: scale(1.03);
}

.spotlight-media-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(10, 20, 36, 0.85) 100%);
}

.spotlight-vinyl-badge {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(10, 20, 36, 0.85);
  border: 1px solid rgba(251, 191, 36, 0.4);
  color: #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  backdrop-filter: blur(8px);
  z-index: 2;
}

.spotlight-vinyl-badge.is-spinning {
  animation: spin-record 4s linear infinite;
}

@keyframes spin-record {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spotlight-play-btn {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1.4rem;
  border-radius: 999px;
  background: rgba(10, 20, 36, 0.92);
  border: 1px solid #fbbf24;
  color: #fbbf24;
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  z-index: 3;
  backdrop-filter: blur(10px);
  transition: all 0.25s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.spotlight-play-btn:hover {
  background: #fbbf24;
  color: #050b14;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(251, 191, 36, 0.4);
}

.spotlight-play-btn.is-active {
  background: #0d9488;
  border-color: #2dd4bf;
  color: #ffffff;
  box-shadow: 0 0 20px rgba(13, 148, 136, 0.6);
}

.live-wave-bars {
  display: inline-flex;
  align-items: flex-end;
  gap: 2px;
  height: 14px;
  margin-left: 0.25rem;
}

.live-wave-bars .bar {
  width: 3px;
  background-color: currentColor;
  border-radius: 2px;
  animation: wave-bounce 1s ease-in-out infinite alternate;
}

.bar-1 { height: 6px; animation-delay: 0.1s; }
.bar-2 { height: 14px; animation-delay: 0.3s; }
.bar-3 { height: 9px; animation-delay: 0.2s; }
.bar-4 { height: 12px; animation-delay: 0.4s; }

@keyframes wave-bounce {
  0% { height: 3px; }
  100% { height: 14px; }
}

.spotlight-content {
  padding: clamp(2rem, 3.5vw, 3rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.spotlight-kicker-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 0.85rem;
  flex-wrap: wrap;
}

.spotlight-title {
  font-size: clamp(1.85rem, 2.8vw, 2.65rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.015em;
  margin-bottom: 0.5rem;
}

.spotlight-title-link {
  color: var(--text-primary, #f3f4f6);
  text-decoration: none;
  transition: color 0.2s ease;
}

.spotlight-title-link:hover {
  color: #fbbf24;
}

.spotlight-artist {
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  color: var(--text-secondary, #94a3b8);
  margin-bottom: 1.25rem;
}

.artist-highlight {
  color: #fbbf24;
  margin-left: 0.35rem;
}

.spotlight-story-desc {
  font-size: 0.95rem;
  color: var(--text-secondary, #94a3b8);
  line-height: 1.65;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.spotlight-specs-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 2rem;
}

.spec-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary, #94a3b8);
}

.spec-chip i {
  color: #fbbf24;
}

.spotlight-actions-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-spotlight-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.75rem;
  background: #fbbf24;
  color: #050b14;
  font-weight: 800;
  font-size: 0.8125rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-spotlight-primary:hover {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(251, 191, 36, 0.3);
}

.btn-spotlight-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.35rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text-primary, #f3f4f6);
  font-size: 0.8125rem;
  font-weight: 700;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-spotlight-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ef4444;
  color: #ffffff;
}

.btn-spotlight-ghost i {
  color: #ef4444;
}

/* 03: CONTROLS & TOOLBAR SECTION */
.controls-toolbar-section {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.75rem;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid var(--border-subtle, rgba(22, 119, 255, 0.1));
  flex-wrap: wrap;
}

.toolbar-left, .toolbar-right {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.toolbar-label {
  font-size: 0.6875rem;
  color: var(--text-subtle, #64748b);
  letter-spacing: 0.08em;
}

.category-tabs {
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.05rem;
  border-radius: 6px;
  background: rgba(10, 20, 36, 0.6);
  border: 1px solid rgba(22, 119, 255, 0.14);
  color: var(--text-secondary, #94a3b8);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: rgba(22, 119, 255, 0.12);
  color: var(--text-primary, #f3f4f6);
  border-color: rgba(22, 119, 255, 0.35);
}

.tab-btn.active {
  background: #d97706;
  color: #ffffff;
  border-color: #fbbf24;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(217, 119, 6, 0.35);
}

.tab-count {
  font-size: 0.6875rem;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.3);
  color: inherit;
}

/* VIEW MODE TOGGLE */
.view-mode-toggle {
  display: inline-flex;
  padding: 0.25rem;
  border-radius: 8px;
  background: rgba(10, 20, 36, 0.85);
  border: 1px solid rgba(22, 119, 255, 0.16);
}

.mode-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.95rem;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--text-secondary, #94a3b8);
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-btn:hover {
  color: var(--text-primary, #f3f4f6);
}

.mode-btn.active {
  background: rgba(255, 255, 255, 0.12);
  color: #fbbf24;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

/* 04: ARCHIVE DISPLAY SECTION */
.archive-display-section {
  margin-bottom: 5.5rem;
}

.archive-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.disco-header-box {
  margin-bottom: 2.5rem;
}

.disco-heading {
  font-size: clamp(1.8rem, 3.2vw, 2.5rem);
  font-weight: 800;
  color: var(--text-primary, #f3f4f6);
  margin-top: 0.65rem;
  margin-bottom: 0.5rem;
}

.disco-desc {
  font-size: 1rem;
  color: var(--text-secondary, #94a3b8);
  max-width: 760px;
}

/* 05: GLOBAL STREAMING ECOSYSTEM */
.streaming-ecosystem-section {
  margin-bottom: 5.5rem;
}

.ecosystem-card {
  padding: clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 3.5vw, 3.5rem);
  background: radial-gradient(circle at 50% 0%, rgba(20, 184, 166, 0.14), transparent 70%),
              radial-gradient(circle at 100% 100%, rgba(22, 119, 255, 0.08), transparent 60%),
              #0a1424;
  border: 1px solid rgba(20, 184, 166, 0.22);
  border-radius: 16px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.5);
}

.eco-title {
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 800;
  color: var(--text-primary, #f3f4f6);
  margin-top: 0.85rem;
  margin-bottom: 0.65rem;
}

.eco-subtitle {
  font-size: 1.0625rem;
  color: var(--text-secondary, #94a3b8);
  max-width: 740px;
  margin: 0 auto 3rem;
  line-height: 1.65;
}

.eco-pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  margin-bottom: 3.5rem;
}

.eco-pillar {
  padding: 1.75rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.eco-pillar:hover {
  transform: translateY(-3px);
  border-color: rgba(20, 184, 166, 0.4);
}

.pillar-number {
  font-size: 1.15rem;
  font-weight: 800;
  color: #14b8a6;
  margin-bottom: 0.75rem;
}

.pillar-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary, #f3f4f6);
  margin-bottom: 0.65rem;
}

.pillar-text {
  font-size: 0.875rem;
  color: var(--text-secondary, #94a3b8);
  line-height: 1.6;
}

.platforms-showcase {
  padding-top: 2.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.plat-kicker {
  font-size: 0.75rem;
  color: var(--text-subtle, #64748b);
  letter-spacing: 0.1em;
}

.plat-badges-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.plat-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.15rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--text-primary, #f3f4f6);
  transition: all 0.2s ease;
}

.plat-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #fbbf24;
  transform: translateY(-2px);
}

.plat-item i {
  color: #fbbf24;
}

/* 06: PHILOSOPHY QUOTE SECTION */
.philosophy-quote-section {
  margin-bottom: 5.5rem;
}

.quote-card {
  position: relative;
  padding: clamp(2.5rem, 4.5vw, 3.75rem);
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(10, 20, 36, 0.95) 0%, rgba(21, 34, 64, 0.7) 100%);
  border: 1px solid rgba(251, 191, 36, 0.18);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
}

.quote-mark {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  font-size: 6rem;
  line-height: 1;
  font-family: Georgia, serif;
  color: rgba(251, 191, 36, 0.1);
  pointer-events: none;
}

.quote-body {
  position: relative;
  z-index: 1;
  font-size: clamp(1.15rem, 1.8vw, 1.45rem);
  line-height: 1.65;
  color: var(--text-primary, #f3f4f6);
  font-style: italic;
  font-weight: 400;
  margin-bottom: 2rem;
  max-width: 960px;
}

.quote-author-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fbbf24;
  box-shadow: 0 0 16px rgba(251, 191, 36, 0.3);
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary, #f3f4f6);
}

.author-role {
  font-size: 0.75rem;
  color: #fbbf24;
  letter-spacing: 0.08em;
}

/* 07: BOTTOM CTA SECTION */
.work-cta-section {
  position: relative;
}

.work-cta-banner {
  position: relative;
  padding: clamp(3rem, 5vw, 4.5rem) clamp(1.5rem, 4vw, 3.5rem);
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(15, 29, 50, 0.95) 0%, rgba(217, 119, 6, 0.15) 100%);
  border: 1px solid rgba(251, 191, 36, 0.25);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.cta-glow-circle {
  position: absolute;
  top: -40%;
  right: -10%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 860px;
}

.banner-title {
  font-size: clamp(1.85rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: var(--text-primary, #f3f4f6);
  line-height: 1.15;
  margin-top: 1rem;
  margin-bottom: 0.85rem;
}

.banner-desc {
  font-size: 1.0625rem;
  color: var(--text-secondary, #94a3b8);
  line-height: 1.65;
  margin-bottom: 2.25rem;
}

.cta-actions-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.95rem 2rem;
  background: #fbbf24;
  color: #050b14;
  font-weight: 800;
  font-size: 0.875rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 8px 24px rgba(251, 191, 36, 0.3);
}

.btn-cta-primary:hover {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(251, 191, 36, 0.45);
}

.btn-cta-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.95rem 1.75rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: var(--text-primary, #f3f4f6);
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: #fbbf24;
  transform: translateY(-2px);
}

.btn-cta-zalo {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.95rem 1.65rem;
  background: rgba(0, 104, 255, 0.15);
  border: 1px solid rgba(0, 104, 255, 0.35);
  color: #60a5fa;
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-cta-zalo:hover {
  background: rgba(0, 104, 255, 0.28);
  border-color: #60a5fa;
  color: #ffffff;
  transform: translateY(-2px);
}

/* RESPONSIVE BREAKPOINTS */
@media (max-width: 1024px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .spotlight-card {
    grid-template-columns: 1fr;
  }

  .spotlight-media-wrap {
    min-height: 300px;
    aspect-ratio: 16 / 9;
  }

  .eco-pillars-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr;
    padding: 1.25rem;
  }

  .archive-grid {
    grid-template-columns: 1fr;
  }

  .controls-toolbar-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .toolbar-right {
    width: 100%;
  }

  .view-mode-toggle {
    width: 100%;
    justify-content: space-between;
  }

  .mode-btn {
    flex: 1;
    justify-content: center;
  }

  .quote-card {
    padding: 2rem 1.5rem;
  }

  .cta-actions-group {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-cta-primary, .btn-cta-secondary, .btn-cta-zalo {
    justify-content: center;
  }
}
</style>
