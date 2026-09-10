<template>
  <div class="work-archive-page">
    <div class="editorial-container">
      <!-- HEADER -->
      <div class="page-header">
        <span class="badge-v2 amber">{{ isVi ? 'KHO TÁC PHẨM NGHỆ THUẬT' : 'EDITORIAL ARCHIVE' }}</span>
        <h1 class="archive-title">{{ isVi ? 'DANH MỤC TÁC PHẨM' : 'SELECTED WORK' }}</h1>
        <p class="archive-subtitle">
          {{ isVi
            ? 'Khám phá danh mục các tác phẩm âm nhạc được sản xuất, hoà âm phối khí, thu âm và hoàn thiện tại XKProduction. Mỗi dự án là một câu chuyện độc bản đồng hành cùng người nghệ sĩ.'
            : 'Explore our curated catalog of productions, bespoke arrangements, studio recordings, and master releases. Every track is a custom sonic journey created for the artist.'
          }}
        </p>

        <!-- CATEGORY FILTER TABS -->
        <div class="category-tabs" role="tablist">
          <button
            v-for="cat in categories"
            :key="cat.value"
            class="tab-btn"
            :class="{ active: selectedCat === cat.value }"
            @click="selectedCat = cat.value"
          >
            {{ isVi ? cat.viLabel : cat.enLabel }}
          </button>
        </div>
      </div>

      <!-- PROJECTS GRID -->
      <div class="archive-grid">
        <XKProjectCard
          v-for="p in filteredProjects"
          :key="p.slug"
          :project="p"
        />
      </div>

      <!-- BOTTOM CALLOUT -->
      <div class="archive-cta-banner matte-card">
        <div>
          <span class="badge-v2 teal">{{ isVi ? 'BẮT ĐẦU DỰ ÁN CỦA BẠN' : 'START YOUR PROJECT' }}</span>
          <h2 class="banner-title">{{ isVi ? 'Bạn Có Giai Điệu Muốn Thành Tác Phẩm?' : 'Ready To Bring Your Melody To Life?' }}</h2>
          <p class="banner-desc">{{ isVi ? 'Chúng tôi đồng hành từ giai đoạn demo sơ khởi nhất.' : 'We partner with you from your very first rough voice memo.' }}</p>
        </div>
        <NuxtLink to="/start-a-project" class="btn-banner-cta">
          <span>{{ isVi ? 'GỬI PROJECT BRIEF' : 'SUBMIT PROJECT BRIEF' }}</span>
          <i class="fa-solid fa-arrow-right"></i>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale } from '~/composables/useLocale'

const { isVi } = useLocale()
const { projects } = useProductionProjects()

const selectedCat = ref('all')

const categories = [
  { viLabel: 'Tất Cả Dự Án', enLabel: 'All Projects', value: 'all' },
  { viLabel: 'Hoà Âm Phối Khí', enLabel: 'Arrangement', value: 'Arrangement' },
  { viLabel: 'Mix & Master', enLabel: 'Mix & Master', value: 'Mix & Master' },
  { viLabel: 'Sản Xuất Âm Nhạc', enLabel: 'Music Production', value: 'Music Production' },
  { viLabel: 'Thu Âm', enLabel: 'Vocal Recording', value: 'Thu âm' }
]

const filteredProjects = computed(() => {
  if (selectedCat.value === 'all') return projects
  return projects.filter(p => p.category === selectedCat.value)
})

useSeoMeta({
  title: () => isVi.value ? 'Work — Danh Mục Tác Phẩm Sản Xuất | XKProduction' : 'Work — Selected Music Productions | XKProduction',
  description: () => isVi.value
    ? 'Khám phá các sản phẩm âm nhạc, bản cover và ca khúc thương mại sản xuất tại XKProduction. Hoà âm phối khí, thu âm, mix master đạt chuẩn Spotify.'
    : 'Explore commercial releases, bespoke arrangements and studio recordings engineered by XKProduction.',
  ogTitle: () => isVi.value ? 'Work — Danh Mục Tác Phẩm | XKProduction' : 'Work — Selected Works | XKProduction',
  ogDescription: () => isVi.value
    ? 'Danh mục các tác phẩm âm nhạc sản xuất tại XKProduction. 2000+ dự án hoàn tất.'
    : 'Selected portfolio of music productions at XKProduction. 2000+ completed projects.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: 'https://xkproduction.com/work'
})
</script>

<style scoped>
.work-archive-page {
  padding-top: clamp(7.5rem, 14vw, 11rem);
  padding-bottom: 6rem;
  background-color: var(--bg-canvas);
  min-height: 100vh;
}

.page-header {
  margin-bottom: 3.5rem;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 2.5rem;
}

.archive-title {
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  line-height: 1.05;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.archive-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 720px;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.category-tabs {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.6rem 1.15rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
}

.tab-btn.active {
  background: #d97706;
  color: var(--bg-canvas);
  border-color: #d97706;
  font-weight: 700;
}

.archive-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.archive-cta-banner {
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  background: linear-gradient(135deg, rgba(15, 17, 21, 0.95) 0%, rgba(217, 119, 6, 0.1) 100%);
}

.banner-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
}

.banner-desc {
  font-size: 0.9375rem;
  color: var(--text-secondary);
}

.btn-banner-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 1.85rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-weight: 800;
  font-size: 0.875rem;
  border-radius: 6px;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.btn-banner-cta:hover {
  background: #ffffff;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .archive-grid {
    grid-template-columns: 1fr;
  }
  .archive-cta-banner {
    padding: 2rem;
  }
}
</style>
