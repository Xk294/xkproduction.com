<template>
  <div class="journal-archive-page">
    <div class="editorial-container">
      <!-- HEADER -->
      <div class="page-header">
        <span class="badge-v2 teal">{{ isVi ? 'CHIA SẺ KINH NGHIỆM' : 'PRODUCTION NOTES' }}</span>
        <h1 class="journal-title">{{ isVi ? 'GÓC NHÌN ÂM NHẠC' : 'THE JOURNAL' }}</h1>
        <p class="journal-subtitle">
          {{ isVi
            ? 'Nhật ký sản xuất, phân tích kỹ thuật âm học, hậu trường các bản hit và kinh nghiệm làm nghề thực chiến từ người làm sản xuất tại XKProduction.'
            : 'Production notes, acoustic analysis, behind-the-scenes hit records and hands-on experience from XKProduction producers.' }}
        </p>

        <!-- CATEGORIES -->
        <div class="cat-filter-tabs">
          <button
            v-for="cat in categories"
            :key="cat"
            class="c-btn"
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- ARTICLES GRID -->
      <div class="journal-grid">
        <NuxtLink
          v-for="post in filteredPosts"
          :key="post.slug"
          :to="`/journal/${post.slug}`"
          class="journal-card matte-card"
        >
          <div class="card-thumb-wrap">
            <img :src="post.thumb" :alt="post.title" class="card-thumb-img" loading="lazy" />
            <span class="card-cat-badge text-meta-mono">{{ post.category }}</span>
          </div>

          <div class="card-body">
            <div class="card-meta text-meta-mono">
              <span>{{ post.date }}</span>
              <span>·</span>
              <span>{{ post.readTime }}</span>
            </div>
            <h2 class="card-title">{{ post.title }}</h2>
            <p class="card-excerpt">{{ post.excerpt }}</p>
            <div class="card-footer">
              <span class="read-more">
                <span>Đọc Bài Viết</span>
                <i class="fa-solid fa-arrow-right"></i>
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { isVi } = useLocale()
const { allBlogPosts } = useBlog()
const selectedCategory = ref('Tất Cả')

const categories = [
  'Tất Cả',
  'Hoà Âm Phối Khí',
  'Thu Âm',
  'Mix & Master',
  'Kiến Thức Studio'
]

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'Tất Cả') return allBlogPosts
  return allBlogPosts.filter((p: any) => p.category === selectedCategory.value)
})

useSeoMeta({
  title: () => isVi.value
    ? 'Góc Nhìn Âm Nhạc — Chia Sẻ Kinh Nghiệm | XKProduction'
    : 'Journal — Production Notes & Behind The Scenes | XKProduction',
  description: 'Nhật ký sản xuất âm nhạc, kỹ thuật thu âm, bí quyết mix vocal và hậu trường các ca khúc sản xuất tại XKProduction.',
  ogTitle: () => isVi.value
    ? 'Góc Nhìn Âm Nhạc — XKProduction'
    : 'The Journal — Production Notes | XKProduction',
  ogDescription: 'Nhật ký sản xuất âm nhạc và kỹ thuật phòng thu chuyên sâu tại XKProduction.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: 'https://xkproduction.com/journal'
})
</script>

<style scoped>
.journal-archive-page {
  padding-top: clamp(7.5rem, 14vw, 11rem);
  padding-bottom: 6rem;
  background-color: var(--bg-canvas);
  color: var(--text-primary);
  min-height: 100vh;
}

.page-header {
  margin-bottom: 4rem;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 2.5rem;
}

.journal-title {
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  line-height: 1.05;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.journal-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 760px;
  line-height: 1.65;
  margin-bottom: 2.5rem;
}

.cat-filter-tabs {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.c-btn {
  padding: 0.55rem 1.15rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.c-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
}

.c-btn.active {
  background: #0d9488;
  color: #ffffff;
  border-color: #0d9488;
}

.journal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.journal-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.journal-card:hover {
  transform: translateY(-4px);
  border-color: rgba(13, 148, 136, 0.4);
}

.card-thumb-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: #090b10;
}

.card-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-cat-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  background: rgba(7, 8, 10, 0.85);
  backdrop-filter: blur(6px);
  color: #2dd4bf;
  font-size: 0.6875rem;
  border: 1px solid var(--border-subtle);
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.card-meta {
  display: flex;
  gap: 0.5rem;
  font-size: 0.6875rem;
  color: var(--text-subtle);
}

.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-excerpt {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-footer {
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--text-primary);
  transition: transform 0.15s ease;
}

.journal-card:hover .read-more {
  color: #2dd4bf;
  transform: translateX(4px);
}

@media (max-width: 1024px) {
  .journal-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .journal-grid {
    grid-template-columns: 1fr;
  }
}
</style>
