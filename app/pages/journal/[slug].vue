<template>
  <div class="article-page journal-detail-page">
    <div class="reading-progress" :style="{ transform: `scaleX(${readingProgress})` }"></div>

    <template v-if="post">
      <ArticleHeader :post="post" :copied="copied" @copy-link="copyLink" />

      <section class="article-shell">
        <div class="editorial-container article-layout">
          <aside class="article-left-rail">
            <ShareBar :current-url="currentUrl" :copied="copied" @copy-link="copyLink" />
          </aside>

          <main class="article-main-content">
            <ArticleBody :post="post" />
            <AuthorCard :post="post" />

            <section class="article-soft-cta matte-card">
              <div class="cta-header">
                <i class="fa-solid fa-lightbulb"></i>
                <p class="cta-kicker text-meta-mono">TƯ VẤN SẢN XUẤT MIỄN PHÍ</p>
              </div>
              <h2>Biến ý tưởng âm nhạc của bạn thành tác phẩm chuyên nghiệp</h2>
              <p>Gửi bản voice memo hoặc demo thô, đội ngũ sản xuất XKProduction sẽ lắng nghe, phân tích tiềm năng và tư vấn phương án hoà âm, thu âm hoặc mix master tối ưu nhất.</p>
              <div class="cta-actions">
                <NuxtLink to="/start-a-project" class="btn btn-primary">Gửi Project Brief <i class="fa-solid fa-arrow-right"></i></NuxtLink>
                <NuxtLink to="/services" class="btn btn-secondary">Xem Các Dịch Vụ</NuxtLink>
              </div>
            </section>

            <NextPrevNavigation :prev-post="prevPost" :next-post="nextPost" />
            <RelatedPosts :posts="relatedPosts" />
          </main>

          <aside class="article-right-rail">
            <TableOfContents :sections="post.sections" :active-id="activeSectionId" @navigate="setActiveSection" />
          </aside>
        </div>
      </section>
    </template>

    <section v-else class="not-found-article editorial-container text-center">
      <span class="badge-v2 amber">404 / JOURNAL</span>
      <h1>Không Tìm Thấy Bài Viết</h1>
      <p>Bài viết này có thể đã được đổi slug hoặc không còn tồn tại.</p>
      <NuxtLink to="/journal" class="btn btn-primary">Quay Lại Journal</NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

definePageMeta({
  pageTransition: {
    name: 'article-transition',
    mode: 'out-in'
  }
})

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const BASE_URL = 'https://xkproduction.com'

const { allBlogPosts, getPostBySlug, getRelatedPosts } = useBlog()
const post = computed(() => getPostBySlug(slug.value))
const relatedPosts = computed(() => getRelatedPosts(slug.value, 3))
const currentUrl = computed(() => `${BASE_URL}/journal/${slug.value}`)

const currentIndex = computed(() => allBlogPosts.findIndex(item => item.slug === slug.value))
const prevPost = computed(() => currentIndex.value > 0 ? (allBlogPosts[currentIndex.value - 1] ?? null) : null)
const nextPost = computed(() => currentIndex.value >= 0 && currentIndex.value < allBlogPosts.length - 1 ? (allBlogPosts[currentIndex.value + 1] ?? null) : null)

const copied = ref(false)
const readingProgress = ref(0)
const activeSectionId = ref(post.value?.sections[0]?.id || '')
let copiedTimer: ReturnType<typeof setTimeout> | undefined

const copyLink = async () => {
  if (import.meta.client) {
    await navigator.clipboard.writeText(currentUrl.value)
    copied.value = true
    if (copiedTimer) clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => { copied.value = false }, 1800)
  }
}

const sectionElements = ref<HTMLElement[]>([])
let sectionObserver: IntersectionObserver | null = null
let ticking = false

const updateReadingProgress = () => {
  if (!import.meta.client) return
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      readingProgress.value = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
      ticking = false
    })
    ticking = true
  }
}

const initSectionObserver = () => {
  if (!import.meta.client) return
  sectionObserver?.disconnect()
  sectionElements.value = Array.from(document.querySelectorAll<HTMLElement>('[data-section-id]'))

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          activeSectionId.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0
    }
  )

  sectionElements.value.forEach(section => sectionObserver?.observe(section))
}

const setActiveSection = (id: string) => {
  activeSectionId.value = id
}

onMounted(() => {
  initSectionObserver()
  activeSectionId.value = post.value?.sections[0]?.id || ''

  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  readingProgress.value = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0

  window.addEventListener('scroll', updateReadingProgress, { passive: true })
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', updateReadingProgress)
    sectionObserver?.disconnect()
    if (copiedTimer) clearTimeout(copiedTimer)
  }
})

useSeoMeta({
  title: () => post.value ? `${post.value.title} | XKProduction Journal` : 'Bài Viết | XKProduction',
  description: () => post.value?.excerpt,
  ogTitle: () => post.value ? `${post.value.title} | XKProduction` : 'XKProduction Journal',
  ogDescription: () => post.value?.excerpt,
  ogImage: () => post.value?.cover ? `${BASE_URL}${post.value.cover}` : 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogType: 'article',
  ogUrl: () => currentUrl.value
})

useSchemaOrg([
  post.value ? defineArticle({
    '@type': 'TechArticle',
    headline: post.value.title,
    description: post.value.excerpt,
    datePublished: post.value.isoDate,
    image: post.value.cover ? `${BASE_URL}${post.value.cover}` : undefined,
    author: {
      '@type': 'Person',
      name: post.value.author,
      jobTitle: post.value.authorRole
    }
  }) : undefined
].filter(Boolean))
</script>

<style scoped>
.journal-detail-page {
  background-color: var(--bg-canvas);
  color: var(--text-primary);
  min-height: 100vh;
}

.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #0d9488, #d97706);
  transform-origin: 0% 50%;
  z-index: 1000;
  transition: transform 0.1s linear;
}

.article-shell {
  padding: 4rem 0 6rem;
}

.article-layout {
  display: grid;
  grid-template-columns: 60px minmax(0, 1fr) 280px;
  gap: 3rem;
  align-items: start;
}

.article-main-content {
  width: 100%;
  max-width: 780px;
  min-width: 0;
  margin: 0 auto;
}

.article-left-rail {
  position: sticky;
  top: 100px;
}

.article-right-rail {
  position: sticky;
  top: 100px;
}

.article-soft-cta {
  padding: 2.5rem;
  margin: 3.5rem 0;
  background: rgba(217, 119, 6, 0.06);
  border: 1px solid rgba(217, 119, 6, 0.25);
  border-radius: 12px;
}

.cta-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fbbf24;
  margin-bottom: 0.75rem;
}

.article-soft-cta h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.article-soft-cta p {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.not-found-article {
  padding: 8rem 0;
}

@media (max-width: 1100px) {
  .article-layout {
    grid-template-columns: 50px minmax(0, 1fr);
  }
  .article-right-rail {
    display: none;
  }
}

@media (max-width: 768px) {
  .article-layout {
    grid-template-columns: 1fr;
  }
  .article-left-rail {
    display: none;
  }
}
</style>
