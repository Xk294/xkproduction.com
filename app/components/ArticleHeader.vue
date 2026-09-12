<template>
  <header class="article-header">
    <div class="article-header-bg" :style="{ backgroundImage: `url(${post.cover || post.thumb})` }"></div>
    <div class="article-header-inner">
      <div class="article-topbar">
        <NuxtLink to="/journal" class="back-link">
          <i class="fa-solid fa-arrow-left"></i>
          {{ isVi ? 'Góc Nhìn Âm Nhạc' : 'Journal' }}
        </NuxtLink>
        <button class="copy-link" type="button" @click="$emit('copy-link')">
          <i class="fa-regular fa-copy"></i>
          {{ copied ? (isVi ? 'Đã copy link' : 'Link copied') : (isVi ? 'Copy link' : 'Copy link') }}
        </button>
      </div>

      <div class="article-hero-content">
        <div class="article-kicker">
          <span><i :class="post.icon"></i> {{ post.category }}</span>
          <span>{{ post.readTime }}</span>
        </div>

        <h1 class="article-title">{{ post.title }}</h1>
        <p v-if="post.subtitle" class="article-subtitle">{{ post.subtitle }}</p>

        <div class="article-meta">
          <span><i class="fa-solid fa-user"></i> {{ post.author }}</span>
          <span><i class="fa-solid fa-calendar"></i> {{ post.date }}</span>
          <span><i class="fa-solid fa-clock"></i> {{ post.readTime }}</span>
        </div>

        <div class="article-tags" v-if="post.tags?.length">
          <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { BlogPost } from '../composables/useBlog'

const { isVi } = useLocale()

defineProps<{
  post: BlogPost
  copied: boolean
}>()

defineEmits<{
  'copy-link': []
}>()
</script>

<style scoped>
.article-header {
  position: relative;
  min-height: 640px;
  padding: 120px 0 4.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #05070d;
}
.article-header-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.28;
  transform: scale(1.04);
  filter: saturate(0.9) contrast(1.1);
}
.article-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 35%, rgba(22, 119, 255, 0.22) 0%, transparent 68%),
    linear-gradient(180deg, rgba(5, 11, 20, 0.45) 0%, rgba(5, 11, 20, 0.82) 60%, var(--bg-canvas, #050B14) 100%);
  pointer-events: none;
}
.article-header-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 3.5vw, 3.5rem);
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}
.article-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-bottom: 2.5rem;
}
.back-link,
.copy-link {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.72rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(6, 8, 15, 0.55);
  backdrop-filter: blur(18px);
  color: var(--text-main, #f8fafc);
  font-weight: 700;
  font-size: 0.84rem;
  cursor: pointer;
  transition: all 0.28s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
}
.back-link:hover,
.copy-link:hover {
  border-color: rgba(26, 140, 255, 0.45);
  background: rgba(26, 140, 255, 0.16);
  transform: translateY(-2px);
}
.article-hero-content {
  width: 100%;
  max-width: 940px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem 0;
}
.article-kicker {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.article-kicker span {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.42rem 0.86rem;
  border-radius: 999px;
  background: rgba(26, 140, 255, 0.12);
  border: 1px solid rgba(26, 140, 255, 0.24);
  color: #8fd0ff;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.article-title {
  max-width: 900px;
  font-size: clamp(2.2rem, 4.2vw, 3.8rem);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: #ffffff;
  margin: 0 auto 1.5rem;
  text-align: center;
  text-wrap: balance;
  text-shadow: 0 4px 28px rgba(0, 0, 0, 0.65);
}
.article-subtitle {
  max-width: 780px;
  color: rgba(229, 237, 247, 0.85);
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
  line-height: 1.75;
  margin: 0 auto 1.8rem;
  text-align: center;
  text-wrap: balance;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.5);
}
.article-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.85rem 1.6rem;
  color: rgba(191, 205, 224, 0.85);
  font-size: 0.9rem;
  font-weight: 650;
  margin-bottom: 1.4rem;
}
.article-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}
.article-meta i {
  color: #1677FF;
}
.article-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
}
.article-tags span {
  padding: 0.36rem 0.76rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(229, 237, 247, 0.82);
  font-size: 0.76rem;
  font-weight: 700;
}
@media (max-width: 768px) {
  .article-header {
    min-height: auto;
    padding: 100px 0 3.5rem;
  }
  .article-topbar {
    margin-bottom: 2rem;
  }
  .article-hero-content {
    padding: 0.5rem 0;
  }
  .article-subtitle {
    line-height: 1.65;
  }
}
</style>
