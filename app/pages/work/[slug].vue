<template>
  <div class="case-study-page">
    <template v-if="project">
      <!-- HERO BANNER -->
      <section class="case-hero">
        <div class="editorial-container">
          <NuxtLink to="/work" class="back-link">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Trở lại thư viện tác phẩm</span>
          </NuxtLink>

          <div class="case-meta-row">
            <span class="badge-v2 amber">{{ project.categoryLabel }}</span>
            <span class="text-meta-mono">{{ project.year }} · VIETNAM</span>
          </div>

          <h1 class="case-hero-title">{{ project.title }}</h1>
          <p class="case-hero-artist">Đồng hành cùng nghệ sĩ <strong>{{ project.artist }}</strong></p>
          <p v-if="project.subtitle" class="case-hero-sub">{{ project.subtitle }}</p>
        </div>
      </section>

      <!-- MEDIA DISPLAY SECTION (VIDEO / AUDIO) -->
      <section class="case-media-section">
        <div class="editorial-container">
          <div v-if="project.videoEmbedId" class="media-aspect-box matte-card">
            <iframe
              v-if="isVideoPlaying"
              :src="`https://www.youtube.com/embed/${project.videoEmbedId}?autoplay=1&rel=0`"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowfullscreen
              class="case-iframe"
              :title="project.title"
            ></iframe>
            <div
              v-else
              class="case-youtube-facade"
              @click="startCaseVideo"
              role="button"
              tabindex="0"
              :aria-label="`Phát video ${project.title}`"
              @keydown.enter="startCaseVideo"
            >
              <img
                :src="`https://img.youtube.com/vi/${project.videoEmbedId}/maxresdefault.jpg`"
                :alt="project.title"
                class="case-facade-thumb"
                loading="lazy"
                width="1280"
                height="720"
              />
              <div class="case-facade-scrim"></div>
              <div class="case-play-badge">
                <div class="case-play-icon">
                  <i class="fa-solid fa-play"></i>
                </div>
                <span class="case-play-kicker font-mono">
                  <i class="fa-brands fa-youtube"></i>
                  <span>4K STUDIO MASTER · NHẤN ĐỂ PHÁT</span>
                </span>
              </div>
            </div>
          </div>

          <div v-else-if="project.videoUrl" class="tiktok-fallback-box matte-card text-center">
            <i class="fa-brands fa-tiktok fa-3x"></i>
            <h3>Dự án được phát hành trên TikTok</h3>
            <p>Khám phá video âm nhạc và sự lan toả của ca khúc trên kênh TikTok của studio.</p>
            <a :href="project.videoUrl" target="_blank" rel="noopener noreferrer" class="btn-tiktok-link">
              <span>Xem trên TikTok</span>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      </section>

      <!-- DOCUMENTARY STORYTELLING BODY -->
      <section class="case-body-section">
        <div class="editorial-container case-body-layout">
          <!-- MAIN STORY ARTICLES -->
          <main class="story-content-col">
            <div class="story-chapter">
              <span class="chapter-label text-meta-mono">CHƯƠNG 01</span>
              <h2 class="chapter-title">Khởi Điểm &amp; Ý Niệm Ban Đầu</h2>
              <p class="chapter-body">{{ project.story.origin }}</p>
            </div>

            <div class="story-chapter">
              <span class="chapter-label text-meta-mono">CHƯƠNG 02</span>
              <h2 class="chapter-title">Thách Thức Âm Học &amp; Nghệ Thuật</h2>
              <p class="chapter-body">{{ project.story.challenge }}</p>
            </div>

            <div class="story-chapter">
              <span class="chapter-label text-meta-mono">CHƯƠNG 03</span>
              <h2 class="chapter-title">Phương Án Thực Thi Tại Studio</h2>
              <p class="chapter-body">{{ project.story.approach }}</p>
            </div>

            <div class="story-chapter">
              <span class="chapter-label text-meta-mono">CHƯƠNG 04</span>
              <h2 class="chapter-title">Kết Quả &amp; Sức Lan Toả</h2>
              <p class="chapter-body">{{ project.story.outcome }}</p>
            </div>

            <!-- PRODUCTION DECISIONS BTS -->
            <div v-if="project.decisions && project.decisions.length" class="decisions-block">
              <h3 class="decisions-title">Các Quyết Định Sản Xuất Quan Trọng</h3>
              <div class="decisions-list">
                <div v-for="d in project.decisions" :key="d.title" class="decision-item matte-card">
                  <span class="badge-v2 teal">{{ d.stage }}</span>
                  <strong class="decision-name">{{ d.title }}</strong>
                  <p class="decision-rationale">{{ d.rationale }}</p>
                </div>
              </div>
            </div>
          </main>

          <!-- SIDEBAR CREDITS & CALLOUT -->
          <aside class="story-sidebar-col">
            <!-- CREDITS CARD -->
            <div class="sidebar-card matte-card">
              <span class="text-meta-mono sidebar-title">CREDITS SẢN XUẤT</span>
              <div class="credits-table">
                <div v-for="c in project.credits" :key="c.role" class="credit-row">
                  <span class="credit-role text-meta-mono">{{ c.role }}</span>
                  <strong class="credit-name">{{ c.name }}</strong>
                </div>
              </div>

              <!-- STREAMING LINKS IF ANY -->
              <div v-if="project.streamingLinks" class="streaming-block">
                <span class="text-meta-mono sidebar-title">NỀN TẢNG PHÁT HÀNH</span>
                <div class="streaming-buttons">
                  <a v-if="project.streamingLinks.youtube" :href="project.streamingLinks.youtube" target="_blank" rel="noopener noreferrer" class="stream-btn yt">
                    <i class="fa-brands fa-youtube"></i> YouTube
                  </a>
                  <a v-if="project.streamingLinks.tiktok" :href="project.streamingLinks.tiktok" target="_blank" rel="noopener noreferrer" class="stream-btn tt">
                    <i class="fa-brands fa-tiktok"></i> TikTok
                  </a>
                </div>
              </div>
            </div>

            <!-- CONVERSION ADVISORY -->
            <div class="sidebar-card matte-card start-box text-center">
              <span class="badge-v2 amber">ĐỒNG HÀNH CÙNG BẠN</span>
              <h3>Bạn muốn bắt đầu dự án tương tự?</h3>
              <p>Trao đổi ý tưởng hoặc gửi bản thu âm mộc để nhận tư vấn giải pháp sản xuất tối ưu.</p>
              <NuxtLink to="/start-a-project" class="btn-sidebar-cta">
                <span>GỬI PROJECT BRIEF</span>
                <i class="fa-solid fa-arrow-right"></i>
              </NuxtLink>
            </div>
          </aside>
        </div>
      </section>

      <!-- RELATED PROJECTS -->
      <section v-if="relatedProjects.length" class="related-section">
        <div class="editorial-container">
          <div class="section-title-header">
            <div>
              <span class="badge-v2 amber">TIẾP TỤC KHÁM PHÁ</span>
              <h2 class="editorial-heading">Các Tác Phẩm Liên Quan</h2>
            </div>
            <NuxtLink to="/work" class="link-arrow-v2">
              <span>Xem Tất Cả</span>
              <i class="fa-solid fa-arrow-right"></i>
            </NuxtLink>
          </div>

          <div class="related-grid">
            <XKProjectCard v-for="rp in relatedProjects" :key="rp.slug" :project="rp" />
          </div>
        </div>
      </section>
    </template>

    <!-- NOT FOUND -->
    <div v-else class="not-found-wrap editorial-container text-center">
      <span class="badge-v2 amber">404 ERROR</span>
      <h1>Không Tìm Thấy Dự Án</h1>
      <p>Dự án này không tồn tại hoặc đã được cập nhật đường dẫn mới.</p>
      <NuxtLink to="/work" class="btn-hero-primary">Quay Lại Thư Viện Work</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStudioAudio } from '~/composables/useStudioAudio'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { getProjectBySlug, getRelatedProjects } = useProductionProjects()
