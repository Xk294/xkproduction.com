<template>
  <section class="related-posts">
    <div class="related-head">
      <h2>Bài viết liên quan</h2>
      <NuxtLink to="/journal">Xem tất cả <i class="fa-solid fa-arrow-right"></i></NuxtLink>
    </div>

    <div class="related-grid">
      <NuxtLink v-for="item in posts" :key="item.slug" :to="`/journal/${item.slug}`" class="related-card">
        <img :src="item.thumb" :alt="item.title" loading="lazy" />
        <div class="related-card-body">
          <p>{{ item.category }}</p>
          <h3>{{ item.title }}</h3>
          <span>{{ item.readTime }}</span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '../composables/useBlog'

defineProps<{
  posts: BlogPost[]
}>()
</script>

<style scoped>
.related-posts {
  margin-top: 4.5rem;
}
.related-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
}
.related-head h2 {
  font-size: 1.45rem;
  color: #f3f8ff;
}
.related-head a {
  color: #86cdff;
  font-size: 0.88rem;
  font-weight: 700;
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
}
.related-head a i { transition: transform 0.25s ease; }
.related-head a:hover i { transform: translateX(3px); }
.related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}
.related-card {
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  transition: all 0.28s var(--ease-out-expo);
}
.related-card:hover {
  transform: translateY(-4px);
  border-color: rgba(26,140,255,0.28);
  box-shadow: 0 18px 40px rgba(0,0,0,0.3);
}
.related-card img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}
.related-card-body {
  padding: 1rem;
}
.related-card-body p {
  color: #82c9ff;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}
.related-card-body h3 {
  color: rgba(239,246,255,0.95);
  font-size: 0.95rem;
  line-height: 1.45;
  margin-bottom: 0.5rem;
}
.related-card-body span {
  color: rgba(181,200,221,0.78);
  font-size: 0.75rem;
}
@media (max-width: 1024px) {
  .related-grid { grid-template-columns: 1fr; }
}
</style>
