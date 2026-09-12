<template>
  <nav class="next-prev" aria-label="Điều hướng bài viết">
    <NuxtLink
      v-if="prevPost"
      :to="`/journal/${prevPost.slug}`"
      class="next-prev-card prev"
    >
      <span><i class="fa-solid fa-arrow-left"></i> {{ isVi ? 'Bài trước' : 'Previous' }}</span>
      <strong>{{ prevPost.title }}</strong>
    </NuxtLink>
    <div v-else class="next-prev-card placeholder" aria-hidden="true"></div>

    <NuxtLink to="/journal" class="next-prev-card center">
      <span><i class="fa-solid fa-table-cells-large"></i> {{ isVi ? 'Quay lại' : 'Back to' }}</span>
      <strong>{{ isVi ? 'Góc Nhìn Âm Nhạc' : 'Journal Archive' }}</strong>
    </NuxtLink>

    <NuxtLink
      v-if="nextPost"
      :to="`/journal/${nextPost.slug}`"
      class="next-prev-card next"
    >
      <span>{{ isVi ? 'Bài tiếp theo' : 'Next' }} <i class="fa-solid fa-arrow-right"></i></span>
      <strong>{{ nextPost.title }}</strong>
    </NuxtLink>
    <div v-else class="next-prev-card placeholder" aria-hidden="true"></div>
  </nav>
</template>

<script setup lang="ts">
import type { BlogPost } from '../composables/useBlog'

const { isVi } = useLocale()

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
  align-items: stretch;
}
.next-prev-card {
  min-height: 116px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.028);
  padding: 1rem 1.15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
  transition: all 0.24s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
  text-decoration: none;
}
.next-prev-card:hover:not(.placeholder) {
  border-color: rgba(26,140,255,0.32);
  transform: translateY(-2px);
  background: rgba(26,140,255,0.04);
}
.next-prev-card span {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(178,198,220,0.75);
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}
.next-prev-card strong {
  font-size: 0.88rem;
  line-height: 1.4;
  color: rgba(237,245,255,0.96);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.next-prev-card.center {
  border-style: dashed;
  align-items: center;
  text-align: center;
  background: rgba(255,255,255,0.015);
}
.next-prev-card.next {
  text-align: right;
  align-items: flex-end;
}
.next-prev-card.next span {
  justify-content: flex-end;
}
.next-prev-card.placeholder {
  opacity: 0;
  pointer-events: none;
  border: none;
  background: transparent;
}
@media (max-width: 900px) {
  .next-prev {
    grid-template-columns: 1fr;
  }
  .next-prev-card.placeholder {
    display: none;
  }
  .next-prev-card.next {
    text-align: left;
    align-items: flex-start;
  }
  .next-prev-card.next span {
    justify-content: flex-start;
  }
}
</style>