const { pauseTrack: pauseGlobalAudio } = useStudioAudio()

const project = computed(() => getProjectBySlug(slug.value))
const relatedProjects = computed(() => getRelatedProjects(slug.value, 2))

const isVideoPlaying = ref(false)
function startCaseVideo() {
  pauseGlobalAudio()
  isVideoPlaying.value = true
}

useSeoMeta({
  title: () => project.value ? `${project.value.title} — Case Study Sản Xuất | XKProduction` : 'Dự Án Không Tồn Tại | XKProduction',
  description: () => project.value ? `Hậu trường và câu chuyện sản xuất ca khúc ${project.value.title} cùng nghệ sĩ ${project.value.artist} tại XKProduction.` : 'Dự án không tồn tại trên XKProduction.',
  ogTitle: () => project.value ? `${project.value.title} — Case Study | XKProduction` : 'XKProduction Work',
  ogDescription: () => project.value ? project.value.story.origin : '',
  ogImage: () => project.value?.coverImage || 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogType: 'video.other',
  ogUrl: () => `https://xkproduction.com/work/${slug.value}`
})

useSchemaOrg([
  defineWebPage({
    name: () => project.value ? `${project.value.title} - XKProduction Case Study` : 'XKProduction Case Study',
    description: () => project.value ? project.value.story.origin : ''
  }),
  project.value ? defineArticle({
    '@type': 'Report',
    headline: project.value.title,
    description: project.value.story.origin,
    image: project.value.coverImage,
    author: {
      '@type': 'Person',
      name: 'Nguyễn Xuân Kiệt'
    }
  }) : undefined
].filter(Boolean))
</script>

