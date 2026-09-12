<template>
  <div class="xk-release-wall" role="region" aria-label="Kho đĩa phát hành số">
    <div class="release-grid">
      <div
        v-for="rel in releases"
        :key="rel.id"
        class="release-card matte-card"
      >
        <div class="rel-cover-wrap">
          <img
            :src="rel.cover"
            :alt="rel.title"
            class="rel-cover-img"
            loading="lazy"
            width="320"
            height="180"
          />
          <div class="rel-scrim"></div>

          <!-- STREAMING BADGE -->
          <span class="rel-platform-tag">
            <i :class="getPlatformIcon(rel.platform)"></i>
            <span>{{ rel.platform }}</span>
          </span>

          <!-- HOVER LINK BUTTON -->
          <a
            :href="rel.streamingUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="rel-play-overlay"
            :aria-label="`Nghe ${rel.title} trên ${rel.platform}`"
          >
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>

        <div class="rel-info-body">
          <span class="text-meta-mono rel-date">{{ rel.releaseDate }} · {{ rel.productionRole }}</span>
          <strong class="rel-title">{{ rel.title }}</strong>
          <span class="rel-artist">{{ rel.artist }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { XKRelease } from '~/types/production'

defineProps<{
  releases: XKRelease[]
}>()

function getPlatformIcon(platform: string) {
  switch (platform) {
    case 'Spotify': return 'fa-brands fa-spotify'
    case 'Apple Music': return 'fa-brands fa-apple'
    case 'YouTube': return 'fa-brands fa-youtube'
    case 'TikTok': return 'fa-brands fa-tiktok'
    default: return 'fa-solid fa-music'
  }
}
</script>

<style scoped>
.release-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.release-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.release-card:hover {
  transform: translateY(-3px);
  border-color: rgba(217, 119, 6, 0.35);
}

.rel-cover-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #090b10;
  overflow: hidden;
}

.rel-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.release-card:hover .rel-cover-img {
  transform: scale(1.03);
}

.rel-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(7, 8, 10, 0.8) 100%);
}

.rel-platform-tag {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.55rem;
  border-radius: 4px;
  background: rgba(7, 8, 10, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-subtle);
  font-size: 0.6875rem;
  font-weight: 700;
  color: #fbbf24;
}

.rel-play-overlay {
  position: absolute;
  bottom: 0.85rem;
  right: 0.85rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--text-primary);
  color: var(--bg-canvas);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  text-decoration: none;
  opacity: 0;
  transform: scale(0.85);
  transition: all 0.2s ease;
}

.release-card:hover .rel-play-overlay {
  opacity: 1;
  transform: scale(1);
}

.rel-info-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.rel-date {
  font-size: 0.6875rem;
  color: var(--text-subtle);
}

.rel-title {
  font-size: 1.0625rem;
  font-weight: 800;
  color: var(--text-primary);
}

.rel-artist {
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

@media (max-width: 900px) {
  .release-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .release-grid {
    grid-template-columns: 1fr;
  }
}
</style>
