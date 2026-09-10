<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

// 301 SEO Permanent Migration to /journal/[slug]
await navigateTo(slug.value ? `/journal/${slug.value}` : '/journal', { redirectCode: 301, replace: true })
</script>

<template>
  <div />
</template>
