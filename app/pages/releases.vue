<template>
  <div class="releases-redirect-fallback">
    <p>Đang chuyển hướng sang trang Tác Phẩm...</p>
  </div>
</template>

<script setup lang="ts">
await navigateTo('/work', { redirectCode: 301, replace: true })
</script>

<style scoped>
.releases-redirect-fallback {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-family: var(--font-mono, monospace);
  font-size: 0.9rem;
}
</style>
