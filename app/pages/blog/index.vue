<template>
  <div class="blog-landing-wrap">
    <!-- INTERACTIVE AMBIENT GLOW BACKDROP -->
    <div class="immersive-ambient-bg" aria-hidden="true">
      <div class="glow-spot spotlight-1"></div>
      <div class="glow-spot spotlight-2"></div>
    </div>

    <!-- ===== HERO SECTION ===== -->
    <section class="page-hero">
      <div class="max-width">
        <span class="hero-badge"><i class="fa-solid fa-feather-pointed"></i> KIẾN THỨC</span>
        <h1 class="page-hero-title">Blog & <span class="text-gradient-animated">Ấn Phẩm</span></h1>
        <p class="page-hero-sub">Chia sẻ kinh nghiệm sản xuất, mẹo phòng thu và kiến thức âm nhạc chuyên sâu từ đội ngũ XKProduction.</p>
      </div>
    </section>

    <!-- ===== EDITORIAL CONTENT SECTION ===== -->
    <section class="blog-section">
      <div class="max-width">
        <!-- Search & Filter Controls -->
        <div class="editorial-controls glass-card">
          <div class="blog-search-bar">
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm bài viết..."
              class="search-input"
              aria-label="Tìm kiếm bài viết"
            />
            <button
              v-if="searchQuery"
              class="search-clear"
              @click="searchQuery = ''"
              aria-label="Xóa tìm kiếm"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div class="blog-filters">
            <button
              v-for="tag in tags" :key="tag"
              class="filter-tag"
              :class="{ active: activeTag === tag }"
              @click="activeTag = tag"
            >{{ tag }}</button>
          </div>
        </div>

        <!-- Featured Post Hero (Editorial Split Card) -->
        <NuxtLink
          v-if="featuredPost && searchedAndFilteredPosts.length > 0"
          :to="'/blog/' + featuredPost.slug"
          class="featured-post-hero glass-card hover-lift"
        >
          <div class="featured-post-image">
            <img :src="featuredPost.cover || featuredPost.thumb" :alt="featuredPost.title" loading="lazy" />
            <div class="featured-post-overlay"></div>
          </div>
          
          <div class="featured-post-content">
            <div>
              <div class="featured-badge" :class="`category-${getCategoryKey(featuredPost.category)}`">
                <i :class="featuredPost.icon"></i>
                <span>{{ featuredPost.category }}</span>
              </div>
              
              <h2 class="featured-title">{{ featuredPost.title }}</h2>
              <p class="featured-subtitle">{{ featuredPost.subtitle }}</p>
              <p class="featured-excerpt">{{ featuredPost.excerpt }}</p>
            </div>
            
            <div class="featured-meta-footer">
              <div class="featured-post-meta">
                <span><i class="fa-solid fa-user"></i> {{ featuredPost.author }}</span>
                <span><i class="fa-solid fa-calendar"></i> {{ featuredPost.date }}</span>
                <span><i class="fa-solid fa-clock"></i> {{ featuredPost.readTime }}</span>
              </div>
              
              <div class="featured-post-arrow">
                <i class="fa-solid fa-arrow-right-long"></i>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Regular Blog Grid -->
        <div class="blog-grid">
          <NuxtLink
            v-for="post in regularPosts"
            :key="post.slug"
            :to="'/blog/' + post.slug"
            class="blog-card glass-card hover-lift"
          >
            <div class="blog-card-thumb">
              <img :src="post.thumb" :alt="post.title" loading="lazy" />
              <div class="blog-card-category" :class="`category-${getCategoryKey(post.category)}`">
                <i :class="post.icon"></i>
                <span>{{ post.category }}</span>
              </div>
            </div>
            <div class="blog-card-body">
              <h3 class="blog-card-title">{{ post.title }}</h3>
              <p class="blog-card-excerpt">{{ post.excerpt }}</p>
              <div class="blog-card-meta">
                <span><i class="fa-solid fa-user"></i> {{ post.author }}</span>
                <span><i class="fa-solid fa-calendar"></i> {{ post.date }}</span>
                <span><i class="fa-solid fa-clock"></i> {{ post.readTime }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- No Results Empty State -->
        <div v-if="searchedAndFilteredPosts.length === 0" class="no-results glass-card">
          <i class="fa-solid fa-magnifying-glass-chart"></i>
          <h3>Không tìm thấy bài viết</h3>
          <p>Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.</p>
          <button @click="resetSearch" class="btn btn-secondary">Xóa bộ lọc</button>
        </div>

        <!-- CTA SECTION -->
        <div class="blog-cta-section text-center">
          <div class="blog-cta-card glass-card">
            <div class="cta-glow-spot"></div>
            <i class="fa-solid fa-lightbulb cta-icon"></i>
            <h2>Bạn muốn tìm hiểu thêm về quy trình sản xuất?</h2>
            <p>Liên hệ ngay để được tư vấn miễn phí về thu âm, mix master, hoà âm phối khí và các giải pháp đào tạo tại XKProduction.</p>
            <NuxtLink to="/contact" class="btn btn-primary btn-pulse btn-large">Tư vấn miễn phí</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BlogPost } from '../../composables/useBlog'

