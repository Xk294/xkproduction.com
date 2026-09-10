<template>
  <nav class="next-prev" aria-label="Điều hướng bài viết">
    <NuxtLink
      v-if="prevPost"
      :to="`/journal/${prevPost.slug}`"
      class="next-prev-card prev"
    >
      <span>Bài trước</span>
      <strong>{{ prevPost.title }}</strong>
    </NuxtLink>

    <NuxtLink to="/journal" class="next-prev-card center">
      <span>Quay lại</span>
      <strong>Danh sách bài viết</strong>
    </NuxtLink>

    <NuxtLink
      v-if="nextPost"
      :to="`/journal/${nextPost.slug}`"
      class="next-prev-card next"
    >
      <span>Bài tiếp theo</span>
      <strong>{{ nextPost.title }}</strong>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import type { BlogPost } from '../composables/useBlog'

defineProps<{
  prevPost: BlogPost | null
  nextPost: BlogPost | null
}>()
</script>

<style scoped>
.next-prev {
  margin-top: 2.25rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
}
.next-prev-card {
  min-height: 116px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.028);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
  transition: all 0.24s var(--ease-out-expo);
}
.next-prev-card:hover {
  border-color: rgba(26,140,255,0.32);
  transform: translateY(-2px);
}
.next-prev-card span {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(178,198,220,0.75);
}
.next-prev-card strong {
  font-size: 0.88rem;
  line-height: 1.4;
  color: rgba(237,245,255,0.96);
}
.next-prev-card.center {
  border-style: dashed;
  align-items: center;
  text-align: center;
}
@media (max-width: 900px) {
  .next-prev { grid-template-columns: 1fr; }
}
</style>
