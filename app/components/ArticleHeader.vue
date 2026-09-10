<template>
  <header class="article-header">
    <div class="article-header-bg" :style="{ backgroundImage: `url(${post.cover || post.thumb})` }"></div>
    <div class="max-width article-header-inner">
      <div class="article-topbar">
        <NuxtLink to="/journal" class="back-link">
          <i class="fa-solid fa-arrow-left"></i>
          Journal
        </NuxtLink>
        <button class="copy-link" type="button" @click="$emit('copy-link')">
          <i class="fa-regular fa-copy"></i>
          {{ copied ? 'Đã copy link' : 'Copy link' }}
        </button>
      </div>

      <div class="article-kicker">
        <span><i :class="post.icon"></i> {{ post.category }}</span>
        <span>{{ post.readTime }}</span>
      </div>

      <h1>{{ post.title }}</h1>
      <p class="article-subtitle">{{ post.subtitle }}</p>

      <div class="article-meta">
        <span><i class="fa-solid fa-user"></i> {{ post.author }}</span>
        <span><i class="fa-solid fa-calendar"></i> {{ post.date }}</span>
        <span><i class="fa-solid fa-clock"></i> {{ post.readTime }}</span>
      </div>

      <div class="article-tags" v-if="post.tags?.length">
        <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { BlogPost } from '../composables/useBlog'

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
  min-height: 760px;
  padding: 130px 0 5rem;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background: #05070d;
}
.article-header-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.34;
  transform: scale(1.04);
  filter: saturate(0.9) contrast(1.1);
}
.article-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 22% 20%, rgba(26, 140, 255, 0.22), transparent 34%),
    linear-gradient(180deg, rgba(6, 8, 15, 0.35) 0%, rgba(6, 8, 15, 0.82) 56%, #06080f 100%);
}
.article-header-inner {
  position: relative;
  z-index: 1;
  width: 100%;
}
.article-topbar {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 4.5rem;
}
.back-link,
.copy-link {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.72rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(6, 8, 15, 0.48);
  backdrop-filter: blur(18px);
  color: var(--text-main);
  font-weight: 700;
  font-size: 0.84rem;
  cursor: pointer;
  transition: all 0.28s var(--ease-out-expo);
}
.back-link:hover,
.copy-link:hover {
  border-color: rgba(26,140,255,0.45);
  background: rgba(26,140,255,0.14);
  transform: translateY(-2px);
}
.article-kicker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.article-kicker span {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.42rem 0.86rem;
  border-radius: 999px;
  background: rgba(26,140,255,0.12);
  border: 1px solid rgba(26,140,255,0.22);
  color: #8fd0ff;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
h1 {
  max-width: 980px;
  font-size: clamp(2.5rem, 7vw, 6.8rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 1.5rem;
}
.article-subtitle {
  max-width: 800px;
  color: rgba(229, 237, 247, 0.82);
  font-size: clamp(1.04rem, 2vw, 1.35rem);
  line-height: 1.75;
  margin-bottom: 1.6rem;
}
.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.4rem;
  color: rgba(191, 205, 224, 0.84);
  font-size: 0.9rem;
  font-weight: 650;
  margin-bottom: 1.4rem;
}
.article-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}
.article-meta i { color: var(--primary); }
.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}
.article-tags span {
  padding: 0.36rem 0.74rem;
  border-radius: 999px;
  background: rgba(255,255,255,0.07);
  color: rgba(229,237,247,0.78);
  font-size: 0.76rem;
  font-weight: 700;
}
@media (max-width: 768px) {
  .article-header { min-height: 660px; padding-top: 110px; }
  .article-topbar { margin-bottom: 3rem; }
  .article-subtitle { line-height: 1.65; }
}
</style>