useSeoMeta({
  title: 'Blog & Kiến Thức Âm Nhạc - Mẹo Thu Âm, Mix Master | XKProduction',
  description: 'Blog kiến thức âm nhạc từ XKProduction: Hướng dẫn thu âm tại nhà, mẹo mixing mastering, cách hoà âm phối khí, bảng giá phòng thu âm Bình Phước. Cập nhật mỗi tuần.',
  ogTitle: 'Blog Kiến Thức Âm Nhạc - XKProduction',
  ogDescription: 'Chia sẻ kinh nghiệm thu âm, mix master, hoà âm phối khí và kiến thức sản xuất âm nhạc chuyên nghiệp từ XKProduction.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Blog kiến thức âm nhạc XKProduction',
  ogUrl: 'https://xkproduction.com/blog',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  keywords: 'blog âm nhạc, kiến thức thu âm, hướng dẫn mix master, cách hoà âm phối khí, phòng thu âm Bình Phước, thu âm bài hát giá bao nhiêu, mix master giá rẻ, hòa âm phối khí online, XKProduction blog'
})

const { allBlogPosts: blogPosts } = useBlog()

useSchemaOrg(() => [
  defineWebPage({
    name: 'Blog & Kiến Thức Âm Nhạc - XKProduction',
    description: 'Blog chia sẻ kiến thức về thu âm, mixing, mastering và sản xuất âm nhạc từ đội ngũ XKProduction.'
  }),
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://xkproduction.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog & Kiến Thức Âm Nhạc', item: 'https://xkproduction.com/blog' }
    ]
  },
  {
    '@type': 'ItemList',
    itemListElement: blogPosts.map((post: BlogPost, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://xkproduction.com/blog/${post.slug}`,
      name: post.title
    }))
  },
  ...blogPosts.map((post: BlogPost) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://xkproduction.com${post.cover || post.thumb}`,
    author: { '@type': 'Person', name: post.author, url: 'https://xkproduction.com/about' },
    publisher: {
      '@type': 'Organization',
      name: 'XKProduction',
      logo: { '@type': 'ImageObject', url: 'https://xkproduction.com/images/logo-xkproduction.png' }
    },
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    url: `https://xkproduction.com/blog/${post.slug}`,
    keywords: post.tags?.join(', ')
  }))
])

const activeTag = ref('Tất cả')
const searchQuery = ref('')

const blogPostsSorted = computed(() => [...blogPosts].sort((a, b) => b.isoDate.localeCompare(a.isoDate)))

const tags = computed(() => ['Tất cả', ...new Set(blogPostsSorted.value.flatMap((p: BlogPost) => p.tags || []))])

