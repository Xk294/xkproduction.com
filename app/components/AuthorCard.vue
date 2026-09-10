<template>
  <section class="author-card">
    <img src="/images/founder-kiet.jpg" :alt="post.author" loading="lazy" width="110" height="110" />
    <div>
      <p class="author-card-label">Tác giả</p>
      <h3>{{ post.author }}</h3>
      <p class="author-role">{{ post.authorRole }}</p>
      <p class="author-text">Đội ngũ XKProduction chia sẻ kinh nghiệm sản xuất âm nhạc theo hướng thực tế, tối giản và đủ chiều sâu cho nghệ sĩ đang phát triển sản phẩm nghiêm túc.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '../composables/useBlog'

defineProps<{
  post: BlogPost
}>()
</script>

<style scoped>
.author-card {
  margin: 1.5rem 0 0;
  padding: 1.25rem;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.03);
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 1rem;
}
.author-card img {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.08);
}
.author-card-label {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.72rem;
  color: rgba(187, 206, 227, 0.74);
  margin-bottom: 0.35rem;
}
.author-card h3 {
  font-size: 1.12rem;
  color: #f4f8ff;
  margin-bottom: 0.22rem;
}
.author-role {
  color: #7dc6ff;
  font-size: 0.84rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
}
.author-text {
  color: rgba(205, 220, 236, 0.82);
  line-height: 1.75;
  font-size: 0.92rem;
}
@media (max-width: 768px) {
  .author-card { grid-template-columns: 1fr; }
}
</style>
