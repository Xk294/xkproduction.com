<template>
  <NuxtLink :to="`/work/${project.slug}`" class="xk-project-card matte-card" :class="{ 'is-featured': isHero }">
    <div class="card-media-wrapper">
      <img
        :src="project.coverImage"
        :alt="project.title"
        class="card-img"
        loading="lazy"
        width="600"
        height="360"
      />
      <div class="card-scrim-gradient"></div>

      <!-- PLAY OVERLAY BADGE -->
      <div class="play-overlay" aria-hidden="true">
        <span class="play-pill">
          <i class="fa-solid fa-play"></i>
          <span>EXPLORE CASE</span>
        </span>
      </div>

      <!-- CATEGORY TAG -->
      <span class="card-category-tag text-meta-mono">{{ project.categoryLabel }}</span>
    </div>

    <div class="card-info-body">
      <div class="card-title-row">
        <h3 class="card-project-title">{{ project.title }}</h3>
        <span class="card-year text-meta-mono">{{ project.year }}</span>
      </div>
      <span class="card-artist-name">Hợp tác cùng {{ project.artist }}</span>
      <p class="card-excerpt-story">{{ project.subtitle || project.story.approach }}</p>

      <div class="card-footer-meta">
        <span class="read-more-label">
          <span>Xem Case Study</span>
          <i class="fa-solid fa-arrow-right"></i>
        </span>
        <span v-if="project.videoEmbedId" class="badge-v2 teal">4K Video / Audio</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { XKProject } from '~/types/production'

defineProps<{
  project: XKProject
  isHero?: boolean
}>()
</script>

<style scoped>
.xk-project-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  overflow: hidden;
  position: relative;
  transition: transform 0.25s var(--ease-out-expo), border-color 0.25s ease, box-shadow 0.25s ease;
}

.xk-project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(217, 119, 6, 0.4);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(217, 119, 6, 0.15);
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
  transition: transform 0.4s var(--ease-out-expo);
}

.xk-project-card:hover .card-img {
  transform: scale(1.04);
}

.card-scrim-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(15, 17, 21, 0.9) 100%);
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  background: rgba(7, 8, 10, 0.4);
  backdrop-filter: blur(4px);
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
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.3;
}

.card-year {
  color: var(--text-subtle);
}

.card-artist-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #fbbf24;
  margin-bottom: 0.75rem;
  display: block;
}

.card-excerpt-story {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
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
</style>