<style scoped>
.case-study-page {
  padding-top: clamp(7.5rem, 14vw, 11rem);
  padding-bottom: 6rem;
  background-color: var(--bg-canvas);
  color: var(--text-primary);
}

.case-hero {
  padding-bottom: 3.5rem;
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: 3rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  text-decoration: none;
  margin-bottom: 2rem;
  transition: color 0.15s ease;
}

.back-link:hover {
  color: #fbbf24;
}

.case-meta-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.case-hero-title {
  font-size: clamp(2.8rem, 6.5vw, 6rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-bottom: 0.5rem;
}

.case-hero-artist {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.case-hero-artist strong {
  color: #fbbf24;
}

.case-hero-sub {
  font-size: 1.125rem;
  color: var(--text-subtle);
  max-width: 800px;
  line-height: 1.6;
}

/* MEDIA */
.case-media-section {
  margin-bottom: 4rem;
}

.media-aspect-box {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 12px;
  background: #090b10;
}

.case-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* CASE YOUTUBE FACADE */
.case-youtube-facade {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.case-facade-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.case-youtube-facade:hover .case-facade-thumb {
  transform: scale(1.03);
}

.case-facade-scrim {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(5, 11, 20, 0.25) 0%, rgba(5, 11, 20, 0.8) 100%);
  transition: background 0.3s ease;
}

.case-youtube-facade:hover .case-facade-scrim {
  background: radial-gradient(circle at center, rgba(5, 11, 20, 0.15) 0%, rgba(5, 11, 20, 0.65) 100%);
}

.case-play-badge {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  z-index: 2;
}

.case-play-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #d97706;
  color: #050b14;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  padding-left: 4px;
  box-shadow: 0 0 35px rgba(217, 119, 6, 0.55);
  transition: all 0.25s ease;
}

.case-youtube-facade:hover .case-play-icon {
  transform: scale(1.1);
  background: #fbbf24;
  box-shadow: 0 0 50px rgba(251, 191, 36, 0.75);
}

.case-play-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #ffffff;
  background: rgba(10, 20, 36, 0.88);
  border: 1px solid rgba(251, 191, 36, 0.3);
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  backdrop-filter: blur(8px);
}

.case-play-kicker i {
  color: #ef4444;
}

.tiktok-fallback-box {
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.btn-tiktok-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  border-radius: 6px;
  background: #000000;
  border: 1px solid var(--border-subtle);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.875rem;
  text-decoration: none;
}

/* STORY BODY */
.case-body-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  margin-bottom: 6rem;
}

.story-content-col {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.story-chapter {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.chapter-label {
  font-size: 0.75rem;
  color: #d97706;
}

.chapter-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
}

.chapter-body {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  line-height: 1.75;
}

.decisions-block {
  padding-top: 2rem;
  border-top: 1px solid var(--border-subtle);
}

.decisions-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.decisions-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.decision-item {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.decision-name {
  font-size: 1.0625rem;
  color: var(--text-primary);
}

.decision-rationale {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* SIDEBAR */
.story-sidebar-col {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sidebar-title {
  font-size: 0.75rem;
  color: var(--text-subtle);
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 0.5rem;
}

.credits-table {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.credit-row {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.credit-role {
  font-size: 0.6875rem;
  color: var(--text-subtle);
}

.credit-name {
  font-size: 0.9375rem;
  color: var(--text-primary);
}

.streaming-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.streaming-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.stream-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.95rem;
  border-radius: 6px;
  border: 1px solid var(--border-subtle);
  font-size: 0.8125rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--text-primary);
}

.stream-btn.yt {
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.3);
  color: #f87171;
}

.start-box h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-top: 0.5rem;
}

.start-box p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.btn-sidebar-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-weight: 800;
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-sidebar-cta:hover {
  background: #ffffff;
  transform: translateY(-2px);
}

/* RELATED */
.related-section {
  border-top: 1px solid var(--border-subtle);
  padding-top: 5rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

@media (max-width: 1024px) {
  .case-body-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