const tagFilteredPosts = computed(() => {
  if (activeTag.value === 'Tất cả') return blogPostsSorted.value
  return blogPostsSorted.value.filter((p: BlogPost) => p.tags && p.tags.includes(activeTag.value))
})

const searchedAndFilteredPosts = computed(() => {
  if (!searchQuery.value.trim()) return tagFilteredPosts.value
  const q = searchQuery.value.toLowerCase()
  return tagFilteredPosts.value.filter((p: BlogPost) =>
    p.title.toLowerCase().includes(q) ||
    p.excerpt.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tags?.some((tag: string) => tag.toLowerCase().includes(q))
  )
})

const featuredPost = computed(() => searchedAndFilteredPosts.value[0] || null)
const regularPosts = computed(() => searchedAndFilteredPosts.value.slice(1))

const getCategoryKey = (category: string) => {
  const categoryMap: Record<string, string> = {
    'Bảng Giá': 'amber',
    'Kiến Thức': 'blue',
    'Mẹo Hay': 'green',
    'Before & After': 'purple',
    'Giới Thiệu': 'teal',
    'Mix & Master': 'red',
    'Hoà Âm Phối Khí': 'purple',
    'Live Sound': 'teal'
  }
  return categoryMap[category] || 'blue'
}

const resetSearch = () => {
  searchQuery.value = ''
  activeTag.value = 'Tất cả'
}
</script>

<style scoped>
.blog-landing-wrap {
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
  filter: blur(155px);
  opacity: 0.16;
}

.spotlight-1 {
  width: 550px;
  height: 550px;
  top: -15%;
  left: -15%;
  background: rgba(125, 211, 252, 0.35);
}

.spotlight-2 {
  width: 650px;
  height: 650px;
  bottom: -15%;
  right: -15%;
  background: rgba(56, 189, 248, 0.22);
}

/* ==============================================
   PAGE HERO
   ============================================== */
.page-hero {
  padding-top: 190px;
  padding-bottom: 4.5rem;
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
   BLOG CONTROLS & CONTENT
   ============================================== */
.blog-section {
  padding: 60px 0 140px;
  position: relative;
  z-index: 1;
}

.editorial-controls {
  padding: 1.5rem 2rem;
  margin-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.blog-search-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 30px;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s var(--ease-out-expo);
  max-width: 480px;
}

.blog-search-bar:focus-within {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(125, 211, 252, 0.4);
  box-shadow: 0 4px 20px rgba(125, 211, 252, 0.05);
}

.search-icon {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-main);
  font-size: 0.92rem;
  outline: none;
}

.search-clear {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.2rem;
  transition: color 0.2s ease;
}

.search-clear:hover {
  color: var(--accent);
}

/* Filters */
.blog-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-tag {
  padding: 0.5rem 1.1rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-light);
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: all 0.3s var(--ease-out-expo);
}

.filter-tag:hover {
  color: var(--text-main);
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
}

.filter-tag.active {
  background: var(--gradient-primary);
  color: #fff;
  border-color: transparent;
  box-shadow: var(--shadow-glow);
}

/* ==============================================
   FEATURED POST HERO — Editorial Split
   ============================================== */
.featured-post-hero {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 0;
  margin-bottom: 4rem;
  text-decoration: none;
  overflow: hidden;
}

.featured-post-image {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
  background: #000;
}

.featured-post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out-expo);
}

.featured-post-hero:hover .featured-post-image img {
  transform: scale(1.03);
}

.featured-post-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 60%, rgba(7, 16, 24, 0.4) 100%);
  pointer-events: none;
}

.featured-post-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem 2.5rem;
}

.featured-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.featured-title {
  font-size: clamp(1.5rem, 2.5vw, 2.1rem);
  font-weight: 850;
  color: var(--text-main);
  line-height: 1.25;
  margin-bottom: 0.8rem;
  letter-spacing: -0.02em;
}

