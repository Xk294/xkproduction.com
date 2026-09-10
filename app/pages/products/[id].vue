<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id as string)

// 301 SEO Permanent Migration to /work/[slug]
await navigateTo(`/work/${id.value}`, { redirectCode: 301 })
</script>

<template>
  <div />
</template>
