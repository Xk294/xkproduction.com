<template>
  <NuxtLink :to="`/work/${project.slug}`" class="xk-project-card" :class="{ 'is-featured': isHero }">
    <div class="card-media-wrapper">
      <img
        :src="coverSrc"
        :alt="`${project.title} - ${project.artist} | ${project.categoryLabel} - XKProduction`"
        class="card-img"
        loading="lazy"
        width="1280"
        height="720"
        decoding="async"
        @error="handleImageError"
      />
      <div class="card-scrim-gradient"></div>

      <!-- PLAY OVERLAY BADGE -->
      <div class="play-overlay" aria-hidden="true">
        <span class="play-pill">
          <i class="fa-solid fa-play"></i>
          <span>{{ isVi ? 'XEM CHI TIẾT' : 'EXPLORE CASE' }}</span>
        </span>
      </div>

      <!-- QUICK AUDIO PREVIEW BUTTON -->
      <button
        type="button"
        class="card-quick-play-btn"
        :class="{ 'is-playing': isCurrentlyPlaying }"
        @click.stop.prevent="handleQuickPlay"
        :title="isCurrentlyPlaying ? (isVi ? 'Tạm dừng bài hát' : 'Pause audio') : (isVi ? 'Nghe thử bài này' : 'Quick listen')"
        :aria-label="isCurrentlyPlaying ? 'Tạm dừng bài hát' : 'Nghe thử bài này'"
      >
        <span class="q-icon">
          <i :class="isCurrentlyPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-headphones'"></i>
        </span>
        <span class="q-label font-mono">{{ isCurrentlyPlaying ? (isVi ? 'ĐANG PHÁT' : 'PLAYING') : (isVi ? 'NGHE THỬ' : 'LISTEN') }}</span>
      </button>

      <!-- CATEGORY TAG -->
      <span class="card-category-tag text-meta-mono">{{ project.categoryLabel }}</span>
    </div>

    <div class="card-info-body">
      <div class="card-title-row">
        <h3 class="card-project-title font-display">{{ project.title }}</h3>
        <span class="card-year text-meta-mono font-mono">{{ project.year }}</span>
      </div>
      <span class="card-artist-name text-meta-mono">{{ isVi ? 'NGHỆ SĨ' : 'ARTIST' }} · {{ project.artist }}</span>
      <p class="card-excerpt-story">{{ project.subtitle || project.story.approach }}</p>

      <div class="card-footer-meta">
        <span class="read-more-label">
          <span>{{ isVi ? 'Xem Chi Tiết Tác Phẩm' : 'View Case Study' }}</span>
          <i class="fa-solid fa-arrow-right"></i>
        </span>
        <span v-if="project.videoEmbedId" class="badge-v2 amber">{{ isVi ? 'Bản Thu & Video Master' : 'Master Audio & Video' }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { XKProject } from '~/types/production'
import { useLocale } from '~/composables/useLocale'
import { useStudioAudio } from '~/composables/useStudioAudio'

const { isVi } = useLocale()
const { playTrackById, togglePlay, currentTrack, isPlaying } = useStudioAudio()

const props = defineProps<{
  project: XKProject
  isHero?: boolean
}>()

const coverSrc = ref(props.project.coverImage)

watch(
  () => props.project.coverImage,
  (newVal) => {
    coverSrc.value = newVal
  }
)

function handleImageError() {
  if (coverSrc.value && coverSrc.value.includes('maxresdefault.jpg')) {
    coverSrc.value = coverSrc.value.replace('maxresdefault.jpg', 'hqdefault.jpg')
  }
}

const isCurrentlyPlaying = computed(() => {
  return isPlaying.value && (currentTrack.value?.id === props.project.slug || currentTrack.value?.id === props.project.id)
})

function handleQuickPlay() {
  if (isCurrentlyPlaying.value) {
    togglePlay()
  } else {
    playTrackById(props.project.slug)
  }
}
</script>

<style scoped>
.xk-project-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  background-color: var(--bg-surface-1);
  border: 1px solid var(--border-subtle);
  transition: transform 0.28s var(--ease-out-expo), border-color 0.28s ease, box-shadow 0.28s ease;
}

.xk-project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(251, 191, 36, 0.35);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.7), 0 0 30px rgba(217, 119, 6, 0.1);
}

.card-media-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #090b10;
}

.is-featured .card-media-wrapper {
  aspect-ratio: 21 / 10;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;
  transition: transform 0.4s var(--ease-out-expo);
}

.xk-project-card:hover .card-img {
  transform: scale(1.04);
}

.card-scrim-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 65%, rgba(10, 12, 16, 0.55) 100%);
  pointer-events: none;
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  background: rgba(7, 8, 10, 0.35);
  transition: opacity 0.2s ease;
}

.xk-project-card:hover .play-overlay {
  opacity: 1;
}

.play-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border-radius: 999px;
  background: #ffffff;
  color: var(--bg-canvas);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  transform: scale(0.9);
  transition: transform 0.2s ease;
}

.xk-project-card:hover .play-pill {
  transform: scale(1);
}

.card-category-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 0.6875rem;
  padding: 0.3rem 0.65rem;
  border-radius: 4px;
  background: rgba(7, 8, 10, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-subtle);
  color: #fbbf24;
}

/* BODY */
.card-info-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.35rem;
}

.card-project-title {
  font-size: clamp(1.35rem, 2.2vw, 1.85rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.25;
  letter-spacing: -0.005em;
  text-wrap: balance;
  transition: color 0.2s ease;
}

.xk-project-card:hover .card-project-title {
  color: #fbbf24;
}

.card-year {
  color: var(--text-subtle);
}

.card-artist-name {
  font-size: 0.75rem;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 0.75rem;
  letter-spacing: 0.08em;
  display: block;
}

.card-excerpt-story {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-footer-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}

.read-more-label {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--text-primary);
  transition: transform 0.15s ease;
}

.xk-project-card:hover .read-more-label {
  color: #fbbf24;
  transform: translateX(4px);
}

.card-quick-play-btn {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(10, 20, 36, 0.88);
  border: 1px solid rgba(251, 191, 36, 0.4);
  color: #fbbf24;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  z-index: 5;
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;
}

.card-quick-play-btn:hover {
  background: #fbbf24;
  color: #050b14;
  border-color: #fbbf24;
  transform: scale(1.05);
  box-shadow: 0 0 16px rgba(251, 191, 36, 0.4);
}

.card-quick-play-btn.is-playing {
  background: #0d9488;
  border-color: #2dd4bf;
  color: #ffffff;
  box-shadow: 0 0 16px rgba(13, 148, 136, 0.5);
}

.card-quick-play-btn .q-icon {
  font-size: 0.75rem;
}
</style>