.featured-subtitle {
  font-size: 0.95rem;
  color: var(--accent);
  line-height: 1.5;
  margin-bottom: 1.2rem;
  font-weight: 600;
}

.featured-excerpt {
  font-size: 0.9rem;
  color: var(--text-light);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.featured-meta-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1.5rem;
}

.featured-post-meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.featured-post-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.76rem;
  color: var(--text-muted);
  font-weight: 600;
}

.featured-post-meta i {
  color: var(--accent);
  font-size: 0.72rem;
}

.featured-post-arrow {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-main);
  font-size: 0.9rem;
  transition: all 0.4s var(--ease-out-expo);
}

.featured-post-hero:hover .featured-post-arrow {
  background: var(--gradient-primary);
  color: #fff;
  border-color: transparent;
  box-shadow: var(--shadow-glow);
  transform: translateX(4px);
}

/* ==============================================
   REGULAR BLOG GRID
   ============================================== */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.blog-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
}

.blog-card-thumb {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #000;
  border-radius: 16px 16px 0 0;
}

.blog-card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out-expo);
}

.blog-card:hover .blog-card-thumb img {
  transform: scale(1.05);
}

.blog-card-category {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 20px;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

/* Category Colors */
.category-amber {
  background: rgba(217, 119, 6, 0.5);
  color: #fde68a;
}
.category-blue {
  background: rgba(3, 105, 161, 0.5);
  color: #bae6fd;
}
.category-green {
  background: rgba(4, 120, 87, 0.5);
  color: #a7f3d0;
}
.category-purple {
  background: rgba(109, 40, 217, 0.5);
  color: #ddd6fe;
}
.category-teal {
  background: rgba(15, 118, 110, 0.5);
  color: #99f6e4;
}
.category-red {
  background: rgba(185, 28, 28, 0.5);
  color: #fecaca;
}

.blog-card-body {
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.blog-card-title {
  font-size: 1.1rem;
  font-weight: 750;
  color: var(--text-main);
  margin-bottom: 0.75rem;
  line-height: 1.45;
  transition: color 0.3s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card:hover .blog-card-title {
  color: var(--accent);
}

.blog-card-excerpt {
  font-size: 0.85rem;
  color: var(--text-light);
  line-height: 1.65;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card-meta {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1.1rem;
}

.blog-card-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 600;
}

.blog-card-meta i {
  color: var(--accent);
  font-size: 0.68rem;
}

/* No Results Empty View */
.no-results {
  text-align: center;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;
}

.no-results i {
  font-size: 2.5rem;
  color: var(--accent);
  opacity: 0.6;
}

.no-results h3 {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-main);
  margin: 0;
}

.no-results p {
  color: var(--text-light);
  margin-bottom: 1rem;
}

/* ==============================================
   CTA SECTION
   ============================================== */
.blog-cta-section {
  position: relative;
}

.blog-cta-card {
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
  display: inline-block;
}

.blog-cta-card h2 {
  font-size: clamp(1.8rem, 3vw, 2.3rem);
  color: var(--text-main);
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.blog-cta-card p {
  color: var(--text-light);
  margin-bottom: 2.2rem;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}

.btn-large {
  padding: 0.95rem 2.2rem;
  font-size: 0.92rem;
  border-radius: 12px;
}

/* ==============================================
   RESPONSIVE
   ============================================== */
@media (max-width: 1024px) {
  .featured-post-hero { grid-template-columns: 1fr; }
  .featured-post-overlay { display: none; }
}

@media (max-width: 768px) {
  .page-hero { padding-top: 150px; padding-bottom: 3.5rem; }
  .editorial-controls { padding: 1.25rem; }
  .blog-search-bar { max-width: 100%; }
  .blog-grid { grid-template-columns: 1fr; }
  .featured-post-content { padding: 2rem 1.5rem; }
  .blog-card-body { padding: 1.5rem; }
  .blog-cta-card { padding: 3.5rem 1.5rem; }
}
</style>
