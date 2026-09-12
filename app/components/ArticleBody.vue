<template>
  <article class="article-body">
    <img class="article-cover" :src="post.cover || post.thumb" :alt="post.title" loading="eager" width="800" height="450" />

    <section
      v-for="section in post.sections"
      :key="section.id"
      :id="section.id"
      class="article-section"
      data-section-id
    >
      <h2>{{ section.heading }}</h2>
      <p v-for="paragraph in section.body" :key="`${section.id}-${paragraph.slice(0, 22)}`">{{ paragraph }}</p>

      <blockquote v-if="section.quote">{{ section.quote }}</blockquote>
      <div v-if="section.callout" class="article-callout">{{ section.callout }}</div>
      <img v-if="section.image" class="article-image" :src="section.image" :alt="section.heading" loading="lazy" width="800" height="450" />

      <div v-if="section.videoEmbed" class="article-video-wrap">
        <iframe
          :src="'https://www.youtube.com/embed/' + section.videoEmbed + '?rel=0'"
          :title="section.heading"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <ul v-if="section.bullets?.length">
        <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
      </ul>
    </section>
  </article>
</template>

<script setup lang="ts">
import type { BlogPost } from '../composables/useBlog'

defineProps<{
  post: BlogPost
}>()
</script>

<style scoped>
.article-body {
  width: 100%;
  max-width: 100%;
}
.article-cover {
  width: 100%;
  border-radius: 20px;
  margin-bottom: 2.5rem;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 28px 60px rgba(0,0,0,0.32);
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
.article-section {
  margin-bottom: 2.8rem;
  scroll-margin-top: 110px;
}
.article-section h2 {
  font-size: clamp(1.35rem, 2.2vw, 2rem);
  line-height: 1.25;
  color: #f3f8ff;
  margin-bottom: 1rem;
}
.article-section p {
  color: rgba(217,228,241,0.88);
  line-height: 1.95;
  font-size: 1.03rem;
  margin-bottom: 1rem;
}
.article-section blockquote {
  margin: 1.5rem 0;
  padding: 1.1rem 1.25rem;
  border-left: 2px solid rgba(26,140,255,0.8);
  background: rgba(26,140,255,0.1);
  color: rgba(217,232,247,0.9);
  font-size: 1rem;
  line-height: 1.8;
}
.article-callout {
  margin: 1.5rem 0;
  border-radius: 14px;
  border: 1px solid rgba(0,212,170,0.3);
  background: rgba(0,212,170,0.08);
  color: rgba(214,245,239,0.92);
  padding: 1rem 1.1rem;
  font-size: 0.94rem;
  line-height: 1.75;
}
.article-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 16px;
  margin: 1.4rem 0;
  border: 1px solid rgba(255,255,255,0.07);
}
.article-video-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 1.6rem 0 2rem;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
  background: #000;
}
.article-video-wrap iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
.article-section ul {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
}
.article-section li {
  color: rgba(212,226,241,0.84);
  margin-bottom: 0.6rem;
  line-height: 1.75;
}
@media (max-width: 768px) {
  .article-body { max-width: 100%; }
  .article-section p { font-size: 1rem; line-height: 1.88; }
}
</style>
