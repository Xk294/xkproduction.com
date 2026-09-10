<template>
  <div class="xk-project-grid">
    <!-- FLAGSHIP HERO WORK (1 HUGE ARTWORK) -->
    <div v-if="heroProject" class="grid-hero-slot">
      <XKProjectCard :project="heroProject" :is-hero="true" />
    </div>

    <!-- ASYMMETRIC SECONDARY GRID -->
    <div class="grid-secondary-slots">
      <XKProjectCard
        v-for="p in remainingProjects"
        :key="p.slug"
        :project="p"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { XKProject } from '~/types/production'

const props = withDefaults(
  defineProps<{
    projects: XKProject[]
    limit?: number
  }>(),
  {
    limit: 5
  }
)

const heroProject = computed(() => props.projects[0] || null)
const remainingProjects = computed(() => props.projects.slice(1, props.limit))
</script>

<style scoped>
.xk-project-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.grid-secondary-slots {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

@media (max-width: 768px) {
  .grid-secondary-slots {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
